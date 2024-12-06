import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import Home from './pages/Home';
import Trading from './pages/Trading';
import AnalyzeToken from './pages/AnalyzeToken';
import { Toaster } from "./components/ui/sonner";
import Signin from './pages/_auth/Signin';
import Signup from './pages/_auth/Signup';
import Premium from './pages/Premium';
import LearnAndEarn from './pages/LearnAndEarn';
import Canvas from './pages/Canvas';
import ParticleRing from './pages/ParticleRing';
import UserDashboard from './pages/UserDashboard';

function App() {
  const user = useUser();

  if (!user.isLoaded) {
    // Show a loader while user data is loading
    return <div>Loading...</div>;
  }
  console.log(user)

  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/analyze-token" element={<AnalyzeToken />} />
        <Route 
          path="/trading" 
          element={user.user ? <Trading /> : <Navigate to="/sign-in" />} 
        />
        <Route path="/learn-and-earn" element={<LearnAndEarn />} />
        <Route path="/premium" element={<Premium />} />
        <Route 
          path="/user-dashboard" 
          element={user.user ? <UserDashboard /> : <Navigate to="/sign-in" />} 
        />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/particle" element={<ParticleRing />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;