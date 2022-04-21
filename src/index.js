import { initializeApp } from 'firebase/app';
import testGetProfileData from './unit_test/test_get_profile_data';
import testInsertProfile from './unit_test/test_insert_profile';

const app = initializeApp({
    apiKey: "AIzaSyDc8GTACXcWMILMmLk9-pUaWowtGHvPdo4",
    authDomain: "b5uberelectric-bacbb.firebaseapp.com",
    projectId: "b5uberelectric-bacbb",
    storageBucket: "b5uberelectric-bacbb.appspot.com",
    messagingSenderId: "1053866920657",
    appId: "1:1053866920657:web:1db10f617e6e7b639dd3f0"
});

//importam modulele javascript
var auth_signout = require('./auth/auth_signout');
var auth_signup_password = require('./auth/auth_signup_password');
var auth_signin_google = require('./auth/auth_signin_google');
var auth_signin_password = require('./auth/auth_signin_password');
var auth_state_handler = require('./auth/auth_state_handler');
var auth_verif_check = require('./auth/auth_verif_check');
var auth_reset_password = require('./auth/auth_reset_password');
var auth_setup_profile = require('./auth/auth_setup_profile');
//var auth_signin_facebook = require('./auth/auth_signin_facebook');

testInsertProfile();
testGetProfileData();
