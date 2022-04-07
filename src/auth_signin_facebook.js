import { getAuth,FacebookAuthProvider,signInWithPopup, signInWithEmailAndPassword,linkWithCredential,GoogleAuthProvider,fetchSignInMethodsForEmail,credentialFromError, EmailAuthProvider } from "firebase/auth";

const auth = getAuth();
const fbAuthProvider = new FacebookAuthProvider();
const gAuthProvider = new GoogleAuthProvider();

document.getElementById("btnFacebookSignIn").addEventListener("click", () => {
    signInWithPopup(auth,fbAuthProvider).then((result) => {
        // The signed-in user info.
        const user = result.user;
    
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = fbAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
    
        // ...
      })
      .catch((error) => {
        // Handle Errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        if(errorCode==='auth/account-exists-with-different-credential'){
            let methods = fetchSignInMethodsForEmail(auth,email).catch((error) => {});
            if('password' in methods){
                let password = prompt('Email-based account already exists for that email address. Please enter your password');
                signInWithEmailAndPassword(auth,email,password).catch((error) => {
                    const errorCode = error.code;
                    if(errorCode === 'auth/wrong-password'){
                        alert('Wrong password');
                    }
                });
                linkWithCredential(auth,credential).catch((error3) => {
                    const errorCode3 = error3.code;
                    alert(errorCode3);
                });

            }else{
                alert('Email already in use with a different sign-in method');
            }
        }else{
            console.log(errorCode);
        }
        // ...
      });

});
