import React, { useState, useEffect, useRef, useCallback } from 'react'
import Topbar from '../components/shared/Topbar'
import { createChart } from 'lightweight-charts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { type ChartConfig } from "../components/ui/chart"
import Footer from '../components/shared/Footer';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"
import { Bitcoin, LucideHandCoins } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"

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

    useEffect(() => {
        const fetchCandlestickData = async () => {
            try {
                const response = await fetch(`/api/coins/${selectedToken}/ohlc?vs_currency=usd&days=365&precision=full`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'x-cg-demo-api-key': 'CG-jrxuRfEAobyEpGDgbKk1uHi2'
                    },
                    // body: JSON.stringify({  }),
                });
                // Fetch OHLC data for the past 30 days (example timeframe)
                // const response = await fetch(
                //     `/api/coins/${selectedToken}/ohlc?vs_currency=usd&days=365&precision=full`,
                //     {
                //         headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-jrxuRfEAobyEpGDgbKk1uHi2' }
                //     }
                // );
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
                const response = await fetch(`/api/coins/${selectedToken}/ohlc?vs_currency=usd&days=365&precision=full`, {
                    method: "GET",
                    headers: {
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

    return (
        <div className=''>
            <Topbar />
            <div className='flex flex-row items-center  min-h-[40rem] text-white justify-center'>
                <div className='text-center order-2 mb-32'>
                    <h1 className='text-3xl animate-fadeInRight'>What are you buying today?</h1>
                    <p className='mt-3 animate-fadeInLeft'>Don't worry, we got you covered.</p>
                </div>
                <Bitcoin className='w-32 mb-32 h-32 animate-moveUpAndDown order-1' />
                <LucideHandCoins className='w-32 mb-32 h-32 animate-moveUpAndDown m-4 order-3' />
            </div>
            <div className='min-h-screen text-white'>
                <h1 className='text-center text-2xl mb-4'>Services</h1>
                <div className='grid grid-cols-3 justify-center items-center'>
                    <Card className='m-4 bg-black text-white'>
                        <CardHeader>
                            <CardTitle className='text-center'>Get Information about your favorite token</CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                        </CardContent>
                    </Card>
                    <Card className='m-4 bg-black text-white'>
                        <CardHeader>
                            <CardTitle className='text-center'>What tokens to invest in?</CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                        </CardContent>
                    </Card>
                    <Card className='m-4 bg-black text-white'>
                        <CardHeader>
                            <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                        </CardContent>
                    </Card>
                    <Card className='m-4 bg-black text-white'>
                        <CardHeader>
                            <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                        </CardContent>
                    </Card>
                    <Card className='m-4 bg-black text-white'>
                        <CardHeader>
                            <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                        </CardContent>
                    </Card>
                    <Card className='m-4 bg-black text-white'>
                        <CardHeader>
                            <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                        </CardContent>
                    </Card>
                </div>
                <div className='flex flex-col mt-40 ml-5 mr-5'>
                    <h1 className='text-center text-2xl'>FAQ</h1>
                    <Accordion type="single" className='' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is registration fee?</AccordionTrigger>
                            <AccordionContent>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, at.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Do I need to connect my wallet</AccordionTrigger>
                            <AccordionContent>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Do I need to complete my KYC</AccordionTrigger>
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
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
                            <AccordionContent>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
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