import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
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

function App() {
  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("https://token-view.onrender.com/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/analyze-token' element={<AnalyzeToken />} />
        <Route path='/trading' element={authUser ? <Trading /> : <Navigate to='/sign-in' />} />
        <Route path='/learn-and-earn' element={<LearnAndEarn />} />
        <Route path='/premium' element={<Premium />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
