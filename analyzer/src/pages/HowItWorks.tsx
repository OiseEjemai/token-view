import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import ProgressBar from './ProgressBar';

const HowItWorks = () => {
  // useEffect(() => {
  //   // GSAP animation to reveal sections on scroll
  //   const sections = document.querySelectorAll('.reveal');
  //   const textReveal = document.getElementById('text-h2')
  //   const handleScroll = () => {
  //     sections.forEach(section => {
  //       const { top } = section.getBoundingClientRect();
  //       if (top <= window.innerHeight) {
  //         textReveal.style.fontSize = '100px'
  //       }
  //     });
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div className="how-it-works-section">

      <div className="progress-container">
        <ProgressBar />
      </div>
    </div>
  );
}

export default HowItWorks;