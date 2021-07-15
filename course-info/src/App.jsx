import React, { useState } from "react";
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;
  const allClicks = [good, neutral, bad];
  const average = allClicks.reduce((acc, curr) => acc + curr, 0) / allClicks.length;
  const positive = good === 0 ? 0 : (good * 100) / allClicks.reduce((acc, curr) => acc + curr, 0) + '%';


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        Good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        Bad
      </button>
      <h1>Statistics</h1>
      <div className="grid">
        <span>Good</span>{good} <br />
        <span>Neutral</span>{neutral} <br />
        <span>Bad</span>{bad} <br />
        <span>All Feedback</span> {total}<br />
        <span>Average</span>{average} <br />
        <span>Positive</span>{positive} <br />
      </div>
    </div>
  );
};
export default App