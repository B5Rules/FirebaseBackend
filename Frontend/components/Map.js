import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectNearByStations,
  selectStaions,
} from "../slices/navSlice";
//import { setNearByStaions } from '../navSlice';
//import { GOOGLE_MAPS_APIKEY } from "@env";
import { decode } from "@mapbox/polyline";
import { useDispatch } from "react-redux";
import Constants from "expo-constants";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  locationPermission,
  getCurrentLocation,
} from "../slices/helperFunction";
import { routeCalculator } from "../slices/routeCalculator";
import { getGlobalState,setGlobalState } from "../globals/global";

const GOOGLE_MAPS_APIKEY = Constants.manifest.web.config.gmaps_api_key;

//import { or } from "react-native-reanimated";

//LogBox.ignoreLogs(['Setting a timer']);

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

const Map = (props, ref) => {
  const { width, height } = Dimensions.get("window");
  const [coords, setCoords] = useState([]);
  const stations = useSelector(selectStaions);
  const mapRef = useRef(1);
  const origin = useSelector(selectOrigin);
  const providedDestination = useSelector(selectDestination);
  const [destination, setDestination] = useState(null);
  const [routeDestination, setRouteDestination] = useState(null);
  const [routeOrigin, setRouteOrigin] = useState(null);
  //const [nearByStations, setNearByStations]  = useState([]);
  const region = useRef({});
  useImperativeHandle(ref, () => ({
    goToDestination: () => {
      goToDestination();
    },
    createRoute: () => {
      createRoute();
    },
  }));

  useEffect(() => {
    //console.log(21321321312);
    //console.log(providedDestination);
    console.log(Object.keys(providedDestination).length)
    if(Object.keys(providedDestination).length > 0)
      goToDestination();
  }, [providedDestination]);

  useEffect(() => {
    setRouteOrigin(origin);
  }, []);

  useEffect(() => {
    // console.log("provided destination:");
    // if (Object.keys(providedDestination).length > 0) {
    //   createRoute();
    // }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 3000);
    return () => clearInterval(interval);
  });

  const getLiveLocation = async () => {
    const res = await getCurrentLocation();

    const originF = {
      location: {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      },
    };
    setRouteOrigin(originF);
  };

  const changeDestination = () => {
    const destinationF = {
      latitude: providedDestination.location.latitude,
      longitude: providedDestination.location.longitude,
    };
    setDestination(destinationF);
  };

  const goToDestination = () => {
    const myRegion = {
      latitude: providedDestination.location.latitude,
      longitude: providedDestination.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(myRegion, 1000);
    changeDestination();
    setRouteDestination(null);
  };

  const createRoute = () => {
    // TODO: Draw the route using this!
    routeCalculator({
      latitude: origin?.location.latitude,
      longitude: origin?.location.longitude,
    }, destination);
    changeDestination();
    setRouteDestination(destination);
  };

  //refocuseaza harta pe locul unde a fost apasata
const stopRouting = () => {
  setDestination(null);
  setRouteDestination(null);
};  
const onMapPress = (e) => {
    setRouteDestination(null);

    const reg = e?.nativeEvent?.coordinate || origin?.location;
    setDestination(reg);
    const myRegion = {
      latitude: reg?.latitude,
      longitude: reg?.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current.animateToRegion(myRegion, 1000);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={origin?.location}
        showsUserLocation={true}
        followsUserLocation={true}
        rotateEnabled={true}
        zoomEnable={true}
        toolbarEnabled={true}
        showsMyLocationButton={true}
        onPress={onMapPress}
        //onRegionChangeComplete={(region) => setRegion(region)}
      >
        {routeDestination && (
          <MapViewDirections
            origin={routeOrigin?.location}
            destination={routeDestination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="green"
            precision="high"
            resetOnChange={true}
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: 50,
                  right: 50,
                  left: 50,
                  bottom: 50,
                },
              });
            }}
            onError={(errorMessage) => {
              console.log("GOT AN ERROR");
            }}
          />
        )}

        {/* {origin?.location !== undefined && 
          <Marker
            coordinate={{
              latitude: origin?.location.latitude,
              longitude: origin?.location.longitude,
            }}
            title="Origin"
            identifier="origin"
            />   
        } */}

        {destination?.latitude !== undefined &&
          destination?.longitude !== undefined && (
            // console.log(stations),
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title="Destination"
              identifier="destination"
            />
          )}

        {stations?.length > 0 &&
          stations.map((station, index) => {
            const str = `Station ${index}`;
            if(station?._fieldsProto?.coordinates?.geoPointValue.latitude !== undefined && station?._fieldsProto?.coordinates?.geoPointValue.longitude !== undefined)
            return (
              <Marker key= {index}
                coordinate={{
                  latitude:
                    station?._fieldsProto?.coordinates?.geoPointValue.latitude,
                  longitude:
                    station?._fieldsProto?.coordinates?.geoPointValue.longitude,
                }}
                onPress={onMapPress}
                title="Destination"
               
              >
                <MapView.Callout tooltip style={styles.customView} onPress={() => navigation.navigate("Station Info", {
                  station
                })}>
                  <View style={styles.marker}>
                    <Text style={styles.markerText}>Price: {station?._fieldsProto?.price?.doubleValue} RON/kWh{"\n"}{"\n"}
                      {`Charging speed: ${station?._fieldsProto?.type?.integerValue} kWh\n\n`} ...See more details</Text>
                  </View>
                    
                </MapView.Callout>
              </Marker>
          );
          })}
      </MapView>

      <TouchableOpacity
        style={styles.recenterBtn}
        onPress={() => {
          createRoute();
        }}
      >
        <MaterialCommunityIcons name="directions" color="#4285F4" size={40} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.recenterBtn}
        onPress={() => {
          stopRouting();
        }}
      >
        <MaterialCommunityIcons name="stop-circle" color="red" size={40} />
      </TouchableOpacity>

      {/*Display user's current region:*/}
      {/*<Text style={styles.text}>Current latitude: {region.latitude}</Text>
     <Text style={styles.text}>Current longitude: {region.longitude}</Text>*/}
    </View>
  );
};

export default forwardRef(Map);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  marker: {
    width: 150,
    backgroundColor: "#27423A",
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 10,
    paddingLeft: 6,
  },
  markerText: {
    color: "white",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  recenterBtn: {
    alignSelf: "flex-end",
    flex: 2,
    margin: 10,
    marginTop: 55,
  },
});
