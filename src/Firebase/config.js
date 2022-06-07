import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC6PTDN954l_AUgYu8IRQxbFYxCjD9oHtU",
    authDomain: "proyectofinal-redsocial.firebaseapp.com",
    projectId: "proyectofinal-redsocial",
    storageBucket: "proyectofinal-redsocial.appspot.com",
    messagingSenderId: "615920974377",
    appId: "1:615920974377:web:040d8cc1a0615467163a38"
  };


app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();