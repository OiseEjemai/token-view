import React from 'react'

function KeyFeatures() {
  return (
    <div>
      <main>
        <div className="content">
        {/* <h1 className='text-center'>Key Features</h1> */}
          <div className="tiles">
            <div className="tile" style={{ '--r': '45deg' } as React.CSSProperties}></div>
            <div className="tile" style={{ '--r': '275deg' } as React.CSSProperties}></div>
            <div className="tile" style={{ '--r': '190deg' } as React.CSSProperties}></div>
            <div className="tile" style={{ '--r': '45deg' } as React.CSSProperties}></div>
          </div>

          <section className="section--one">
            <article>
              <div className="title-wrap">
                <h2>Comprehensive Token Search.</h2>
              </div>
              <hr />
              <div className="content-wrap">
                <p>
                Quickly and easily search for any cryptocurrency token using its name and access detailed information on market cap, price, volume, and more
                </p>
              </div>
            </article>

            <article>
              <div className="title-wrap">
                <h2>User-Friendly Interface</h2>
              </div>
              <hr />
              <div className="content-wrap">
                <p>
                Intuitive navigation and clean layout for a seamless user experience. Responsive design optimized for both desktop and mobile devices.
                </p>
              </div>
            </article>

            <article>
              <div className="title-wrap">
                <h2>Trading Simulator</h2>
              </div>
              <hr />
              <div className="content-wrap">
                <p>
                Test your trading strategies with a simulated trading environment. Learn how to trade without financial risk through virtual currency.
                </p>
              </div>
            </article>

            <article>
              <div className="title-wrap">
                <h2>Educational Resources</h2>
              </div>
              <hr />
              <div className="content-wrap">
                <p>
                Access guides and tutorials on cryptocurrency trading and investment.
                </p>
              </div>
            </article>
          </section>
        </div>
        <section className="section--two"></section>
        <section className="section--three"></section>
        <section className="section--four"></section>
      </main>
    </div>
  )
}

export default KeyFeatures
