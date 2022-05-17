import { Alert, ScrollView, TouchableOpacity, TextInput, ImageBackground, Image, Text, View, StyleSheet, Pressable } from 'react-native';
import React, {useState, Component } from 'react'
import iconProfil from '../assets/iconProfil.png'; 
import imgBack from '../assets/backgroundImg.png';
import iconMasina from '../assets/bmw.png';
import vezidetalii from '../assets/Buton-1.png';
import { httpsCallable } from 'firebase/functions';
import { fireFunc } from '../firebase'
import { async } from '@firebase/util';
import {useGlobalState,setGlobalState} from '../state'
const getCars=httpsCallable(fireFunc,'getCars');

export default class Pg2 extends React.Component {
  state={
    nav:{},
    cars:[] 
    
  }
carss=[];
fetchData=async()=>{this.setState({isLoading:true},async () =>{
  getCars().then(result=>{
    carss=result.data;
   setGlobalState('cars',carss);
    this.setState({cars:carss});
  console.log('data acquired');
}).catch(error=>{
  console.log(error);
});
})}
 async componentDidMount(){
   this.fetchData();
  this.focusListener=this.props.navigation.addListener('focus',async()=>{
    try{
      await this.fetchData();
    }
    catch(err){
      console.log(err);
    }
  })}
    

 componentWillUnmount() {
  this.focusListener();
}
    render() {
      var carsList=[];
  
      this.state.cars.forEach(element => {
        console.log(element);
        carsList.push(
          <View style={styles.containerScrollView}>

                      <View style={styles.paddingMasina}>
                        <Image source={iconMasina} style={styles.iconMasinaa} /> 
                      </View>

                      <View style={styles.containerJos1Texte}>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Model:</Text><Text style={styles.text4}>{element.name}</Text>
                        </View>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Distanta maxima(100% charged):</Text><Text style={styles.text4}>{element.distantaMax}</Text>
                        </View>
                        <View style={styles.containerJos1Linie}>
                          <Text style={styles.text5}>Culoare:</Text><Text style={styles.text4}>{element.color}</Text>
                        </View>
                      </View>
                      
                      <Pressable  style={styles.button} onPress={() =>this.props.navigation.navigate("CarDetail",element)}>
                        <Text style={styles.text3}>Selecteaza</Text>
                      </Pressable>

          </View>)
      });
      return (
      
          <View style={styles.container}>
          <ImageBackground source={imgBack} resizeMode="cover" style={styles.bgImage}>
              <View style={styles.container}>
                
                  <View style={styles.containerJos}>
                    <View style={styles.containerJos0}>
                      <Text style={styles.text3}>Va rugam selectati masina:</Text>
                    </View>

                    <View style={styles.containerJos1}>
                      <ScrollView style ={styles.scrollview}>
                        {carsList}
                      </ScrollView>
                    </View>
                   
                  </View>
              </View>
          </ImageBackground>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  carcontainer:{
 backgroundColor:"red",
    flexDirection:"column",
  flex:1,
  alignItems:'center',
    width:'100%'
  },
  bgImage:{
    backgroundColor:"black",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex:1,
    flexDirection:"column",
    justifyContent: 'center',
    //alignItems:'center',
    // paddingTop: Constants.statusBarHeight,
    // padding: 8,
  },
  containerScrollView: {
    flex:1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    alignItems:'center',
    marginBottom:20,
    // paddingTop: Constants.statusBarHeight,
    // padding: 8,
  },
  containerJos:{
    padding:'5%',
    flexDirection:"column",
    flex:0.9,
    justifyContent: 'center',
    alignItems:'center',
  },
  containerJos0:{//cu "Lista masinilor adaugate"
    flex:0.1,
    paddingBottom:10,
    flexDirection:"row",
    justifyContent: 'flex-start',
    width:'95%',
    alignItems:'center',
  },
  containerJos1:{//cu chenarul cu round borders
    flex:0.9,
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
    //backgroundColor:"green",
    // flex:0.37,
    flex:0.40,
    width:"85%",
  },
  container2:{
    flexDirection:"row",
    flex:0.15,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 10,
  },
  containerJos2:{//cu chenarul cu round borders
    flex:0.4,
    flexDirection:"column",
    width:'95%',
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:"red",
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
    flex:0.55,
    display:'flex',
    height:80,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:0,
     //backgroundColor:'red',
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
  button:{
    width:"50%",
    height:30,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0, 255, 218, 1)",
    borderRadius:20,
    marginTop:10,
  },
  vezidetaliile:{
    //width:"100%",
    resizeMode:'contain',
    width:"100%",
  },
  scrollview:{
    //centerContent:true,
    //backgroundColor:"white",
    width:"100%",
    borderRadius:20,
    padding:10,
  },
  Touchable:{
    width:'70%',
    //backgroundColor:'red'
  }
});
