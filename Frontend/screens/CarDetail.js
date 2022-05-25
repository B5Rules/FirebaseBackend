import { Alert, TouchableOpacity, TextInput, ImageBackground, Image, Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react'
import iconProfil from '../assets/iconProfil.png'; 
import imgBack from '../assets/backgroundImg.png';
import iconMasina from '../assets/bmw.png';
import setari from '../assets/Setari.png';
import leftArrow from '../assets/leftArrow.png';
import iconMasina1 from '../assets/bmw1.png';
import iconMasina2 from '../assets/bmw2.png';
import iconMasina3 from '../assets/bmw3.png';
import deletee from '../assets/delete.png';
import { onAuthStateChanged } from 'firebase/auth';
import {fireAuth, fireFunc} from '../globals/firebase';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { httpsCallable } from 'firebase/functions';

const deleteCar=httpsCallable(fireFunc,'deleteCar');
var carss;
export default class CarDetail extends React.Component {

    componentDidMount(){
        // onAuthStateChanged(fireAuth, user => {
        //   if (user == null) this.props.navigate('SignIn')
        // });
       }
    render() {
        this.state=this.props.route.params
        carss=this.state
        console.log(this.state);
        return (
        <View style={styles.container}>
          <ImageBackground source={imgBack} resizeMode="cover" style={styles.bgImage}>
              <View style={styles.container}>
                  <View style={styles.container2}>
                      <Image source={iconProfil} style={styles.imagine1} /> 
                      <View style={styles.container3}>
                          <Text style={styles.text1}>Beneficiary Uster</Text>
                          <Text style={styles.text2}>Pavel Silviu</Text>
                      </View>
                  </View>
                  <View style={styles.containerJos}>
                    <View style={styles.containerJos0}>
                      <Text style={styles.text3}>Detalii masina</Text>
                    </View>
                    <View style={styles.containerJos1}>

                      <View style={styles.paddingMasina}>
                        <Image source={iconMasina} style={styles.iconMasinaa} /> 
                      </View>

                      <View style={styles.containerJos1Texte}>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Model:</Text><Text style={styles.text4}>{this.state.name}</Text>
                        </View>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Distanta maxima(100% charged):</Text><Text style={styles.text4}>{this.state.distantaMax}</Text>
                        </View>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Culoare:</Text><Text style={styles.text4}>{this.state.color}</Text>
                        </View>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Numar km:</Text><Text style={styles.text4}>{this.state.numarKm}</Text>
                        </View>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Capacitate baterie:</Text><Text style={styles.text4}>{this.state.capacBaterie}</Text>
                        </View>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Cai putere:</Text><Text style={styles.text4}>{this.state.caiPutere}</Text>
                        </View>
                        
                      </View>
                      
                      <View style={styles.galerieMasini}>
                        <Image source={iconMasina1} style={styles.imgMasinaGalerie} /> 
                        <Image source={iconMasina2} style={styles.imgMasinaGalerie} /> 
                        <Image source={iconMasina3} style={styles.imgMasinaGalerie} /> 
                        {/* <View style={styles.imgMasinaGalerie2}>
                          <Image source={Add} style={styles.Add} /> 
                        </View> */}
                      </View>
                      
                    </View>
                    <View style={styles.containerJos2}>
                      <Pressable onPress={()=>this.props.navigation.navigate('Car Update',this.state)}>
                      <Image source={setari} /> 
                      </Pressable>
                      <Pressable onPress={async ()=>{ 
                       await  deleteCar(this.state);
                       setTimeout(()=>{
                        this.props.navigation.goBack();
                       },2000)
                      

                       }}>
                      <Image source={deletee}/>
                      </Pressable>
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
    backgroundColor:"black",
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
  containerJos0:{
    flex:0.05,
    paddingBottom:10,
    flexDirection:"row",
    justifyContent: 'flex-start',
    width:'95%',
    alignItems:'center',
  },
  containerJos1:{
    flex:0.85,
    flexDirection:"column",
    backgroundColor:'rgba(24, 39, 36, 1)',
    borderRadius:20,
    width:'95%',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  containerJos1Linie:{
    flexDirection:"row",
  },
  containerJos1Texte:{
    // backgroundColor:"red",
    flex:0.37,
    width:"85%",
  },
  containerJos2:{
    flex:0.2,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'95%',
    // backgroundColor:'red',
    marginTop:10,
  },
  container2:{
    flexDirection:"row",
    flex:0.15,
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
    fontSize:16,
  },
  text2:{
    color:'white',
    fontSize:24,
    fontWeight:"700",
  },
  text3:{
    color:'white',
    fontSize:14,
    fontWeight:"600",
  },
  text4:{
    color:'rgba(1, 242, 207, 1)',
    fontSize:12,
    fontWeight:"600",
    marginBottom:2,
  },
  text5:{
    color:'white',
    fontSize:12,
    fontWeight:"600",
    marginBottom:2,
  },
  textInainte:{
    marginLeft:'4%',
    fontSize:16,
    color:'white',
  },
  iconMasinaa:{
    resizeMode: 'contain',
    height:60,
  },
  paddingMasina:{
    flex:0.25,
    display:'flex',
    height:80,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:0,
    // backgroundColor:'red',
  },
  galerieMasini:{
    flex:0.37,
    flexDirection:'row',
    flexWrap :'wrap',
    width:'90%',
    height:'38%',
    justifyContent:'space-between',
    paddingTop:10,
    paddingBottom:20,
    borderRadius:20,
    backgroundColor:'black',
  },
  imgMasinaGalerie:{
      marginRight:10,
      marginLeft:10,
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
});