import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Button,
  ImageBackground,
  Pressable,
  TouchableHighlight,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGlobalState } from "../globals/global";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

const ChargingPage = ({ navigation, route, props }) => {
  const [kWh, setkWh] = useState(10);

  useEffect(() => {
    setkWh(route?.params?.kWh || 10);
  }, [])

  const completeCharging = () => {
    console.log('Completed')
    navigation.navigate("Journal");
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../images/streets.png")}
          style={styles.image}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CountdownCircleTimer
              isPlaying
              duration={kWh}
              colors={["#007500", "#00A300", "#00D100", "#00FF00", "#2EFF2E", "#8AFF8A"]}
              colorsTime={[500, 300, 100, 50, 10, 0]}
              onComplete={completeCharging}
            >
              {({ remainingTime }) => <View style={{textAlign: 'center'}}>
              <Text style={{textAlign: 'center', color: "white"}}>
                  You have 
                </Text>
                <Text style={{textAlign: 'center', marginTop: 7, marginBottom: 7, color: "#4FA64F", fontSize: 40 }}>
                  {remainingTime}
                </Text>
                <Text style={{textAlign: 'center', color: "white" }}>
                  kWh left
                </Text>
              </View>} 
            </CountdownCircleTimer>
            {/* <AnimatedLoader
              visible={visible}
              source={require("../assets/green-loader.json")}
              animationStyle={styles.lottie}
              speed={1}
            >
              <Text style={{ marginTop: 20, color: "white", fontSize: 24 }}>
                Your car is charging...
              </Text>
            </AnimatedLoader> */}
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
    color: "white",
  },
});

export default ChargingPage;
