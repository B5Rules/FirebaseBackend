import { getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth";

const auth = getAuth();
const gAuthProvider = new GoogleAuthProvider();

async function googleSignIn() {
    signInWithPopup(auth,gAuthProvider);
};

export default {
    googleSignIn
};