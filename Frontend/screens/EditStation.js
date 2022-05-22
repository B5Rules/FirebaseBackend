import React, { useState } from "react";
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
import DropDownPicker from 'react-native-dropdown-picker';
import { Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGlobalState } from "../globals/global";

import { stationServicesChips } from "../slices/serviceChips";

import { httpsCallable } from "firebase/functions";
import { fireFunc } from "../globals/firebase";
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
  const station = route.params;
  const [name, onChangeName] = useState(station?.name || "");
  const [charger, onChangeCharger] = useState(station?.type || 0);
  const [price, onChangePrice] = useState(station?.price || 0); 
  const [services, setServices] = useState(station?.services || [])
  const [response, setResponse] = useState({
    error: false,
    message: '',
    result : null,
  })
  let locationButtonText = 'Modify Location';
  let submitButtonText = 'Update';
  if(station === undefined) {
    locationButtonText = 'Set location';
    submitButtonText = 'Add';
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
      id: station.id,
      name: name,
      price: price,
      services,
      type: charger,
    }
    const response = await updateStationFunc(newStation)
    console.log('Update station response: ',response)
    return response;
  }

  const createStation = async () => {
    const station = {
      name: name, 
      price: price,
      services,
      type: charger,
      coordinates: {
        latitude: 0.0,
        longitude: 0.0,
      }
    }
    const response = await createStationFunc(station)
    console.log('Create station response: ',response)


    return response
  }



  const onSubmit = async () => {
      setResponse(station !== undefined ? 
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
          <ScrollView style={[width, styles.scrollView]}>
            <View style={styles.darkcontainer}>
              <View style={styles.headerContainer}>
                <Image
                  style={{ marginRight: 10, width: 48, height: 48, marginBottom: 20 }}
                  source={require("../images/electric-station.png")}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 20,
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
                <Text style={styles.label}>Station Name</Text>
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
                  setValue={setValue}
                  setItems={setItems}
                  
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

                <Pressable style={styles.button1}>
                  <Text style={styles.textButton1}>{locationButtonText}</Text>
                </Pressable>

                <Pressable style={styles.button2} onPress={onSubmit}>
                  <Text style={styles.textButton2}>{submitButtonText}</Text>
                </Pressable>

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
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
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
    marginTop: 30,
    marginLeft: 70,
    marginRight: 75,
  },

  textButton2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});

export default EditStation;
