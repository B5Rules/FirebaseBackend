import { StatusBar, StyleSheet, Text, TextInput, SafeAreaView, Image, View, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { fireAuth ,fireFunc} from '../../firebase';
import { httpsCallable } from 'firebase/functions';
import { useState } from 'react/cjs/react.development';

const getProfileData = httpsCallable(fireFunc, 'getProfileData');

let getName = () => { return 'Iulian Manole'; }
let getEmail = () => { return 'iulian.manole@gmail.com'; }
let getPhoneNumber = () => { return '0758 660 127'; }
let getCountry = () => { return 'Romania'; }
let getLastTransaction = () => { return '⪢Last transaction: 25/04/2022 - Loc: Mihai\'s House' }

let returnData;

const getAllStations = httpsCallable(fireFunc, 'getAllStations');

export default function ViewProfile({ navigation }) {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  //const [country, setCountry] = useState('');
  const [lastTransaction, setLastTransaction] = useState('');



  onAuthStateChanged(fireAuth, user => {
    
    if (user != null) {
      //navigation.navigate('ViewProfile');
      
    }else{
      //console.log('oh no');
      navigation.navigate('SignIn');
      
    }
    
  
    // Do other things
  });
  
  //acest if inlatura apeluri inutile
  if(returnData == undefined){
    
    /*getAllStations().then(result => {
      //console.log(result);
    }).catch(error => {
      console.log(error);
    });
    */
    getProfileData().then(data => {
          
      returnData = data.data['result'];
      setFirstName(returnData['firstName']);
      setLastName(returnData['lastName']);
      setEmail(returnData['email']);
      setPhoneNumber(returnData['phoneNumber']);
      setUsername(returnData['username']);
      //setCountry(returnData['country']);

    }).catch(error => {
      console.log("function failed");
    });
    console.log(returnData);
  }
  
  if(undefined == returnData){
    return null;
  }
  else{
    return (
      <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={{backgroundColor: '#000000', minHeight: '100%'}}>

          <StatusBar barStyle="default"/>
          <View style={styles.container}>
          
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:"flex-start", marginTop: 60, marginLeft: '10%', width: '100%'}}>
                <Image
                    style={styles.profileImage}
                    source={require('../../Images/Profile_Picture.jpg')}  
                />

              <View style={{flexDirection: 'column', alignItems:'flex-start', maxWidth: '60%'}}>
                  <Text style={{fontSize: 22, color: 'grey'}}> Personal profile </Text>
                  <TextInput 
                  editable={false} 
                  textAlign={'center'} 
                  defaultValue= {''.concat('Hey ', returnData.username, '!')}
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                    color: '#fff',
                    fontSize: 28,
                    maxWidth: '100%'}}/>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.attachLabel}> Name </Text>
              <TextInput editable={false} defaultValue={returnData.username} style={styles.dataLabel}/>
              <View style={styles.line} />
            </View>

            <View style={styles.card}>
              <Text style={styles.attachLabel}> Email address </Text>
              <TextInput editable={false} defaultValue={returnData.email} style={styles.dataLabel}/>
              <View style={styles.line} />
            </View>
            
            <View style={styles.card}>
              <Text style={styles.attachLabel}> Phone Number </Text>
              <TextInput editable={false} defaultValue={returnData.phone} style={styles.dataLabel}/>
              <View style={styles.line} />
            </View>
            
            <View style={styles.card}>
              <Text style={styles.attachLabel}> Country </Text>
              <TextInput editable={false} defaultValue={getCountry()} style={styles.dataLabel}/>
              <View style={styles.line} />
            </View>

            <View style={styles.paymentJournal}>
              <Text style={{
                fontSize: 28,
                color: '#fff',
                textShadowColor: '#fff',
                textShadowRadius: 2,
                marginLeft: 10,
              }}> 
                Payment Journal 
              </Text>
              
              <View style={styles.line} />
              
              <TextInput 
              editable={false} 
              defaultValue={getLastTransaction()}
              multiline={true}
              style={{
                fontSize: 20,
                color: '#05CAAD',
                height: '90%',
                marginLeft: 10,
              }}/>

              <Image
                source={require('../../Images/Journal_Icon.svg')}  
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 15,
                  position: 'absolute',
                  bottom: 10,
                  right: '45%',
                }}
              />

            </View>

            <Pressable style={styles.buttonEdit} onPress={() => navigation.navigate("EditProfile")}>
              
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.buttonText}> Edit Profile </Text>
                <Image
                    source={require('../../Images/Edit_Button.svg')}  
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 15,
                    }}
                />
              </View>

            </Pressable>

            <Pressable style={styles.buttonLogOut} onPress={() => {
              fireAuth.signOut();
              }}>

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.buttonText}> Log Out </Text>
                <Image
                    source={require('../../Images/Logout_Icon.svg')}  
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 15
                    }}
                />
              </View>
                
            </Pressable>

          </View>

        </SafeAreaView>
      </ScrollView>
    );
  }
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
      borderColor: '#ffffff',
      paddingBottom: 50,
      },
    line: {
        borderBottomColor: '#05CAAD',
        borderWidth: 2,
        width: '100%',
      },
    card: {
      backgroundColor: '#13201E', 
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10, 
      paddingTop: 5, 
      marginTop: 32,
      width: '90%',
      //opacity: 0.3,
    },
    profileImage: {
        width: 68,
        height: 68,
        borderRadius: 400/ 2,
        borderWidth: 3,
        borderColor: '#05CAAD',
        marginRight: 15,
        marginTop: 10,
      },
    nameLabel: {
        color: '#fff',
        fontSize: 44,
        alignSelf: 'center',
        width: '50%',
      },
    attachLabel: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        color: '#C0C0C0',
        fontSize: 22,
        //marginTop: 32,
      },
    dataLabel: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        color: '#fff',
        fontSize: 24,
      },
    buttonEdit: {
        backgroundColor: '#04ae95',
        width: '75%',
        height: '7%',
        marginTop: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogOut: {
        backgroundColor: '#024b40',
        width: '50%',
        height: '6%',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

      },
    buttonText: {
        fontSize: 32,
        color: 'white',
      },
    paymentJournal: {
      marginTop: 30,
      padding: '2%',
      width: '90%',
      height: '20%',
      borderWidth: 3,
      borderColor: '#04ae95',
      borderRadius: 20,
      backgroundColor: '#182724',
     },
});

