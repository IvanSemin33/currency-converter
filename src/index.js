//////////////////////////////////////
///               Index            ///
//////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App.js';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';


ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
serviceWorker.unregister();