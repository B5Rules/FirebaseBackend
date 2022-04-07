import { getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth";

const auth = getAuth();
const gAuthProvider = new GoogleAuthProvider();

document.getElementById('btnGoogleSignIn').onclick = async function() {
    signInWithPopup(auth,gAuthProvider);
}