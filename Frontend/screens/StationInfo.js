import React from 'react';
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable, TouchableHighlight, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Chip } from "react-native-paper";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");


const StationInfo = () => {

  const [name, onChangeName] = React.useState("Name Station");
  const [charger, onChangeCharger] = React.useState("Charging Plug");
  const [plug, onChangePlug] = React.useState("Power Plug");
  const [current, onChangeCurrent] = React.useState("Adjustable Current"); //Adjustable Current
  const [voltage, onChangeVoltage] = React.useState("Working Voltage");
  const [protection, onChangeProtection] = React.useState("Protection Level");

  const navigation = useNavigation();
  
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

                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color: "white",
                      margin: 20,
                    }}
                  >
                    Station Name
                  </Text>
                </View>
              </View>
        
            <View style={{alignItems: "center", justifyContent: "center",marginHorizontal: 100}}>
              <Image style={{width: 200, height:100, borderRadius: 50}}
              source={require('../images/charging-car2.jpg')}
              />
            </View>
            <View>
            {/* <Text style={styles.label}>Name</Text>
              <View style={styles.detail}>
              <Text style={{flex: 1,
                fontSize: 18,
                fontWeight: "bold",
                color: "white"
                }}>
                X Station
              </Text>

            </View> */}

            
            <Text style={styles.label}>Price</Text>
              <View style={styles.detail}>
              <Text style={{flex: 1,
                fontSize: 18,
                fontWeight: "bold",
                color: "white"}}>
                1.2 Ron
              </Text>

            </View>

            <Text style={styles.label}>Charge</Text>
              <View style={styles.detail}>
              <Text style={{flex: 1,
                fontSize: 18,
                fontWeight: "bold",
                color: "white"}}>
                22
              </Text>

            </View>

            <Text style={styles.label}>Services</Text>
            <View style={styles.chips}>
                  <View style={styles.chipsContent}>
                    {/* {stationServicesChips.map((stationChip) => ( */}
                      <Chip
                        // key={`chip-${stationChip}`}
                        style={styles.chip}
                        mode="flat"
                        selectedColor="#01A78F"
                        // onPress={() => serviceButtonPressAction(stationChip.toLowerCase())}
                        // selected={pressedStation(stationChip.toLowerCase())}
                      >
                        {/* {` ${stationChip} `} */} Bathroom
                      </Chip>

                      <Chip 
                      style={styles.chip}
                      mode="flat"
                      selectedColor="#01A78F">
                        Coffee

                      </Chip>
                      <Chip 
                      style={styles.chip}
                      mode="flat"
                      selectedColor="#01A78F">
                        Food

                      </Chip>
                    {/* ))} */}
                  </View>
                </View>


                

        <View style={styles.inlineContainer}>
               <Text style={styles.label}>Distance from your place</Text>
              <View style={styles.detail}>
              <Text style={{flex: 1,
                fontSize: 18,
                fontWeight: "bold",
                color: "white"}}>
                22,3 km
              </Text>

            </View>
        </View>
        
        <View style={styles.inlineContainer}>
               <Text style={styles.label}>Time</Text>
              <View style={styles.detail}>
              <Text style={{flex: 1,
                fontSize: 18,
                fontWeight: "bold",
                color: "white"}}>
                30 min
              </Text>

            </View>
        </View>

        <View style={styles.inlineContainer}>
        <Text style={styles.label}>Disponibility</Text>
      <View style={{    alignItems: "center",
    justifyContent: "center",}}>
      <Pressable style={styles.free} >
            <Text style={styles.textStyle}>Free</Text>
        </Pressable>

        {/* <Pressable style={[styles.free, styles.busy]} >
            <Text style={[styles.textStyle,styles.textBusy]}>Busy</Text>
        </Pressable>

        <Pressable style={[styles.free, styles.reserved]} >
            <Text style={[styles.textStyle,styles.textReserved]}>Reserved</Text>
        </Pressable> */}
      </View>
      </View>




              
          <TouchableHighlight 
            accessible={true}
            activeOpacity={0.5} 
            style={styles.button2}  
            onPress={() => navigation.navigate("Enter_kwh")}>
            <Text style={styles.textButton2}>Charge Now</Text>
          </TouchableHighlight>


          <TouchableHighlight 
            accessible={true}
            activeOpacity={0.5} 
            style={[styles.button2, styles.button3]}  
            >
            <Text style={[styles.textButton2, styles.textButton3]}>Reserve</Text>
          </TouchableHighlight>
            </View>

          </View>

          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
    )
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
    marginRight:10,
    marginLeft:10
  },

  detail: {
    flex: 1,
    padding:10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor:"#182724",
    borderBottomColor:"white",
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

  label2:{

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
    marginBottom: 50
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

  button3:{
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

  textButton3:{
    fontSize: 18,

  },

  free: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 170,
    backgroundColor: "white",
    color: "#01A78F",
    borderColor: "#01A78F",
    borderWidth: 2
  },

  busy: {
    borderColor: "#FF5D5D",
  },

  reserved:{
    borderColor: "#fdca40",
  },

  textStyle: {
    color: "#01A78F",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  
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


});

export default StationInfo;