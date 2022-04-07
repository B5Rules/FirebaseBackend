import {collection, setDoc, getDocs, getFirestore, query, where, doc} from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

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

document.getElementById('btnSubmitProfile').onclick = async function() {
    if(!!auth.currentUser){
        let username = document.getElementById('signUpFieldUser').value;
        let phone = document.getElementById('signUpFieldPhone').value;
        let fName = document.getElementById('signUpFieldFirstName').value;
        let country = document.getElementById('signUpFieldCountry').value;
        let lName = document.getElementById('signUpFieldLastName').value;
        let email = auth.currentUser.email;
        let uid=auth.currentUser.uid;

        //todo use regex matching server-side to santize the above fields
        //todo use Google Cloud Function as intermediary to ensure users can only change their own profile
        /* steps:
        sent request to cloud function with the needed data in a post request
        cloud function will check if the to-be-changed data belongs to the requesting user
        cloud function will do regex matching to ensure the data is valid
        */

        let userRef = collection(db,'userdata');

        if((await getDocs(query(userRef,where('username',"==",username)))).size>0){
            alert('Username already exists');
        }else{           
            let userData = {
                username: username,
                phone: phone,
                fName: fName,
                country: country,
                lName: lName,
                email: email,
                uid: uid
            };
            
            setDoc(doc(db,'userdata',username),userData).then(()=>{
                document.getElementById('setupProfileForm').classList.add('w3-hide');
            });
        }

    }
};