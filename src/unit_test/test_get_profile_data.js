import {collection, deleteDoc, doc, getDoc, getFirestore, where} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions";

const app = initializeApp({
    apiKey: "AIzaSyDc8GTACXcWMILMmLk9-pUaWowtGHvPdo4",
    authDomain: "b5uberelectric-bacbb.firebaseapp.com",
    projectId: "b5uberelectric-bacbb",
    storageBucket: "b5uberelectric-bacbb.appspot.com",
    messagingSenderId: "1053866920657",
    appId: "1:1053866920657:web:1db10f617e6e7b639dd3f0"
});

const functions = getFunctions(app);
const db = getFirestore(app);

functions.region = "europe-west1";
connectFunctionsEmulator(functions, "localhost", 5001);
const getProfileData = httpsCallable(functions,'getProfileData');
const insertProfile = httpsCallable(functions,'insertProfile');

const testGetProfileData = async function() {
    //insert dummy profile via firestore
    await insertProfile({
        username: 'profiledatatestuser1',
        lName: 'lName',
        fName: 'fName',
        country: 'Italy',
        phone: '00000',
        email: 'profiledatatestuser1@mail.fr',
        uid: 'profiledatatestuid1'
    }).catch((error) => {
        console.log(error);
    });
    
    //no1
    await getProfileData({uid: 'profiledatatestuid1'}).then((response) => {
        if(response.data['result'] == 0){
            //retrieval failed; test failed
            console.log('getProfileData test no1: "retrieval failed" failure');
        }else{
            //retrieval successful; test successful
            console.log('getProfileData test no1: "retrieval successful" succesful');
        }
   
    });
    
    //no2
    await getProfileData({uid: 'profiledatatestuid2'}).then((response) => {
        if(response.data['result'] == 0){
            //retrieval failed; test successful
            console.log('getProfileData test no2: "retrieval failed" succesful');
        }else{
            //retrieval successful; test failed
            console.log('getProfileData test no2: "retrieval failed" failure');
        }
    });
    deleteDoc(doc(db,'userdata','profiledatatestuid1'));
}

export default testGetProfileData;