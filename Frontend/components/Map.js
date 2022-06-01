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
  setDestination,
  setOrigin,
  selectIsStation,
  setIsStation,
} from "../slices/navSlice";
//import { setNearByStaions } from '../navSlice';
//import { GOOGLE_MAPS_APIKEY } from "@env";

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
import { getPreciseDistance } from "geolib";
import { routeCalculator } from "../slices/routeCalculator";
import { getGlobalState, setGlobalState } from "../globals/global";

const GOOGLE_MAPS_APIKEY = Constants.manifest.web.config.gmaps_api_key;

//import { or } from "react-native-reanimated";

//LogBox.ignoreLogs(['Setting a timer']);

const calculateDistance = (origin, destination) => {
  var dis = getPreciseDistance(origin.location, destination.location);
  return dis;
};

export const getDistanceBetweenPoints = async (pointA, pointB) => {
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
  const dispatch = useDispatch();
  const [coords, setCoords] = useState([]);

  const stations = useSelector(selectStaions);
  const mapRef = useRef(1);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [routeDestination, setRouteDestination] = useState(null);
  const nearbyStation = useSelector(selectIsStation);
  //const [nearByStations, setNearByStations]  = useState([]);
  const region = useRef({});
  useImperativeHandle(ref, () => ({
    goToDestination: () => {
      goToDestination();
    },
  }));

  useEffect(() => {
    if (Object.keys(destination).length > 0) {
      goToDestination();
      // console.log(nearbyStation);
      if (nearbyStation.isStation == true) {
        createRoute();
        dispatch(
          setIsStation({
            isStation: false,
          })
        );
      }
    }
  }, [destination]);

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 4500);
    return () => clearInterval(interval);
  });

  const getLiveLocation = async () => {
    const res = await getCurrentLocation();

    const newOrigin = {
      location: {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      },
    };
    if (calculateDistance(origin, newOrigin) > 20) {
      console.log(calculateDistance(origin, newOrigin));
      dispatch(setOrigin(newOrigin));
    }
  };

  const goToDestination = () => {
    const myRegion = {
      latitude: destination?.location.latitude,
      longitude: destination?.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(myRegion, 1000);
    setRouteDestination(null);
  };

  const createRoute = async () => {
    console.log("Creating route,", {
      latitude: origin?.location.latitude,
      longitude: origin?.location.longitude,
    },
    destination.location, 'done')
    // const response = await routeCalculator(
    //   {
    //     latitude: origin?.location.latitude,
    //     longitude: origin?.location.longitude,
    //   },
    //   destination.location
    // )
    // console.log("Response is: ",response)
    // TODO: Draw the route using this!
    // routeCalculator(

    // );
    setRouteDestination(destination);
  };

  //refocuseaza harta pe locul unde a fost apasata
  const stopRouting = () => {
    setDestination(null);
    setRouteDestination(null);
    const myRegion = {
      latitude: origin.location.latitude,
      longitude: origin.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current.animateToRegion(myRegion, 1000);
  };

  const onMapPress = (e) => {
    setRouteDestination(null);

    const reg = e?.nativeEvent?.coordinate || origin?.location;
    dispatch(
      setDestination({
        location: {
          latitude: reg?.latitude,
          longitude: reg?.longitude,
        },
      })
    );
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
        {routeDestination?.location && (
          <MapViewDirections
            origin={origin?.location}
            destination={routeDestination?.location}
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
              const myRegion = {
                latitude: origin.location.latitude,
                longitude: origin.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };

              mapRef.current.animateToRegion(myRegion, 1000);
              // mapRef.current.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     top: 50,
              //     right: 50,
              //     left: 50,
              //     bottom: 50,
              //   },
              // });
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

        {destination?.location?.latitude !== undefined &&
          destination?.location?.longitude !== undefined && (
            // console.log(stations),
            <Marker
              coordinate={{
                latitude: destination.location.latitude,
                longitude: destination.location.longitude,
              }}
              title="Destination"
              identifier="destination"
            />
          )}

        {stations?.length > 0 &&
          stations.map((station, index) => {
            const str = `Station ${index}`;

            if (
              station?._fieldsProto?.coordinates?.geoPointValue.latitude !==
                undefined &&
              station?._fieldsProto?.coordinates?.geoPointValue.longitude !==
                undefined
            )
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude:
                      station?._fieldsProto?.coordinates?.geoPointValue
                        .latitude,
                    longitude:
                      station?._fieldsProto?.coordinates?.geoPointValue
                        .longitude,
                  }}
                  onPress={onMapPress}
                  title="Destination"
                >
                  <MapView.Callout
                    tooltip
                    style={styles.customView}
                    onPress={() =>
                      navigation.navigate("Station Info", {
                        station,
                      })
                    }
                  >
                    <View style={styles.marker}>
                      <Text style={styles.markerText}>
                        Price: {station?._fieldsProto?.price?.doubleValue}{" "}
                        RON/kWh{"\n"}
                        {"\n"}
                        {`Charging speed: ${station?._fieldsProto?.type?.integerValue} kWh\n\n`}{" "}
                        ...See more details
                      </Text>
                    </View>
                  </MapView.Callout>
                </Marker>
              );

            if (
              station?._fieldsProto?.coordinates?.geoPointValue.latitude !==
                undefined &&
              station?._fieldsProto?.coordinates?.geoPointValue.longitude !==
                undefined
            )
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude:
                      station?._fieldsProto?.coordinates?.geoPointValue
                        .latitude,
                    longitude:
                      station?._fieldsProto?.coordinates?.geoPointValue
                        .longitude,
                  }}
                  onPress={onMapPress}
                  title="Destination"
                >
                  <MapView.Callout
                    tooltip
                    style={styles.customView}
                    onPress={() =>
                      navigation.navigate("Station Info", {
                        station,
                      })
                    }
                  >
                    <View style={styles.marker}>
                      <Text style={styles.markerText}>
                        Price: {station?._fieldsProto?.price?.doubleValue}{" "}
                        RON/kWh{"\n"}
                        {"\n"}
                        {`Charging speed: ${station?._fieldsProto?.type?.integerValue} kWh\n\n`}{" "}
                        ...See more details
                      </Text>
                    </View>
                  </MapView.Callout>
                </Marker>
              );

          })}
      </MapView>

      <View style={styles.btnsView}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            createRoute();
          }}
        >
          <MaterialCommunityIcons name="directions" color="#27423A" size={40} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            stopRouting();
          }}
        >
          <MaterialCommunityIcons
            name="stop-circle"
            color="#27423A"
            size={40}
          />
        </TouchableOpacity>
      </View>

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

  btnsView: {
    alignSelf: "flex-end",
    marginTop: 50,
    flex: 2,
  },

  btnStyle: {
    alignSelf: "flex-end",
    marginRight: 8,
    marginTop: 8,
  },
});
