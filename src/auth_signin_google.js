import { deleteUser, getAuth,GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth";
import { getDocs,collection,query,where,getFirestore,setDoc,doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const app = initializeApp({
    apiKey: "AIzaSyDc8GTACXcWMILMmLk9-pUaWowtGHvPdo4",
    authDomain: "b5uberelectric-bacbb.firebaseapp.com",
    projectId: "b5uberelectric-bacbb",
    storageBucket: "b5uberelectric-bacbb.appspot.com",
    messagingSenderId: "1053866920657",
    appId: "1:1053866920657:web:1db10f617e6e7b639dd3f0"
});
const auth = getAuth();
const db = getFirestore(app);
const gAuthProvider = new GoogleAuthProvider();

document.getElementById('btnGoogleSignIn').onclick = async function() {
    signInWithPopup(auth,gAuthProvider);
}