import { getAuth,signOut } from "@firebase/auth";

const auth = getAuth();
document.getElementById("btnSignOut").onclick = () => {
    signOut(auth);
}