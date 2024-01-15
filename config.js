// firebase setup

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFsKy2oSNB-bJvLAfIpnvtO3sPZa3sQ78",
  authDomain: "foodly-flutter-dc94b.firebaseapp.com",
  databaseURL: "https://foodly-flutter-dc94b-default-rtdb.firebaseio.com",
  projectId: "foodly-flutter-dc94b",
  storageBucket: "foodly-flutter-dc94b.appspot.com",
  messagingSenderId: "1057984911405",
  appId: "1:1057984911405:web:69dca833eb24ea0794c0a4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };