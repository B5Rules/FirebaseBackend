import {getAuth,signInWithEmailAndPassword} from "firebase/auth"

const auth=getAuth();
async function emailSignIn(email,password){
    await signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/user-not-found'){
            alert('User not found');
        }else if(errorCode === 'auth/wrong-password'){
            alert('Wrong password');
        }else if(errorCode === 'auth/invalid-email'){
            alert('Invalid email');
        }
        console.log(errorCode);
    });
}

document.getElementById('btnSignIn').onclick = () => {
    let email = document.getElementById("signInFieldEmail").value;
    let password = document.getElementById("signInFieldPassword").value;
    emailSignIn(email,password);
}