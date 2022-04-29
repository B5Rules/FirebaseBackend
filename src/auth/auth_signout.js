import { getAuth,signOut } from "@firebase/auth";

const auth = getAuth();
function signOutUser() {
    signOut(auth);
};

export default {
    signOutUser
};
