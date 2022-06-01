import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
  View,
  Pressable,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  Button,
} from "react-native";
import React from "react";

import { StatusBar } from 'expo-status-bar';

import { useState, useEffect } from 'react';

import { getGlobalState } from "../globals/global";
import * as LocalAuthentication from 'expo-local-authentication';

import {fireAuth, fireFunc} from "../globals/firebase";
import { reauthenticateWithCredential } from "firebase/auth";
import { httpsCallable } from "firebase/functions";


function getStationId() {
  return "404";
}

const getOwnerUsername = httpsCallable(fireFunc,"getOwnerUsername");


export default function Journal({ navigation }) {
  const amount = parseFloat(getGlobalState('kwhToCharge')).toFixed(2);
  const costPer = parseFloat(getGlobalState('currentStationData').price).toFixed(2);
  const total1 = amount*costPer

  const total = total1.toFixed(2);

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const fallBackToDefaultAuth = () => {
    console.log('fall back to password authentication');

    navigation.navigate("Enter password");
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };


  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        'Please enter your password',
        'Biometric Authentication not supported',
        'OK',
        () => fallBackToDefaultAuth()
      );

    // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        'Biometric record not found',
        'Please login with your password',
        'OK',
        () => fallBackToDefaultAuth()
      );

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: true,
    });
    // Log the user in on success
    if (biometricAuth) {
      console.log('success');
    }

    if (biometricAuth.success) {
      navigation.navigate("Pay");
    }
    console.log({ isBiometricAvailable });
    console.log({ supportedBiometrics });
    console.log({ savedBiometrics });
    console.log({ biometricAuth });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1C2E2B" barStyle="white-content" />

        <ImageBackground source={require("../images/streets.png")} style={styles.image}>
          <Text style={styles.title}> Payment report </Text>

          <View style={styles.card}>
            <Text style={styles.attachLabel}> Station's Owner </Text>
            <TextInput
              editable={false}
              defaultValue={getGlobalState('currentStationData').owneruser}
              style={styles.dataLabel}
            />
          </View>
          <View style={styles.line} />

          <View style={styles.card}>
            <Text style={styles.attachLabel}> Price / kWh: </Text>
            <TextInput
              editable={false}
              defaultValue={costPer}
              style={styles.dataLabel}
            />
            <Image
              source={require("../images/bag_icon.png")}
              style={styles.mini_icon}
              resizeMode="center"
            />
          </View>
          <View style={styles.line} />

          <View style={styles.card}>
            <Text style={styles.attachLabel}> No. kWh: </Text>
            <TextInput
              editable={false}
              defaultValue={amount}
              style={styles.dataLabel}
            />
            <Image
              source={require("../images/bag_icon.png")}
              style={styles.mini_icon}
              resizeMode="center"
            />
          </View>
          <View style={styles.line} />

          <View style={styles.card}>
            <Text style={styles.attachLabel}> Date: </Text>
            <TextInput
              editable={false}
              defaultValue={String(new Date().getFullYear())}
              style={styles.dataLabel}
            />
          </View>
          <View style={styles.line} />

          <View style={styles.card}>
            <Text style={styles.attachLabel}> Total ammount: </Text>
            <TextInput
              editable={false}
              defaultValue={total.toString()}
              style={styles.dataLabel}
            />
            <Image
              source={require("../images/bag_icon.png")}
              style={styles.mini_icon}
              resizeMode="center"
            />
          </View>
          <View style={styles.line} />

          <View style={styles.info_container}>
            <View style={styles.line} />
            <Text style={styles.info}>
              {" "}
              * We're using Stripe as a payment processor.{" "}
            </Text>
          </View>

          <Pressable
            style={styles.buttonPay}
            onPress={handleBiometricAuth}
          >
            <Text style={styles.buttonText}> Pay Now </Text>
          </Pressable>
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  card: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#1C2E2B",
    width: "90%",
    alignSelf: "center",
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
    borderBottomColor: "#05CAAD",
    borderWidth: 2,
    width: "90%",
  },
  attachLabel: {
    alignSelf: "center",
    marginLeft: "5%",
    color: "#fff",
    fontSize: 22,
    marginTop: 15,
  },
  dataLabel: {
    marginBottom: -15,
    marginLeft: "1%",
    color: "#C0C0C0",
    fontSize: 22,
  },
  buttonPay: {
    backgroundColor: "#04ae95",
    width: "75%",
    maxHeight: 65,
    marginTop: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 32,
    color: "white",
  },
  mini_icon: {
    height: 40,
    width: 40,
    alignSelf: "center",
    position: "absolute",
    right: 10,
  },
  title: {
    fontSize: 32,
    color: "#04ae95",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    bottom: "5%",
    marginTop: "3%",
  },
  info: {
    fontSize: 14,
    color: "#04ae95",
    marginTop: "2%",
  },
  info_container: {
    width: "80%",
    marginTop: "10%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: -25,
  },
});