import {collection, setDoc, getDocs, getFirestore, query, where, doc} from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';

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
const functions = getFunctions(app);

functions.region = "europe-west1";

const insertProfile = httpsCallable(functions,'insertProfile');
connectFunctionsEmulator(functions, "localhost", 5001);

document.getElementById('btnSubmitProfile').onclick = async function() {
    if(!!auth.currentUser){
        let username = document.getElementById('signUpFieldUser').value;
        let phone = document.getElementById('signUpFieldPhone').value;
        let fName = document.getElementById('signUpFieldFirstName').value;
        let country = document.getElementById('signUpFieldCountry').value;
        let lName = document.getElementById('signUpFieldLastName').value;

        //todo use regex matching server-side to santize the above fields
        //todo use Google Cloud Function as intermediary to ensure users can only change their own profile
        /* steps:
        sent request to cloud function with the needed data in a post request
        cloud function will check if the to-be-changed data belongs to the requesting user
        cloud function will do regex matching to ensure the data is valid
        */
        
        let response = await insertProfile({
            username: username,
            lName: lName,
            fName: fName,
            country: country,
            phone: phone
        }).catch((error) => {
            console.log(error);
        });
        if(response.data.status === 0){
            alert('Profile successfully updated!');
            document.getElementById('setupProfileForm').classList.add('w3-hide');
        }else{
            alert(response.data.message);
        }
    }
};