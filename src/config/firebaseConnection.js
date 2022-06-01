import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyC3vZRzaRV1hPipQO6U_w43hqrB9uC6aMs",
  authDomain: "appfinancas-1c2b9.firebaseapp.com",
  projectId: "appfinancas-1c2b9",
  storageBucket: "appfinancas-1c2b9.appspot.com",
  messagingSenderId: "366357107721",
  appId: "1:366357107721:web:b8cd232a4db341a17e94d8",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
