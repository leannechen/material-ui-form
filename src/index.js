import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer'
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import App from './App';
import './services/firebase';

const middlewares = (process.env.NODE_ENV === "development")? [thunk, logger]: [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
