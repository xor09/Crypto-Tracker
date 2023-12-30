import React, { useState, useEffect } from "react";
import "./Home.css";


// Function to simulate real-time updates with random bid and ask prices
const simulateRealTimeUpdate = (symbol) => ({
  s: symbol,
  b: (Math.random() * 100).toFixed(2), // Random bid price
  a: (Math.random() * 100).toFixed(2), // Random ask price
});


const subscribeToSymbol = (symbolInput, setMarketWatchList, setSymbolInput, marketWatchList) => {
  const symbol = symbolInput.trim().toUpperCase();
  //check if symbol is already subscribed
  if (marketWatchList.some((item) => item.s === symbol)) {
    window.alert(`${symbol} is already subscribed.`);
    return;
  }
  setMarketWatchList((prevList) => [...prevList, simulateRealTimeUpdate(symbol)]);
  setSymbolInput("");
};


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

  return (
    <div>
      <h1>Crypto Tracker</h1>
      <input
        type="text"
        value={symbolInput}
        onChange={(e) => setSymbolInput(e.target.value)}
        placeholder="Enter symbol"
      />
      <button onClick={() => subscribeToSymbol(symbolInput, setMarketWatchList, setSymbolInput, marketWatchList)}>Subscribe</button>

       <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Bid</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>
          {marketWatchList.map((data) => (
            <tr key={data.s}>
              <td>{data.s}</td>
              <td>{data.b}</td>
              <td>{data.a}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
