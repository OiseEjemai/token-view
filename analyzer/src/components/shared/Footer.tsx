import React from 'react'
import {getYear} from 'date-fns' 
import { logo } from '../../assets'

function Footer() {
    return (
        <div>
            <footer className="bg-background rounded-lg shadow dark:bg-gray-900 m-4 text-dark-1">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="./public/TokenView.png" className="h-8" alt="Token View Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TokenView </span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="/" className="me-4 md:me-6 footer_links">Home</a>
                            </li>
                            <li>
                                <a href="/analyze-token" className="me-4 md:me-6 footer_links">Analyze Token</a>
                            </li>
                            <li>
                                <a href="/trading" className="me-4 md:me-6 footer_links">Trading</a>
                            </li>
                            <li>
                                <a href="/learn-and-earn" className="me-4 md:me-6 footer_links">Learn and Earn</a>
                            </li>
                            <li>
                                <a href="/premium" className="footer_links">Premium</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Product of STACH Technologies</span>
                    <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-2'>Powered by CoinGecko API</span>
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-2">© {getYear(Date.now())} <span>TokenView</span>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer