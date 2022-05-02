import { StatusBar, StyleSheet, Text, SafeAreaView, TextInput, Picker, Button, ImageBackground, TouchableOpacity, Dimensions, Alert, Linking, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useValidation } from 'react-native-form-validator';

import {fireFunc,fireAuth} from '../firebase';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { httpsCallable } from '@firebase/functions';  

const helloWorld = httpsCallable(fireFunc, 'helloWorld');

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const { validate, isFieldInError, getErrorMessages} =
    useValidation({
      state: { email}
  });
  
  const onPressButton = () => {
    validate({
      email: { email: true, required: true },
      passwd: { password: true, required: true }
    });

    if( !isFieldInError('email') && email != "" && passwd != "") {
      
      console.log("Email: " + email);
      console.log("Password: " + passwd);
      signInWithEmailAndPassword(fireAuth,email,passwd).then(() => {
        console.log("Successfully signed in with email and password");
      });
    }

  };

  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default"/>
        <ImageBackground source={require("../Images/streets02.png")} resizeMode="cover" style={styles.image}>
          
          <Image source={require("../Images/Logo.svg")} style={styles.logo} resizeMode="center">

          </Image>
          
          <View style={styles.login}>
            <View style={styles.firsthalf}>

              <TextInput 
                placeholder="Email"
                keyboard="email-address" 
                style={styles.input} 
                placeholderTextColor = "#C4C4C4" 
                onChangeText={setEmail}/>
                {isFieldInError('email') &&
                <Text style={styles.errorMsg}>*Email format is not valid!</Text>}

              <TextInput 
                placeholder="Password"
                keyboard="password" 
                style={styles.input} 
                placeholderTextColor = "#C4C4C4"
                onChangeText={setPasswd}
                secureTextEntry={true} 
                />

              <TouchableOpacity 
                style={styles.button1} 
                onPress={()=>{
                  onPressButton();
                  /*helloWorld().then(response=>{
                    console.log(response.data['result']);
                  });*/
                }}>
                <Text style={styles.textButton1}>Sign in</Text>
              </TouchableOpacity>

              <Text style={styles.forget}
                onPress={() => Linking.openURL('http://google.com')}>
                Did you forget your password?
              </Text>
              
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 2, backgroundColor: 'white', marginLeft: 30}} />
              <View>
                <Text style={{width: 50, textAlign: 'center', color: "white", fontWeight: "bold", fontSize: 20}}>OR</Text>
              </View>
              <View style={{flex: 1, height: 2, backgroundColor: 'white', marginRight: 30}} />
            </View>

            <TouchableOpacity style={styles.button2}>
              <Image source={require("../Images/google.svg")} style={styles.google} resizeMode="center"></Image>
              <Text style={styles.textButton2}>
                Continue with Google
              </Text>
              
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button2}
              onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.textButton2}>Sign up</Text>
            </TouchableOpacity>

          </View>
      </ImageBackground> 
      </SafeAreaView>
    </ScrollView>
  );
}
    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#182724",
      alignItems: "center",
      justifyContent: "center",
    },
    login: {
      backgroundColor: "#05CAAD",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      flex: 1,
      width: "100%"
    },
    google: {
      width: 40,
      height: 40,
      marginTop: 5,
      marginRight: 10
    },
    logo: {
      width: 250,
      height: 250,
      marginBottom: 10
    },
    firsthalf: {
      alignItems: "center",
      marginTop: 50
    },
    forget: {
      fontSize: 16,
      margin: 10,
      fontWeight: "bold",
    },
    button1: {
      backgroundColor: "#1B9583",
      width: 180,
      height: 60,
      marginTop: 20, 
      borderColor: "grey",
      borderWidth: 3,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 8,
    },
    button2: {
      backgroundColor: "#1B9583",
      width: Dimensions.get('window').width - 40,
      marginLeft: "auto",
      marginRight: "auto",
      height: 60,
      margin: 6,
      borderColor: "grey",
      borderWidth: 3,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'row',
    },
    textButton1: {
      color: "#f1f1f1",   
      fontSize: 28,
      fontWeight: "bold",
    },
    textButton2: {
      color: "#f1f1f1",   
      fontSize: 28,
      fontWeight: "bold",
    },
    input: {
      color: "#000000",
      borderColor: "grey",
      borderWidth: 3,
      borderRadius: 15,
      padding: 10,
      margin: 5,
      width: '80%',
      height: 50,
      fontSize: 20,
      backgroundColor: "#ffffff",
    },
    image: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%"
    },
    errorMsg: {
      color: "#cc0000",
      fontSize: 16,
      // textAlign: "center"
      alignSelf: 'flex-start',
      marginLeft: '10%',
    },
  });