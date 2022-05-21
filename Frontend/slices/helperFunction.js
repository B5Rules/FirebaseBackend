import { PermissionsAndroid, Platform } from "react-native";
import * as Location from "expo-location";

export const getCurrentLocation = async () =>
  new Promise(async (resolve, reject) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      reject("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    resolve(location);
  });