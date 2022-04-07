import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

const requireSignIn = document.getElementsByClassName('requireSignIn');
const requireSignOut = document.getElementsByClassName('requireSignOut');
onAuthStateChanged(auth,async function(user){    
    //if user is signed in, show the sign out button and the other signed-in-only elements
    if(!!auth.currentUser){
        for(let element of requireSignIn){element.classList.remove('w3-hide');}
        for(let element of requireSignOut){element.classList.add('w3-hide');}
        if(!auth.currentUser.emailVerified){
            document.getElementById('btnSendVerificationEmail').classList.remove('w3-hide');
        }else{
            document.getElementById('btnSendVerificationEmail').classList.add('w3-hide');
        }
        let docs = await getDocs(query(collection(db, 'userdata'), where('uid', '==', user.uid)));
        if(docs.size===0){
            document.getElementById('setupProfileForm').classList.remove('w3-hide');
        }else{
            document.getElementById('profileInfoUsername').innerHTML = docs.docs[0].data()['username'];
            document.getElementById('profileInfoEmail').innerHTML = docs.docs[0].data()['email'];
            document.getElementById('profileInfoPhone').innerHTML = docs.docs[0].data()['phone'];
            document.getElementById('profileInfoFirstName').innerHTML = docs.docs[0].data()['fName'];
            document.getElementById('profileInfoLastName').innerHTML = docs.docs[0].data()['lName'];
            document.getElementById('profileInfoCountry').innerHTML = docs.docs[0].data()['country'];
            document.getElementById('profileInfo').classList.remove('w3-hide');
        }
    }else{
        for(let element of requireSignIn){element.classList.add('w3-hide');}
        for(let element of requireSignOut){element.classList.remove('w3-hide');}
    }
});

