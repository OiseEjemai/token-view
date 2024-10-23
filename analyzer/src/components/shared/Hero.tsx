import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Edit, Ghost } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Button} from '../ui/button'
gsap.registerPlugin(ScrollTrigger);
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
import TickerTapeWidget from './TickerTapeWidget';


function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const signInRef = useRef(null);
    const signUpRef = useRef(null);
    const topbarRef = useRef(null);
    const mockupRef = useRef(null);
    const user = useUser()
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
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

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
        gsap.fromTo(
            textRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo(
            mockupRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, delay: 1, ease: 'elastic.out(1, 0.5)' }
        );
        gsap.fromTo(
            signInRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
        gsap.fromTo(
            signUpRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
    }, []);

    useEffect(() => {
        gsap.to(heroRef.current, {
            backgroundPosition: '200% 0%',
            duration: 20,
            ease: 'linear',
            repeat: -1,
        });

        gsap.fromTo(
            heroRef.current,
            { clipPath: 'circle(0% at 50% 50%)' },
            {
                clipPath: 'circle(150% at 50% 50%)',
                duration: 2,
                ease: 'power3.out',
                delay: 0.1,
            }
        );
    }, [])

    const buttonNavigateToSignUp = () => {
        navigate('/sign-up')
    }

    const buttonNavigateToSignIn = () => {
        navigate('/sign-in')
    }


    return (
        <div
            ref={heroRef}
            className='overflow-hidden'
            style={{
                background: 'linear-gradient(120deg, #6a00f4, #ff4081, #1de9b6, #2979ff, #ff9100)',
                // background: 'linear-gradient(120deg, #6a00f4, #a6ffcb, #e55d87, #4776e6, #8e54e9, #ffa751)',
                backgroundSize: '300% 300%',
            }}
        >
            <nav ref={topbarRef} className='flex flex-row items-center pt-2 top-0 Home_TopBar text-light-1 flex-wrap justify-between'>
                <div className='justify-between py-4 px-5 gap-3'>
                    <a href="/" className='p-5'>Token View</a>
                    <a href="/" className='p-6 nav-links' id='nav_links'>Home</a>
                    <a href="/analyze-token" className='p-6 nav-links' id='nav_links'>Analyze token</a>
                    <a href="/trading" className='p-6 nav-links' id='nav_links'>Trading</a>
                    <a href="/learn-and-earn" className='p-6 nav-links' id='nav_links'>Learn and Earn</a>
                    <a href="/premium" className='p-6 nav-links' id='nav_links'>Premium</a>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <div className='flex flex-col gap-1 cursor-pointer main-div-div justify-between'>
                            <div className='main-nav-div bg-white'></div>
                            <div className='main-nav-div bg-white'></div>
                            <div className='main-nav-div bg-white'></div>
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
                    {user.user ?
                        <AlertDialog>
                            <AlertDialogTrigger className='mr-4'><Button className='bg-primary-500'>Profile</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-center' id='nav_links'>Profile</AlertDialogTitle>
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
                        <div className='items-center justify-center'>
                            <a href="/sign-up" className='p-4' id='nav_links'><Button className='bg-primary-500'>Sign Up</Button></a>
                            <a href="/sign-in" className='p-4' id='nav_links'><Button className='bg-primary-500'>Sign In</Button></a>
                        </div>
                    }
                    {isEditModalOpen && (
                        <UserProfile />
                    )}
                </div>
            </nav>
            <div className='flex flex-col md:flex-row items-center justify-center min-h-[40rem] text-black gap-8 md:gap-16 relative overflow-hidden'>
                <div className='textDiv-hero text-center md:order-1 mb-8 md:mb-32 sm:mt-32'>
                    <h1 ref={titleRef} className='text-3xl text-white'>
                        What are you buying today?
                    </h1>
                    <p ref={textRef} className='mt-3 text-lg text-white'>
                        Don't worry, we've got you covered.
                    </p>
                    <div className="cta_btns flex flex-row mt-4 flex-wrap justify-center items-center">
                    <Button size="lg" className='cta_btn bg-primary-500 m-4 w-52 animate-fadeInRight' onClick={buttonNavigateToSignUp}>Sign up</Button>
                    <Button size="lg" className='cta_btn bg-primary-500 m-4 w-52 animate-fadeInRight' onClick={buttonNavigateToSignIn}>Sign In</Button>
                    </div>
                </div>
                <div ref={mockupRef} className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl md:order-2 justify-end mb-8 md:mb-0 sm:mr-4">
                    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                    <div className="rounded-[2rem] flex overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 items-center justify-center text-center">
                        <img src="/public/TokenView.png" className="dark:hidden w-[272px]" alt="Light mode mockup" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// function Hero() {
//     const heroRef = useRef(null);

//     useEffect(() => {
//         // Animate the gradient background to move and shift colors like Stripe's style
//         gsap.to(heroRef.current, {
//             backgroundPosition: '200% 0%',
//             duration: 15,
//             ease: 'linear',
//             repeat: -1,
//         });
//     }, []);

//     return (
//         <div
//             ref={heroRef}
//             className="flex flex-col md:flex-row items-center justify-center min-h-[40rem] text-black gap-8 md:gap-40 relative overflow-hidden"
//             style={{
//                 background: 'linear-gradient(120deg, #6a00f4, #ff4081, #1de9b6, #2979ff, #ff9100)',
//                 backgroundSize: '300% 300%',
//             }}
//         >
//             {/* Text section */}
//             <div className='text-center md:order-1 mb-8 md:mb-32'>
//                 <h1 className='text-3xl text-white'>
//                     What are you buying today?
//                 </h1>
//                 <p className='mt-3 text-lg text-white'>
//                     Don't worry, we got you covered.
//                 </p>
//             </div>

//             {/* Phone mockup section */}
//             <div className="relative border-gray-800 dark:border-gray-800 bg-gradient-to-b from-gray-800 to-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl md:order-2 justify-end mb-8 md:mb-0">
//                 <div className="w-[148px] h-[18px] bg-gray-900 rounded-b-[1rem] mx-auto mt-2"></div>
//             </div>
//         </div>
//     );
// }

// export default Hero;