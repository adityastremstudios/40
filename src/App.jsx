import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Public from "./pages/Public";
import GoThrough from "./pages/GoThrough";
import TeamEntry from "./pages/TeamEntry";
import ViewTeams from "./pages/ViewTeams";
import Scoreboard from "./pages/Scoreboard";
import { AuthProvider, useAuth } from "./AuthContext";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const adminEmails = ["aslovesh@gmail.com"];
function Protected({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (!adminEmails.includes(currentUser.email)) return <Navigate to="/public" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/public" element={<Public />} />
        <Route path="/go" element={<Protected><GoThrough /></Protected>} />
        <Route path="/team-entry" element={<Protected><TeamEntry /></Protected>} />
        <Route path="/view-teams" element={<Protected><ViewTeams /></Protected>} />
        <Route path="/scoreboard" element={<Protected><Scoreboard /></Protected>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}
