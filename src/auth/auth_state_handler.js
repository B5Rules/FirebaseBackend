import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'
import { initializeApp } from 'firebase/app';

const app = initializeApp({
    apiKey: "AIzaSyDc8GTACXcWMILMmLk9-pUaWowtGHvPdo4",
    authDomain: "b5uberelectric-bacbb.firebaseapp.com",
    projectId: "b5uberelectric-bacbb",
    storageBucket: "b5uberelectric-bacbb.appspot.com",
    messagingSenderId: "1053866920657",
    appId: "1:1053866920657:web:1db10f617e6e7b639dd3f0"
});
const functions = getFunctions(app);
const auth = getAuth();

functions.region = "europe-west1";
connectFunctionsEmulator(functions,'localhost',5001);
const queryEmail = httpsCallable(functions,'queryEmail');
const getProfileData = httpsCallable(functions,'getProfileData');


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
        let response = await queryEmail({email:auth.currentUser.email});
        if(response.data['result'] === 0){
            document.getElementById('setupProfileForm').classList.remove('w3-hide');
            document.getElementById('profileInfo').classList.add('w3-hide');
        }else{
            let profileData = await getProfileData({email:auth.currentUser.email});
            document.getElementById('profileInfoUsername').innerHTML = profileData.data['result']['username'];
            document.getElementById('profileInfoEmail').innerHTML = profileData.data['result'].email;
            document.getElementById('profileInfoPhone').innerHTML = profileData.data['result']['phone'];
            document.getElementById('profileInfoFirstName').innerHTML = profileData.data['result']['fName'];
            document.getElementById('profileInfoLastName').innerHTML = profileData.data['result']['lName'];
            document.getElementById('profileInfoCountry').innerHTML = profileData.data['result']['country'];
            document.getElementById('profileInfo').classList.remove('w3-hide');
        }
    }else{
        for(let element of requireSignIn){element.classList.add('w3-hide');}
        for(let element of requireSignOut){element.classList.remove('w3-hide');}
    }
});

