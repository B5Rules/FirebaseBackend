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
    await signInWithPopup(auth,gAuthProvider).then(async function(userCredential) {
        // Signed in 
        const user = userCredential.user;
        const email = user.email;
        const querySnapshot = await getDocs(query(collection(db,'userdata'),where("email","==",email)));
        if(querySnapshot.size == 0){
            document.getElementsByClassName('GoogleRegisterPrompt')[0].classList.remove('w3-hide');
            document.getElementById('GsignUpFieldEmail').value = email;
        }else{
            signOut(auth);
            deleteUser(user);
            alert("You already have an account with this email");
        }
    });
}

document.getElementById('btnGoogleRegister').onclick = async function() {
    let username = document.getElementById("GsignUpFieldUser").value;
    let phone = document.getElementById("GsignUpFieldPhone").value;
    let fName = document.getElementById("GsignUpFieldFirstName").value;
    let country = document.getElementById("GsignUpFieldCountry").value;
    let lName = document.getElementById("GsignUpFieldLastName").value;
    let email = document.getElementById('GsignUpFieldEmail').value;

    //first check if account with this username exists already
    const querySnapshot = getDocs(query(collection(db,'userdata'),where("username","==",username)));
    if(querySnapshot.size>0){
        alert('Account with this username already exists');
    }else {
        signInWithPopup(auth,gAuthProvider)
        .then((userCredential) => {
            // Signed in, add user to database
            setDoc(doc(collection(db, "userdata"),username),{
                username: username,
                email: email,
                phone: phone,
                fName: fName,
                country: country,
                lName: lName
            });
            document.getElementsByClassName('GoogleRegisterPrompt')[0].classList.add('w3-hide');
        });
        
    }
}

