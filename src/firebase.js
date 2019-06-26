import * as firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: process.env.firebaseAPI,
  authDomain: "todo-list-75666.firebaseapp.com",
  databaseURL: "https://todo-list-75666.firebaseio.com",
  projectId: "todo-list-75666",
  storageBucket: "",
  messagingSenderId: "871281844610",
  appId: "1:871281844610:web:37ba1df8d5df8835"
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
