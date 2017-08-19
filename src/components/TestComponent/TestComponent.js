import './test-style.css';
import React from 'react';

export default (props) => {
    return (
        <div className="counter-container">
            <h2>Counter</h2>
            <div>{props.counter}</div>
            <div className="button-container">
                <button>Increment</button>
                <button>Decrement</button>
                <button>Clear</button>
            </div>
        </div>
    );
};