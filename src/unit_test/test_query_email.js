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
const queryEmail = httpsCallable(functions,'queryEmail');
const insertProfile = httpsCallable(functions,'insertProfile');

const testQueryEmail = async function(){
    //add dummy user account
    await insertProfile({
        username: 'emailquerytestuser1',
        lName: 'lName',
        fName: 'fName',
        country: 'Italy',
        phone: '00000',
        email: 'emailquerytestuser1@mail.fr',
        uid: 'emailquerytestuid1'
    });
    
    //no1 
    await queryEmail({
        email: 'emailquerytestuser1@mail.fr'
    }).then((response) => {
        if(response.data['result'] !== 0){
            //query successful; test successful
            console.log('queryEmail test no1: "query successful" succesful');
        }else{
            //query failed; test failed
            console.log('queryEmail test no1: "query failed" failure');
        }
    });

    //no2
    await queryEmail({
        email: 'emailquerytestuser2@mail.fr'
    }).then((response) => {
        if(response.data['result'] !== 0){
            //query successful; test failed
            console.log('queryEmail test no2: "query successful" failure');
        }else{
            //query failed; test successful
            console.log('queryEmail test no2: "query failed" succesful');
        }
    });
    deleteDoc(doc(db,'userdata','emailquerytestuid1'));

}

export default testQueryEmail;