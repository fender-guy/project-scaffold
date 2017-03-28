import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import './globalStyles/normalize.css';
import './globalStyles/glyphs.css';
import './global.scss';
import app from './components/app';

ReactDOM.render(React.createElement(app), document.getElementById('app-container'));

