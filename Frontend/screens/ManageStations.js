import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { httpsCallable } from "firebase/functions";
import { fireFunc } from "../globals/firebase";
import { useIsFocused } from "@react-navigation/native";
import { setGlobalState } from "../globals/global";

const getAllStationsForSpecificUser = httpsCallable(
  fireFunc,
  "getAllStationsForSpecificUser"
);

const deleteStationByIDForSpecificUser = httpsCallable(
  fireFunc,
  "deleteStationByIDForSpecificUser"
);
const { width } = Dimensions.get("screen");

const ManageStations = ({ navigation }) => {
  const [stations, setStations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [stationDeleteID, setStationForDelete] = useState('');
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    if(shouldRefetch === false && isFocused === false) return;
    // console.log('Fetching data again')
    getAllStationsForSpecificUser().then((res) => {
      setStations(res.data.result);
      setLoading(false);
    });
    setShouldRefetch(false);
    if(isFocused) {
      setGlobalState('stationChargeModeEdit', 0);
      setGlobalState("stationChangeModeActive", false);
      setLoading(true);
    }
  }, [isFocused, shouldRefetch]);

  const pressStation = (station) => {
    setGlobalState("stationChargeModeEdit", 1);
    navigation.navigate("Edit Station", {
        ...station,
        coordinates: {
          latitude: station?.coordinates?._latitude,
          longitude: station?.coordinates?._longitude
        }
    });
  };

  const handleDeleteStation = async () => {
    const response = await deleteStationByIDForSpecificUser({
      id: stationDeleteID
    })
    setShouldRefetch(true);
    setModalVisible(false);
    // console.log(response)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, styles.containerProps]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ marginRight: 10, width: 48, height:48 }}
            source={require('../images/electric-station.png')}
          />
          <View >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
              Provider account
            </Text>
          </View>
        </View>

        <View  style={styles.labelStations}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Your Stations
            </Text>

        </View>
      </View>

      <View style={[styles.mainContainer, styles.containerProps]}>
        <ImageBackground
          source={require("../images/streets.png")}
          resizeMode="cover"
          style={styles.image}
        >
          {stations.length > 0 ? (
            <>
              <ScrollView style={{ width }}>
                {stations.map((station) => (
                <TouchableOpacity accessible={true}
                activeOpacity={0.5}
                  key={station.id}
                  style={[styles.button, styles.shadowProp]}
                  onPress={() => pressStation(station)}
                >
                  <View style={styles.inlinePositioning}>

                  <View >
                      <View >
                        <Text style={styles.textButton}> {station.name} </Text>
                      </View>

                      <View style={styles.inline}>
                        <Text style={styles.textDetails}> {station.type} kWh  | {station.price} RON</Text> 
                      </View> 
                  </View>

                  <TouchableOpacity  
                   accessible={true}
                   activeOpacity={0.5} 
                   style={styles.deleteButton}
                   onPress={() => {setStationForDelete(station.id); setModalVisible(true)}}
                    >
                    <Image
                    style={{  width: 35, height: 35 }}
                    source={require('../images/icons-delete.png')}
                  />
                  </TouchableOpacity>


                  </View>
                </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            <View style={{width}}>
              <View style={[styles.containerProps]}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  {
                    loading === true ? "Loading..." : "You have no stations yet"
                  }
                </Text>
              </View>
            </View>
          )}
        </ImageBackground>
      </View>

      <View style={{marginBottom: 10, marginTop: 10}}>
          <TouchableOpacity accessible={true}
              activeOpacity={0.5} style={[styles.button1, styles.shadowProp]}>
            <Text
              style={styles.textButton1}
              onPress={() => {
                setGlobalState("stationChargeModeEdit", 2);
                navigation.navigate("Edit Station");
              }}
            >
              Add Station
            </Text>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onStartShouldSetResponder={() => true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this station? </Text>

            <View style={{flexDirection: "row", width, alignItems: "center", justifyContent: "center"}}>

              <TouchableOpacity
               accessible={true}
               activeOpacity={0.5}
                style={[styles.buttonModal, styles.buttonYes]}
                onPress={handleDeleteStation}
              >
                <Text style={styles.textStyle} >Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
              accessible={true}
              activeOpacity={0.5}
                style={[styles.buttonModal, styles.buttonNo]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  mainContainer: {
    backgroundColor: "#0A1613",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderColor: "#0A1613",
    borderBottomColor: "#3B9683", 
    borderWidth: 1, 
  },

  headerContainer: {
    width,
    flex: 0.2,
    paddingTop: 30,
    paddingBottom: 20,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  footerContainer: {
    backgroundColor: "#16a085",
    flex: 0.1,
  },

  containerProps: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  
  labelStations:{
    marginTop: 20, 
    width, 
    justifyContent: "center", 
    alignItems: "center", 
    borderTopColor: "#3B9683", 
    borderBottomColor: "#3B9683", 
    borderWidth: 1, 
    padding: 10
  },

  //buttons

  button: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#182724",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 30,
    borderColor: "#00FFDA", 
    borderWidth: 0.3, 
  },

  textButton: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginBottom: 2

  },

  textDetails: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#00FFDA",
  },

  inline: {
    flexDirection: "row",
    flex: 0.2,

  },

  inlinePositioning: {
    flexDirection: "row",
    flex: 0.2,
    alignItems: "center",
    justifyContent: "space-between",

  },

  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    paddingTop: 10,
    borderRadius: 25,
    backgroundColor: "#3B9683",
    marginTop: 10,
    paddingHorizontal: 15,

  },

  textButton1: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginBottom: 5,
  },


  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  lightning: {
    height: 100,
  },

  //Modal

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 700,
    borderRadius: 20,
  
  },
  
  
  modalView: {    
    backgroundColor: "#182724",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: 0,
    margin: 0,
    flex: 1, 
    paddingTop:  20

  },
  
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight:10,
    width: 150,

  },
  buttonYes: {
    backgroundColor: "#16a085",
  },

  buttonNo: {
    backgroundColor: "#FF5D5D",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", 
    fontSize: 18
  },

  modalText: {
    marginBottom: 20,
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width,
  },
});

export default ManageStations;
