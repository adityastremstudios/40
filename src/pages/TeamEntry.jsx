import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function TeamEntry() {
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);
  const [players, setPlayers] = useState([""]);
  const [status, setStatus] = useState("");

  const handlePlayerChange = (i, v) => {
    const copy = [...players];
    copy[i] = v;
    setPlayers(copy);
  };

  const addPlayer = () => {
    if (players.length < 12) setPlayers([...players, ""]);
  };

  const removePlayer = (i) => {
    const copy = [...players];
    copy.splice(i, 1);
    setPlayers(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName || players.some((p) => !p)) {
      setStatus("Please fill out all fields");
      return;
    }
    try {
      let logoUrl = "";
      if (teamLogo) {
        const storageRef = ref(storage, `team_logos/${Date.now()}_${teamLogo.name}`);
        await uploadBytes(storageRef, teamLogo);
        logoUrl = await getDownloadURL(storageRef);
      }
      await addDoc(collection(db, "registered_teams"), {
        teamName,
        logoUrl,
        players,
        createdAt: new Date().toISOString(),
      });
      setStatus("✅ Team registered!");
      setTeamName("");
      setTeamLogo(null);
      setPlayers([""]);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error saving team.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Team Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Team Name" className="w-full p-2 bg-gray-800 rounded" required />
        <input type="file" accept="image/*" onChange={e => setTeamLogo(e.target.files[0])} className="w-full p-2 bg-gray-800 rounded" />
        <div>
          <label className="block mb-1">Players (Max 12)</label>
          {players.map((p,i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={p} onChange={e => handlePlayerChange(i,e.target.value)} placeholder={`Player ${i+1}`} className="flex-1 p-2 bg-gray-800 rounded" required />
              {players.length>1 && <button type="button" onClick={() => removePlayer(i)} className="bg-red-500 px-2 rounded">−</button>}
            </div>
          ))}
          {players.length<12 && <button type="button" onClick={addPlayer} className="bg-blue-500 px-4 py-2 rounded">+ Add Player</button>}
        </div>
        <button type="submit" className="w-full bg-green-600 py-2 rounded">Submit Registration</button>
        {status && <p className="mt-2 text-center">{status}</p>}
      </form>
    </div>
);
}
