import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './reducer'
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import App from './App';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBUi0u5mVd1uG-idaAXJ8RceIcnj9fTQeI",
  authDomain: "glints-fc0aa.firebaseapp.com",
  databaseURL: "https://glints-fc0aa.firebaseio.com",
  projectId: "glints-fc0aa",
  storageBucket: "glints-fc0aa.appspot.com",
  messagingSenderId: "1039630462647",
  appId: "1:1039630462647:web:e14fc1e73fc7a0dc58e732",
  measurementId: "G-6TD15L5M2F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("firebase: ");
console.log(firebase);
firebase.analytics();


var db = firebase.firestore();

db.collection("users").add({
  first: "Betty",
  last: "Moon",
  born: 1926
})
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
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
