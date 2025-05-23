import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/go");
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md text-center space-y-4">
        <img src="/adityastream-logo.jpg" alt="Logo" className="mx-auto h-20 mb-2" />
        <h1 className="text-2xl font-bold">AdityaStream Studios</h1>
        <p className="text-gray-400">Your ultimate destination for esports production and tournament management.</p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-700" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-700" required />
          <button type="submit" className="w-full bg-blue-600 py-2 rounded">Login</button>
        </form>
      </div>
      <footer className="mt-6 text-center text-sm text-gray-500 px-4">
        <p>All rights reserved © 2025</p>
        <p className="text-xs mt-1">All trademarks or product logos appearing on our website are the property of their respective owners. We are not affiliated with any of the supported games and services.</p>
      </footer>
    </div>
);
