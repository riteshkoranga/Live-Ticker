import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomDropdown from "./CustomDropdown";

const StockTicker = () => {
  const [tickers, setTopTwenTickers] = useState([]);
  const [error, setError] = useState(null);
  const [btcInr, setBTCINR] = useState();
  const [isConnected, setIsConnected] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  const handleConnectToggle = () => {
    setIsConnected((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          "https://livetickerbackend-production.up.railway.app/"
        );
        //removed localhost
        const data = response.data;
        console.log(data);

        const tickers = Object.values(data);

        const btcInr = tickers.find((ticker) => ticker.name === "BTC/INR");
        if (btcInr) {
          setBTCINR(btcInr.last);
        } else {
          console.log("BTC/INR ticker not found.");
        }
        //console.log(btcInr);

        setTopTwenTickers(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchStockData();

    // Set up polling (e.g., every 10 seconds)
    const intervalId = setInterval(fetchStockData, 10000); // 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  if (error)
    return (
      <div className="text-center font-mono mt-52 sm:mt-20 mt-16 text-gray-400 text-lg sm:text-xl md:text-2xl">
        Error fetching data: {error.message}
      </div>
    );
  if (tickers.length === 0)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-400 p-4 text-2xl sm:text-4xl font-mono">
          Loading...
        </div>
      </div>
    );

  return (
    <div className="p-3">
      <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-1">
        <div className="text-4xl font-medium text-center md:text-5xl text-cyan-600 font-raleway">
          Live Ticker
        </div>

        <div className="flex md:items-center text-base items-center justify-center space-x-3 ml-5">
          {/* Custom Dropdown for Currency */}
          <div className="mt-5">
            <CustomDropdown
              options={["INR", "USD"]}
              selected={selectedCurrency}
              onSelect={setSelectedCurrency}
            />
          </div>

          {/* Custom Dropdown for Crypto */}
          <div className="mt-5">
            <CustomDropdown
              options={["BTC", "ETH"]}
              selected={selectedCrypto}
              onSelect={setSelectedCrypto}
            />
          </div>

          {/* Buy Button */}
          <button className="bg-gray-700 p-2 rounded-2xl text-white font-sans text-base md:text-xl mb-1 mt-5">
            BUY {selectedCrypto}
          </button>
        </div>

        <div className="flex space-x-3 justify-end">
          {/* Connect Button */}
          <button className="flex bg-cyan-600 p-2 rounded-lg text-white font-raleway mb-7 text-xs ">
            Connect Telegram
          </button>

          {/* Sliding Toggle */}
          <label className="flex mt-2 text-sm">
            <input
              type="checkbox"
              className="hidden"
              checked={isConnected}
              onChange={handleConnectToggle}
            />
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                isConnected ? "bg-cyan-600" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  isConnected ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      <div className="text-center p-2 mt-3 sm:ml-0 md:ml-10 w-full text-gray-500 font-mono text-base md:text-sm">
        Best Price To Trade
      </div>
      <div className="text-center px-2 text-3xl sm:ml-0 md:ml-10 w-full sm:text-4xl md:text-5xl text-white font-thin">
        <h1>
          {btcInr ? (
            <p>
              &#8377;{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
              }).format(btcInr)}
            </p>
          ) : (
            <p className="font-thin text-white text-base">Loading...</p>
          )}
        </h1>
      </div>
      <h4 className="text-center p-4 text-xs sm:ml-0 md:ml-10 w-full sm:text-xs md:text-sm text-gray-400 font-thin">
        Average BTC/INR price new including commission
      </h4>

      <div className="flex justify-center min-h-screen p-4">
        <ul className="w-full max-w-7xl bg-inherit shadow-lg rounded-lg">
          <li className="bg-inherit text-gray-500 p-4 rounded-t-lg flex flex-items font-raleway space-x-1 -mb-1">
            <span className="w-1/12 text-center text-sm md:text-xl">#</span>
            <span className="w-3/12 text-sm md:text-xl text-center">Name</span>
            <span className="w-2/5 text-sm md:text-xl text-center">
              Last Traded Price
            </span>
            <span className="w-3/6 text-sm md:text-xl text-center">
              High / Low Price
            </span>
            <span className="w-3/12 text-sm md:text-xl text-center">
              Difference
            </span>
          </li>
          {tickers.map((ticker, index) => (
            <li
              key={index}
              className="bg-gray-700 hover:bg-gray-800 rounded-lg my-1 md:my-2 p-4 flex items-center text-white text-xs md:text-xl group"
            >
              <span className="w-1/12 text-center font-thin group-hover:font-light">
                {index + 1}
              </span>
              <span className="w-3/12 text-center font-light group-hover:font-light">
                {ticker.name}
              </span>
              <span className="w-2/5 text-center font-thin group-hover:font-light">
                &#8377;{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 2,
                }).format(ticker.last)}
              </span>
              <span className="w-3/6 text-center font-thin group-hover:font-light">
                &#8377;{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 3,
                }).format(ticker.high)}
                {"  "} / &#8377;{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 3,
                }).format(ticker.low)}
              </span>
              <span
                className={`w-3/12 text-center font-thin group-hover:font-light ${
                  ticker.low > 0
                    ? (((ticker.high - ticker.low) / ticker.low) * 100).toFixed(
                        2
                      ) >= 0
                      ? "text-green-400"
                      : "text-red-700"
                    : "text-gray-500"
                }`}
              >
                {ticker.low > 0
                  ? (((ticker.high - ticker.low) / ticker.low) * 100).toFixed(2)
                  : 0}{" "}
                %
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockTicker;
