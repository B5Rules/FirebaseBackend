import React, { useState } from 'react';
import {  StatusBar, 
          StyleSheet, 
          Text, TextInput,
          SafeAreaView, ScrollView, View,
          ImageBackground, Image, Picker, 
          TouchableOpacity, Pressable, Button } from 'react-native';

import { useValidation } from 'react-native-form-validator';

import { fireAuth,fireFunc } from '../firebase';
import {httpsCallable} from "firebase/functions";
import { signInWithEmailAndPassword } from 'firebase/auth';

const createAccount = httpsCallable(fireFunc,'createAccount');

function afiseaza(nume, prenume, porecla, mail, tel, parola, parola2) {
  onAuthStateChanged(fireAuth, user => {
    if (user != null) {
      navigation.navigate('ViewProfile');
    }else{
      //console.log('We are not authenticated now!');
    }
  
    // Do other things
  });

  console.log('First Name: ' + prenume + 
              '\nLast Name: ' + nume + 
              '\nUsername: ' + porecla +
              '\nEmail: ' + mail +
              '\nPhone Number: ' + tel + 
              '\nPassword: ' + parola +
              '\nConfirmPassword: ' + parola2 )
}

export default function SignUp ({ navigation }) {
  
  const [selectedValue, setSelectedValue] = useState("Romania");

  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { validate, isFieldInError, getErrorMessages} =
    useValidation({
      state: { firstName, lastName, username, email, number, password, confirmPassword }
  });

  const onPressButton = () => {
    validate({
      firstName: { minlenth: 3, maxlength: 15, required: true },
      lastName: { minlenth: 3, maxlength: 15, required: true },
      username: { minlenth: 3, maxlength: 20,required: true },
      email: { email: true, required: true },
      number: { minlength: 10, maxlength: 10, numbers: true, required: true },
      password: { minlength: 6, maxlength: 20, hasNumber: true, required: true},
      confirmPassword: { equalPassword: password, required: true }
    });

    if( !isFieldInError('firstName') && firstName != "" && 
        !isFieldInError('lastName') && lastName != "" &&
        !isFieldInError('username') && username != "" &&
        !isFieldInError('email') && email != "" &&
        !isFieldInError('number') && number != "" &&
        !isFieldInError('password') && password != "" &&
        !isFieldInError('confirmPassword') && confirmPassword != "") {
          createAccount({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            phone: number,
            password: password,
            confirmPassword: confirmPassword
          }).then(result => {
            console.log(result);
            signInWithEmailAndPassword(fireAuth,email, password).then(result => {
              //console.log(result);
              navigation.navigate('ViewProfile');
            }).catch(error => {
              console.log(error);
            });
          });
        }//afiseaza(lastName, firstName, username, email, number, password, confirmPassword);
  };

  return(
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, }}
        contentContainerStyle={{ flexGrow: 1, }}>
          
      <SafeAreaView style={{backgroundColor: '#000000'}}>
        <View style={registerStyles.container}>

        <StatusBar barStyle="default"/>

        <Image source={require("../Images/Logo.png")} style={registerStyles.logo} resizeMode="center"/>

        {/* <ImageBackground source={require("../Images/streets02.png")} resizeMode="cover" style={registerStyles.image}> */}

          <TextInput placeholder="First Name" style={registerStyles.input} placeholderTextColor = "#BCBCBC"
          onChangeText={setFName}/>
          {isFieldInError('firstName') &&
          <Text style={registerStyles.errorMsg}>*First Name must be between 3 and 15 characters!</Text>}

          <TextInput placeholder="Last Name" style={registerStyles.input} placeholderTextColor = "#BCBCBC"
          onChangeText={setLName}/>
          {isFieldInError('lastName') &&
          <Text style={registerStyles.errorMsg}>*Last Name must be between 3 and 15 characters!</Text>}

          <TextInput placeholder="Username" style={registerStyles.input} placeholderTextColor = "#BCBCBC"
          onChangeText={setUsername}/>
          {isFieldInError('username') &&
          <Text style={registerStyles.errorMsg}>*Username must be between 3 and 20 characters!</Text>}

          <TextInput placeholder="Email"
          keyboard="email-address" style={registerStyles.input} placeholderTextColor = "#BCBCBC"
          onChangeText={setEmail}/>
          {isFieldInError('email') &&
          <Text style={registerStyles.errorMsg}>*Email format is not valid!</Text>}

          <TextInput placeholder="Phone number"
          keyboardType="phone-pad" style={registerStyles.input} placeholderTextColor = "#BCBCBC"
          onChangeText={setNumber}/>
          {isFieldInError('number') &&
          <Text style={registerStyles.errorMsg}>*Phone number must have 10 digits!</Text>}

          <TextInput placeholder="Password" 
          secureTextEntry={true} style={registerStyles.input} placeholderTextColor = "#BCBCBC"
          onChangeText={setPassword}/>
          {isFieldInError('password') &&
          <Text style={registerStyles.errorMsg}>*Password must be:   {'\n'}    between 10 and 20 characters {'\n'}    including 1 number {'\n'}    1 upper case character {'\n'}    1 special character!</Text>}
          
          <TextInput placeholder="Confirm Password" 
          secureTextEntry={true} style={registerStyles.input} placeholderTextColor = "#BCBCBC"
          onChangeText={setConfirmPassword}/>
          {isFieldInError('confirmPassword') &&
          <Text style={registerStyles.errorMsg}>*Passwords must match!</Text>}

          <Pressable 
            style={registerStyles.button}
            onPress={onPressButton}>
            {/* onPress={() => { console.log('First Name: ' + firstName + '\nLast Name: ' + lastName + '\nUsername: ' + username) }}> */}
            {/* onPress={() => { afiseaza(lastName, firstName, username) }}> */}
            {/* onPress={afiseaza(firstName)}> */}

            <Text style={registerStyles.textButton}>Sign up now</Text>
          </Pressable>

          <Text style={registerStyles.errorMsg}>
            {getErrorMessages}
          </Text>

        {/* </ImageBackground>  */}

        </View>
      </SafeAreaView>
     </ScrollView>
  )
}

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1615",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingBottom: 20,
    },
  button: {
    backgroundColor: "#1B9583",
    width: 270,
    height: 60,
    marginTop: 20, 
    marginBottom: 10,
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  textButton: {
    color: "#f1f1f1",   
    fontSize: 36,
    fontWeight: "bold",
  },
  input: {
    color: "#f1f1f1",
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    margin: 5,
    width: '90%',
    height: 50,
    fontSize: 20,
    backgroundColor: "#182724",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    
  },
  errorMsg: {
    color: "#cc0000",
    fontSize: 14,
    // textAlign: "center"
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    marginTop: 40,
  },
});