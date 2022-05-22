import React, {useState} from "react";
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
import { Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGlobalState } from "../globals/global";

import { stationServicesChips } from '../slices/serviceChips'

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

export class Form extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "Enter Name",
      email: "Enter Email Asddress",
    };
  }
}


const EditStation = ({ navigation, route }) => {
  const station = route.params;
  const [name, onChangeName] = useState(station.name);
  const [charger, onChangeCharger] = useState(station.type);
  const [price, onChangePrice] = useState(station.price); //Adjustable Current
  const [hidden, setHidden] = useState(false);


  const pressedStation = (serviceName) => {
    // TODO: Finish this!
    // for(const service in station.serviceName) {
    //   console.log('Service', service)
    //   if(serviceName.toLowerCase() === service)
    //     return true;
    // }
    return false;
  }


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={[styles.mainContainer, styles.containerProps]}>
        <ImageBackground
          source={require("../images/streets.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <ScrollView style={[ width, styles.scrollView ]}>
            <View style={styles.darkcontainer}>
              <View style={styles.headerContainer}>
                <Image
                  style={{ marginRight: 10 }}
                  source={require("../images/Blue-circle.png")}
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
                <Text style={styles.label}>Charger</Text>
                <View style={styles.input}>
                  <TextInput
                    style={styles.inputs}
                    onChangeText={onChangeCharger}
                    value={`${charger} kWh`}
                  />
                  <Image
                    style={styles.icon}
                    source={require("../images/edit.png")}
                  />
                </View>
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
              <Text style={styles.textChips}> Services </Text>
                <View style={styles.chips}>                            
                  <View style={styles.chipsContent}>
                    {
                      stationServicesChips.map(stationChip => (
                          <Chip
                            key={`chip-${stationChip}`}
                            style={styles.chip}
                            mode="flat"
                            selectedColor="#01A78F"
                            onPress={() => console.log("Pressed: ", stationChip)}
                            selected={pressedStation(stationChip)}
                          >
                            {` ${stationChip} `}
                          </Chip>
                      ))
                    }
                  </View>
                </View>

                <Pressable style={styles.button1}>
                  <Text style={styles.textButton1}>Modify Location</Text>
                </Pressable>

                <Pressable style={styles.button2}>
                  <Text style={styles.textButton2}>Update</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </View>
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
  scrollView : {
    paddingTop: 60,
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
    marginTop: 20,
  },

  label :{
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
