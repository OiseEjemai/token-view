import React from 'react'
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/shared/AppSidebar"
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";


const UserDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>
        
        </div>
      </main>
    </SidebarProvider>
  )
}

export default UserDashboard
