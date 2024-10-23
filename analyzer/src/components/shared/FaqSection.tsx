import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

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
                        There is absolutely no registration fee. Registration is completely free.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is my personal data secure?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we take data privacy seriously and implement strict security measures to protect your personal information. Your data is encrypted and stored securely on our servers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I get real-time token price updates?</AccordionTrigger>
                    <AccordionContent>
                        We integrate with TradingView to provide real-time token price data directly on the platform. You can track live prices, charts, and market trends for your favorite tokens.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Is Token View free to use?</AccordionTrigger>
                    <AccordionContent>
                        Yes, Token View is currently free to use. However, we may offer premium features in the future for advanced users who want more in-depth tools and analytics.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Why am I not receiving email notifications?</AccordionTrigger>
                    <AccordionContent>
                        Check your spam or junk folder to ensure our emails are not being filtered. Also, ensure that you have verified your email address and opted in for notifications in your account settings.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>Does Token View support multi-language options?</AccordionTrigger>
                    <AccordionContent>
                        Currently, Token View is available in English, but we are working on adding multi-language support to reach a global audience.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger>Can I use Token View on my mobile device?</AccordionTrigger>
                    <AccordionContent>
                        Yes, Token View is optimized for mobile devices, allowing you to access token data, charts, and trading signals on the go.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default FaqSection;