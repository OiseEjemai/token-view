import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '../ui/accordion'

gsap.registerPlugin(ScrollTrigger);

function FaqSection() {
    const faqRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            faqRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: faqRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);

    return (
        <div ref={faqRef} className='flex flex-col mt-[2rem] ml-5 mr-5 mb-[2rem]'>
            <h1 className='text-center text-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'>
                FAQ
            </h1>
            <Accordion type="single" className='' collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is there a registration fee?</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, at.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Do I need to connect my wallet?</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Do I need to complete my KYC?</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default FaqSection;