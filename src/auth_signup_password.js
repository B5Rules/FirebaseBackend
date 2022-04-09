import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth=getAuth();

async function emailSignUp(email,password){
    await createUserWithEmailAndPassword(auth,email, password)
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


document.getElementById('btnSignUp').onclick = () => {
    //let username = document.getElementById("signUpFieldUser").value;
    let first_name = document.getElementById("signUpFieldFirstName").value;
    let last_name = document.getElementById("signUpFieldLastName").value;
    let password = document.getElementById("signUpFieldPassword").value;
    let passwordConfirm = document.getElementById("signUpFieldPasswordConfirm").value;
    let email = document.getElementById("signUpFieldEmail").value;
    let phone = document.getElementById("signUpFieldPhone").value;

    //TODO: uncomment la linia de mai jos cand echipa front-end adauga campul dropdown
    let country = document.getElementById("signUpFieldCountry").value;
    
    //only email and password will be used for sign in
    //TODO: add the rest of the fields to Firestore and associate them with the resulting UserID

    if(password != passwordConfirm){
        alert("Passwords do not match");
    }else {emailSignUp(email,password);}

}

