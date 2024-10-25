import React, { useEffect, useRef } from 'react';
import Topbar from '../components/shared/Topbar';

function Trading() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear the container before appending the script to avoid duplication
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Use JSON.stringify to ensure the object structure is parsed correctly
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "COINBASE:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

    containerRef.current.appendChild(script);
  }, []);

  return (
   <div>
    <Topbar />
     <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh', // Makes the chart taller
        maxWidth: '100vw', // Responsive width for small screens
      }}
    >
      {/* Container for the TradingView chart */}
      <div id="tradingview_chart" style={{ width: '100%', height: '100%' }} />
    </div>
   </div>
  );
}

export default Trading;