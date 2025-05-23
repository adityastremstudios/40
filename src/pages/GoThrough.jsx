import React from "react";
import { useNavigate } from "react-router-dom";
export default function GoThrough() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <button onClick={()=>nav("/team-entry")} className="bg-blue-600 px-6 py-2 rounded">Team Registration</button>
      <button onClick={()=>nav("/scoreboard")} className="bg-green-600 px-6 py-2 rounded">Live Scoreboard</button>
      <button onClick={()=>nav("/view-teams")} className="bg-purple-600 px-6 py-2 rounded">View / Export Teams</button>
    </div>
  );
}
