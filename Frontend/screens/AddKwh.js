import React from 'react';
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable, TouchableHighlight, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");


const AddKwh = () => {

  const [kWh, onChangekWh] = React.useState("50 kWh");
  
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
        
        <View style={styles.smallcontainer}>

          <View style={styles.form}>

          <Text style={{ fontSize: 18, color: "white", marginBottom: 15 }}>
             Add the kWh you need here   
            </Text>

          <TextInput style={[styles.input, styles.shadowProp]}
                onChangeText={onChangekWh}
                value={kWh}
                />



          </View>
          <View style={styles.btncontainer}>
          <Pressable style={styles.button2}>
            <Text style={styles.textButton2}>ADD</Text>
          </Pressable>

          </View>
          </View>

        
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

  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 4,
  },

  //Form
  form: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: "white",
    fontSize: 18, 
    fontWeight: "bold",
    width: width-100
  },


  // Buttons
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

export default AddKwh;