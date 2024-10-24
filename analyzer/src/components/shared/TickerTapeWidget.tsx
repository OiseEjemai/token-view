import React, { useEffect } from 'react';

const TickerTapeWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "proName": "FOREXCOM:SPXUSD",
          "title": "S&P 500 Index"
        },
        {
          "proName": "FOREXCOM:NSXUSD",
          "title": "US 100 Cash CFD"
        },
        {
          "proName": "FX_IDC:EURUSD",
          "title": "EUR to USD"
        },
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "Bitcoin"
        },
        {
          "proName": "BITSTAMP:ETHUSD",
          "title": "Ethereum"
        }
      ],
      "showSymbolLogo": true,
      "isTransparent": true,
      "displayMode": "adaptive",
      "colorTheme": "light",
      "locale": "en"
    });

    const container = document.getElementById('tradingview-ticker-tape');
    if (container) {
      container.appendChild(script);
    }

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ''; // Clear the container
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview-ticker-tape" className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TickerTapeWidget;