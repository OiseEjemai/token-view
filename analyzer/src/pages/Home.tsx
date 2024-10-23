import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createChart } from 'lightweight-charts';
import { useUser, SignOutButton, SignedIn, UserProfile } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Footer from '../components/shared/Footer';
import CardSection from '../components/shared/Card';
import Hero from '../components/shared/Hero';
import FaqSection from '../components/shared/FaqSection';
import Chart from '../components/shared/Chart';
import gsap from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import KeyFeatures from '../components/shared/KeyFeatures';
import HowItWorks from './HowItWorks';
import Canvas from './Canvas';
import Newsletter from '../components/shared/Newsletter';
import TickerTapeWidget from '../components/shared/TickerTapeWidget';

function Home() {
    const [stage, setStage] = useState(0);
    const user = useUser()
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient();
    const topbarRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            topbarRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
    }, []);

    useEffect(() => {
        const navbarLinks = document.querySelectorAll('#nav_links')
        navbarLinks.forEach(element => {
            if (element.pathname === location.pathname) {
                element.classList.add('active_nav_link')
            }
        });
    }, [location])

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(2), 2000), // Second bead
        ];

        return () => timers.forEach(clearTimeout);
    }, []);


    return (
        <div>
            <Hero />
            <TickerTapeWidget />
            <div className='min-h-screen text-dark-1'>
                <HowItWorks />
                <KeyFeatures />
                <Canvas />
                <Chart />
            </div>
            <FaqSection />
            <Newsletter />
            <Footer />
        </div >
    )
}

export default Home