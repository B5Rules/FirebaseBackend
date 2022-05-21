import React from 'react';
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable, TouchableHighlight, Alert} from "react-native";
import { Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

export class Form extends React.Component{
  static navigationOptions={
    header: null
  }

  constructor(props) {
    super(props);
    this.state={
      name:"Enter Name",
      email:"Enter Email Asddress"

    }
  }
}


const EditStation = () => {

  const [name, onChangeName] = React.useState("Station Name");
  const [charger, onChangeCharger] = React.useState("Charging Plug");
  const [price, onChangePrice] = React.useState("Price"); //Adjustable Current
  const [voltage, onChangeVoltage] = React.useState("Working Voltage");
  const [protection, onChangeProtection] = React.useState("Protection Level");

  
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.mainContainer, styles.containerProps]}>
        <ImageBackground source={require('../images/streets.png')} resizeMode="cover" style={styles.image}>

        <ScrollView style={{ width }}>
          <View style={styles.darkcontainer}>
            <View style={styles.headerContainer}>

              <Image
                  style={{marginRight: 10 }}
                  source={require('../images/Blue-circle.png')}
              />
              <View> 
              <Text style={{ fontSize: 20, fontWeight: "bold", color:"white", marginBottom: 5 }}>
                Provider account
              </Text>
                </View>

            </View>

            <View style={styles.form}>

              <View style={styles.input}>
                <TextInput style={styles.inputs}
                onChangeText={onChangeName}
                value={name}
                />
                <Image style={styles.icon}
                      source={require('../images/edit.png')}/>
              
              </View>

              <View style={styles.input}>
              <TextInput style={styles.inputs}
              onChangeText={onChangeCharger}
              value={charger}
              />
                <Image style={styles.icon}
                  source={require('../images/edit.png')}/>
              
              </View>
        

              <View style={styles.input}>
              <TextInput style={styles.inputs}
              onChangeText={onChangePrice}
              value={price}
              />
                <Image style={styles.icon}
                      source={require('../images/edit.png')}/>
              
              </View>

              <View style={styles.chips}>
              <Text style={styles.textChips}> Services   </Text>

                <View style={styles.chipsContent}>
                  <Chip style={styles.chip} mode="flat" selectedColor="#01A78F"> coffee </Chip>
                  <Chip style={styles.chip} mode="flat" selectedColor="#01A78F"> food </Chip>
                  <Chip style={styles.chip} mode="flat" selectedColor="#01A78F"> gas </Chip>
                  <Chip style={styles.chip} mode="flat" selectedColor="#01A78F"> hotel </Chip>
                  <Chip style={styles.chip} mode="flat" selectedColor="#01A78F"> bathroom </Chip>
                  
                </View>              
              </View>

          <Pressable style={styles.button1}>
            <Text style={styles.textButton1}>Add Location</Text>
          </Pressable>

          <Pressable style={styles.button2}>
            <Text style={styles.textButton2}>ADD</Text>
          </Pressable>

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
    paddingBottom:'45%'
 
  },
   
  headerContainer: {
    flex: 0.2,
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },

  mainContainer: {
    backgroundColor: "#0A1613",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  containerProps: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },

  darkcontainer: {
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 40,
    padding: 20,

  },

  // form
  form: {
    marginTop: 20

  },

  inputs: {
    flex:1,
    fontSize: 18, 
    fontWeight: "bold",
    color: "white",
  },

  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    backgroundColor:"#182724",
    borderBottomColor:"white",
    borderBottomWidth: 2,
    marginBottom: 10,
    borderRadius: 5,

  },

  icon: {
    padding: 10,
    marginRight: 10,
    height: 2
  },

  //chips:

  chips:{

    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    color: "white",
    backgroundColor:"#182724",
    borderBottomColor:"white",
    borderBottomWidth: 2,

  },

  textChips:{
    fontSize: 18, 
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  chipsContent:{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip:{
    margin: 5,
    color: "#00FFDA",
  },

  //buttons
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#182724',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    
  },

  textButton1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
 
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#01A78F',
    marginTop: 30,
    marginLeft: 70,
    marginRight: 75,
    
  },

  textButton2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    
  },

});

export default EditStation;