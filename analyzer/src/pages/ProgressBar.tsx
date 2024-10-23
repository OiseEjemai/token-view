import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProgressBar = () => {
    const progressRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateProgress = () => {
            const section = document.querySelector('.how-it-works-section');
            const rect = section?.getBoundingClientRect();
            if (rect) {
                const scrollPercentage = ((window.innerHeight - rect.top) / (rect.height + window.innerHeight)) * 100;
                if (progressRef.current) {
                    progressRef.current.style.width = `${Math.min(Math.max(scrollPercentage, 0), 100)}%`;
                }
            }
        };

        window.addEventListener('scroll', updateProgress);
        return () => {
            window.removeEventListener('scroll', updateProgress);
        };
    }, []);
    return (
        <div ref={progressRef} className="progress-bar">
            <div className=''>
                <div>
                    <h1 className='text-center text-xl'>Key Features</h1>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;