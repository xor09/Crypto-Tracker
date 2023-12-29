import React, { useState, useEffect } from "react";
import "./Home.css";


// Function to simulate real-time updates with random bid and ask prices
const simulateRealTimeUpdate = (symbol) => ({
  s: symbol,
  b: (Math.random() * 100).toFixed(2), // Random bid price
  a: (Math.random() * 100).toFixed(2), // Random ask price
});



function Home() {
  const [symbolInput, setSymbolInput] = useState("");
  const [marketWatchList, setMarketWatchList] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate real-time updates for each subscribed symbol
      setMarketWatchList((prevList) =>
        prevList.map((symbolObj) => simulateRealTimeUpdate(symbolObj.s))
      );
    }, 2000); // Update every 2 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const subscribeToSymbol = () => {
    const symbol = symbolInput.trim().toUpperCase();

    // Add the subscribed symbol as an object to the market watch list
    setMarketWatchList((prevList) => [
      ...prevList,
      simulateRealTimeUpdate(symbol),
    ]);

    // Clear input field
    setSymbolInput("");
  };

  return (
    <div>
      <h1>Crypto Tracker</h1>
      <input
        type="text"
        value={symbolInput}
        onChange={(e) => setSymbolInput(e.target.value)}
        placeholder="Enter symbol"
      />
      <button onClick={subscribeToSymbol}>Subscribe</button>

      <div>
        {marketWatchList.map((data) => (
          <div
            key={data.s}
          >{`${data.s}: Bid - ${data.b}, Ask - ${data.a}`}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
