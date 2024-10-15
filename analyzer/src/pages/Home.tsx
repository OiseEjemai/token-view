import React, { useState, useEffect, useRef, useCallback } from 'react'
import Topbar from '../components/shared/Topbar'
import { createChart } from 'lightweight-charts';
import { useUser, SignOutButton, SignedIn } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { type ChartConfig } from "../components/ui/chart"
import Footer from '../components/shared/Footer';
import CardSection from '../components/shared/Card';
import Hero from '../components/shared/Hero';
import FaqSection from '../components/shared/FaqSection';

const chartData = [
    { month: "January", sell: 186, buy: 80 },
    { month: "February", sell: 305, buy: 200 },
    { month: "March", sell: 237, buy: 120 },
    { month: "April", sell: 73, buy: 190 },
    { month: "May", sell: 209, buy: 130 },
    { month: "June", sell: 214, buy: 140 },
]

const chartConfig = {
    sell: {
        label: "Sell",
        color: "red",
    },
    buy: {
        label: "Buy",
        color: "green",
    },
} satisfies ChartConfig

const tokenList = ['bitcoin', 'ethereum', 'litecoin']; // Add more tokens as needed


function Home() {
    const [selectedToken, setSelectedToken] = useState(tokenList[0]); // Default token
    const [candlestickData, setCandlestickData] = useState([]); // Candlestick data
    const chartRef = useRef<any>(null); // Ref for the chart instance
    const [stage, setStage] = useState(0);

    const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedToken(event.target.value);
    };

    const user = useUser()

    useEffect(() => {
        const fetchCandlestickData = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedToken}/ohlc?vs_currency=usd&days=365&precision=full`, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json",
                        'x-cg-demo-api-key': 'CG-jrxuRfEAobyEpGDgbKk1uHi2'
                    },
                });
                const data = await response.json();
                console.log(data)

                // Format data to the required structure for the chart
                const formattedData = data.map(([time, open, high, low, close]) => ({
                    time: Math.floor(time / 1000), // Convert milliseconds to seconds
                    open,
                    high,
                    low,
                    close,
                }));
                setCandlestickData(formattedData); // Store data in state
            } catch (error) {
                console.error('Error fetching candlestick data:', error);
            }
        };

        fetchCandlestickData();
    }, [selectedToken]);

    useEffect(() => {
        if (candlestickData.length === 0) return;

        const chartContainer = document.getElementById('chart');
        if (!chartContainer) return;

        // Clear the chart container if a chart already exists (for token switching)
        chartContainer.innerHTML = '';

        // Create the chart and set its dimensions
        const chart = createChart(chartContainer, {
            width: chartContainer.clientWidth,
            height: 400,
            layout: {
                background: '#f5f5f5',
                textColor: '#888',
            },
            grid: {
                vertLines: {
                    visible: false, // Remove vertical grid lines
                },
                // horzLines: {
                //   visible: false, // Remove horizontal grid lines
                // },
            },
        });
        chartRef.current = chart; // Store chart instance in ref for resizing later

        // Add candlestick series to the chart
        const candlestickSeries = chart.addCandlestickSeries();

        // Set the data for the candlestick series
        candlestickSeries.setData(candlestickData);

        // Update chart with new data (for live updates)
        const updateChart = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedToken}/ohlc?vs_currency=usd&days=365&precision=full`, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json",
                        'Authorization': `Bearer CG-jrxuRfEAobyEpGDgbKk1uHi2`,
                    },
                    // body: JSON.stringify({  }),
                });
                const newData = await response.json();

                // Format the new data to match candlestick chart's structure
                const formattedNewData = newData.map(([time, open, high, low, close]) => ({
                    time: Math.floor(time / 1000), // Ensure it's in seconds
                    open,
                    high,
                    low,
                    close,
                }));

                // Update chart with the last candle from the new data (only the latest candle)
                if (formattedNewData.length > 0) {
                    candlestickSeries.update(formattedNewData[formattedNewData.length - 1]);
                }
            } catch (error) {
                console.error('Error updating candlestick data:', error);
            }
        };

        const intervalId = setInterval(updateChart, 60000); // Update every 60 seconds
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [candlestickData]);

    // Resize the chart when the window resizes
    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                const chartContainer = document.getElementById('chart');
                if (chartContainer) {
                    chartRef.current.resize(chartContainer.clientWidth, 400); // Resize chart
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup on component unmount
        };
    }, []);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(2), 2000), // Second bead
        ];

        return () => timers.forEach(clearTimeout);
    }, []);
    console.log(user)

    return (
        <div className=''>
            <Topbar />
            <Hero />
            <div className='min-h-screen text-white'>
                <CardSection />
                <FaqSection />
            </div>
            <div className='text-black mt-40 min-h-screen'>
                <h1 className='text-center text-2xl mb-4'>Charts</h1>
                <select value={selectedToken} onChange={handleTokenChange}>
                    {tokenList.map((token) => (
                        <option key={token} value={token}>
                            {token.charAt(0).toUpperCase() + token.slice(1)}
                        </option>
                    ))}
                </select>

                {/* Candlestick chart */}
                <div id="chart" style={{ marginTop: '20px', width: '100%', height: '400px' }} className=' cursor-crosshair'></div>
            </div >
            <Footer />
        </div >
    )
}

export default Home