import React from "react";
import { StyleSheet} from "react-native";
import { Provider } from "react-redux";
// Screens import
import MapHomeScreen from "./MapHomeScreen";
import NearbyStations from "./NearbyStations";
import ProfilePage from './ProfileHome';
import { store } from '../store';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function MapNavigator(){
    const Tabs = createMaterialBottomTabNavigator();
    return (
        <Provider store={store}>
       
            <SafeAreaProvider>
              <Tabs.Navigator 
               activeColor='#01F2CF'
               barStyle={{ backgroundColor: '#27423A' }}
             >
                <Tabs.Screen name="Map" component={MapHomeScreen}
                 options={{
                    tabBarLabel:'Map',
                    tabBarColor:'#01F2CF',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                      <FontAwesome name="map" size={24} color={color} />
                    ),
                     }}
                     />
                <Tabs.Screen name="Stations" component={NearbyStations}
                 options={{
                    tabBarColor:'#01F2CF',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="lightning-bolt" size={24} color={color} />
                    ),
                 }} 
                 />
    
              <Tabs.Screen name="Account" component={ProfilePage}
                 options={{
                    tabBarLabel:'Account',
                    tabBarColor:'#01F2CF',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                     }}
                     />
              </Tabs.Navigator>
          </SafeAreaProvider>
     
    </Provider>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    navContainer:{
      backgroundColor: '#111b19',
    }
  });
  