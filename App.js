import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
let authUtils = require('./src/auth/index').default;


let signOutUser = authUtils.signOutUser;
let googleSignIn = authUtils.googleSignIn;
let emailSignIn = authUtils.emailSignIn;
let sendVerif = authUtils.sendVerif;
let resetPassword = authUtils.resetPassword;
let submitProfile = authUtils.submitProfile;
let deleteAccount = authUtils.deleteAccount;
let testExports = authUtils.testExports;

export default function App() {
  testExports();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
