import {getAuth,sendEmailVerification} from 'firebase/auth'

const auth = getAuth();
//checks if the authenticated user has a verified email

async function sendVerif () {
    sendEmailVerification(auth.currentUser);
};

export default {
    sendVerif
};
