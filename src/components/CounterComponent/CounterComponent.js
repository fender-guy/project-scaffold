import "./test-style.css";
import React from "react";

export default props => {
  const { incrementCounter, decrementCounter, clearCounter, counter } = props;

  return (
    <div className="counter-container">
      <h2>Counter</h2>
      <div>{props.counter}</div>
      <div className="button-container">
        <button onClick={incrementCounter.bind(this, 1)}>Increment</button>
        <button onClick={decrementCounter.bind(this, 1)}>Decrement</button>
        <button onClick={clearCounter}>Clear</button>
      </div>
    </div>
  );
};
