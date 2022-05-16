import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import ProgressBar from "react-native-animated-progress";

export default function LoadingScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("Journal");
  }, 5000);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar backgroundColor="#1C2E2B" barStyle="white-content" />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#0C1615",
        }}
      >
        <ImageBackground
          source={require("../images/streets.png")}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Image
            source={require("../images/Logo.png")}
            style={{ alignSelf: "center" }}
          />

          <View style={{ margin: 16 }}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 32,
                color: "#04ae95",
                fontWeight: "bold",
              }}
            >
              Charging...
            </Text>

            <ProgressBar
              height={25}
              indeterminate
              backgroundColor="#04ae95"
              trackColor="#1C2E2B"
              speed={10000}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
