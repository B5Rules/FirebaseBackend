import React from "react";
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable,} from "react-native";
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import ManageStations from "./src/screens/ManageStations";
import ManagePersonalData from "./src/screens/ManagePersonalData";
import StationInfo from "./src/screens/StationInfo";
import AddKwh from "./src/screens/AddKwh";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Provider Homepage">

        <Stack.Screen
          name="Provider Homepage"
          component={HomeScreen}
          />
        <Stack.Screen
          name="Manage Stations"
          component={ManageStations}/>

          <Stack.Screen
          name="Manage Personal Data"
          component={ManagePersonalData}/>

          <Stack.Screen
          name="Station Info"
          component={StationInfo}/>

          <Stack.Screen
          name="Add kWh"
          component={AddKwh}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
