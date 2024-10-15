import React from 'react'
import { Bitcoin, LucideHandCoins } from 'lucide-react'

function Hero() {
    return (
        <div>
            <div className='flex flex-row items-center  min-h-[40rem] text-white justify-center'>
                <div className='text-center order-2 mb-32'>
                    <h1 className='text-3xl animate-fadeInRight'>What are you buying today?</h1>
                    <p className='mt-3 animate-fadeInLeft'>Don't worry, we got you covered.</p>
                </div>
                <Bitcoin className='w-32 mb-32 h-32 animate-moveUpAndDown order-1' />
                <LucideHandCoins className='w-32 mb-32 h-32 animate-moveUpAndDown m-4 order-3' />

            </div>
        </div>
    )
}

export default Hero
