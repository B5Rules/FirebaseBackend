// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getFunctions,connectFunctionsEmulator} from "firebase/functions";
import {getAuth,connectAuthEmulator,onAuthStateChanged} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc8GTACXcWMILMmLk9-pUaWowtGHvPdo4",
  authDomain: "b5uberelectric-bacbb.firebaseapp.com",
  projectId: "b5uberelectric-bacbb",
  storageBucket: "b5uberelectric-bacbb.appspot.com",
  messagingSenderId: "1053866920657",
  appId: "1:1053866920657:web:1db10f617e6e7b639dd3f0"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const fireAuth = getAuth(fireApp);
const fireDB = getFirestore(fireApp);
const fireFunc = getFunctions(fireApp);

fireFunc.region = 'europe-west1';
connectFunctionsEmulator(fireFunc,'localhost',5001);

onAuthStateChanged(fireAuth, user => {
    if (user != null) {
      console.log('We are authenticated now!');
    }else{
        console.log('We are not authenticated now!');
    }
  
    // Do other things
  });

export { fireApp, fireAuth, fireDB, fireFunc };