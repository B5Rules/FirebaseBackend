import React, { Component } from 'react'
import {Alert,Pressable, TouchableOpacity, TextInput, ImageBackground, Image, Text, View, StyleSheet} from 'react-native';
import iconProfil from '../assets/iconProfil.png'; 
import imgBack from '../assets/backgroundImg.png';
import iconMasina from '../assets/bmwv2.png';
import iconMasina1 from '../assets/bmw1.png';
import iconMasina2 from '../assets/bmw2.png';
import iconMasina3 from '../assets/bmw3.png';
import leftArrow from '../assets/leftArrow.png';
import Add from '../assets/Add.png';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { httpsCallable } from 'firebase/functions';
import {fireAuth, fireFunc} from '../globals/firebase';
import { getGlobalState } from '../globals/global';

const UpdateCar=httpsCallable(fireFunc,'updateCar')
export default class CarUpdate extends React.Component {

 login = (nume, distantaMax, capacBaterie, culoare, numarKm, caiPutere) => {//ce fac cu ce am extras
    alert('nume: ' + nume + ' distantaMax: ' + distantaMax + ' capacBaterie: ' + capacBaterie + ' culoare: ' + culoare + ' numarKm: '+ numarKm + ' caiPutere: ' + caiPutere)
 }
  render() {
    this.state=this.props.route.params;
    return (
      <View style={styles.container}>
        <ImageBackground source={imgBack} resizeMode="cover" style={styles.bgImage}>
            <View style={styles.container}>
                <View style={styles.container2}>
                    <View style={styles.container3}>
                        <Text style={styles.text1}>User cars</Text>
                        <Text style={styles.text2}>Here you can update your car details, {getGlobalState('userData').firstName.concat(" ",getGlobalState('userData').lastName,"!")}</Text>
                    </View>
                </View>
                <View style={styles.containerJos}>
                  <View style={styles.containerJos1}>
                    <View style={styles.paddingMasina}>
                      <Image source={iconMasina} style={styles.iconMasinaa} /> 
                    </View>
                    
                    <View style = {styles.containerForm}>
           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Nume masina"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              defaultValue={this.state.name}
              onChangeText =  {(text)=>this.state.name=text}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Distanta maxima (km)"
              placeholderTextColor = "white"
              keyboardType = 'numeric'
              autoCapitalize = "none"
              defaultValue={this.state.distantaMax}
              onChangeText =  {(text)=>this.state.distantaMax=text}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Capacitate baterie"
              placeholderTextColor = "white"
              keyboardType = 'numeric'
              autoCapitalize = "none"
              defaultValue={this.state.capacBaterie}
              onChangeText =  {(text)=>this.state.capacBaterie=text}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Culoare"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              defaultValue={this.state.color}
              onChangeText =  {(text)=>this.state.color=text}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Numar km"
              placeholderTextColor = "white"
              keyboardType = 'numeric'
              autoCapitalize = "none"
              defaultValue={this.state.numarKm}
              onChangeText =  {(text)=>this.state.numarKm=text}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Cai putere"
              keyboardType = 'numeric'
              placeholderTextColor = "white"
              autoCapitalize = "none"
              defaultValue={this.state.caiPutere}
              onChangeText =  {(text)=>this.state.caiPutere=text}/>

           {/* <View style={styles.galerieMasini}>
             <Image source={iconMasina1} style={styles.imgMasinaGalerie} /> 
             <Image source={iconMasina2} style={styles.imgMasinaGalerie} /> 
             <Image source={iconMasina3} style={styles.imgMasinaGalerie} /> 
             <View style={styles.imgMasinaGalerie2}>
               <Image source={Add} style={styles.Add} /> 
             </View>
             
           </View> */}
           

           <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                 async () => //this.login(this.state.name, this.state.distantaMax, this.state.capacBaterie, this.state.culoare, this.state.numarKm, this.state.caiPutere)
                  {
                  await UpdateCar(this.state);
                  this.props.navigation.navigate('Car List');
                  }
                }>
              <Text style = {styles.submitButtonText}> SEND </Text>
           </TouchableOpacity>
        </View>
                  </View>
                  <View style={styles.containerJos2}>
                    <Pressable onPress={()=>this.props.navigation.goBack()}>
                          <Image source={leftArrow} />
                          </Pressable> 
                  </View>
                </View>
                {/* <TouchableOpacity onPress={()=> this.props.pageChange(2)}>
                <Text style={styles.textInainte}>
                    Go to page 2
                </Text>
                </TouchableOpacity> */}

            </View>
        </ImageBackground>
        {/* <Text> page 2</Text>
        <TouchableOpacity onPress={()=> this.props.pageChange(1)}>
          <Text>
            Go to page 1
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImage:{
    flex: 1,
    justifyContent: "center",
    backgroundColor:"black"
  },
  container: {
    flex:1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    // paddingTop: Constants.statusBarHeight,
    // padding: 8,
  },
  containerJos:{
    padding:'5%',
    flexDirection:"column",
    flex:1,
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  // containerJos0:{
  //   flex:0.05,
  //   paddingBottom:10,
  //   flexDirection:"row",
  //   justifyContent: 'flex-start',
  //   width:'95%',
  //   alignItems:'center',
  // },
  containerJos1:{
    flex:0.8,
    flexDirection:"column",
    backgroundColor:'rgba(24, 39, 36, 1)',
    borderRadius:20,
    width:'95%',
    justifyContent:'center',
    alignItems:'center',
  },
  containerJos2:{
    paddingTop:20,
    flex:0.2,
  },
  container2:{
    backgroundColor:'black',
    flexDirection:"row",
    flex:0.2,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 10,
  },
  container3:{
    flexDirection:"column",
    flex:0.5,
    justifyContent: 'center',
    alignItems:'center',
  },
  imagine1:{
    resizeMode: 'contain',
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
  text3:{
    color:'white',
    fontSize:14,
    fontWeight:"600",
  },
  textInainte:{
    marginLeft:'4%',
    fontSize:16,
    color:'white',
  },
  iconMasinaa:{
    resizeMode: 'contain',
    height:100,
    flex:1,
  },
  paddingMasina:{
    flex:0.25,
    display:'flex',
    height:80,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:20,
    paddingBottom:20,
    //backgroundColor:'yellow',
  },
  //stil form
    imgMasinaGalerie:{
        marginRight:10,
        marginBottom:10,
        width:100,
        height:50,
    },
    imgMasinaGalerie2:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginRight:10,
      marginBottom:10,
      width:100,
      height:50,
  },
    Add:{

    },
    containerForm:{
      flexDirection:"column",
      flex:1,
      width:'100%',
      justifyContent: 'flex-start',
      alignItems:'center',
    },
    input: {
      backgroundColor: 'black',
      height: 34,
      margin: 0,
      borderWidth: 1,
      paddingLeft:7,
      color: "white",
      // borderColor: 'green',
      width:'90%',
    },
    separator: {
      borderBottomColor: 'white',
      width: '90%',
      borderBottomWidth:1,
      // borderBottomWidth: StyleSheet.hairlineWidth,
    },
    submitButton:{
      marginTop:20,
      paddingBottom:10,
      paddingTop:10,
      backgroundColor: 'rgba(0, 255, 218, 1)',
      width:'90%',
      borderRadius:61,
    },
    submitButtonText:{
      textAlign:'center',
      fontSize:20,
      color:'rgba(11, 98, 85, 1)',
      fontWeight:'bold',
    },
});