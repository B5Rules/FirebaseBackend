import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  setDestination,
  selectDestination,
  selectOrigin,
  selectStaions,
  selectIsStation,
  setIsStation,
} from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  component,
} from "react-native";
import { getDistanceBetweenPoints } from "./MapHomeScreen";
import { httpsCallable } from "firebase/functions";
import { fireFunc } from "../globals/firebase";
const getNearbyStations = httpsCallable(fireFunc, "getNearbyStations");

const renderNearbyStations = (nearbyStations) => {
  return (
    <>
      {nearbyStations?.map((station) => (
        <View key={station.id} style={styles.rectangle}>
          <TouchableOpacity
            style={styles.direction}
            onPress={() => {
              if (station.coordinates !== undefined) goToStation(station);
            }}
          >
            <MaterialCommunityIcons
              name="directions"
              color={station.coordinates === undefined ? "#FF0000" : "#01F2CF"}
              size={36}
            />
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.txtLeft}>Distance:</Text>
            <Text style={styles.txtRight}>
              {station?.distance === -1 ? 0 : station?.distance / 1000} km
            </Text>
            <Image
              style={styles.image}
              source={require("../assets/location.png")}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.txtLeft}>Price:</Text>
            <Text style={styles.txtRight}>{station?.price} /kWh</Text>
            <Image
              style={styles.image}
              source={require("../assets/power.png")}
            />
            <Text style={styles.txtRight}>{station?.type}</Text>
          </View>

          <View style={styles.rowServices}>
            {station?.services?.length > 0 && (
              <Text style={styles.txtLeft}>Services:</Text>
            )}
            {station?.services?.length > 0 &&
              station?.services?.map((service, index) => {
                return (
                  <Text key={index} style={styles.txtRight}>
                    {service}
                  </Text>
                );
              })}
          </View>
        </View>
      ))}
    </>
  );
};

function NearbyStations({ navigation }) {
  const [nearByStations, setNearByStaions] = useState([]);
  const [loading, setLoading] = useState(true);
  const childRef = useRef();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const stations = useSelector(selectStaions);
  const nearbyStation = useSelector(selectIsStation);

  useEffect(() => {
    const func = async () => {
      let stationsAux = [];
      let distancesAux = [];

      let counter = 0;

      const location = origin;
      const statii = (
        await getNearbyStations({
          latitude: origin?.location?.latitude,
          longitude: origin?.location?.longitude,
          distance: 5,
        })
      ).data.result;

      for (const station of statii) {
        let dist;
        if (station?.coordinates == undefined) dist = 99999999;
        else {
          if (station?.coordinates !== undefined) {
            dist = await getDistanceBetweenPoints(
              {
                latitude: station.coordinates._latitude,
                longitude: station.coordinates._longitude,
              },
              location.location
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
        let aux1 = {};
        for (const prop in stationsAux[i]) {
          aux1[prop] = stationsAux[i][prop];
        }
        (aux1.distance = distancesAux[i]), (stationsAux[i] = aux1);
      }

      setNearByStaions(stationsAux);
      setLoading(false);
    };
    func();
    setLoading(true);
  }, [origin]);

  const goToStation = (station) => {
    dispatch(
      setDestination({
        location: {
          latitude: station?.coordinates?._latitude,
          longitude: station?.coordinates?._longitude,
        },
      })
    );
    dispatch(
      setIsStation({
        isStation: true,
      })
    );
    navigation.navigate("Map");
  };

  useEffect(() => {
    if (loading === false) return;
    const mockStations = {
      distance: -1,
      price: 0,
      type: 12,
      services: ["loading", "loading", "loading"],
    };
    setNearByStaions([mockStations, mockStations, mockStations]);
  }, [loading]);
  return (
    <View style={styles.container}>{renderNearbyStations(nearByStations)}</View>
  );
}
const styles = StyleSheet.create({
  direction: {
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#040506",
    flexDirection: "column",
  },
  image: {
    width: 20,
    height: 30,
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    // padding: '2%',
    marginLeft: "7%",
    flex: 1,
  },
  rowServices: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    // padding: '2%',
    marginLeft: "7%",
    flex: 2,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  rectangle: {
    marginTop: 22,
    width: "80%",
    height: "22%",
    backgroundColor: "#182724",
    borderRadius: 20,
    justifyContent: "flex-start",
    // alignItems: 'center',
  },

  txtLeft: {
    color: "white",
    marginRight: 20,
    fontSize: 16,
  },
  txtRight: {
    fontWeight: "bold",
    color: "#01F2CF",
    marginRight: 10,
    fontSize: 18,
  },
  txtRightServices: {
    fontWeight: "bold",
    color: "#01F2CF",
    marginRight: 10,
    fontSize: 18,
    textAlign: "left",
    width: 50,
  },
});

export default NearbyStations;
