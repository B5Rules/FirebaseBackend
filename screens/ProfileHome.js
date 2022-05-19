import { StyleSheet, Text, View,TextInput,TouchableHighlight,Alert,BackHandler,Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageBackground from 'react-native/Libraries/Image/ImageBackground'
import { fireAuth,fireFunc } from '../globals/firebase';
import { signOut, updatePassword } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { useIsFocused } from '@react-navigation/native'

import {getGlobalState,setGlobalState} from '../globals/global';

import * as NavigationBar from 'expo-navigation-bar';
import EditButton from '../images/editButton'


const deleteAccount = httpsCallable(fireFunc, 'deleteAccount');

const ProfilePage = ({navigation}) => {

  const isFocused = useIsFocused();
  /*
  const handleBackButton = () => {
    Alert.alert('Exit','Are you sure you want to exit?',[
      {text: 'No', onPress: () => {}, style: 'cancel'},
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  }*/

  useEffect(()=>{
    NavigationBar.setBackgroundColorAsync('#182724')
    /*const back = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      back.remove();  
    };*/
  },[isFocused]);

  const [password, setPassword] = useState('');

  const handleSignOut = () => {
    signOut(fireAuth).then(()=>{
      navigation.navigate('AuthHandler');
      setGlobalState('userData',{
        username: '',
        firstName: '',
        lastName: '',
        phone: ''
      });
      setGlobalState('needUpdate',true);
    })
  }

  const handleChangePassword = ()=>{
    updatePassword(fireAuth.currentUser,password).then(()=>{
      Alert.alert('Password Updated','Please login with your new password');
      signOut(fireAuth).then(()=>{
        navigation.navigate('AuthHandler');
      });
    });
  }
  
  return (
    <View style={{height:'100%'}}>
      <View style={[styles.container,{
        borderWidth:1,
        borderColor:'#05CAAD',
        height:'90%',
        padding:0,
        margin:10,
        marginTop:50,
        backgroundColor:'#0A1613'
      }]}>
          <TouchableOpacity
            style={{padding:10,width:40,height:40,borderRadius:10,backgroundColor:'#05CAAD'}}
            onPress={()=>{}}
          >
            <Image
              style={{height:'100%',width:'100%',resizeMode:'contain'}}
              source={require('../images/refresh.png')}
            ></Image>
          </TouchableOpacity>
          <Text 
          style={styles.buttonText}>
          Welcome, {getGlobalState('userData').firstName.concat(" ",getGlobalState('userData').lastName,"!")}</Text>
          <View
          style={[styles.input,{
            flexWrap: 'wrap', 
            alignItems: 'flex-start',
            flexDirection:'row',
            paddingRight:10
          }]}
          >
            <Text
            style={{
              width: '100%',
              color:'#ababab',
              fontSize:15,
            }}
            >Change password</Text>
            <TextInput
            style={{
              fontSize: 20, 
              color: '#fff',
              width: '92%',
            }}
            defaultValue={''}
            onChangeText={setPassword}
            placeholder={'New password'}
            placeholderTextColor={'#aaaaaa'}
            />
            <EditButton/>
          </View>

        <TouchableHighlight
        onPress={handleChangePassword}
        style={styles.button}
        underlayColor={'#22e6ab'}
        >
            <Text
            style={styles.buttonText}
            >Submit</Text>
        </TouchableHighlight>

        <TouchableHighlight
        onPress={()=> {navigation.navigate('Enter_kwh')} }
        style={styles.button}
        underlayColor={'#22e6ab'}
        >
            <Text
            style={styles.buttonText}
            >Simulate Payment</Text>
        </TouchableHighlight>

        <TouchableHighlight
        onPress={()=>{navigation.navigate('ProfileSetup')}}
        style={styles.button}
        underlayColor={'#22e6ab'}
        >
            <Text
            style={styles.buttonText}
            >Edit Profile</Text>
        </TouchableHighlight>


        <TouchableHighlight
        onPress={handleSignOut}
        style={styles.button}
        underlayColor={'#22e6ab'}
        >
            <Text
            style={styles.buttonText}
            >Sign out</Text>
        </TouchableHighlight>

        <TouchableHighlight
        onPress={()=>{
          Alert.alert(
            'Delete your account?',
            'This action cannot be undone.',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                deleteAccount().then(()=>{
                  fireAuth.signOut().then(()=>{
                    navigation.navigate('AuthHandler')
                    setGlobalState('userData',{
                      username: '',
                      firstName: '',
                      lastName: '',
                      phone: ''
                    });
                    setGlobalState('needUpdate',true);
                  });
                }).catch(error=>{
                  Alert.alert('Error',error.message);
                });
              }},
            ],
            { cancelable: false }
          )
        }}
        style={styles.button}
        underlayColor={'#22e6ab'}
        >
            <Text
            style={[styles.buttonText,{
              color:'red',
            }]}
            >Delete account</Text>
        </TouchableHighlight>

      </View>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  backgroundImage:{
      height: '100%',
      backgroundColor:'#0A1613'
  },
  logo:{
      height:120,
      resizeMode: 'contain',
      marginBottom:20,
  },  
  container: {
      paddingVertical: 50,
      paddingHorizontal: 30,
  },
  input: {
      color:'white',
      backgroundColor: "#0c1f1c",
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 10,
      marginTop: 10,
      borderWidth:0,
      borderBottomWidth:2,
      borderColor:'#ababab',
      fontSize:20,
      width:'100%'
  },
  inputContainer: {
      width:'80%',
      paddingTop:40
  },
  buttonContainer: {
      width:"60%",
      justifyContent: 'center',
      marginBottom: 40,
      marginTop: 20
  },
  button: {
      backgroundColor: '#3B9683',
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 15,
      borderColor: '#a1a1a1',
      borderWidth: 0,
  },
  buttonText: {
      color: '#e6e6e6',
      fontWeight: '700',
      fontSize: 20,
  },
  hyperlink: {
      color: '#086dcc',
      fontWeight: '700',
      fontSize: 16,
      alignSelf: 'center',
      marginBottom:60
  },
  error: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
      marginBottom: 5
  },
  fieldLabel: {
    color: 'white',
    fontSize: 20,
    marginTop: 10
  }
})