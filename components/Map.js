import { Dimensions, StyleSheet, Text, View, Button } from "react-native";
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
  setOrigin,
} from "../slices/navSlice";
import { setNearByStaions } from "../slices/navSlice";
import {
  locationPermission,
  getCurrentLocation,
} from "../slices/helperFunction";
import { decode } from "@mapbox/polyline";
import { useDispatch } from "react-redux";
import Constants from "expo-constants";
//import { or } from "react-native-reanimated";

// LogBox.ignoreLogs(["Setting a timer"]);
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
  }));

  useEffect(() => {
    setRouteOrigin(origin);
  }, []);

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

  const goToDestination = () => {
    const myRegion = {
      latitude: providedDestination.location.latitude,
      longitude: providedDestination.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(myRegion, 1000);

    const destinationF = {
      latitude: providedDestination.location.latitude,
      longitude: providedDestination.location.longitude,
    };
    setDestination(destinationF);
    setRouteDestination(null);
  };

  const createRoute = () => {
    setRouteDestination(destination);
  };

  const onMapPress = (e) => {
    setRouteDestination(null);
    setDestination(e.nativeEvent.coordinate);
    const myRegion = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current.animateToRegion(myRegion, 1000);
  };

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
                  right: 20,
                  left: 20,
                  bottom: 50,
                },
              });
            }}
            onError={(errorMessage) => {
              console.log("GOT AN ERROR");
            }}
          />
        )}

        {routeOrigin?.location !== undefined && (
          <Marker
            coordinate={{
              latitude: routeOrigin?.location.latitude,
              longitude: routeOrigin?.location.longitude,
            }}
            title="Origin"
            identifier="origin"
          />
        )}

        {destination?.latitude !== undefined &&
          destination?.longitude !== undefined && (
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
                />
              );
          })}
      </MapView>

      <Button onPress={() => createRoute()} title="Route" />

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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});