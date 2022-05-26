import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  Component,
  Image,
} from "react-native";
import { Feather } from '@expo/vector-icons'; 
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  selectStaions,
  setDestination,
  setOrigin,
  setStations,
  selectOrigin,
  setNearByStaions,
  selectNearByStations,
  selectDestination,
} from "../slices/navSlice";
// Google
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
//import { GOOGLE_MAPS_APIKEY } from "@env";
import { useSelector } from "react-redux";
import Map from "../components/Map";
import MapView from "react-native-maps";
import {
  SafeAreaView,
  withSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Location from "expo-location";
import { fireApp, fireAuth, fireFunc } from "../globals/firebase";
import { httpsCallable } from "firebase/functions";
import Constants from "expo-constants";
import deletee from "../assets/delete.png";
import { PressabilityDebugView } from "react-native/Libraries/Pressability/PressabilityDebug";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { TouchableOpacity } from "react-native";

const GOOGLE_MAPS_APIKEY = Constants.manifest.web.config.gmaps_api_key;

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
    "&key=" +
    GOOGLE_MAPS_APIKEY;

  const res = await fetch(urlToFetchDistance);
  const data = await res.json();
  return data.rows[0].elements[0].distance.value;
};

const MapHomeScreen = ({ navigation }) => {
  const getAllStations = httpsCallable(fireFunc, "getAllStations");
  const dispatch = useDispatch();
  const childRef = useRef();
  let stations = useSelector(selectStaions);
  const origin = useSelector(selectOrigin);
  const nearByStations = useSelector(selectNearByStations);
  const [showTheThing, setShow] = useState(false);
  const [autonomy, setAutonomy] = useState("");
  const [dest, setDest] = useState({});

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    const location = await Location.getLastKnownPositionAsync();

    dispatch(
      setOrigin({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        },
      })
    );
  };

  

  useEffect(() => {
    getAllStations()
      .then((res) => {
        dispatch(setStations(res.data.result));
        const func = async () => {
          let stationsAux = [];
          let distancesAux = [];

          let counter = 0;

          const location = await Location.getLastKnownPositionAsync();
          const statii = res.data.result;
          for (const station of statii) {
            let dist;
            //console.log(station?._fieldsProto?.coordinates?.geoPointValue);
            if (station?._fieldsProto?.coordinates?.geoPointValue == undefined)
              dist = 99999999;
            else {
              if (
                station?._fieldsProto?.coordinates?.geoPointValue !== undefined
              ) {
                dist = await getDistanceBetweenPoints(
                  station._fieldsProto.coordinates.geoPointValue,
                  location.coords
                );
              }
            }

            if (counter < 3) {
              stationsAux[counter] = station;

              distancesAux[counter] = dist;
            } else if (dist < distancesAux[0]) {
              distancesAux[0] = dist;
              stationsAux[0] = station;
            } else if (dist < distancesAux[1]) {
              distancesAux[1] = dist;
              stationsAux[1] = station;
            } else if (dist < distancesAux[2]) {
              distancesAux[2] = dist;
              stationsAux[2] = station;
            }
            counter = counter + 1;
          }

          for (i = 0; i < 3; i++) {
            stationsAux[i] = stationsAux[i]._fieldsProto;
            let aux1 = {};
            for (const prop in stationsAux[i]) {
              aux1[prop] = stationsAux[i][prop];
            }
            aux1["distance"] = {
              doubleValue: distancesAux[i],
              valueType: "doubleValue",
            };

            stationsAux[i] = aux1;
          }
          dispatch(setNearByStaions(stationsAux));
        };

        func();
      })
      .catch((err) => {
        //console.log("getAllStations: Map.js");
        console.log("err");
      });
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Search destination"
          styles={{
            textInput: {
              backgroundColor: "#27423A",
              fontSize: 17,
              paddingLeft: 20,
              // height:30,
              color: "white",
            },
            textInputContainer: {
              backgroundColor: "#27423A",
            },
            container: {},
          }}
          textInputProps={{
            placeholderTextColor: "white",
            //width:10,
          }}
          onPress={(data, details = null) => {
            setShow(true);
            setDest({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            dispatch(
              setDestination({
                location: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
                description: data.description,
              })
            );

            childRef.current.goToDestination();
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={300}
          GooglePlacesSearchQuery={{ rankby: "distance" }}
        />
      </View>

      {showTheThing && (
        <View style={styles.searchBarJos}>
          {console.log("la afisare:" + showTheThing)}
          <View style={styles.stanga}>
            <Text style={styles.textAutonomie}>
              
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Introduce battery autonomy.."
              placeholderTextColor="white"
              autoCapitalize="none"
              onChangeText={(text) => setAutonomy(text)}
            />
          </View>
          <View style={styles.dreapta}>
            <TouchableOpacity
              onPress={() => {
                setShow(false);
              }}
            >
              <Feather name="x-square" size={32} color="#01F2CF" style={styles.Icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View style={styles.map}>
          <Map ref={childRef} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchBar: {
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    //minHeight:'25%',
    backgroundColor: "red",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  searchBarJos: {
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
    width: "100%",
    paddingLeft:8,
    marginBottom:12,
    marginTop:-12,
    paddingRight:15,
  },

  textAutonomie: {
    color: "white",
  },

  input: {
    backgroundColor: "rgba(40, 47, 45, 1)",
    height: 40,
    //margin: 2,
    marginTop: 3,
    borderWidth: 1,
    padding: 10,
    color: "white",
    // borderColor: 'green',
    width: "90%",
  },
  stanga: {
    width: "90%",
  },
  dreapta: {
    width: "10%",
  },
  Icon: {
  marginTop:22,
  },
});

export default MapHomeScreen;
