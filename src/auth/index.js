import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';

// Initializare Firebase
const app = initializeApp({
    apiKey: "AIzaSyDc8GTACXcWMILMmLk9-pUaWowtGHvPdo4",
    authDomain: "b5uberelectric-bacbb.firebaseapp.com",
    projectId: "b5uberelectric-bacbb",
    storageBucket: "b5uberelectric-bacbb.appspot.com",
    messagingSenderId: "1053866920657",
    appId: "1:1053866920657:web:1db10f617e6e7b639dd3f0"
});

const auth = getAuth();

//importam modulele javascript
let auth_signout = require('./auth_signout');
let auth_signin_google = require('./auth_signin_google');
let auth_signin_password = require('./auth_signin_password');
let auth_state_handler = require('./auth_state_handler');
let auth_verif_check = require('./auth_verif_check');
let auth_reset_password = require('./auth_reset_password');
let auth_setup_profile = require('./auth_setup_profile');
let auth_delete_account = require('./auth_delete_account');

let auth_test_exports = require('./auth_test_exports');

let signOutUser = auth_signout.default.signOutUser;
let googleSignIn = auth_signin_google.default.googleSignIn;
let emailSignIn = auth_signin_password.default.emailSignIn;
let sendVerif = auth_verif_check.default.sendVerif;
let resetPassword = auth_reset_password.default.resetPassword;
let submitProfile = auth_setup_profile.default.submitProfile;
let deleteAccount = auth_delete_account.default.deleteAccount;
let testExports = auth_test_exports.default.testExports;



export default {
    signOutUser,
    googleSignIn,
    emailSignIn,
    sendVerif,
    resetPassword,
    submitProfile,
    deleteAccount,
    testExports
};