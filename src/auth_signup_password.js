import { querystring } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, getFirestore,query,setDoc, where,getDocs, doc, } from 'firebase/firestore'

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

async function emailSignUp(email,password){
    createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/invalid-email'){
            alert('Invalid email');
        }else if(errorCode === 'auth/weak-password'){
            alert('Weak password');
        }else if(errorCode === 'auth/email-already-in-use'){
            alert('Email already in use');
        }
        console.log(errorCode)
    });
}

/*document.getElementById('btnSignUp').onclick = async function() {
    const username = 'serbanstein';
    const querySnapshot = await getDocs(query(collection(db,'userdata'),where("username","==",username)));
    querySnapshot.forEach(doc => {
        console.log(doc.data());
    });
}*/


document.getElementById('btnSignUp').onclick = async function() {
    let username = document.getElementById("signUpFieldUser").value;
    let password = document.getElementById("signUpFieldPassword").value;
    let passwordConfirm = document.getElementById("signUpFieldPasswordConfirm").value;
    let email = document.getElementById("signUpFieldEmail").value;
    let phone = document.getElementById("signUpFieldPhone").value;
    let fName = document.getElementById("signUpFieldFirstName").value;
    let country = document.getElementById("signUpFieldCountry").value;
    let lName = document.getElementById("signUpFieldLastName").value;
    //first check if account with this username exists already

    //query database to see if user with this username exists
    
    const querySnapshot = await getDocs(query(collection(db,'userdata'),where("username","==",username)));
    if(querySnapshot.size>0){
        alert('Account with this username already exists');
    }else if(password != passwordConfirm){
        alert("Passwords do not match");
    }else {
        createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            // Signed in, add user to database
            setDoc(doc(collection(db, "userdata"),username),{
                username: username,
                uid: userCredential.user.uid,
                email: email,
                phone: phone,
                firstName: fName,
                lastName: lName,
                country: country
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === 'auth/invalid-email'){
                alert('Invalid email');
            }else if(errorCode === 'auth/weak-password'){
                alert('Weak password');
            }else if(errorCode === 'auth/email-already-in-use'){
                alert('Email already in use');
            }
            console.log(errorCode)
        });
    }

    
    
}
