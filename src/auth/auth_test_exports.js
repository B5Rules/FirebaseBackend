import { initializeApp } from "firebase/app";
import { getFunctions,httpsCallable,connectFunctionsEmulator } from "firebase/functions";
import { getAuth } from "firebase/auth";

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
connectFunctionsEmulator(functions,'localhost',5000);
const helloWorld = httpsCallable(functions,'helloWorld');


async function testExports(){
    helloWorld().then(response => {
        console.log(response.data['result']);
        console.log("Debug message: this means that the react app can call the firebase functions on the backend. Hooray!");
    }).catch(error => {
        console.log(error);
    });
    //console.log('Debug message. If you can see this, the JS functions can be called from the JSX code.\n -serbanstein');
};

export default {
    testExports
}
