import React from 'react';
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable, TouchableHighlight, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";


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
        <View style={[styles.headerContainer, styles.containerProps]}>
          <Image
            style={{marginRight: 20 }}
            source={require('../images/Blue-circle.png')}
          />
          <View> 
            <Text style={{ fontSize: 20, fontWeight: "bold", color:"#6B6464", marginBottom: 5 }}>
              Provider account
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
                Provider Name
            </Text>
          </View>

        </View>       
        <ScrollView style={{ width }}>
        <View style={styles.smallcontainer}>
            <View style={{    alignItems: "center", justifyContent: "center"}}>
              <Image
              source={require('../images/car-photo.png')}
              />
            </View>
            <View>
              <View style={styles.detail}>
              <Text style={{ fontSize: 20, color: "white", marginRight: 5 }}>
                Station Details: 
              </Text>
              <Text style={{ fontSize: 20, color: "#00FFDA" }}>
                X Station
              </Text>

              </View>
              <View style={styles.detail}>
              <Text style={{ fontSize: 20, color: "white", marginRight: 5 }}>
                Charging Plug: 
              </Text>
              <Text style={{ fontSize: 20, color: "#00FFDA" }}>
                Type 1 Plug
              </Text>

              </View>
              <View style={styles.detail}>
              <Text style={{ fontSize: 20, color: "white", marginRight: 5 }}>
                Power Plug: 
              </Text>
              <Text style={{ fontSize: 20, color: "#00FFDA" }}>
              Nema 5-15 plug
              </Text>
              </View>
              <View style={styles.detail}>
              <Text style={{ fontSize: 20, color: "white", marginRight: 5 }}>
              Adjustable Curren: 
              </Text>
              <Text style={{ fontSize: 20, color: "#00FFDA" }}>
              6A/8A/10A
              </Text>

              </View>
              <View style={styles.detail}>
              <Text style={{ fontSize: 20, color: "white", marginRight: 5 }}>
              Working Voltage: 
              </Text>
              <Text style={{ fontSize: 20, color: "#00FFDA" }}>
              110V AC
              </Text>
              </View>

              <View style={styles.detail}>
              <Text style={{ fontSize: 20, color: "white", marginRight: 5 }}>
              Protection Level :
              </Text>
              <Text style={{ fontSize: 20, color: "#00FFDA" }}>
              IP65
              </Text>
              </View>

            </View>

          </View>
          <View style={styles.btncontainer}>

          <Pressable style={styles.button}>
          <Image
          source={require('../images/Settings.png')}
          />

          </Pressable>

          <Pressable style={styles.button1}>
          <Image
          source={require('../images/ArrowBack.png')}
          />

            </Pressable>
            

          </View>


          <TouchableHighlight style={styles.buttonCharge} onPress={() => navigation.navigate("Enter_kwh")}>
            <Text style={styles.buttonChargeText}>Charge Now</Text>
          </TouchableHighlight>

          
        </ScrollView>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom:'45%'
  },
   
  headerContainer: {
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom:10,
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },

  mainContainer: {
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  containerProps: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },

  smallcontainer: {
    marginTop:20,
    backgroundColor: '#182724',
    borderRadius: 20,
    padding: 20,
    marginRight:30,
    marginLeft:30
  },


  detail: {
    flex: 1,
    padding:10,
    flexWrap: 'wrap',
    alignContent: "space-between",
    flexDirection: 'row',
    backgroundColor:"#182724",
    borderBottomColor:"white",
    borderBottomWidth: 2,
    marginBottom: 10,
    borderRadius: 5,
    
  },

  // Buttons
  btncontainer: {
    
    flex: 1,
    paddingTop:20,
    paddingLeft:40,
    paddingRight:40,
    marginRight:40,
    marginLeft:40,
    flexDirection: 'row',

  },

  button:{
    flex:1,
  },

  button1:{
    marginRight: 10,
  },

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

});

export default StationInfo;