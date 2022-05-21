import React from 'react';
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable, TouchableHighlight, Alert} from "react-native";
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


const ManagePersonalData = () => {

  const [name, onChangeName] = React.useState("Name Station");
  const [charger, onChangeCharger] = React.useState("Charging Plug");
  const [plug, onChangePlug] = React.useState("Power Plug");
  const [current, onChangeCurrent] = React.useState("Adjustable Current"); //Adjustable Current
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
              <Text style={{ fontSize: 20, fontWeight: "bold", color:"#6B6464", marginBottom: 5 }}>
                Provider account
              </Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
                Provider Name
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
              onChangeText={onChangePlug}
              value={plug}
              />
                <Image style={styles.icon}
                      source={require('../images/edit.png')}/>
              
              </View>
              <View style={styles.input}>
              <TextInput style={styles.inputs}
              onChangeText={onChangeCurrent}
              value={current}
              />
                <Image style={styles.icon}
                      source={require('../images/edit.png')}/>
              
              </View>
              <View style={styles.input}>

              <TextInput style={styles.inputs}
              onChangeText={onChangeVoltage}
              value={voltage}
              />     
                <Image style={styles.icon}
                      source={require('../images/edit.png')}/>
              
              </View>
              <View style={styles.input}>
              <TextInput style={styles.inputs}
              onChangeText={onChangeProtection}
              value={protection}
              />
                <Image style={styles.icon}
                      source={require('../images/edit.png')}/>
              
              </View>

  

          <Pressable style={styles.button1}>
            <Text style={styles.textButton1}>Add Picture</Text>
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
    backgroundColor: "#182724",
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
    backgroundColor: "#182724",
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

  //buttons
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#00FFDA',
    marginTop: 30,
    
  },

  textButton1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
 
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#01A78F',
    marginTop: 30,
    marginLeft: 55,
    marginRight: 55,
    
  },

  textButton2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    
  },

});

export default ManagePersonalData;