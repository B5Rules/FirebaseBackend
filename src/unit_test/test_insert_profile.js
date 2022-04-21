import {collection, deleteDoc, doc, getDoc, getFirestore, where} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions";

const app = initializeApp({
    apiKey: "AIzaSyDc8GTACXcWMILMmLk9-pUaWowtGHvPdo4",
    authDomain: "b5uberelectric-bacbb.firebaseapp.com",
    projectId: "b5uberelectric-bacbb",
    storageBucket: "b5uberelectric-bacbb.appspot.com",
    messagingSenderId: "1053866920657",
    appId: "1:1053866920657:web:1db10f617e6e7b639dd3f0"
});

const functions = getFunctions(app);
const db = getFirestore(app);

functions.region = "europe-west1";
connectFunctionsEmulator(functions, "localhost", 5001);
const insertProfile = httpsCallable(functions,'insertProfile');

const testInsertProfile = async function(){
    //no1 
    await insertProfile({
        username: 'testuser1',
        lName: 'lName',
        fName: 'fName',
        country: 'Italy',
        phone: '00000',
        email: 'johndeere@mail.fr',
        uid: 'testuid1'
    }).catch((error) => {
        console.log('hi'+error);
    }).then((response) => {
        if(response.data['status'] === 0){
            console.log('insertProfile test no1: "successful insertion" succesful');
        }else{
            console.log('insertProfile test no1: "successful insertion" failure');
            console.log(response.data['status']);
        }    
    }); 
    //no2
    await insertProfile({
        username: 'testuser1',
        lName: 'lName',
        fName: 'fName',
        country: 'Italy',
        phone: '00000',
        email: 'secondjohndeere@mail.fr',
        uid: 'testuid2'
    }).catch((error) => {
        console.log('hi'+error);
    }).then((response) => {
        if(response.data['status'] === 1){
            console.log('insertProfile test no2: "username already exists" succesful');
        }else{
            console.log('insertProfile test no2: "username already exists" failure');
            console.log(response.data['status']);
        }    
    }); 
    //no3
    await insertProfile({
        username: 'test_user3',
        lName: 'lName',
        fName: 'fName',
        country: 'Italy',
        phone: '00000',
        email: 'secondjohndeere@mail.fr',
        uid: 'testuid3'
    }).catch((error) => {
        console.log('hi'+error);
    }).then((response) => {
        if(response.data['status'] === 2){
            console.log('insertProfile test no3: "username - letters and numbers" succesful');
        }else{
            console.log('insertProfile test no3: "username - letters and numbers" failure');
            console.log(response.data['status']);
        }   
    })
    //no4
    await insertProfile({
        username: 'testuser4',
        lName: 'lName',
        fName: 'fName',
        country: 'Italy',
        phone: '076X618788',
        email: 'secondjohndeere@mail.fr',
        uid: 'testuid4'
    }).catch((error) => {
        console.log('hi'+error);
    }).then((response) => {
        if(response.data['status'] === 3){
            console.log('insertProfile test no4: "phonenumber - digits" succesful');
        }else{
            console.log('insertProfile test no4: "phonenumber - digits" failure');
            console.log(response.data['status']);
        }   
    })
    //no5
    await insertProfile({
        username: 'testuser5',
        lName: 'lName',
        fName: 'f8ame',
        country: 'Italy',
        phone: '0764618788',
        email: 'secondjohndeere@mail.fr',
        uid: 'testuid5'
    }).catch((error) => {
        console.log('hi'+error);
    }).then((response) => {
        if(response.data['status'] === 5){
            console.log('insertProfile test no5: "first name - letters" succesful');
        }else{
            console.log(response.data['status']);
            console.log('insertProfile test no5: "first name - letters" failure');
        }   
    })
    //no6
    await insertProfile({
        username: 'testuser6',
        lName: 'N$ame',
        fName: 'fName',
        country: 'Italy',
        phone: '0761618788',
        email: 'secondjohndeere@mail.fr',
        uid: 'testuid6'
    }).catch((error) => {
        console.log('hi'+error);
    }).then((response) => {
        if(response.data['status'] === 6){
            console.log('insertProfile test no6: "last name - letters" succesful');
        }else{
            console.log('insertProfile test no6: "last name - letters" failure');
            console.log(response.data['status']);
        }   
    })
    deleteDoc(doc(db,'userdata','testuid1'));
    //deleteDoc(doc(db,'userdata','testuid2'));
    deleteDoc(doc(db,'userdata','testuid3'));
    deleteDoc(doc(db,'userdata','testuid4'));
    deleteDoc(doc(db,'userdata','testuid5'));
    deleteDoc(doc(db,'userdata','testuid6'));
}

export default testInsertProfile;