import React from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';
import './globalStyles/normalize.css';
import './globalStyles/glyphs.css';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import appReducer from './ducks';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    counter: 0,
    dogs: 'bark'
});

const store = createStore(
    appReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-container')
);

