import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image,
  Pressable,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

import { SafeAreaView } from "react-native-safe-area-context";
import { getGlobalState, setGlobalState } from "../globals/global";
import Constants from "expo-constants";
import MarkerComponent from '../components/Marker'; 
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
const mapDelta = 0.001;

const StationLocationOnMap = ({ navigation }) => {
  const [region, setRegion] = useState({
    longitude: 0,
    latitude: 0,
    longitudeDelta: mapDelta,
    latitudeDelta: mapDelta,
  });
  const [initialPosition, setInitialPosition] = useState({})
  const isFocused = useIsFocused();
  const origin = useSelector(selectOrigin);
  useEffect(() => {
    if(isFocused) {
      setInitialPosition({
        longitude: getGlobalState("stationChangeMode").coordinates.longitude || origin?.location.longitude,
        latitude: getGlobalState("stationChangeMode").coordinates.latitude || origin?.location.latitude,
        longitudeDelta: mapDelta,
        latitudeDelta: mapDelta,
      })
      console.log('Position:', initialPosition)
    }
  },[isFocused]);
  const pressStationBack = (station) => {
    setGlobalState("stationChangeModeActive", true);
    setGlobalState("stationChangeMode", {
      ...getGlobalState("stationChangeMode"),
      coordinates: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
    navigation.navigate("Edit Station");
  };
  const changeRegion = (region) => {
    setRegion(region);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.mainContainer, styles.containerProps]}>
        <View style={styles.mapContainer}>
          {/*Render our MapView*/}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}
            zoomEnable={true}
            toolbarEnabled={true}
            showsMyLocationButton={true}
            initialRegion={initialPosition}
            onRegionChange={changeRegion}
          />
        </View>
        <View style={styles.markerFixed}>
          <MarkerComponent style={styles.marker} />
          {/* <Image style={styles.marker} source={marker} /> */}
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.locationButton} onPress={pressStationBack}>
            <Text>Set location</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    top: "40%"
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#0A1613",
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainer: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    paddingTop: 10,
  },
  mainContainer: {
    backgroundColor: "#0A1613",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  containerProps: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  locationButton: {
    bottom: 10,
  },
});

export default StationLocationOnMap;
