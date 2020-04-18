import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all || 0;
  const positive = (good / all) * 100 || 0;
  return (
    <>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);

  const handleNeutralClick = () => setNeutral(neutral + 1);

  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
