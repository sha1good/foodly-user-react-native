// firebase setup

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5fSPRFJp8sLgH1AGJs3qH3na-6G5ySnA",
    authDomain: "flutterfirebaseapp-ebda0.firebaseapp.com",
    projectId: "flutterfirebaseapp-ebda0",
    storageBucket: "flutterfirebaseapp-ebda0.appspot.com",
    messagingSenderId: "929918087583",
    appId: "1:929918087583:web:5eeb2e9347cc7260348daa",
    measurementId: "G-B33KZ8LNEW"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};