const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Joi = require("joi");

const app = admin.initializeApp();
const db = admin.firestore(app);
const auth = admin.auth(app);

exports.insertProfile = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let uid = context.auth.uid;

    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to use this function"
      );
    }

    let querySnapshot = await db
      .collection("userdata")
      .where("username", "==", data.username)
      .get();
    if (querySnapshot.size > 0) {
      let profile = querySnapshot.docs[0].data();
      if (querySnapshot.size > 0 && profile["uid"] != uid)
        return { status: 1, message: "Username already exists" };
    }

    const username = data.username;
    const lastName = data.lastName;
    const firstName = data.firstName;
    const phone = data.phone;
    const country = data.country; 

    if (!username.match("^[a-zA-Z0-9]+$"))
      return {
        status: 3,
        message: "Username can only contain letters and numbers",
      };
    if (!phone.match("^[0-9]+$"))
      return { status: 3, message: "Phone number can only contain numbers" };
    if (!firstName.match("^([a-zA-Z '-]){2,30}$"))
      return { status: 4, message: "First name can only contain letters" };
    if (!lastName.match("^([a-zA-Z '-]){2,30}$"))
      return { status: 5, message: "Last name can only contain letters" };

    let status, message;

    db.collection("userdata")
      .doc(uid)
      .set({
        uid: uid,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        country: data.country
    }).then(()=>{
        status=0;
    }).catch(error=>{
        status=6; message = error;
    });

    if(status) return{status:status,message:message};
    else return {status:0};

});



exports.getProfileData = functions.region("europe-west1").https.onCall(async(data, context)=>{
    
    let uid= context.auth.uid;
    if(!context.auth){
        throw new functions.https.HttpsError('unauthenticated','You must be authenticated to use this function');
    }
    let querySnapshot = await db.collection("userdata").doc(uid).get();
    return { result: querySnapshot.data() };
  });

exports.deleteAccount = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let uid = context.auth.uid;
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to use this function"
      );
    }
    await db.collection("userdata").doc(uid).delete();
    auth.deleteUser(uid);
  });

exports.helloWorld = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    return { result: "Hello World" };
  });

exports.getAllStations = functions.region("europe-west1").https.onCall(async(data, context)=>{
    let querySnapshot = await db.collection('chargingstations').get();

    return ({result:querySnapshot.docs});

});

const validateObject = (object, data) => {
  const valid = object.validate(data);
  if (valid.error !== undefined) throw new Error(valid.error);
  return true;
};

/**
 * Usage:
 * 
createStation(
  {
    price: 1.17,
    services: ["coffee", "bathroom"],
    type: "normal",
    coordinate: {
      latitude: 47.1749681,
      longitude: 27.580027,
    },
  },
  ""
);
 */
exports.createStation = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    try {
      validateObject(
        Joi.object({
          price: Joi.number().required(),
          services: Joi.array().items(Joi.string()).required(),
          type: Joi.string().valid("slow", "normal", "fast").required(),
          coordinate: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
          }).required(),
        }),
        data
      );
      let querySnapshot = await db.collection("chargingstations").add(data);

      return {
        result: querySnapshot.id,
        message: "Station created successfully",
      };
    } catch (e) {
      return { result: null, error: true, message: e.message };
    }
  });

/**
 * 
 * Usage:
 deleteStation({
    id: "2aRsYg1YEeQFjr7G6i2K",
 }, '')
 */

exports.deleteStation = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
      try{
        validateObject(Joi.object({
            id: Joi.string().required(),
        }), data);
        const resp = await db.collection("chargingstations").doc(data.id).delete();
        
          return { result: null, message: `Successfully deleted station with id '${data.id}'` };

      } catch (e) {
        return { result: null, error: true, message: e.message };
      }
  });

// exports.getStation = functions
//   .region("europe-west1")
//   .https.onCall(async (data, context) => {
//     // let querySnapshot = await db.collection('chargingstations').doc(data.id).delete();

//     return {
//       result: querySnapshot.id,
//       message: "Station deleted successfully",
//     };
//   });
// });


exports.getStationData = functions.region("europe-west1").https.onCall(async(data, context)=>{
    let stationID = data.stationID;
    
    let querySnapshot = await db.collection('chargingstations').doc(stationID).get();
    return ({result:(querySnapshot.data())});
});
exports.addCar=functions.region("europe-west1").https.onCall(async( data,context)=>{
  const uid = context.auth.uid;
db.collection("userdata").doc(uid).collection("cars").add({
      name:data.nume,
      color:data.culoare,
      distantaMax:data.distantaMax,
      capacBaterie:data.capacBaterie,
      numarKm:data.numarKm,
      caiPutere:data.caiPutere
  })
  .then(docRef=>{
      db.collection("userdata").doc(uid).collection("cars").doc(docRef.id).update({uid:docRef.id});
  })
.catch(err=>{
      console.log(err);
  });
  
});

exports.getCars = functions.region("europe-west1").https.onCall(async(data, context)=>{
  const uid = context.auth.uid;
  let querySnapshot = await db.collection("userdata").doc(uid).collection('cars').get();
  var cars=[];
  querySnapshot.docs.forEach(doc=>
  {
      cars.push(doc.data());
      console.log(cars);
  })
   return cars;
});

exports.deleteCar=functions.region("europe-west1").https.onCall(async(data, context)=>{
  const uid = context.auth.uid;
  db.collection('userdata').doc(uid).collection('cars').doc(data.uid).delete();
});

exports.updateCar = functions.region("europe-west1").https.onCall(async (data, context)=> {
       const uid = context.auth.uid;
      db.collection('userdata').doc(uid).collection('cars').doc(data.uid).set({
           uid: data.uid,
           name: data.name,
           color: data.color,
           distantaMax: data.distantaMax,
           capacBaterie: data.capacBaterie,
           numarKm: data.numarKm,
           caiPutere: data.caiPutere,
           uid:data.uid
       });
   });