// // import React, { useState, useEffect, useRef } from 'react';
// // import { createChart } from 'lightweight-charts';

// // // Token list
// // const tokenList = ['bitcoin', 'ethereum', 'litecoin']; // Add more tokens as needed

// // function TokenChart() {
// //   const [selectedToken, setSelectedToken] = useState(tokenList[0]); // Default token
// //   const [candlestickData, setCandlestickData] = useState([]); // Candlestick data
// //   const chartRef = useRef<any>(null); // Ref for the chart instance

// //   const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// //     setSelectedToken(event.target.value);
// //   };

// //   useEffect(() => {
// //     const fetchCandlestickData = async () => {
// //       try {
// //         // Fetch OHLC data for the past 30 days (example timeframe)
// //         const response = await fetch(
// //           `/api/coins/${selectedToken}/ohlc?vs_currency=usd&days=30`
// //         );
// //         const data = await response.json();

// //         // Format data to the required structure for the chart
// //         const formattedData = data.map(([time, open, high, low, close]) => ({
// //           time: Math.floor(time / 1000), // Convert milliseconds to seconds
// //           open,
// //           high,
// //           low,
// //           close,
// //         }));
// //         setCandlestickData(formattedData); // Store data in state
// //       } catch (error) {
// //         console.error('Error fetching candlestick data:', error);
// //       }
// //     };

// //     fetchCandlestickData();
// //   }, [selectedToken]);

// //   useEffect(() => {
// //     if (candlestickData.length === 0) return;

// //     const chartContainer = document.getElementById('chart');
// //     if (!chartContainer) return;

// //     // Clear the chart container if a chart already exists (for token switching)
// //     chartContainer.innerHTML = '';

// //     // Create the chart and set its dimensions
// //     const chart = createChart(chartContainer, {
// //       width: chartContainer.clientWidth,
// //       height: 400,
// //     });
// //     chartRef.current = chart; // Store chart instance in ref for resizing later

// //     // Add candlestick series to the chart
// //     const candlestickSeries = chart.addCandlestickSeries();

// //     // Set the data for the candlestick series
// //     candlestickSeries.setData(candlestickData);

// //     // Update chart with new data (for live updates)
// //     const updateChart = async () => {
// //       try {
// //         const response = await fetch(
// //           `/api/coins/${selectedToken}/ohlc?vs_currency=usd&days=1`
// //         );
// //         const newData = await response.json();

// //         // Format the new data to match candlestick chart's structure
// //         const formattedNewData = newData.map(([time, open, high, low, close]) => ({
// //           time: Math.floor(time / 1000), // Ensure it's in seconds
// //           open,
// //           high,
// //           low,
// //           close,
// //         }));

// //         // Update chart with the last candle from the new data (only the latest candle)
// //         if (formattedNewData.length > 0) {
// //           candlestickSeries.update(formattedNewData[formattedNewData.length - 1]);
// //         }
// //       } catch (error) {
// //         console.error('Error updating candlestick data:', error);
// //       }
// //     };

// //     const intervalId = setInterval(updateChart, 60000); // Update every 60 seconds
// //     return () => clearInterval(intervalId); // Cleanup on component unmount
// //   }, [candlestickData]);

// //   // Resize the chart when the window resizes
// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (chartRef.current) {
// //         const chartContainer = document.getElementById('chart');
// //         if (chartContainer) {
// //           chartRef.current.resize(chartContainer.clientWidth, 400); // Resize chart
// //         }
// //       }
// //     };

// //     window.addEventListener('resize', handleResize);

// //     return () => {
// //       window.removeEventListener('resize', handleResize); // Cleanup on component unmount
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Select a Token</h1>
// //       {/* Token selection dropdown */}
// //       <select value={selectedToken} onChange={handleTokenChange}>
// //         {tokenList.map((token) => (
// //           <option key={token} value={token}>
// //             {token.charAt(0).toUpperCase() + token.slice(1)}
// //           </option>
// //         ))}
// //       </select>

// //       {/* Candlestick chart */}
// //       <div id="chart" style={{ marginTop: '20px', width: '100%', height: '400px' }}></div>
// //     </div>
// //   );
// // }

// // export default TokenChart;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Trading = () => {
//   const [type, setType] = useState('buy');
//   const [lotSize, setLotSize] = useState(1);
//   const [symbol, setSymbol] = useState('EURUSD');
//   const [price, setPrice] = useState('');

//   const handleOrderSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/backend/users/place-order', {
//         type,
//         lotSize,
//         symbol,
//         price,
//       });

//       alert(`Order placed: ${response.data.message}`);
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Failed to place order');
//     }
//   };

//   return (
//     <div>
//       <h2>Place an Order</h2>
//       <form onSubmit={handleOrderSubmit}>
//         <label>
//           Order Type:
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="buy">Buy</option>
//             <option value="sell">Sell</option>
//           </select>
//         </label>

//         <label>
//           Symbol:
//           <input
//             type="text"
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//             placeholder="EURUSD, GBPUSD, etc."
//           />
//         </label>

//         <label>
//           Lot Size:
//           <input
//             type="number"
//             value={lotSize}
//             onChange={(e) => setLotSize(Number(e.target.value))}
//           />
//         </label>

//         <label>
//           Price:
//           <input
//             type="text"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             placeholder="Enter price for the trade"
//           />
//         </label>

//         <button type="submit">Place Order</button>
//       </form>
//     </div>
//   );
// };

// export default Trading;

import React from 'react'

function Trading() {
  return (
    <div>
      hello
    </div>
  )
}

export default Trading
