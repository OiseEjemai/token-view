// import React, { useState } from 'react'
// import Topbar from '../components/shared/Topbar'

// function Trading() {
//   const [orderResponse, setOrderResponse] = useState(null);
//   const handleTrade = async (side) => {
//     try {
//       const response = await fetch('http://localhost:5500/api/trade', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           symbol: 'tBTCUSD',
//           amount: '0.01',
//           side: side, // 'buy' or 'sell'
//         }),
//       });

//       const data = await response.json();
//       setOrderResponse(data);
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div>
//       <Topbar />
//       <div className="app-container  text-white min-h-screen flex flex-col items-center justify-center font-mono">
//       <div>
//       <h1>Place a Trade</h1>
//       <button onClick={() => handleTrade('buy')}>Buy</button>
//       <button onClick={() => handleTrade('sell')}>Sell</button>
//       {orderResponse && <p>Order Response: {JSON.stringify(orderResponse)}</p>}
//     </div>
//       </div>
//     </div>
//   )
// }

// export default Trading'


// src/components/Trade.js
import React, { useState, useEffect } from 'react';
import Topbar from '../components/shared/Topbar';
import Footer from '../components/shared/Footer';

const Trading = () => {
  const [orderResponse, setOrderResponse] = useState(null);

  const TradingViewChart = () => {
    useEffect(() => {
      new window.TradingView.widget({
        container_id: 'tradingview-chart',
        width: '100%',
        height: 500,
        symbol: 'BITFINEX:BTCUSD',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        studies: ['MACD@tv-basicstudies'],
      });
    }, []);
  };

  const handleTrade = async (side) => {
    try {
      const response = await fetch('http://localhost:5500/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: 'tBTCUSD',
          amount: '0.01',
          side: side, // 'buy' or 'sell'
        }),
      });

      const data = await response.json();
      setOrderResponse(data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      {/* <div id="tradingview-chart"></div>;
      <h1>Place a Trade</h1>
      <button onClick={() => handleTrade('buy')}>Buy</button>
      <button onClick={() => handleTrade('sell')}>Sell</button>
      {orderResponse && <p>Order Response: {JSON.stringify(orderResponse)}</p>} */}
      <Topbar />
      <div className="app-container text-dark-1 min-h-screen flex flex-col items-center justify-center font-mono">
        <div className=' flex-wrap'>
          <h1 className='text-7xl text-center'>Coming Soon!</h1>
          <h3 className='text-center mt-8 text-3xl'>Nothing to see here</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Trading;
