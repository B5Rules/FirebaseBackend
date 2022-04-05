import {getAuth,sendPasswordResetEmail} from 'firebase/auth'

const auth=getAuth();

document.getElementById('btnForgotPassword').onclick = () => {
    let email = document.getElementById("forgotPasswordEmailField").value;
    sendPasswordResetEmail(auth,email)
    .then(() => {
        alert("Email sent");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/invalid-email'){
            alert('Invalid email');
        }else if(errorCode === 'auth/user-not-found'){
            alert('User not found');
        }
        console.log(errorCode)
    });

}