const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Joi = require("joi");
const firestore = require('firebase-admin/firestore');
const { CloudTasksClient } = require('@google-cloud/tasks')
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

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
    else return {status:0, uid: uid};

});
exports.getProfileData = functions.region("europe-west1").https.onCall(async(data, context)=>{
    let uid = context.auth.uid;
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
    // let querySnapshot = await db.collection('chargingstations').where("status", "==", 0).get();
    const {
      latitude,
      longitude, 
      distance
    } = data;
    // let latitude = 47.1573794
    // let longitude = 27.6267558
    // let distance = 1;
    
    let lat = 0.0144927536231884;
    let lon = 0.0181818181818182;
  
    let lowerLat = latitude - (lat * distance)
    let lowerLon = longitude - (lon * distance)
  
    let greaterLat = latitude + (lat * distance)
    let greaterLon = longitude + (lon * distance)
  
    let lesserGeopoint = new firestore.GeoPoint(lowerLat, lowerLon)
    let greaterGeopoint = new firestore.GeoPoint(greaterLat, greaterLon)
  
    let docRef = db.collection("chargingstations")
    let querySnapshot = await docRef.where("coordinates", ">=", lesserGeopoint).where("coordinates", "<=", greaterGeopoint).get()

    return ({result:querySnapshot.docs});

});

exports.getAllStationsData = functions.region("europe-west1").https.onCall(async(data, context)=>{
  let querySnapshot = await db.collection('chargingstations').where("status", "==", 0).get();
  let stations = [];

  querySnapshot.forEach(doc => {
    stations.push({id: doc.id, ...doc.data()})
  });
  return ({result:stations});

});

exports.getNearbyStations = functions.region("europe-west1").https.onCall(async (data, context) => {
  const {
    latitude,
    longitude, 
    distance
  } = data;
  // let latitude = 47.1573794
  // let longitude = 27.6267558
  // let distance = 1;
  
  let lat = 0.0144927536231884
  let lon = 0.0181818181818182

  let lowerLat = latitude - (lat * distance)
  let lowerLon = longitude - (lon * distance)

  let greaterLat = latitude + (lat * distance)
  let greaterLon = longitude + (lon * distance)

  let lesserGeopoint = new firestore.GeoPoint(lowerLat, lowerLon)
  let greaterGeopoint = new firestore.GeoPoint(greaterLat, greaterLon)

  let docRef = db.collection("chargingstations")
  let query = await docRef.where("coordinates", ">=", lesserGeopoint).where("coordinates", "<=", greaterGeopoint).get()

  const stations = [];
  query.forEach(doc => {
    stations.push({
      id: doc.id,
      ...doc.data()
    })
  });

  return ({
    result: stations
  })
})

exports.getStationById = functions.region("europe-west1").https.onCall(async(data, context)=>{
  let querySnapshot = await db.collection('chargingstations').doc(data).get()
  return ({result:{id: querySnapshot.id, ...querySnapshot.data()}});
});

exports.getAllStationsForSpecificUser = functions.region("europe-west1").https.onCall(async(data, context)=>{
  let querySnapshot = await db.collection('chargingstations').where("userID", "==", context.auth.uid).get();
  let stations = [];

  querySnapshot.forEach(doc => {
    stations.push({id: doc.id, ...doc.data()})
  });
  return ({result:stations});
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
          name: Joi.string().required(),
          price: Joi.number().required(),
          services: Joi.array().items(Joi.string()).required(),
          type: Joi.number().valid(22, 43, 55).required(),
          coordinates: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
          }).required(),
        }),
        data
      );
      data.status = 0;
      data.price = parseFloat(data.price);
      data.type = parseInt(data.type);
      data.coordinates = new firestore.GeoPoint(data.coordinates.latitude, data.coordinates.longitude);
      data.userID = context.auth.uid;
      console.log('Create station',data);
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

exports.changeStationStatus = functions
.region("europe-west1")
.https.onCall(async (data, context) => {
  try{
    validateObject(Joi.object({
      id: Joi.string().required(),
      status: Joi.number().valid(0, 1, 2),
    }), data);
    if(data.status !== 0) {
      data.reservedBy = context.auth.uid;
    } else {
      data.reservedBy = '';
    }
    await db.collection("chargingstations").doc(data.id).update(data);
    if(data.reservedBy === '') {

    } else {
      await db.collection("station_reservations").add({
        stationId: data.id,
        expireIn: 20,
      })
    }

    return {
      result: null,
      message: 'Successfully changed status',
    }
  } catch(e){
    return {result:null,error:true,message:e.message};
  }
})

exports.updateStation = functions
.region("europe-west1")
.https.onCall(async (data, context) => {
  try {
    validateObject(Joi.object({
      id: Joi.string().required(),
      name: Joi.string(),
      price: Joi.number(),
      services: Joi.array().items(Joi.string()),
      type: Joi.number().valid(22, 43, 55),
      coordinates: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
    }), data);
    let querySnapshot = await db.collection("chargingstations").doc(data.id).get()
    if(querySnapshot.data().userID != context.auth.uid){
      return {result:null, error:true, message:"You are not the owner of this station"}
    }
    data.price && (data.price = parseFloat(data.price));
    data.type && (data.type = parseInt(data.type)); 

    data.userID = context.auth.uid;
    if(data.coordinates) {
      data.coordinates = new firestore.GeoPoint(data.coordinates.latitude, data.coordinates.longitude);
    }

    await db.collection("chargingstations").doc(data.id).update(data);
  } catch(e) {
    console.error(e);
    return {result: null,error: true, message: 'Failed to update this charging station. Error: '+e.message};
  }

  return {result: null, error: false, message: `Successfully modified station with id ${data.id}`}
})

exports.deleteStationByIDForSpecificUser = functions
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

exports.getPubKey = functions.region("europe-west1").https.onCall(async (data, context)=>{
  const ownerUid = data.ownerUid;
  const docRef = await db.collection('userdata').doc(ownerUid).get();
  const pubKey = await docRef.data().pubKey;
  return {result:pubKey};
});

exports.getDistanceBetweenTwoStations = functions.region("europe-west1").https.onCall(async (data, context)=>{
  const {station1, station2 } = data;
  let station = await db.collection('stationsGraph').where("stationId","==", station1).get()
  if(!station.size){
    return {result:null, error:true, message:"Station 1 not found"}
  }
  const distance = station?.docs[0]?.data()?.distances?.[station2.id] || 99999999;
  return {
    result: distance,
    error: false,
    message: 'Successfully retrieved distance between two stations'
  }
});

exports.firestoreTtlCallback = functions.region("europe-west1").https.onRequest(async(req, res)=>{
  const payload = req.body
    try {
      console.log('ok')
      db.collection('chargingstations').doc(payload.stationId).update({
        reservedBy: "",
        status: 0
      });
        // await admin.firestore().doc(payload.docPath).delete()
        res.sendStatus(200)
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
});

// exports.

/**
 * We must set the timeout to 9mins on cloud
 */
exports.generateGraph = functions.runWith({
  timeoutSeconds: 540
}).region("europe-west1").https.onCall(async (data, context) => {
  return {
    result: null,
    error: true,
    message: 'This function is disabled'
  };
  const maxDistanceBetweeenTwoStations = 150000;
  const minDistanceBetweeenTwoStations = 10000;
  const stationsRawData = await db.collection('chargingstations').get();
  const stations = [];

  stationsRawData.forEach(data => {
    stations.push({
      id: data.id,
      ...data.data()
    })
  })

  const stationNonExistant = await db.collection('chargingstations').where("stationId","==", "zabogdan").get()
  console.log(stationNonExistant.size)
  const getDistanceBetweenPoints = async (pointA, pointB) => {
    var urlToFetchDistance =
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +
      pointA.latitude +
      "," +
      pointA.longitude +
      "&destinations=" +
      pointB.latitude +
      "%2C" +
      pointB.longitude +
      "&key=AIzaSyB9v7V_D0tF4_jHRkJKF6iGg1s4KMXjWLk";
  
    const res = await fetch(urlToFetchDistance);
    const data = await res.json();
    return data.rows[0].elements[0].distance.value;
  };

  const getStationData = async (id) => {
    let station = await db.collection('stationsGraph').where("stationId","==", id).get()
    if(!station.size)
      return {
        stationId: id,
        distances: {

        }
      }
    return station.docs[0].data();
  }

  const updateOrCreateStation = async (data) => {
    const collection = db.collection('stationsGraph');
    const docRef = await collection.where('stationId', '==', data.stationId).get();
    if(!docRef.size) {
      await collection.add(data)
    } else {
      await collection.doc(docRef.docs[0].id).update(data);
    }
  }
  
  for (const station1 of stations){
      const station1Data = await getStationData(station1.id);

      for (const station2 of stations){
        const station2Data = await getStationData(station2.id);
        if(station1Data.stationId === station2Data.stationId) continue;
        const dist=await getDistanceBetweenPoints(
          {
            latitude: station1.coordinates._latitude,
            longitude: station1.coordinates._longitude,
          },
          {
            latitude: station2.coordinates._latitude,
            longitude: station2.coordinates._longitude,
          });
        if(dist <= maxDistanceBetweeenTwoStations && dist >= minDistanceBetweeenTwoStations)
        {
          station1Data.distances[station2Data.stationId] = dist;
          station2Data.distances[station1Data.stationId] = dist;
        }
        updateOrCreateStation(station2Data);
      }
      updateOrCreateStation(station1Data);
  }
  return true;
});

exports.onCreateReservation = functions.region("europe-west1").firestore.document('/station_reservations/{id}').onCreate(async snapshot => {
  // Code discussed below!
  const data = snapshot.data();

  const project = 'b5uberelectric-bacbb'
  const location = 'europe-west1'
  const queue = 'firestore-ttl'
  const tasksClient = new CloudTasksClient()
  const queuePath = tasksClient.queuePath(project, location, queue)
  const url = `https://${location}-${project}.cloudfunctions.net/firestoreTtlCallback`
  const docPath = snapshot.ref.path
  const payload = { docPath }

  const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(JSON.stringify({id: snapshot.id, ...data})).toString('base64'),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      scheduleTime: {
        seconds: data.expireIn || 600
      }
  }
  await tasksClient.createTask({ parent: queuePath, task })
})