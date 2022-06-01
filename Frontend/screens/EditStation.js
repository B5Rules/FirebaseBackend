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
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Modal,
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGlobalState, setGlobalState } from "../globals/global";

import { stationServicesChips } from "../slices/serviceChips";

import { httpsCallable } from "firebase/functions";
import { fireFunc } from "../globals/firebase";
import { useIsFocused } from "@react-navigation/native";

import Svg, { Circle } from 'react-native-svg';

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
const updateStationFunc = httpsCallable(
  fireFunc,
  "updateStation"
);

const createStationFunc = httpsCallable(
  fireFunc,
  "createStation"
);

const EditStation = ({ navigation, route }) => {
  
  const isFocused = useIsFocused();
  const mode = getGlobalState("stationChargeModeEdit");
  const [station, setStation] = useState(route.params);
  useEffect(() => {
    if(isFocused && getGlobalState("stationChangeModeActive") === true){
        setStation(getGlobalState("stationChangeMode"));
        setGlobalState('stationChangeModeActive', false);
    }
  }, [isFocused])
  
  const [name, onChangeName] = useState(station?.name || "");
  const [charger, setCharger] = useState(station?.type || 0);
  const [price, onChangePrice] = useState(station?.price || 0); 
  const [services, setServices] = useState(station?.services || [])
  const [response, setResponse] = useState({
    error: false,
    message: '',
    result : null,
  })
  let locationButtonText = 'Modify Location';
  let submitButtonText = 'Update';
  if(mode === 2) {
    locationButtonText = 'Set location';
    submitButtonText = 'Add';
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '55', value: '55'},
    {label: '43', value: '43'},
    {label: '22', value: '22'}
  ]);

  const pressedStation = (serviceName) => {
    for(const service of services) {
        if(serviceName === service)
          return true;
    }
    return false;
  };

  const serviceButtonPressAction = (serviceName) => {
    if(pressedStation(serviceName)) {
      setServices(services.filter(service => service !== serviceName));
    }
    else {
      setServices([...services, serviceName]);
    }
  }

  const updateStation = async () => {
    const newStation = {
      id: station?.id,
      name: name,
      price: price,
      services,
      type: charger,
      coordinates: {
        latitude: station?.coordinates?.latitude,
        longitude: station?.coordinates?.longitude,
      }
    }
    // console.log('Update data: ', newStation);
    const response = await updateStationFunc(newStation)
    if(response.error !== true) {
      setStation(newStation);
    }
    // console.log('Update station response: ',response)
    return response;
  }

  const createStation = async () => {
    const newStation = {
      name: name, 
      price: price,
      services,
      type: charger,
      coordinates: {
        latitude: station?.coordinates?.latitude,
        longitude: station?.coordinates?.longitude,
      }
    }
    // console.log('Station created: ', newStation);
    const response = await createStationFunc(newStation)
    // console.log('Create station response: ',response)


    return response
  }

  const goToMap = () => {
    // console.log("sending data to map: ", station)
    setGlobalState("stationChangeMode", station);
    setGlobalState("stationChangeModeActive", true);
    navigation.navigate("StationLocationOnMap")
  }

  useEffect(() => {
    console.log(response);
    if(!response || !response?.data || response.data.message === "") return;

    if(response?.data?.error === true) {
      setFailModalVisible(true);
    } else {
      setModalVisible(true);
    }
  }, [response])

  const onSubmit = async () => {
      setResponse((mode === 1) ? 
        await updateStation()
        : await createStation()
      );

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.mainContainer, styles.containerProps]}>
        <ImageBackground
          source={require("../images/streets.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <ScrollView nestedScrollEnabled={true}  style={[width, styles.scrollView]}>
            <View style={styles.darkcontainer}>
              <View style={styles.headerContainer}>
                <Image
                  style={{ marginRight: 10, width: 48, height: 48, marginBottom: 20 }}
                  source={require("../images/electric-station.png")}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: 5,
                    }}
                  >
                    Provider account
                  </Text>
                </View>
              </View>

              <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.input}>
                  <TextInput
                    style={styles.inputs}
                    onChangeText={onChangeName}
                    value={name}
                  />
                  <Image
                    style={styles.icon}
                    source={require("../images/edit.png")}
                  />
                </View>

                  {/* <Image
                    style={styles.icon}
                    source={require("../images/edit.png")}
                  /> */}
               
                <Text style={styles.label}>Price</Text>

                <View style={styles.input}>
                  <TextInput
                    style={styles.inputs}
                    onChangeText={onChangePrice}
                    value={`${price}`}
                  />
                  <Image
                    style={styles.icon}
                    source={require("../images/edit.png")}
                  />
                </View>

                <Text style={styles.label}>Charger</Text>
                <DropDownPicker
                  open={open}
                  value={`${charger}`}
                  items={items}
                  containerStyle={{height: 40,marginBottom: 20}}
                  style={{backgroundColor: '#182724', borderBottomColor:"white", borderBottomWidth: 2, marginBottom: 10,     
                  borderTopLeftRadius: 5, borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
                  textStyle={{ fontSize: 18 }}
                  labelStyle={{fontWeight: "bold",color: "white" }}
                  dropDownStyle={{backgroundColor: '#182724'}}
                  arrowStyle={{color: "white", marginRight: 20}}
                  setOpen={setOpen}
                  setValue={setCharger}
                  setItems={setItems}
                  listMode="SCROLLVIEW"      
                />


                <Text style={styles.textChips}> Services </Text>
                <View style={styles.chips}>
                  <View style={styles.chipsContent}>
                    {stationServicesChips.map((stationChip) => (
                      <Chip
                        key={`chip-${stationChip}`}
                        style={styles.chip}
                        mode="flat"
                        selectedColor="#01A78F"
                        onPress={() => serviceButtonPressAction(stationChip.toLowerCase())}
                        selected={pressedStation(stationChip.toLowerCase())}
                      >
                        {` ${stationChip} `}
                      </Chip>
                    ))}
                  </View>
                </View>

                <TouchableOpacity accessible={true}
                activeOpacity={0.5} style={styles.button1} onPress={goToMap}>
                  <Text style={styles.textButton1}>{locationButtonText}</Text>
                </TouchableOpacity>
                                                                             {/* setFailModalVisible(true) */}
                <TouchableOpacity accessible={true}
                activeOpacity={0.5} style={styles.button2} onPress={onSubmit}>
                  <Text style={styles.textButton2}>{submitButtonText}</Text>
                </TouchableOpacity>
              </View>

              {/* popup for succes */}
              <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
              >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Image
                    style={{ marginRight: 10, width: 48, height: 48, marginBottom: 20 }}
                    source={require("../images/check-circle.png")}
                  />

                <Text style={styles.modalText}>Your changes have been successfully saved!</Text>

                  <View style={{flexDirection: "row", width, alignItems: "center", justifyContent: "center"}}>

                    <TouchableOpacity accessible={true}
                    activeOpacity={0.5}
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalVisible(!modalVisible) ; navigation.navigate("Manage Stations")}}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>


              {/* popup for fail */}
              <Modal
              animationType="slide"
              transparent={true}
              visible={failModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setFailModalVisible(!failModalVisible);
              }}
              >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Image
                    style={{ marginRight: 10, width: 48, height: 48, marginBottom: 20 }}
                    source={require("../images/error-icon.png")}
                  />

                <Text style={styles.modalText}>Something went wrong. Changes were not saved.</Text>

                  <View style={{flexDirection: "row", width, alignItems: "center", justifyContent: "center"}}>

                    <TouchableOpacity accessible={true}
                    activeOpacity={0.5}
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setFailModalVisible(!failModalVisible) ; navigation.navigate("Manage Stations")}}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
    paddingTop: 10
  },

  // form
  form: {
    // marginTop: 20,
  },

  label: {
    flex: 1,
    fontSize: 18,
    color: "white",
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },

  inputs: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  input: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#182724",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginBottom: 10,
    borderRadius: 5,
  },

  inputDropdown:{

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  icon: {
    padding: 10,
    marginRight: 10,
    height: 2,
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
  },

  textChips: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginLeft: 7
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

  //buttons
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#182724",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderColor: "white", 
    borderWidth: 0.5, 
  },

  textButton1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#01A78F",
    marginTop: 20,
    marginLeft: 70,
    marginRight: 75,
  },

  textButton2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  //modal

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 650,
    borderRadius: 20,
  
  },
  
  
  modalView: {    
    backgroundColor: "#182724",
    borderRadius: 20,
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
    paddingTop: 30,
   

  },
  
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight:10,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#16a085",
    marginBottom: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalText: {
    marginBottom: 35,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width,
  },
});

export default EditStation;
