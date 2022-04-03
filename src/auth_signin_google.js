import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const auth = getAuth();
const gAuthProvider = new GoogleAuthProvider();

async function googleSignIn(){
    await signInWithPopup(auth,gAuthProvider);
}

document.getElementById('btnGoogleSignIn').onclick = () => {googleSignIn();}