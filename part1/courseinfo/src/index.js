import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, value, fn }) => {
  return <button onClick={() => fn(value + 1)}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  switch (text) {
    case "good":
      return <p>Good: {value}</p>;
    case "neutral":
      return <p>Neutral: {value}</p>;
    case "bad":
      return <p>Bad: {value}</p>;
    case "all":
      return <p>All: {value}</p>;
    case "average":
      return <p>Average: {value}</p>;
    case "positive":
      return <p>Positive: {value} %</p>;
    default:
      return null;
  }
};

const Statistics = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  const avg = (1 * good + 0 * neutral + -1 * bad) / (good + neutral + bad);
  const positive = good / (good + neutral + bad);

  return (
    <>
      <h1>Give feedback</h1>
      <Button />
      <Button text={"Good"} value={good} fn={setGood} />
      <Button text={"Neutral"} value={neutral} fn={setNeutral} />
      <Button text={"Bad"} value={bad} fn={setBad} />
      <h1>Statistics</h1>
      {good + neutral + bad > 0 ? (
        <div>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={avg ? avg : 0} />
          <Statistic text="positive" value={(positive ? positive : 0) * 100} />
        </div>
      ) : (
        <p>No feedback given</p>
      )}
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
