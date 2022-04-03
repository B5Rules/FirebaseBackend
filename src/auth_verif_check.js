import {getAuth,sendEmailVerification} from 'firebase/auth'

const auth = getAuth();
//checks if the authenticated user has a verified email

document.getElementById('btnSendVerificationEmail').onclick = () => {
    sendEmailVerification(auth.currentUser);
    console.log(auth.currentUser.email);
}