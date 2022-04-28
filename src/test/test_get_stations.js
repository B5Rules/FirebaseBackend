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
functions.region = "europe-west1";
connectFunctionsEmulator(functions,'localhost',5001);
const getAllStations = httpsCallable(functions,'getAllStations');

getAllStations().then(result => {
    for(let i = 0; i< result.data['result']['length'];i++){
        console.log(result.data['result'][i]['_fieldsProto']);
    }

    //console.log(result.data['result']);
});