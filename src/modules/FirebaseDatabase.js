import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAsa5TSY1DC7bTQBtDFCkIS7sIhwkAwK_U",
  authDomain: "gard-character-generator.firebaseapp.com",
  databaseURL: "https://gard-character-generator-default-rtdb.firebaseio.com",
  projectId: "gard-character-generator",
  storageBucket: "gard-character-generator.appspot.com",
  messagingSenderId: "749863203561",
  appId: "1:749863203561:web:553ba233aa05ec033d7678",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db;