import { StatusBar, StyleSheet, Text, SafeAreaView, TextInput, Picker, ImageBackground,Alert, TouchableOpacity, Image, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useValidation } from 'react-native-form-validator';
import {fireAuth, fireFunc} from '../../firebase';
import {httpsCallable} from 'firebase/functions';
import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { setGlobalState,useGlobalState } from '../../state';


const getProfileData = httpsCallable(fireFunc, 'getProfileData');
const updateAccount = httpsCallable(fireFunc, 'updateAccount');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function EditProfile({ navigation }) {
  onAuthStateChanged(fireAuth, user => {if (user == null) navigation.navigate('SignIn')});

  if(useGlobalState('data')[0].username=='') navigation.navigate('ViewProfile');

  const [username, setUsername] = useState(useGlobalState('data')[0].username);
  const [email, setEmail] = useState(useGlobalState('data')[0].email);
  const [firstName, setFirstName] = useState(useGlobalState('data')[0].firstName);
  const [lastName, setLastName] = useState(useGlobalState('data')[0].lastName);
  const [phone, setPhone] = useState(useGlobalState('data')[0].phone);
  //const [country, setCountry] = useState(useGlobalState('data')[0].country);
  
  const { validate, isFieldInError} =
    useValidation({
      state: { firstName, lastName, username, email, phone}
  });
  
  const onPressButton = () => {
    validate({
      firstName: { minlenth: 3, maxlength: 15, required: true },
      lastName: { minlenth: 3, maxlength: 15, required: true },
      username: { minlenth: 3, maxlength: 20,required: true },
      email: { email: true, required: true },
      phone: { minlength: 10, maxlength: 10, numbers: true, required: true },
    });

    if( !isFieldInError('firstName')&& 
      !isFieldInError('lastName') &&
      !isFieldInError('username') && 
      !isFieldInError('email') && 
      !isFieldInError(lastName)) {
        updateAccount({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          phone: phone,
          //country: selectedValue
        }).then(response=>{
          if(response.data['status'] == 0) {
            Alert.alert('Success', 'Your profile has been updated!');
          }else{
            Alert.alert('Error', 'Something went wrong!\n'.concat(response.data['result'].message)); 
          }
        });
      }
      else{
        console.log("poof");
      }
  };
  
  
  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={{backgroundColor: '#000000', minHeight: '100%'}}>

        <StatusBar barStyle="default"/>
        <View style={styles.container}>

          {/* <ImageBackground source={require("../../Images/streets02.png")} resizeMode="cover" style={styles.image}> */}


            <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'flex-start', marginLeft: '10%', width: '100%'}}>
                <Image
                    style={styles.profileImage}
                    source={require('../../Images/Profile_Picture.jpg')}  
                />

              <View style={{flexDirection: 'column', maxWidth: '60%'}}>
                  <Text style={{fontSize: 20, color: 'grey', alignSelf: 'flex-start'}}> Personal profile </Text>
                  <TextInput 
                  editable={false} 
                  textAlign={'center'} 
                  value= {'Hey '.concat(useGlobalState('data')[0].firstName," ",useGlobalState('data')[0].lastName, '!')}
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                    color: '#fff',
                    fontSize: 20,
                    maxWidth: '100%'}}/>
              </View>
            </View>
          
            <View style={{flexDirection: 'row', paddingLeft: '5%', paddingRight: '5%'}}>
              <View style={{flexDirection:'column', maxWidth: '50%'}}>
                <Text style={styles.attachLabel}> First Name </Text>
                <TextInput 
                    placeholder="First Name" 
                    style={styles.inputSmall} 
                    placeholderTextColor = "#f1f1f1" 
                    defaultValue={useGlobalState('data')[0].firstName}
                    on
                    onChangeText={setFirstName}/>
                    {isFieldInError('firstName') &&
                    <Text style={styles.errorMsg}>*First Name must be between 3 and 15 characters!</Text>}
              </View>

              <View style={{flexDirection:'column', maxWidth: '50%'}}>
                <Text style={styles.attachLabel}> Last Name </Text>
                <TextInput 
                    placeholder="Last Name" 
                    style={styles.inputSmall} 
                    placeholderTextColor = "#f1f1f1" 
                    defaultValue={useGlobalState('data')[0].lastName}
                    onChangeText={setLastName}/>
                    {isFieldInError('lastName') &&
                    <Text style={styles.errorMsg}>*Last Name must be between 3 and 15 characters!</Text>}
              </View>
            </View>

            <Text style={styles.attachLabel}> Username </Text>
            <TextInput 
                placeholder="Username" 
                style={styles.input} 
                placeholderTextColor = "#f1f1f1" 
                defaultValue={useGlobalState('data')[0].username}
                onChangeText={setUsername}/>
                {isFieldInError('username') &&
                <Text style={styles.errorMsg}>*Username must be between 3 and 20 characters!</Text>}

            {/* Necesita email de validare */}
            <Text style={styles.attachLabel}> Email address </Text>
            <TextInput 
                placeholder="Email address" 
                keyboard="email-address" 
                style={styles.input} 
                placeholderTextColor = "#f1f1f1" 
                defaultValue={useGlobalState('data')[0].email}
                onChangeText={setEmail}/>
                {isFieldInError('email') &&
                <Text style={styles.errorMsg}>*Email format is not valid!</Text>}

            <Text style={styles.attachLabel}> Phone number </Text>
            <TextInput 
                placeholder="Phone number"
                keyboardType="phone-pad" 
                style={styles.input} 
                placeholderTextColor = "#f1f1f1"
                defaultValue={useGlobalState('data')[0].phone}
                onChangeText={setPhone}/>
                {isFieldInError(lastName) &&
                <Text style={styles.errorMsg}>*Phone number must have 10 digits!</Text>}

            <TouchableOpacity
              onPress={() => {sendPasswordResetEmail(fireAuth, fireAuth.currentUser.email).then(()=>{
                Alert.alert('Password reset email sent');
              });}}
            >
              <Text 
              style={{
                marginTop: 15,
                color: "#167668",   
                fontSize: 20,
                textDecorationLine: 'underline',
              }}> 
                Reset password 
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {
              onPressButton(); 
              getProfileData().then(result=>{
                setGlobalState('needReload',true);
                setGlobalState('data',result.data['result']);
                sleep(100).then(navigation.navigate("ViewProfile"));
                
              }).catch(error=>{
                console.log(error);
              });
              
              }} >
              <Text style={styles.textButton}> Done </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate("ViewProfile")}>
              <Text style={styles.textButton}> Back </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("DeleteAccount")}>
              <Text 
              style={{
                marginTop: 0,
                color: "red",   
                fontSize: 28,
                textDecorationLine: 'underline',
                marginBottom: 10
              }}> 
                Delete account 
              </Text>
            </TouchableOpacity>
              
          {/* </ImageBackground> */}
                  
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1615",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  profileImage: {
    width: 68,
    height: 68,
    borderRadius: 400/ 2,
    borderWidth: 3,
    borderColor: '#05CAAD',
    marginRight: 15,
    marginBottom: 25,
    marginTop: 10,
  },
  dataLabel: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontSize: 20,
  },
  attachLabel: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    color: '#C0C0C0',
    fontSize: 20,
    marginTop: 0,
  },
  button: {
    backgroundColor: "#1B9583",
    width: '60%',
    height: 50,
    marginTop: 15, 
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  buttonBack: {
    backgroundColor: "#024b40",
    width: '55%',
    height: 50,
    marginTop: 20, 
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    marginBottom: 20,
  },
  textButton: {
    color: "#f1f1f1",   
    fontSize: 30,
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
  inputSmall: {
    color: "#f1f1f1",
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    margin: 5,
    width: '95%',
    height: 50,
    fontSize: 20,
    backgroundColor: "#182724",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10
  },
  errorMsg: {
    color: "red",
    fontSize: 16
  },
  errorMsg: {
    color: "#cc0000",
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
});