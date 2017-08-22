import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import './globalStyles/normalize.css';
import './globalStyles/glyphs.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './ducks';

const store = createStore(appReducer, {counter: 0});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-container')
);

