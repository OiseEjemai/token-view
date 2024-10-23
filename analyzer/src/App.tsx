import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { RedirectToSignIn, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import Home from './pages/Home'
import Trading from './pages/Trading'
import AnalyzeToken from './pages/AnalyzeToken'
import { Toaster } from "./components/ui/sonner"
import Signin from './pages/_auth/Signin'
import Loader from "./components/shared/Loader";
import Signup from './pages/_auth/Signup'
import { useQuery } from "@tanstack/react-query";
import AuthLayout from './pages/_auth/AuthLayout'
import Premium from './pages/Premium'
import LearnAndEarn from './pages/LearnAndEarn'
import axios from 'axios'
import Canvas from './pages/Canvas';


function App() {
  const user = useUser()
  // const { data: authUser, isLoading } = useQuery({
  //   // we use queryKey to give a unique name to our query and refer to it later
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     try {
  //       const res = await fetch("http://localhost:5500/auth/me");
  //       const data = await res.json();
  //       if (data.error) return null;
  //       if (!res.ok) {
  //         throw new Error(data.error || "Something went wrong");
  //       }
  //       // console.log("authUser is here:", data);
  //       return data;
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  //   retry: false,
  // });



  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/analyze-token' element={<AnalyzeToken />} />
          <Route path='/trading' element={<Trading />} />
        <Route path='/learn-and-earn' element={<LearnAndEarn />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/canvas' element={<Canvas />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
