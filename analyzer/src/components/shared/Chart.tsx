import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createChart } from 'lightweight-charts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"


const tokenList = ['bitcoin', 'ethereum', 'litecoin']; // Add more tokens as needed


function Chart() {
    const [selectedToken, setSelectedToken] = useState(tokenList[0]); // Default token
    const [candlestickData, setCandlestickData] = useState([]); // Candlestick data
    const chartRef = useRef<any>(null); // Ref for the chart instance


    const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedToken(event.target.value);
    };

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
                backgroundColor: '#ffffff', // Set background to white
                textColor: '#000000', // Set text color to black
            },
            grid: {
                vertLines: {
                    visible: false, // Remove vertical grid lines
                },
                horzLines: {
                    visible: false, // Remove horizontal grid lines (optional)
                },
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
    return (
        <div className='text-black mt-40 min-h-screen'>
            <h1 className='text-center text-2xl mb-4'>Charts</h1>
            <select value={selectedToken} className='bg-b' onChange={handleTokenChange}>
                {tokenList.map((token) => (
                    <option key={token} value={token}>
                        {token.charAt(0).toUpperCase() + token.slice(1)}
                    </option>
                ))}
            </select>

            {/* Candlestick chart */}
            <div id="chart" style={{ marginTop: '20px', width: '100%', height: '400px' }} className=' cursor-crosshair'></div>
        </div >
    )
}

export default Chart
