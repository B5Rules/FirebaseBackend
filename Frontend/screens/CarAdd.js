import React, { Component } from 'react'
import {useState} from 'react';
import {ScrollView, Pressable, TouchableOpacity, TextInput, ImageBackground, Image, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import iconProfil from '../assets/iconProfil.png'; 
import imgBack from '../assets/backgroundImg.png';
import {fireAuth, fireFunc} from '../globals/firebase';
import {httpsCallable} from 'firebase/functions';
import leftArrow from '../assets/leftArrow.png';

import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
const addCar=httpsCallable(fireFunc,'addCar');
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';
import { getGlobalState } from '../globals/global';

export default class CarAdd extends React.Component {
  state = {
    nume: '',
    distantaMax: '',
    capacBaterie: '',
    culoare: '',
    numarKm: '',
    caiPutere:''
  }
eroare = {
    camp1: '',
    camp2: '',
    camp3: '',
    camp4: '',
    camp5: '',
    camp6: '',
}
 handleNume = (text) => {
    this.setState({ nume: text })
 }
 handledistantaMax = (text) => {
    this.setState({ distantaMax: text })
 }
 handlecapacBaterie = (text) => {
   this.setState({ capacBaterie: text })
 }
 handleculoare = (text) => {
   this.setState({ culoare: text })
 }
 handlenumarKm = (text) => {
   this.setState({ numarKm: text })
 }
 handlecaiPutere = (text) => {
   this.setState({ caiPutere: text })
 }
    validForm = () => {
        //Eroare nume 
        if (this.state.nume.length > 11) {
            this.eroare.camp1 = "Maxim 10 caractere"
        }
        else {
            this.eroare.camp1 = ''
        }
        //Eroare distanta
        var n = Number(this.state.distantaMax);
        if (isNaN(n)) {
            this.eroare.camp2 = "Distanta gresita"
        }
        else {
            this.eroare.camp2 = ''
        }
        if (this.state.distantaMax[0] == '0') {
            this.eroare.camp2 = "Distanta gresita"
        }
        //Eroare baterie
        n = Number(this.state.capacBaterie)
        if (this.state.capacBaterie.length > 6 || (isNaN(n) || this.state.capacBaterie[0] == '0')) {
            this.eroare.camp3 = "Valoare gresita"
        }
        else {
            this.eroare.camp3 = ''
        }
        //Eroare culoare
        //Eroare nrkm
        n = Number(this.state.numarKm)
        if (isNaN(n) || (this.state.numarKm[0] == '0' && this.state.numarKm.length > 1)) {
            this.eroare.camp5 = "Kilometraj gresit"
        }
        else {
            this.eroare.camp5 = ''
        }
        //Eroare CaiPutere
        n = Number(this.state.caiPutere)
        if (isNaN(n) == true) {
            this.eroare.camp6 = "Valoare gresita"
        }
        else {
            if (n < 50 && (this.state.caiPutere != '')) {
                this.eroare.camp6 = "Valoare prea mica"
            }
            else {
                this.eroare.camp6 = ''
            }
        }
        return true;
    }
    login = (nume, distantaMax, capacBaterie, culoare, numarKm, caiPutere,) => {//ce fac cu ce am extras
        var campuri_necompletate = 0;
        var fara_erori = 0;
        if (nume == '' || distantaMax == '' || caiPutere == '' || capacBaterie == '' || numarKm == '' || caiPutere == '') {
            campuri_necompletate = 1;
        }
        if ((this.eroare.camp1 == '') && (this.eroare.camp2 == '') && (this.eroare.camp3 == '') && (this.eroare.camp4 == '') && (this.eroare.camp5 == '') && (this.eroare.camp6 == '')) {
            fara_erori = 1;
        }
        if ((fara_erori == 1) && (campuri_necompletate == 0)) {
            alert("Succer");
        }
        if (campuri_necompletate == 1) {
            alert("Campuri necompletate");
        }
        if (fara_erori == 0) {
            alert("Erori");
        }
        console.log(this.state)
    }
    function



  render() {
    return (
      <ImageBackground source={imgBack} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.container3}>
                      <Text style={styles.text1}>User cars</Text>
                      <Text style={styles.text2}>Please add a car, {getGlobalState('userData').firstName.concat(" ",getGlobalState('userData').lastName,"!")}</Text>
                </View>
            </View>
            <View style = {styles.containerForm}>
              <ScrollView style ={{width:"95%"}} contentContainerStyle={styles.scrollview}> 
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Car name"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    onChangeText={this.handleNume} />
                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp1}</Text> : null}

                <View style={styles.separator}></View>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Autonomy"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    onChangeText = {this.handledistantaMax}/>
                  {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp2}</Text> : null}

                <View style={styles.separator}></View>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Battery capacity"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    onChangeText = {this.handlecapacBaterie}/>
                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp3}</Text> : null}

                <View style={styles.separator}></View>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Color"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    onChangeText = {this.handleculoare}/>
                  {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp5}</Text> : null}

                <View style={styles.separator}></View>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Kilometers"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    onChangeText = {this.handlenumarKm}/>
                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp6}</Text> : null}

                <View style={styles.separator}></View>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Horse power"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    onChangeText = {this.handlecaiPutere}/>

                <View style={styles.separator}></View>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                      async () => {//this.login(this.state.nume, this.state.distantaMax, this.state.capacBaterie, this.state.culoare, this.state.numarKm, this.state.caiPutere)
                              await addCar(this.state);
                              setTimeout(()=>this.props.navigation.navigate('Car List'),1000);
                          
                      }
                      }>
                    <Text style = {styles.submitButtonText}> SUBMIT </Text>
                </TouchableOpacity>
                <Pressable onPress={()=>this.props.navigation.goBack()}>
                      <Image source={leftArrow} />
                      </Pressable> 
              </ScrollView>
        </View>
            {/* <TouchableOpacity onPress={()=> this.props.pageChange(2)}>
            <Text style={styles.textInainte}>
                Go to page 2
            </Text>
            </TouchableOpacity> */}

        </View>
      </ImageBackground>
    );
  }
}




const styles = StyleSheet.create({
  bgImage:{
    flex: 1,
    backgroundColor:'black',
    justifyContent: "center",
  },
  container: {
    flex:1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    // paddingTop: Constants.statusBarHeight,
    // padding: 8,
  },
  container2:{
    flexDirection:"row",
    flex:0.2,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 10,
    backgroundColor:'black'
  },
  container3:{
    flexDirection:"column",
    flex:0.5,
    justifyContent: 'center',
    alignItems:'center',
  },
  imagine1:{
    marginLeft:10,
    resizeMode: 'contain',
    flex: 0.2,
    aspectRatio: 1 // Your aspect ratio
  },
  text1:{
    color:'white',
    fontSize:19,
  },
  text2:{
    color:'white',
    fontSize:12,
    fontWeight:"700",
  },
  textInainte:{
    marginLeft:'4%',
    fontSize:16,
    color:'white',
  },
  //stil form
  containerForm:{
    flexDirection:"column",
    flex:1,
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  input: {
    backgroundColor: 'rgba(40, 47, 45, 1)',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    // borderColor: 'green',
    width:'90%',
  },
  separator: {
    borderBottomColor: 'white',
    width: '90%',
    borderBottomWidth:0.5,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  submitButton:{
    backgroundColor: 'rgba(1, 167, 143, 1)',
    padding: 10,
    margin: 15,
    width:'90%',
    borderRadius:61,
  },
  submitButtonText:{
    textAlign:'center',
    fontSize:20,
    color:'white'
  },
  scrollview:{
    //backgroundColor:"red",
    flexDirection:"column",
    alignItems:"center",
  },
});