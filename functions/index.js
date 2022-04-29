const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Countries = require("countries-api");

const app = admin.initializeApp();
const db = admin.firestore(app);
const auth = admin.auth(app);

exports.insertProfile = functions.region("europe-west1").https.onCall(async(data, context)=>{
    
    const uid = context.auth.uid;
    const email = context.auth.token.email;
    
    const username = data.username;
    const lName = data.lName;
    const fName = data.fName;
    const country = data.country;
    const phone = data.phone;

    let status = 0;
    
    let querySnapshot = await db.collection('userdata').where('username', '==', username).get();
    if (querySnapshot.size > 0)return ({status:1,message:"Username already exists"});
    if (!username.match("^[a-zA-Z0-9]+$")) return ({status:2,message:"Username can only contain letters and numbers"});
    if (!phone.match("^[0-9]+$")) return ({status:3,message:"Phone number can only contain numbers"});
    if (!fName.match("^[a-zA-Z]+$")) return ({status:5,message:"First name can only contain letters"});
    if (!lName.match("^[a-zA-Z]+$")) return ({status:6,message:"Last name can only contain letters"});
    
    //check if an account with this username already exists
    
    
    if(status===0){
        db.collection("userdata").doc(uid).set({
            username: username,
            email: email,
            lastName: lName,
            firstName: fName,
            country: country,
            phone: phone
        });
    }
    return ({status:0});
});

exports.queryEmail = functions.region("europe-west1").https.onCall(async(data, context)=>{
    const email = data.email;
    let querySnapshot = await db.collection('userdata').where('email', '==', email).get();
    if (querySnapshot.size > 0)return ({result:1});
    return ({result:0});
});

exports.getProfileData = functions.region("europe-west1").https.onCall(async(data, context)=>{
    const uid = context.auth.uid;
    let querySnapshot = await db.collection('userdata').doc(uid).get();
    if (querySnapshot.exists)return ({result:querySnapshot.data()});
    return ({result:0});
});

exports.getAllStations = functions.region("europe-west1").https.onCall(async(data, context)=>{
    let querySnapshot = await db.collection('chargingstations').get();

    return ({result:querySnapshot.docs});

});

exports.deleteAccount = functions.region("europe-west1").https.onCall(async(data, context)=>{
    let uid = '';
    try{
        uid = context.auth.uid;
    }catch(e){
        return ({code:1,message:'not logged in'});
    }
    await db.collection('userdata').doc(uid).delete();
    let querySnapshot2 = await db.collection('chargingstations').where('owner_uid', '==', uid).get();
    for(let i = 0; i< querySnapshot2.docs.length;i++){
        await db.collection('chargingstations').doc(querySnapshot2.docs[i].id).delete();
    }
    auth.deleteUser(uid);
    return ({code:0});
});

exports.helloWorld = functions.region('europe-west1').https.onCall(async(data, context)=>{
    return ({result:'Hello World'});
});
