import { StyleSheet, Text, View,KeyboardAvoidingView, TextInput,TouchableHighlight,Alert,BackHandler,Image } from 'react-native'
import React,{ useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useValidation } from 'react-native-form-validator';
import {getGlobalState,setGlobalState} from '../globals/global';
import { fireFunc } from '../globals/firebase';
import { httpsCallable } from 'firebase/functions';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import * as NavigationBar from 'expo-navigation-bar';
import EditButton from '../images/editButton';
import { useIsFocused } from '@react-navigation/native';
import {Platform} from 'react-native';
import { useBackButton } from '../hocs/backButtonHandler';

const insertProfile = httpsCallable(fireFunc, 'insertProfile');

function check_publisher_key(inputtxt) {
  return (inputtxt == '') || (inputtxt.startsWith('pk_live_') && (inputtxt.length == 107));
}

function check_secret_key(inputtxt) {
  return (inputtxt == '')||(inputtxt.startsWith('sk_live_') && (inputtxt.length == 107));
}

const ProfileSetup = ({navigation}) => {
  
  const handleBackButton = () => {
    if(getGlobalState('needUpdate')){
      navigation.navigate('AuthHandler');
    }else{
      navigation.navigate('MapNavigator');
    }
    return true;
  }

  const isFocused = useIsFocused();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [username,setUsername] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [phone,setPhone] = useState('');
  const [secKey,setSecKey] = useState('');
  const [pubKey,setPubKey] = useState('');
  useBackButton(handleBackButton)

  useEffect(() => {
    if(!getGlobalState('needUpdate')){
      setUsername(getGlobalState('userData').username);
      setFirstName(getGlobalState('userData').firstName);
      setLastName(getGlobalState('userData').lastName);
      setPhone(getGlobalState('userData').phone);
      setSecKey(getGlobalState('userData').secKey);
      setPubKey(getGlobalState('userData').pubKey);
    }
    Platform.OS === 'android' && NavigationBar.setBackgroundColorAsync('#182724')
  }, [isFocused]);
  
  const { validate, isFieldInError, getErrorMessages} =
    useValidation({
      state: { firstName, lastName, username, phone,selectedCountry,secKey,pubKey }
    });


  const handleSubmit = () => {
    
    if( check_publisher_key(pubKey) && check_secret_key(secKey)){
      if(validate({
          firstName: { minlenth: 3, maxlength: 15, required: true },
          lastName: { minlenth: 3, maxlength: 15, required: true },
          username: { minlenth: 3, maxlength: 20,required: true },
          phone: { minlength: 10, maxlength: 10, numbers: true, required: true },
          country: { required: true },
          //secKey: {required: true},
          //pubKey: {required: true}
      })){
        //insert profile
        insertProfile({
          username: username,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          country: selectedCountry,
          secKey: secKey,
          pubKey: pubKey
        }).then(response=>{
          if(response.data['status']==0){
            //success
            setGlobalState('userData',{
              username: username,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              country: selectedCountry,
              uid: response.data['uid'],
              secKey: secKey,
              pubKey: pubKey
            });
            setGlobalState('needUpdate',false);
            navigation.navigate('MapNavigator');
          }else{
            //failed, alert with error message
            Alert.alert('Profile update failed',response.data['message']);
          }
        }).catch(error=>{
          console.log("signup error");
          console.log(error);
        });
      }
    }
    else{
      Alert.alert("Key format error","The keys are in a wrong format");
    }
  };

  return (
    <View style={{height:'100%'}}>
      <KeyboardAvoidingView
      style={styles.container}
      >
        <View style={styles.inputContainer}>
          
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
            >Username</Text>
            <TextInput
            style={{
              fontSize: 20, 
              color: '#fff',
              width: '92%',
            }}
            defaultValue={username}
            onChangeText={setUsername}
            placeholder={''}
            placeholderTextColor={'#aaaaaa'}
            />
            <EditButton/>
          </View>
          {isFieldInError('username') && <Text style={styles.error}>*Username must be between 3 and 20 characters!</Text>}
          
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
            >First Name</Text>
            <TextInput
            style={{
              fontSize: 20, 
              color: '#fff',
              width: '92%',
            }}
            defaultValue={firstName}
            onChangeText={setFirstName}
            placeholder={''}
            placeholderTextColor={'#aaaaaa'}
            />
            <EditButton/>
          </View>
          {isFieldInError('firstName') && <Text style={styles.error}>*First Name must be between 3 and 15 characters!</Text>}
          
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
            >Last Name</Text>
            <TextInput
            style={{
              fontSize: 20, 
              color: '#fff',
              width: '92%',
            }}
            defaultValue={lastName}
            onChangeText={setLastName}
            placeholder={''}
            placeholderTextColor={'#aaaaaa'}
            />
            <EditButton/>
          </View>
          {isFieldInError('lastName') && <Text style={styles.error}>*Last Name must be between 3 and 15 characters!</Text>}
          
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
            >Phone number</Text>
            <TextInput
            style={{
              fontSize: 20, 
              color: '#fff',
              width: '92%',
            }}
            defaultValue={phone}
            keyboardType={'phone-pad'}
            onChangeText={setPhone}
            placeholder={''}
            placeholderTextColor={'#aaaaaa'}
            />
            <EditButton/>
          </View>
          {isFieldInError('phone') && <Text style={styles.error}>*Phone number must have 10 digits!</Text>}

          <View style={registerStyles.wrapper}>
            
              <Picker
                selectedValue={selectedCountry}
                style={registerStyles.picker}
                itemStyle={Platform.OS === 'ios' && registerStyles.item}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCountry(itemValue)
                }
              >
                <Picker.Item value="Afghanistan" label="Afganistan" />
                <Picker.Item value="Albania" label="Albania" />
                <Picker.Item value="Algeria" label="Algeria" />
                <Picker.Item value="American Samoa " label="American Samoa" />
                <Picker.Item value="Andorra" label="Andorra" />
                <Picker.Item value="Angola" label="Angola" />
                <Picker.Item value="Anguilla" label="Anguilla" />
                <Picker.Item
                  value="Antigua & Barbuda"
                  label="Antigua & Barbuda"
                />
                <Picker.Item value="Argentina" label="Argentina" />
                <Picker.Item value="Armenia" label="Armenia" />
                <Picker.Item value="Aruba" label="Aruba" />
                <Picker.Item value="Australia" label="Australia" />
                <Picker.Item value="Austria" label="Austria" />
                <Picker.Item value="Azerbaijan" label="Azerbaijan" />
                <Picker.Item value="Bahamas" label="Bahamas" />
                <Picker.Item value="Bahrain" label="Bahrain" />
                <Picker.Item value="Bangladesh" label="Bangladesh" />
                <Picker.Item value="Barbados" label="Barbados" />
                <Picker.Item value="Belarus" label="Belarus" />
                <Picker.Item value="Belgium" label="Belgium" />
                <Picker.Item value="Belize" label="Belize" />
                <Picker.Item value="Benin" label="Benin" />
                <Picker.Item value="Bermuda" label="Bermuda" />
                <Picker.Item value="Bhutan" label="Bhutan" />
                <Picker.Item value="Bolivia" label="Bolivia" />
                <Picker.Item value="Bonaire" label="Bonaire" />
                <Picker.Item
                  value="Bosnia & Herzegovina"
                  label="Bosnia & Herzegovina"
                />
                <Picker.Item value="Botswana" label="Botswana" />
                <Picker.Item value="Brazil" label="Brazil" />
                <Picker.Item
                  value="British Indian Ocean Ter"
                  label="British Indian Ocean Ter"
                />
                <Picker.Item value="Brunei" label="Brunei" />
                <Picker.Item value="Bulgaria" label="Bulgaria" />
                <Picker.Item value="Burkina Faso" label="Burkina Faso" />
                <Picker.Item value="Burundi" label="Burundi" />
                <Picker.Item value="Cambodia" label="Cambodia" />
                <Picker.Item value="Cameroon" label="Cameroon" />
                <Picker.Item value="Canada" label="Canada" />
                <Picker.Item value="Canary Islands" label="Canary Islands" />
                <Picker.Item value="Cape Verde" label="Cape Verde" />
                <Picker.Item value="Cayman Islands" label="Cayman Islands" />
                <Picker.Item
                  value="Central African Republic"
                  label="Central African Republic"
                />
                <Picker.Item value="Chad" label="Chad" />
                <Picker.Item value="Channel Islands" label="Channel Islands" />
                <Picker.Item value="Chile" label="Chile" />
                <Picker.Item value="China" label="China" />
                <Picker.Item
                  value="Christmas Island"
                  label="Christmas Island"
                />
                <Picker.Item value="Cocos Island" label="Cocos Island" />
                <Picker.Item value="Colombia" label="Colombia" />
                <Picker.Item value="Comoros" label="Comoros" />
                <Picker.Item value="Congo" label="Congo" />
                <Picker.Item value="Cook Islands" label="Cook Islands" />
                <Picker.Item value="Costa Rica" label="Costa Rica" />
                <Picker.Item value="Cote DIvoire" label="Cote DIvoire" />
                <Picker.Item value="Croatia" label="Croatia" />
                <Picker.Item value="Cuba" label="Cuba" />
                <Picker.Item value="Curacao" label="Curaco" />
                <Picker.Item value="Cyprus" label="Cyprus" />
                <Picker.Item value="Czech Republic" label="Czech Republic" />
                <Picker.Item value="Denmark" label="Denmark" />
                <Picker.Item value="Djibouti" label="Djibouti" />
                <Picker.Item value="Dominica" label="Dominica" />
                <Picker.Item
                  value="Dominican Republic"
                  label="Dominican Republic"
                />
                <Picker.Item value="East Timor" label="East Timor" />
                <Picker.Item value="Ecuador" label="Ecuador" />
                <Picker.Item value="Egypt" label="Egypt" />
                <Picker.Item value="El Salvador" label="El Salvador" />
                <Picker.Item
                  value="Equatorial Guinea"
                  label="Equatorial Guinea"
                />
                <Picker.Item value="Eritrea" label="Eritrea" />
                <Picker.Item value="Estonia" label="Estonia" />
                <Picker.Item value="Ethiopia" label="Ethiopia" />
                <Picker.Item
                  value="Falkland Islands"
                  label="Falkland Islands"
                />
                <Picker.Item value="Faroe Islands " label="Faroe Islands" />
                <Picker.Item value="Fiji" label="Fiji" />
                <Picker.Item value="Finland" label="Finland" />
                <Picker.Item value="France" label="France" />
                <Picker.Item value="French Guiana" label="French Guiana" />
                <Picker.Item
                  value="French Polynesia"
                  label="French Polynesia"
                />
                <Picker.Item
                  value="French Southern Ter"
                  label="French Southern Ter"
                />
                <Picker.Item value="Gabon" label="Gabon" />
                <Picker.Item value="Gambia" label="Gambia" />
                <Picker.Item value="Georgia" label="Georgia" />
                <Picker.Item value="Germany" label="Germany" />
                <Picker.Item value="Ghana" label="Ghana" />
                <Picker.Item value="Gibraltar" label="Gibraltar" />
                <Picker.Item value="Great Britain" label="Great Britain" />
                <Picker.Item value="Greece" label="Greece" />
                <Picker.Item value="Greenland" label="Greenland" />
                <Picker.Item value="Grenada" label="Grenada" />
                <Picker.Item value="Guadeloupe" label="Guadeloupe" />
                <Picker.Item value="Guam" label="Guam" />
                <Picker.Item value="Guatemala" label="Guatemala" />
                <Picker.Item value="Guinea" label="Guinea" />
                <Picker.Item value="Guyana" label="Guyana" />
                <Picker.Item value="Haiti" label="Haiti" />
                <Picker.Item value="Hawaii" label="Hawaii" />
                <Picker.Item value="Honduras" label="Honduras" />
                <Picker.Item value="Hong Kong" label="Hong Kong" />
                <Picker.Item value="Hungary" label="Hungary" />
                <Picker.Item value="Iceland" label="Iceland" />
                <Picker.Item value="Indonesia" label="Indonesia" />
                <Picker.Item value="India" label="India" />
                <Picker.Item value="Iran" label="Iran" />
                <Picker.Item value="Iraq" label="Iraq" />
                <Picker.Item value="Ireland" label="Ireland" />
                <Picker.Item value="Isle of Man" label="Isle of Man" />
                <Picker.Item value="Israel" label="Israel" />
                <Picker.Item value="Italy" label="Italy" />
                <Picker.Item value="Jamaica" label="Jamaica" />
                <Picker.Item value="Japan" label="Japan" />
                <Picker.Item value="Jordan" label="Jordan" />
                <Picker.Item value="Kazakhstan" label="Kazakhstan" />
                <Picker.Item value="Kenya" label="Kenya" />
                <Picker.Item value="Kiribati" label="Kiribati" />
                <Picker.Item value="Korea North" label="Korea North" />
                <Picker.Item value="Korea South" label="Korea Sout" />
                <Picker.Item value="Kuwait" label="Kuwait" />
                <Picker.Item value="Kyrgyzstan" label="Kyrgyzstan" />
                <Picker.Item value="Laos" label="Laos" />
                <Picker.Item value="Latvia" label="Latvia" />
                <Picker.Item value="Lebanon" label="Lebanon" />
                <Picker.Item value="Lesotho" label="Lesotho" />
                <Picker.Item value="Liberia" label="Liberia" />
                <Picker.Item value="Libya" label="Libya" />
                <Picker.Item value="Liechtenstein" label="Liechtenstein" />
                <Picker.Item value="Lithuania" label="Lithuania" />
                <Picker.Item value="Luxembourg" label="Luxembourg" />

                <Picker.Item value="Malaysia" label="Malaysia" />
                <Picker.Item value="Malawi" label="Malawi" />
                <Picker.Item value="Maldives" label="Maldives" />
                <Picker.Item value="Mali" label="Mali" />
                <Picker.Item value="Malta" label="Malta" />
                <Picker.Item
                  value="Marshall Islands"
                  label="Marshall Islands"
                />
                <Picker.Item value="Martinique" label="Martinique" />
                <Picker.Item value="Mauritania" label="Mauritania" />
                <Picker.Item value="Mauritius" label="Mauritius" />
                <Picker.Item value="Mayotte" label="Mayotte" />
                <Picker.Item value="Mexico" label="Mexico" />
                <Picker.Item value="Midway Islands" label="Midway Islands" />
                <Picker.Item value="Moldova" label="Moldova" />
                <Picker.Item value="Monaco" label="Monaco" />
                <Picker.Item value="Mongolia" label="Mongolia" />
                <Picker.Item value="Montserrat" label="Montserrat" />
                <Picker.Item value="Morocco" label="Morocco" />
                <Picker.Item value="Mozambique" label="Mozambique" />
                <Picker.Item value="Myanmar" label="Myanmar" />

                <Picker.Item value="Nambia" label="Nambia" />
                <Picker.Item value="Nauru" label="Nauru" />
                <Picker.Item value="Nepal" label="Nepal" />
                <Picker.Item
                  value="Netherland Antilles "
                  label="Netherland Antilles"
                />
                <Picker.Item
                  value="Netherlands (Holland, Europe) "
                  label="Netherlands"
                />
                <Picker.Item value="New Caledonia" label="Nevis" />
                <Picker.Item value="Nevis" label="New Caledonia" />
                <Picker.Item value="New Zealand" label="New Zealand" />
                <Picker.Item value="Nicaragua" label="Nicaragua" />
                <Picker.Item value="Niger" label="Niger" />
                <Picker.Item value="Nigeria" label="Nigeria" />
                <Picker.Item value="Niue" label="Niue" />
                <Picker.Item value="Norfolk Island" label="Norfolk Island" />
                <Picker.Item value="Norway" label="Norway" />
                <Picker.Item value="Oman" label="Oman" />
                <Picker.Item value="Pakistan" label="Pakistan" />
                <Picker.Item value="Palau Island" label="Palau Island" />
                <Picker.Item value="Palestine" label="Palestine" />
                <Picker.Item value="Panama" label="Panama" />
                <Picker.Item
                  value="Papua New Guinea"
                  label="Papua New Guinea"
                />
                <Picker.Item value="Paraguay" label="Paraguay" />
                <Picker.Item value="Peru" label="Peru" />
                <Picker.Item value="Philippines" label="Phillipines" />
                <Picker.Item value="Pitcairn Island" label="Pitcairn Island" />
                <Picker.Item value="Poland" label="Poland" />
                <Picker.Item value="Portugal" label="Portugal" />
                <Picker.Item value="Puerto Rico" label="Puerto Rico" />
                <Picker.Item value="Qatar" label="Qatar" />
                <Picker.Item
                  value="Republic of Montenegro"
                  label="Republic of Montenegro"
                />
                <Picker.Item
                  value="Republic of Serbia"
                  label="Republic of Serbia"
                />
                <Picker.Item value="Reunion" label="Reunion" />
                <Picker.Item value="Romania" label="Romania" />
                <Picker.Item value="Russia" label="Russia" />
                <Picker.Item value="Rwanda" label="Rwanda" />
                <Picker.Item value="St Barthelemy" label="St Barthelemy" />
                <Picker.Item value="St Eustatius" label="St Eustatius" />
                <Picker.Item value="St Helena" label="St Helena" />
                <Picker.Item value="St Kitts-Nevis" label="St Kitts-Nevis" />
                <Picker.Item value="St Lucia" label="St Lucia" />
                <Picker.Item value="St Maarten" label="St Maarten" />
                <Picker.Item
                  value="St Pierre & Miquelon"
                  label="St Pierre & Miquelon"
                />
                <Picker.Item
                  value="St Vincent & Grenadines"
                  label="St Vincent & Grenadines"
                />
                <Picker.Item value="Saipan" label="Saipan" />
                <Picker.Item value="Samoa" label="Samoa" />
                <Picker.Item value="Samoa American" label="Samoa American" />
                <Picker.Item value="San Marino" label="San Marino" />
                <Picker.Item
                  value="Sao Tome & Principe"
                  label="Sao Tome & Principe"
                />
                <Picker.Item value="Saudi Arabia" label="Saudi Arabia" />
                <Picker.Item value="Senegal" label="Senegal" />
                <Picker.Item value="Seychelles" label="Seychelles" />
                <Picker.Item value="Sierra Leone" label="Sierra Leone" />
                <Picker.Item value="Singapore" label="Singapore" />
                <Picker.Item value="Slovakia" label="Slovakia" />
                <Picker.Item value="Slovenia" label="Slovenia" />
                <Picker.Item value="Solomon Islands" label="Solomon Islands" />
                <Picker.Item value="Somalia" label="Somalia" />
                <Picker.Item value="South Africa" label="South Africa" />
                <Picker.Item value="Spain" label="Spain" />
                <Picker.Item value="Sri Lanka" label="Sri Lanka" />
                <Picker.Item value="Sudan" label="Sudan" />
                <Picker.Item value="Suriname" label="Suriname" />
                <Picker.Item value="Swaziland" label="Swaziland" />
                <Picker.Item value="Sweden" label="Sweden" />
                <Picker.Item value="Switzerland" label="Switzerland" />
                <Picker.Item value="Syria" label="Syria" />
                <Picker.Item value="Tahiti" label="Tahiti" />
                <Picker.Item value="Taiwan" label="Taiwan" />
                <Picker.Item value="Tajikistan" label="Tajikistan" />
                <Picker.Item value="Tanzania" label="Tanzania" />
                <Picker.Item value="Thailand" label="Thailand" />
                <Picker.Item value="Togo" label="Togo" />
                <Picker.Item value="Tokelau" label="Tokelau" />
                <Picker.Item value="Tonga" label="Tonga" />
                <Picker.Item
                  value="Trinidad & Tobago"
                  label="Trinidad & Tobago"
                />
                <Picker.Item value="Tunisia" label="Tunisia" />
                <Picker.Item value="Turkey" label="Turkey" />
                <Picker.Item value="Turkmenistan" label="Turkmenistan" />
                <Picker.Item
                  value="Turks & Caicos Is"
                  label="Turks & Caicos Is"
                />
                <Picker.Item value="Tuvalu" label="Tuvalu" />
                <Picker.Item value="Uganda" label="Uganda" />
                <Picker.Item value="United Kingdom" label="United Kingdom" />
                <Picker.Item value="Ukraine" label="Ukraine" />
                <Picker.Item
                  value="United Arab Emirates"
                  label="United Arab Erimates"
                />
                <Picker.Item
                  value="United States of America"
                  label="United States of America"
                />
                <Picker.Item value="Uruguay" label="Uraguay" />
                <Picker.Item value="Uzbekistan" label="Uzbekistan" />
                <Picker.Item value="Vanuatu" label="Vanuatu" />
                <Picker.Item
                  value="Vatican City State"
                  label="Vatican City State"
                />
                <Picker.Item value="Venezuela" label="Venezuela" />
                <Picker.Item value="Vietnam" label="Vietnam" />
                <Picker.Item
                  value="Virgin Islands (Brit)"
                  label="Virgin Islands (Brit)"
                />
                <Picker.Item
                  value="Virgin Islands (USA)"
                  label="Virgin Islands (USA)"
                />
                <Picker.Item value="Wake Island" label="Wake Island" />
                <Picker.Item
                  value="Wallis & Futana Is"
                  label="Wallis & Futana Is"
                />
                <Picker.Item value="Yemen" label="Yemen" />
                <Picker.Item value="Zaire" label="Zaire" />
                <Picker.Item value="Zambia" label="Zambia" />
                <Picker.Item value="Zimbabwe" label="Zimbabwe" />
              </Picker>
            </View>
            {isFieldInError("country") && <Text style={styles.error}>Required</Text>}

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
            >Stripe Security Key</Text>
            <TextInput
            style={{
              fontSize: 20, 
              color: '#fff',
              width: '92%',
            }}
            defaultValue={secKey}
            keyboardType={'default'}
            onChangeText={setSecKey}
            placeholder={''}
            placeholderTextColor={'#aaaaaa'}
            />
            <EditButton/>
          </View>
          {isFieldInError('secKey') && <Text style={styles.error}>*Required</Text>}

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
            >Stripe Private Key</Text>
            <TextInput
            style={{
              fontSize: 20, 
              color: '#fff',
              width: '92%',
            }}
            defaultValue={pubKey}
            keyboardType={'default'}
            onChangeText={setPubKey}
            placeholder={''}
            placeholderTextColor={'#aaaaaa'}
            />
            <EditButton/>
          </View>
          {isFieldInError('pubKey') && <Text style={styles.error}>*Required</Text>}


          <TouchableHighlight
          onPress={()=>{handleSubmit();}}
          style={styles.button}
          underlayColor={'#22e6ab'}
          >
            <Text
            style={styles.buttonText}
            >Submit</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
   </View>
  )
}

export default ProfileSetup
const IOSMargins = Platform.OS === 'ios' ? {
  marginTop: 50,
  marginBottom: 50,
} : {}
const registerStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#182724",
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 15,
    marginVertical: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    ...IOSMargins
  },
  item: {
    color: '#FFF'
  },
  picker: {
    color: "#f1f1f1",
    fontSize: 20,
  },
});

const styles = StyleSheet.create({
  backgroundImage:{
      height: '100%',
      backgroundColor:'#0A1613',
  },
  logo:{
      height:120,
      resizeMode: 'contain',
      marginBottom:20,
  },  
  container: {
      paddingVertical: 50,
      paddingHorizontal: 30,
      justifyContent: 'center',
      alignItems: 'center',
  },
  input: {
      color:'white',
      backgroundColor: "#171D20",
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 10,
      marginTop: 10,
      borderWidth:0,
      borderBottomWidth: 2,
      borderColor:'#ababab',
      fontSize:20,
      width:'100%',
      
  },
  inputContainer: {
      width:'100%',
      paddingTop:40
  },
  buttonContainer: {
      width:"60%",
      justifyContent: 'center',
      alignItems: 'center',
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
      borderColor: '#05CAAD',
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