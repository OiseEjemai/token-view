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
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
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
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Loader from './Loader'

function Topbar() {
  const user = useUser()
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  return (
    <nav className='flex flex-row items-center py-4 px-5 top-0 text-white bg-black flex-wrap justify-between'>
      <div className='justify-between py-4 px-5 gap-3'><a href="/">Token View</a></div>
      <Sheet>
        <SheetTrigger asChild>
          <div className='flex flex-col gap-1 cursor-pointer main-div-div justify-between'>
            <div className='main-nav-div'></div>
            <div className='main-nav-div'></div>
            <div className='main-nav-div'></div>
          </div>
        </SheetTrigger>
        <SheetContent className='w-[20rem]'>
          <SheetHeader>
            <SheetTitle>Token View</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-around gap-16 items-center py-4 mt-4">
            <div className="items-center gap-4">
              <a href="/" className='text-center'>Home</a>
            </div>
            {user.user ?
              <AlertDialog>
                <AlertDialogTrigger className='text-center'>Profile</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-center'>Profile</AlertDialogTitle>
                    <AlertDialogDescription>
                      Name: {user?.user?.fullName}
                    </AlertDialogDescription>
                    <AlertDialogDescription>
                      Username: {user?.user?.username}
                    </AlertDialogDescription>
                    <AlertDialogDescription>
                      Email: {user?.user?.primaryEmailAddress?.emailAddress}
                    </AlertDialogDescription>
                    <AlertDialogAction onClick={() => setIsEditModalOpen(true)}>
                      <p className='cursor-pointer'><Edit /></p>
                    </AlertDialogAction>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <SignOutButton></SignOutButton>
                    {/* <AlertDialogAction className='bg-red-700' onClick={(e) => { e.preventDefault(); logout(); }}>Logout</AlertDialogAction> */}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              :
              <div className='items-center justify-center mt-4'>
                <a href="/sign-up" className='p-4'>Sign Up</a>
                <a href="/sign-in" className='p-4'>Sign In</a>
              </div>
            }
            <div className="items-center">
              <a href="/analyze-token" className=''>Analyze token</a>
            </div>
            <div className="items-center gap-4">
              <a href="/trading" className=''>Trading</a>
            </div>
            {/* <div className="items-center gap-4">
              <a href="/learn-and-earn" className=''>Learn and earn <Badge variant="outline">coming soon</Badge></a>
            </div> */}
            <div className="items-center gap-4">
              <a href="/premium" className=''>Premium</a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className='flex gap-4 nav-links flex-row justify-center'>
        <a href="/" className='p-4'>Home</a>
        <a href="/analyze-token" className='p-4'>Analyze token</a>
        <a href="/trading" className='p-4'>Trading</a>
        <a href="/learn-and-earn" className='p-4'>Learn and earn</a>
        <a href="/premium" className='p-4'>Premium</a>
        {user.user ?
          <AlertDialog>
            <AlertDialogTrigger>Profile</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-center'>Profile</AlertDialogTitle>
                <AlertDialogDescription>
                  Name: {user?.user?.fullName}
                </AlertDialogDescription>
                <AlertDialogDescription>
                  Username: {user?.user?.username}
                </AlertDialogDescription>
                <AlertDialogDescription>
                  Email: {user?.user?.primaryEmailAddress?.emailAddress}
                </AlertDialogDescription>
                <AlertDialogAction onClick={() => setIsEditModalOpen(true)}>
                  <p className='cursor-pointer'><Edit /></p>
                </AlertDialogAction>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                {/* <AlertDialogAction className='bg-red-700' onClick={(e) => { e.preventDefault(); logout(); }}>Logout</AlertDialogAction> */}
                <SignOutButton></SignOutButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          :
          <div className='items-center justify-center mt-4'>
            <a href="/sign-up" className='p-4'>Sign Up</a>
            <a href="/sign-in" className='p-4'>Sign In</a>
          </div>
        }
        {isEditModalOpen && (
          <div className="overflow-auto min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div className="absolute bg-black opacity-80 inset-0 z-0" onClick={() => setIsModalOpen(false)}></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
              <div className="">
                <div className="text-center p-5 flex-auto justify-center">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <h1 className='text-black text-2xl font-mono'>Edit Profile</h1>
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Topbar
