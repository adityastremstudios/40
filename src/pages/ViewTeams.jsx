import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function ViewTeams() {
  const [teams, setTeams] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({ teamName: "", players: [] });

  useEffect(() => {
    async function fn() {
      const qs = await getDocs(collection(db,"registered_teams"));
      const data = qs.docs.map(d => ({ id:d.id, ...d.data() }));
      console.log("Fetched",data);
      setTeams(data);
    }
    fn();
  }, []);

  const handleDelete = async id => {
    await deleteDoc(doc(db,"registered_teams",id));
    setTeams(ts=>ts.filter(t=>t.id!==id));
  };

  const startEdit = (t,i) => {
    setEditIdx(i);
    setEditData({ teamName:t.teamName, players:[...t.players] });
  };

  const saveEdit = async id => {
    await updateDoc(doc(db,"registered_teams",id), editData);
    setTeams(ts=>ts.map((t,idx)=>idx===editIdx?{...t,...editData}:t));
    setEditIdx(null);
  };

  const exportCSV = () => {
    const rows=[["Team","Logo","Players"]];
    teams.forEach(t=>rows.push([t.teamName,t.logoUrl||"",t.players.join(" | ")]));
    const csv="data:text/csv;charset=utf-8,"+rows.map(r=>r.join(",")).join("\n");
    const link=document.createElement("a");link.href=encodeURI(csv);link.download="teams.csv";document.body.appendChild(link);link.click();document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Registered Teams</h1>
        <button onClick={exportCSV} className="bg-blue-500 px-4 py-2 rounded">Export CSV</button>
      </div>
      {!teams.length ? <p className="text-center text-gray-400">No teams registered yet.</p> : 
      teams.map((team,i)=><div key={team.id} className="bg-gray-800 p-4 mb-4 rounded">
        {editIdx===i ? <>
          <input value={editData.teamName} onChange={e=>setEditData({...editData,teamName:e.target.value})} className="bg-gray-900 p-2 w-full rounded mb-2 text-white"/>
          {editData.players.map((p,pi)=> <input key={pi} value={p} onChange={e=>{let a=[...editData.players];a[pi]=e.target.value;setEditData({...editData,players:a});}} className="bg-gray-900 p-2 w-full rounded mb-2 text-white"/> )}
          <div className="flex gap-2"><button onClick={()=>saveEdit(team.id)} className="bg-green-600 px-3 py-1 rounded">Save</button><button onClick={()=>setEditIdx(null)} className="bg-gray-600 px-3 py-1 rounded">Cancel</button></div>
        </> : <>
          <div className="flex justify-between items-center mb-2"><h2 className="text-lg font-semibold">{team.teamName}</h2>{team.logoUrl&&<img src={team.logoUrl} className="h-12 rounded"/>}</div>
          <ul className="list-disc list-inside text-gray-300 mb-2">{team.players.map((p,pi)=><li key={pi}>{p}</li>)}</ul>
          <div className="flex gap-2"><button onClick={()=>startEdit(team,i)} className="bg-yellow-500 px-3 py-1 rounded text-black">Edit</button><button onClick={()=>handleDelete(team.id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></div>
        </>}
      </div>)}
    </div>
);
}
