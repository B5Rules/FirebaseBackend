import { StyleSheet, Text, TextInput, SafeAreaView, Image, View, Pressable, StatusBar } from 'react-native';
import React from 'react';

function getStationId() {
  return '404';
}

export default function ViewProfile() {

  return (
    <SafeAreaView style={styles.container}>

    <StatusBar  
        backgroundColor = "#1C2E2B"  
        barStyle = "white-content"   
      />  

        <Text style={styles.title}> Payment report </Text>

        {/* <Image source={require("./Logo.svg")} style={styles.logo} resizeMode="center" /> */}

        <View style={styles.card}>
            <Text style={styles.attachLabel}> Station's ID: </Text>
            <TextInput editable={false} defaultValue={getStationId()} style={styles.dataLabel}/>
        </View>
        <View style={styles.line}/>

        <View style={styles.card}>
            <Text style={styles.attachLabel}> Station's Owner: </Text>
            <TextInput editable={false} defaultValue='Ciobanu  Matei' style={styles.dataLabel}/>
        </View>
        <View style={styles.line}/>
        
        <View style={styles.card}>
            <Text style={styles.attachLabel}> Price / kWh: </Text>
            <TextInput editable={false} defaultValue='1.05 Lei' style={styles.dataLabel}/>
            <Image source={require("../bag_icon.png")} style={styles.mini_icon} resizeMode="center" />
        </View>
        <View style={styles.line}/>

        <View style={styles.card}>
            <Text style={styles.attachLabel}> No. kWh: </Text>
            <TextInput editable={false} defaultValue='45' style={styles.dataLabel}/>
            <Image source={require("../bag_icon.png")} style={styles.mini_icon} resizeMode="center" />
        </View>
        <View style={styles.line}/>

        <View style={styles.card}>
            <Text style={styles.attachLabel}> Date: </Text>
            <TextInput editable={false} defaultValue='11 May 2022' style={styles.dataLabel}/>
        </View>
        <View style={styles.line}/>

        <View style={styles.card}>
            <Text style={styles.attachLabel}> Total ammount: </Text>
            <TextInput editable={false} defaultValue='47.25 Lei' style={styles.dataLabel}/>
            <Image source={require("../bag_icon.png")} style={styles.mini_icon} resizeMode="center" />
        </View>
        <View style={styles.line}/>

        <View style={styles.info_container}>
          <View style={styles.line}/>
          <Text style={styles.info}> * We're using Stripe as a payment processor. </Text>
        </View>

        <Pressable style={styles.buttonPay}>
            <Text style={styles.buttonText}> Pay Now </Text>
        </Pressable>

     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',  
        alignSelf: 'flex-start', 
        backgroundColor: "#1C2E2B", 
        width: "90%", 
        alignSelf: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginTop: 25,
    },
    container: {
      flex: 1,
      backgroundColor: "#0C1615",
      alignItems: "center",
      justifyContent: "center",
      },
    line: {
        borderBottomColor: '#05CAAD',
        borderWidth: 2,
        width: '90%',
      },
    attachLabel: {
        alignSelf: 'center',
        marginLeft: '5%',
        color: '#fff',
        fontSize: 22,
        marginTop: 15,
      },
    dataLabel: {
        marginBottom: -15,
        marginLeft: '1%',
        color: '#C0C0C0',
        fontSize: 22,
      },
    buttonPay: {
        backgroundColor: '#04ae95',
        width: '75%',
        maxHeight: 65,
        marginTop: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },
    buttonText: {
        fontSize: 32,
        color: 'white',
      },
    mini_icon: {
      height: 40,
      width: 40,
      alignSelf: 'center',
      position: 'absolute',
      right: 10,
    },
    title: {
      fontSize: 32,
      color: '#04ae95',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: "bold",
      bottom: '5%',
    },
    info: {
      fontSize: 14,
      color: '#04ae95',
      marginTop: '2%',
    },
    info_container: {
      width: '80%',
      marginTop: '10%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginLeft: -25,
    }
});

