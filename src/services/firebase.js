import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
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
firebase.analytics();

const db = firebase.firestore();
console.log(db); // ensures db is alive
const storageRef = firebase.storage().ref();
console.log(storageRef)

export {
  db,
  storageRef,
};


// db.collection("users").add({
//   first: "Betty",
//   last: "Moon",
//   born: 1926
// })
//   .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//     console.error("Error adding document: ", error);
//   });
