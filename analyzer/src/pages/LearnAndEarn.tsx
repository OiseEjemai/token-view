import React, { useState } from 'react';
import Topbar from '../components/shared/Topbar';
import Footer from '../components/shared/Footer';

const LearnAndEarn = () => {
    return (
        <div>
            <Topbar />
            <div className="app-container  text-dark-1 min-h-screen flex flex-col items-center justify-center font-mono">
                <div className=' flex-wrap'>
                    <h1 className='text-7xl text-center'>Coming Soon!</h1>
                    <h3 className='text-center mt-8 text-3xl'>Nothing to see here</h3>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LearnAndEarn;
