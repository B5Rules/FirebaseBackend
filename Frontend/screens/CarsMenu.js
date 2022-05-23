import { Alert, ScrollView, TouchableOpacity, TextInput, ImageBackground, Image, Text, View, StyleSheet, Pressable } from 'react-native';
import React, {useState, Component } from 'react'
import iconProfil from '../assets/iconProfil.png'; 
import imgBack from '../assets/backgroundImg.png';
import buton1 from '../assets/butonManageCars.png';
import buton2 from '../assets/butonManagePersonalData.png';
import buton3 from '../assets/butonSwitchtoProvider.png';
import { useNavigation } from '@react-navigation/native';

export default function Pg1() {
        const navigation = useNavigation();
            return (

                <View style={styles.container}>
                    <ImageBackground source={imgBack} resizeMode="cover" style={styles.bgImage}>
                        <View style={styles.container}>
                            <View style={styles.container2}>
                                <Image source={iconProfil} style={styles.imagine1} /> 
                                <View style={styles.container3}>
                                    <Text style={styles.text1}>Beneficiary User</Text>
                                    <Text style={styles.text2}>Pavel Silviu</Text>
                                </View>
                            </View>

                            <View style={styles.containerJos}>
                                <TouchableOpacity onPress={()=> navigation.navigate('CarList')} style={styles.touchable}>
                                    <Image source={buton1} style={styles.imagine3} /> 
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.touchable} >
                                    <Image source={buton2} style={styles.imagine3} /> 
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.touchable} >
                                    <Image source={buton3} style={styles.imagine3} /> 
                                </TouchableOpacity>
                                
                                
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

const styles = StyleSheet.create({
  bgImage:{
    backgroundColor:"black",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex:1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    //alignItems:'center',
    // paddingTop: Constants.statusBarHeight,
    // padding: 8,
  },
  imagine1:{
    marginLeft:10,
    resizeMode: 'contain',
    flex: 0.2,
    aspectRatio: 1 // Your aspect ratio
  },
  containerJos:{
    padding:'5%',
    flexDirection:"column",
    flex:0.75,
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  container2:{
    flexDirection:"row",
    flex:0.25,
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
  text1:{
    color:'white',
    fontSize:16,
  },
  text2:{
    color:'white',
    fontSize:24,
    fontWeight:"700",
  },
  imagine2:{
    resizeMode: 'contain',
    aspectRatio:1,
  },
  imagine2:{
    resizeMode: 'contain',
    width:"80%",
    marginBottom:5,
  },
  imagine3:{
    resizeMode: 'contain',
    width:"100%",
  },
  touchable:{
    flex:0.3,
    width:"80%",
    //backgroundColor:"red",
    marginBottom:5,
  },
});