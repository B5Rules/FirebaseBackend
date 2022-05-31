import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "react-native-paper";
import { httpsCallable } from "firebase/functions";
import { fireAuth, fireFunc } from "../globals/firebase";
import { getGlobalState, setGlobalState } from '../globals/global';
import { useBackButton } from '../hocs/backButtonHandler';

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const getPubKey = httpsCallable(fireFunc,"getPubKey");


const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
const getStationById = httpsCallable(
  fireFunc,
  "getStationById"
);
const changeStationStatus = httpsCallable(
  fireFunc,
  "changeStationStatus"
)

const getTextFromType = (type) => {
  console.log('Station type:', type)
  if(type === undefined) return "";
  return {
    0: "free",
    1: "busy",
    2: "reserved",
  }[type];

}


const StationInfo = ({ navigation, route }) => {
  const [station, setStation] = useState({});
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    if(shouldUpdate === false) return;

    setShouldUpdate(false);
    console.log(route?.params?.station?._fieldsProto?.id?.stringValue)
    getStationById(route?.params?.station?._fieldsProto?.id?.stringValue).then(res => {
      setStation(res.data.result);
    }).catch(err => {
      console.error('Error:', err);
    })
  }, [shouldUpdate]);
  useBackButton(() => {navigation.goBack(); return true;})

  const cancelReservation = async () => {
    const response = await changeStationStatus({
      id: station.id,
      status: 0
    })
    console.log(response)
    setShouldUpdate(true);    
  }

  const reserveStation = async () => {
    const response = await changeStationStatus({
      id: station.id,
      status: 2
    })
    console.log(response)
    setShouldUpdate(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.mainContainer, styles.containerProps]}>
        <ImageBackground
          source={require("../images/streets.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <ScrollView
            nestedScrollEnabled={true}
            style={[width, styles.scrollView]}
          >
            <View style={styles.darkcontainer}>
              <View style={styles.headerContainer}>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color: "white",
                      margin: 20,
                    }}
                  >
                    {station.name}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 100,
                }}
              >
                <Image
                  style={{ width: 200, height: 100, borderRadius: 50 }}
                  source={require("../images/charging-car2.jpg")}
                />
              </View>
              <View>
                <Text style={styles.label}>Price</Text>
                <View style={styles.detail}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {station.price} Ron
                  </Text>
                </View>

                <Text style={styles.label}>Charge</Text>
                <View style={styles.detail}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {station.type} kWh
                  </Text>
                </View>

                <Text style={styles.label}>Services</Text>
                <View style={styles.chips}>
                  <View style={styles.chipsContent}>
                    {station?.services?.map((stationChip) => (
                    <Chip
                      key={`chip-${stationChip}`}
                      style={styles.chip}
                      mode="flat"
                      selectedColor="#01A78F"
                    >
                      {` ${stationChip} `}
                    </Chip>
                    ))}
                  </View>
                </View>

                <View style={styles.inlineContainer}>
                  <Text style={styles.label}>Distance from your place</Text>
                  <View style={styles.detail}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      22,3 km
                    </Text>
                  </View>
                </View>

                <View style={styles.inlineContainer}>
                  <Text style={styles.label}>Time</Text>
                  <View style={styles.detail}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      30 min
                    </Text>
                  </View>
                </View>

                <View style={styles.inlineContainer}>
                  <Text style={styles.label}>Disponibility</Text>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Pressable style={[styles.stationStatus, styles[getTextFromType(station.status)]]}>
                      <Text style={styles.textStyle}>{getTextFromType(station.status).toUpperCase()}</Text>
                    </Pressable>
                  </View>
                </View>

                <TouchableHighlight
                  accessible={true}
                  activeOpacity={0.5}
                  style={styles.button2}
                  onPress={() => {
                    setGlobalState('currentStationData',{
                      //rest of the data is irrelevant for now
                      price:route?.params?.station?._fieldsProto?.price.doubleValue
                    })
                    getPubKey({ownerUid:route?.params?.station?._fieldsProto?.userID?.stringValue}).then(response =>{
                      console.log(response.data['result'])
                      setGlobalState("currentpubkey",response.data['result'])
                      navigation.navigate("Car List Payment")
                    })
                  }}
                >
                  <Text style={styles.textButton2}>Charge Now</Text>
                </TouchableHighlight>
                {
                  station?.status === 0 ? (
                    <TouchableHighlight
                  accessible={true}
                  activeOpacity={0.5}
                  style={[styles.button2, styles.button3]}
                  onPress={reserveStation}
                >
                  <Text style={[styles.textButton2, styles.textButton3]}>
                    Reserve
                  </Text>
                </TouchableHighlight>
                  ) : (
                    <TouchableHighlight
                  accessible={true}
                  activeOpacity={0.5}
                  style={[styles.button2, styles.button3]}
                  onPress={cancelReservation}
                >
                  <Text style={[styles.textButton2, styles.textButton4]}>
                    Cancel Reservation
                  </Text>
                </TouchableHighlight>
                  )
                }
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

  darkcontainer: {
    margin: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 40,
    padding: 20,
    borderColor: "#3B9683",
    borderWidth: 1,
    paddingTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },

  detail: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#182724",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginBottom: 10,
    borderRadius: 5,
  },
  label: {
    flex: 1,
    fontSize: 18,
    color: "white",
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },

  inlineContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  label2: {
    flex: 1,
    fontSize: 18,
    color: "white",
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },

  // Buttons

  buttonCharge: {
    backgroundColor: "#04ae95",
    width: "65%",
    maxHeight: 65,
    marginTop: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
  },

  buttonChargeText: {
    fontSize: 32,
    color: "white",
  },

  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#046b53",
    marginTop: 10,
    marginLeft: 70,
    marginRight: 70,
  },

  button3: {
    backgroundColor: "#fdca40",
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
  },

  textButton2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  textButton3: {
    fontSize: 18,
  },

  textButton4: {
    fontSize: 14,
  },

  stationStatus: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 170,
    backgroundColor: "white",
    color: "#01A78F",
    borderWidth: 2,
  },
  free: {
    borderColor: "#01A78F",
    backgroundColor: "#01A78F",
  },
  busy: {
    borderColor: "#FF5D5D",
    backgroundColor: "#FF5D5D",
  },
  reserved: {
    borderColor: "#fdca40",
    backgroundColor: "#fdca40",
  },

  textStyle: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  textBusy: {
    color: "#FF5D5D",
  },

  textReserved: {
    color: "#fdca40",
  },

  //chips:

  chips: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    color: "white",
    backgroundColor: "#182724",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
  },

  textChips: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginLeft: 7,
  },

  chipsContent: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
  },

  chip: {
    margin: 5,
    color: "#00FFDA",
  },
});

export default StationInfo;
