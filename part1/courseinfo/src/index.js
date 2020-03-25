import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  const avg = (1 * good + 0 * neutral + -1 * bad) / (good + neutral + bad);
  const positive = good / (good + neutral + bad);

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good + neutral + bad}</p>
      <p>Average: {avg ? avg : 0}</p>
      <p>Positive: {(positive ? positive : 0) * 100} %</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Statistics good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
