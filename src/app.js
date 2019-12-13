import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { addTestData } from "./redux/main";
import { setDisplayText } from "./redux/displayText";

export const App = props => {
  const [inputValue, setInputValue] = useState('');
  const displayValue = useSelector(state => state.displayText.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: addTestData, payload: 'farts'});
  }, [dispatch]);

  const onClick = () => {
    dispatch({type: setDisplayText, payload: inputValue});
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

export default App;
