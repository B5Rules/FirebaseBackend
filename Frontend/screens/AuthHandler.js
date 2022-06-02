import { StyleSheet, Text, View,Image,Alert,BackHandler } from 'react-native'
import React,{useState,useEffect} from 'react'
import { KeyboardAvoidingView, TextInput, TouchableHighlight,TouchableOpacity } from 'react-native'
import { useValidation,customValidationMessages } from 'react-native-form-validator';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import HidewithKeyboard from 'react-native-hide-with-keyboard';
import {fireAuth,fireFunc} from '../globals/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getGlobalState, setGlobalState } from '../globals/global';
import Logo from '../components/Logo';
import * as NavigationBar from 'expo-navigation-bar';
import { useIsFocused } from '@react-navigation/native';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const getProfileData = httpsCallable(fireFunc,'getProfileData');
let daemonIsRunning = false;

const AuthHandler = ({navigation}) => {

    const isFocused = useIsFocused();

    const handleBackButton = () => {
        Alert.alert('Exit','Are you sure you want to exit?',[
            {text: 'No', onPress: () => {}, style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
    }

    

    useEffect(() => {
        AsyncStorage.getItem('email').then(email=>{
            console.log(email);
            if(email){
              AsyncStorage.getItem('password').then(password=>{
                if(password){
                  signInWithEmailAndPassword(fireAuth,email,password).then(()=>{
                    console.log('signed in');
                  });
                } 
              });
            }
          });
        onAuthStateChanged(fireAuth,(user) => {
            if(!!user){
                postAuth();
            }
        });
        Platform.OS === 'android' && NavigationBar.setBackgroundColorAsync('#05CAAD')
        const back = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            back.remove();
        };
    },[isFocused]);

    const postAuth = () => {
        
        if(getGlobalState('needUpdate')==true){
            getProfileData().then(response=>{
                if(response.data['result']==null){
                    //profile doesn't exist
                    navigation.navigate('ProfileSetup');
                }
                else{
                    //profile exists; shove it in global state
                    setGlobalState('userData',{
                        username: response.data['result']['username'],
                        firstName: response.data['result']['firstName'],
                        lastName: response.data['result']['lastName'],
                        phone: response.data['result']['phone'],
                        country: response.data['result']['country'],
                        uid: response.data['result']['uid'],
                        secKey: response.data['result']['secKey'],
                        pubKey: response.data['result']['pubKey']
                    });
                    setGlobalState('needUpdate',false);
                    navigation.navigate('MapNavigator');
                }
            }).catch(error=>{
                console.log('getprofiledata error');
                console.log(error)
            });
        }
    }

    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [whichScreen,setWhichScreen] = useState(1);
  
    const {validate, isFieldInError,getErrorsInField} = useValidation({
        state:{ email, password,confirmPassword },
        messages: customValidationMessages
    });

    const validateInputSignIn = function(){
        return validate({
            email: { required: true, email: true },
            password: { required: true, minLength: 6}
        });
    }
    const validateInputSignUp = function(){
        return validate({
            email: { required: true, email: true },
            password: { required: true, minLength: 6},
            confirmPassword: { required: true, equalPassword: password}
        });
    }

    const handleSignUp = () => {
        if(validateInputSignIn()){
            createUserWithEmailAndPassword(fireAuth,email,password).then((creds)=>{
                AsyncStorage.setItem('email',email);
                AsyncStorage.setItem('password',password);
                postAuth();
                navigation.navigate('MapNavigator');
                console.log('success');
            }).catch(error=>{
                console.log(error);
                Alert.alert("Registration failed",error.message);
            });
        }
    }

    const handleSignIn = () => {
        if(validateInputSignIn()){
            signInWithEmailAndPassword(fireAuth,email,password).then(()=>{
                AsyncStorage.setItem('email',email);
                AsyncStorage.setItem('password',password);
                postAuth();
                navigation.navigate('MapNavigator');
                console.log('success');
            }).catch(error=>{
                console.log(error);
                Alert.alert("Authentication failed",error.message);
            });
        }
    };
    
    if(whichScreen == 1){
        return(
            <View style={{height:'100%'}}>
            <KeyboardAvoidingView
            style={styles.container}
            behavior="height"
            keyboardVerticalOffset={-50}
            >
                <HidewithKeyboard><Logo></Logo></HidewithKeyboard>
                <View style={{
                        backgroundColor:'#05CAAD',
                        width:"100%",
                        alignItems:'center',
                        flex:1,
                        borderTopLeftRadius:30,
                        borderTopRightRadius:30,
                    }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                        placeholder="Email"
                        placeholderTextColor={'#bababa'}
                        keyboardType='visible-password'
                        //value={''}
                        onChangeText={setEmail}
                        style={styles.input}
                        />
                        {isFieldInError('email') && getErrorsInField('email').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}

                        <TextInput
                        placeholder="Password"
                        placeholderTextColor={'#bababa'}
                        secureTextEntry
                        keyboardType='default'
                        //value={''}
                        onChangeText={setPassword}
                        style={styles.input}
                        />
                        {isFieldInError('password') && getErrorsInField('password').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}
                    </View>
                    
                    <View
                    style={styles.buttonContainer}
                    >   
                        <View style={
                            {
                                width:"140%",
                                height:10,
                                backgroundColor: '#05BAAD'
                            }
                        }></View>
                        <TouchableHighlight
                        onPress={()=>{handleSignIn()}}
                        style={styles.button}
                        underlayColor={'#22e6ab'}
                        >
                            <Text
                            style={styles.buttonText}
                            >Login</Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight
                        onPress={()=>{setWhichScreen(0)}}
                        style={styles.button}
                        underlayColor={'#22e6ab'}
                        >
                            <Text
                            style={styles.buttonText}
                            
                            >Register</Text>
                        </TouchableHighlight>


                    </View>
                    <TouchableOpacity
                    onPress={()=>{
                        if(validate({email: { required: true, email: true }})) {
                            sendPasswordResetEmail(fireAuth,email)
                            .then(()=>{
                                Alert.alert("Email sent", "Check your email for a password reset link");
                            });
                        }
                    }}
                    >
                        <Text
                        style={[styles.hyperlink,
                        {
                            marginTop:60,
                        }]}
                        >Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                
            </KeyboardAvoidingView>
        </View>
        );
    }
    else{
        return(
            <View style={{height:'100%'}}>
            <KeyboardAvoidingView
            style={styles.container}
            behavior="height"
            keyboardVerticalOffset={-500}
            >
                <HidewithKeyboard><Logo></Logo></HidewithKeyboard>
                <View style={{
                        backgroundColor:'#05CAAD',
                        width:"100%",
                        alignItems:'center',
                        flex:1,
                        borderTopLeftRadius:30,
                        borderTopRightRadius:30
                    }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                        placeholder="Email"
                        placeholderTextColor={'#bababa'}
                        keyboardType='visible-password'
                        //value={''}
                        onChangeText={setEmail}
                        style={styles.input}
                        />
                        {isFieldInError('email') && getErrorsInField('email').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}

                        <TextInput
                        placeholder="Password"
                        placeholderTextColor={'#bababa'}
                        secureTextEntry
                        keyboardType='default'
                        //value={''}
                        onChangeText={setPassword}
                        style={styles.input}
                        />
                        {isFieldInError('password') && getErrorsInField('password').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}
                        
                        <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor={'#bababa'}
                        secureTextEntry
                        keyboardType='default'
                        //value={''}
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                        />
                        {isFieldInError('confirmPassword') && getErrorsInField('confirmPassword').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}
                    
                    </View>

                    <View
                    style={styles.buttonContainer}
                    >   
                        <View style={
                            {
                                width:"140%",
                                height:10,
                                backgroundColor: '#05BAAD'
                            }
                        }></View>
                        <TouchableHighlight
                        onPress={()=>{handleSignUp()}}
                        style={styles.button}
                        underlayColor={'#22e6ab'}
                        >
                            <Text
                            style={styles.buttonText}
                            >Sign Up</Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight
                        onPress={()=>setWhichScreen(1)}
                        style={styles.button}
                        underlayColor={'#22e6ab'}
                        >
                            <Text
                            style={styles.buttonText}
                            >Sign In</Text>
                        </TouchableHighlight>

                    </View>
                </View>
                
            </KeyboardAvoidingView>
            
        </View>
        )
    }
}

export default AuthHandler

const styles = StyleSheet.create({
    backgroundImage:{
        height: '100%',
        backgroundColor:'#0A1613',
    },
    logo:{
        height:120,
        resizeMode: 'contain',
        marginTop:100,
    },  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        color:'white',
        backgroundColor: "#0c1f1c",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        borderWidth:0,
        borderColor:'#22e6ab',
    },
    inputContainer: {
        width:'80%',
        paddingTop:30,
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
        borderColor: '#22e6ab',
        borderWidth: 0,
    },
    buttonText: {
        color: '#e6e6e6',
        fontWeight: '700',
        fontSize: 20,
    },
    hyperlink: {
        color: '#182724',
        fontWeight: '700',
        fontSize: 16,
        alignSelf: 'center',
        width: 130,
        marginBottom:60
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5
    }
})