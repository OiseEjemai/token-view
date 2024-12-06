import React, { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Edit } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { toast } from "sonner"
import { useUser, SignOutButton, UserProfile } from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Loader from './Loader'
import { Button } from '../ui/button'

function Topbar() {
  const user = useUser()
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient();

  useEffect(() => {
    const navbarLinks = document.querySelectorAll('#nav_links')
    navbarLinks.forEach(element => {
      if (element.pathname === location.pathname) {
        element.classList.add('active_nav_link')
      }
    });
  }, [location])


  return (
    <nav className='flex flex-row items-center pt-2 top-0 Home_TopBar text-dark-1 flex-wrap justify-between'>
      <div className='justify-between py-4 px-5 gap-3'>
        <a href="/" className='p-5'>Token View</a>
        <a href="/analyze-token" className='p-6 nav-links' id='nav_links'>Analyze token</a>
        <a href="/trading" className='p-6 nav-links' id='nav_links'>Trading</a>
        <a href="/learn-and-earn" className='p-6 nav-links' id='nav_links'>Learn and Earn</a>
        <a href="/premium" className='p-6 nav-links' id='nav_links'>Premium</a>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <div className='flex flex-col gap-1 cursor-pointer main-div-div justify-between'>
            <div className='main-nav-div bg-dark-1'></div>
            <div className='main-nav-div bg-dark-1'></div>
            <div className='main-nav-div bg-dark-1'></div>
          </div>
        </SheetTrigger>
        <SheetContent className='w-[20rem]'>
          <SheetHeader>
            <SheetTitle>Token View</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-around gap-16 items-center py-4 mt-4">
            {user.user ?
              <div className='items-center justify-center mt-4'>
                <a href="/user-dashboard" className='p-4'>Profile</a>
              </div>
              :
              <div className='items-center justify-center mt-4'>
                <a href="/sign-up" className='p-4'>Sign Up</a>
                <a href="/sign-in" className='p-4'>Sign In</a>
              </div>
            }
            <div className="items-center">
              <a href="/" className=''>Home</a>
            </div>
            <div className="items-center">
              <a href="/analyze-token" className=''>Analyze token</a>
            </div>
            <div className="items-center gap-4">
              <a href="/trading" className=''>Trading</a>
            </div>
            <div className="items-center gap-4">
              <a href="/learn-and-earn" className=''>Learn and earn</a>
            </div>
            <div className="items-center gap-4">
              <a href="/premium" className=''>Premium</a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className='flex gap-4 nav-links flex-row justify-center'>
        {user.user ?
          <div>
            <a href="/user-dashboard" className='p-4 mr-4' id='nav_links'><Button className='bg-primary-500 mr-4'>Profile</Button></a>
          </div>
          :
          <div className='items-center justify-center'>
            <a href="/sign-up" className='p-4 mr-4' id='nav_links'><Button className='bg-primary-500'>Sign Up</Button></a>
            <a href="/sign-in" className='p-4 mr-4' id='nav_links'><Button className='bg-primary-500'>Sign In</Button></a>
          </div>
        }
      </div>
    </nav>
  )
}

export default Topbar
