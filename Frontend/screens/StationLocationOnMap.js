import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Button,
  ImageBackground,
  Pressable,
  TouchableHighlight,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { selectDestination } from "../slices/navSlice";

import { SafeAreaView } from "react-native-safe-area-context";
import { getGlobalState, setGlobalState } from "../globals/global";
import Constants from "expo-constants";
import Geolocation from "@react-native-community/geolocation";
import { useIsFocused } from "@react-navigation/native";


const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

const StationLocationOnMap = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [initialPosition, setInitialPosition] = useState({});
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      let lat = info.coords.latitude;
      let long = info.coords.longitude;

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setInitialPosition(initialRegion);
  }, [isFocused]);

  const pressStationBack = (station) => {
    setGlobalState("stationChangeModeActive", true);
    setGlobalState("stationChangeMode", {
      ...getGlobalState("stationChangeMode"),
      coordinates: {
        latitude: 44.3021412,
        longitude: 55.243242,
      },
    });
    navigation.navigate("Edit Station");
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
            followsUserLocation={true}
            rotateEnabled={true}
            zoomEnable={true}
            toolbarEnabled={true}
            showsMyLocationButton={true}
            initialPosition={initialPosition}
            //specify our coordinates.
            // initialRegion={{
            //   latitude: 37.78825,
            //   longitude: -122.4324,
            //   latitudeDelta: 0.0922,
            //   longitudeDelta: 0.0421,
            // }}
          />
        </View>

        <Pressable style={styles.locationButton} onPress={pressStationBack}>
          <Text>Set location</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
