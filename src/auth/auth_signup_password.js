import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

async function emailSignUp(email,password,passwordConfirm) {
    if(password != passwordConfirm){
        alert("Passwords do not match");
    }else {
        createUserWithEmailAndPassword(auth,email, password)
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
};

export default {
    emailSignUp
};

