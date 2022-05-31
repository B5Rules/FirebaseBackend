import React, { useEffect, useState } from "react";
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable, TouchableHighlight, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGlobalState } from '../globals/global';
import AnimatedLoader from 'react-native-animated-loader';
import LottieView from 'lottie-react-native';
import { useIsFocused } from "@react-navigation/native";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

const ChargingPage = ({ navigation, route, props }) => {
      const [visible, setVisible] = useState(false);
      const isFocused = useIsFocused();
      useEffect(() => {
        if(!isFocused) {
          setVisible(false);
          return;
        }
        setInterval(() => {
          setVisible(!visible);
        }, );

        setTimeout(() => {
          navigation.navigate("Pay");
          setVisible(false);
        }, 10000);
      }, []);
    

      const [time, setTime] = React.useState(10);
      const timerRef = React.useRef(time);
    
      React.useEffect(() => {
        const timerId = setInterval(() => {
          timerRef.current -= 1;
          if (timerRef.current < 0) {
            clearInterval(timerId);
          } else {
            setTime(timerRef.current);
          }
        }, 1000);
        return () => {
          clearInterval(timerId);
        };
      }, []);
 

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.container}> 
            <ImageBackground source={require("../images/streets.png")} style={styles.image}>
                <View style={{justifyContent: "center", alignItems: "center",}}>
                <AnimatedLoader
                visible={visible}
                source={require('../assets/green-loader.json')}
                animationStyle={styles.lottie}
                speed={1}>
                <Text style={{marginTop: 20, color: "white", fontSize: 24}}>Your car is charging...</Text>
                </AnimatedLoader>
                {/* <LottieView source={require('../assets/green-loader.json')} autoPlay loop /> */}
                </View>
            </ImageBackground>
            </SafeAreaView>
        </ScrollView>
        );
    };

const styles = StyleSheet.create({
        image: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        },

        container: {
            flex: 1,
            backgroundColor: "#0C1615",
            alignItems: "center",
            justifyContent: "center",
          },
          lottie: {
            width: 100,
            height: 100,
            color: "white"
          },
});

export default ChargingPage;