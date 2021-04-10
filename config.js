import firebase from 'firebase'
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyCctsI7cIZ-Yj5rffc6_neM49oclG_o9LU",
    authDomain: "book-santa-87be0.firebaseapp.com",
    projectId: "book-santa-87be0",
    storageBucket: "book-santa-87be0.appspot.com",
    messagingSenderId: "576040079928",
    appId: "1:576040079928:web:4f70b12bd5269cca15cccd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();