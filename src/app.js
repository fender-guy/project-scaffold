import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { connect, useSelector } from "react-redux";
import "./App.css";
import { addTestData } from "./redux/main";
import { setDisplayText } from "./redux/displayText";

export const App = props => {
  const [inputValue, setInputValue] = useState('');
  const displayValue = useSelector(state => state.displayText.value);
  const testData = useSelector(state => state.main.test);

  useEffect(() => {
    props.addTestData('test action text');
  }, [testData]);

  const onClick = () => {
    props.setDisplayText(inputValue);
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input onChange={onChange} value={inputValue} />
        <button onClick={onClick}>Press</button>
        <div>{displayValue}</div>
      </header>
    </div>
  );
};

export default connect(() => ({}), { addTestData, setDisplayText })(App);
