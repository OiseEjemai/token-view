import React, {useEffect, useRef} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

function CardSection() {
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const card4Ref = useRef(null);
    const card5Ref = useRef(null);
    const card6Ref = useRef(null);


    useEffect(() => {
        gsap.fromTo(
            card1Ref.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card1Ref.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );
        gsap.fromTo(
            card2Ref.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card2Ref.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );
        gsap.fromTo(
            card3Ref.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card3Ref.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );
        gsap.fromTo(
            card4Ref.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card4Ref.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );
        gsap.fromTo(
            card5Ref.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: 0.4,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card5Ref.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );
        gsap.fromTo(
            card6Ref.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card6Ref.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);
    return (
        <div className='mt-28'>
            <h1 className='text-center text-2xl mb-4'>Features</h1>
            <div className='grid grid-cols-3 justify-center items-center'>
                <Card className='m-4 bg-background text-dark-1' ref={card1Ref}>
                    <CardHeader>
                        <CardTitle className='text-center'>Get Information about your favorite token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Know the details about your favorite cryptocurrency token just by searching for it.
                    </CardContent>
                </Card>
                <Card className='m-4 bg-background text-dark-1' ref={card2Ref}>
                    <CardHeader>
                        <CardTitle className='text-center'>What tokens to invest in?</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Get to know the best tokens to either buy, sell or just hold using analytics from the token.
                    </CardContent>
                </Card>
                <Card className='m-4 bg-background text-dark-1' ref={card3Ref}>
                    <CardHeader>
                        <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
                <Card className='m-4 bg-background text-dark-1' ref={card4Ref}>
                    <CardHeader>
                        <CardTitle className='text-center flex-wrap items-center'>Get Information about a particular cryptocurrency token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
                <Card className='m-4 bg-background text-dark-1' ref={card5Ref}>
                    <CardHeader>
                        <CardTitle className='text-center'>Get to know about over a 1000+ tokens</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
                <Card className='m-4 bg-background text-dark-1' ref={card6Ref}>
                    <CardHeader>
                        <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CardSection
