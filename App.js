import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground } from 'react-native';
import {useEffect} from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';

import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";  // 
import { store } from "./store"; //
import HomeScreen from './screens/HomeScreen';
import SignInHandler from './screens/SignInHandler';
import SignUpHandler from './screens/SignUpHandler';
import ProfileSetup from './screens/ProfileSetup';
import Journal from './screens/Journal';
import Enter_kwh from './screens/Enter_kwh';
import LoadingScreen from './screens/Loadingscreen';
import StripeApp from "./screens/StripeApp";
import NearbyStations from './screens/NearbyStations';
import MapNavigator from './screens/MapNavigator';

const ComponentStripeProvider = () => {
  return (
    <StripeProvider publishableKey="pk_test_51KvNRAKNgHgd1DYNECNL3IkZfcjDMJHNxedX6KNF854wrKXYGJupNvzqF1lL36f8X9OI1ky9NeDyZxKJ52dPcvrM00DsPmDs4r">
      <StripeApp />
    </StripeProvider>
  );
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
}

const Stack = createNativeStackNavigator();


export default function App() {
  useEffect(()=>{
    NavigationBar.setBackgroundColorAsync('#182724')
  },[]);
  return (
    <Provider store={store}>
    <ImageBackground source={require('./images/streets.png')} style={styles.backgroundImage}>
      <NavigationContainer style={{backgroundColor:'transparent'}} theme={navTheme}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="MapNavigator" component={MapNavigator} />
          <Stack.Screen options={{headerShown:false}} name="SignInHandler" component={SignInHandler}/>
          <Stack.Screen options={{headerShown:false}} name="SignUpHandler" component={SignUpHandler}/>
          <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen options={{headerShown:false}} name="ProfileSetup" component={ProfileSetup}/>
          <Stack.Screen options={{headerShown:false}} name="Enter_kwh" component={Enter_kwh} />
          <Stack.Screen options={{headerShown:false}} name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen options={{headerShown:false}} name="Journal" component={Journal} />
          <Stack.Screen options={{headerShown:false}} name="Pay" component={ComponentStripeProvider} />
          <Stack.Screen options={{headerShown:false}} name="NearbyStations" component={NearbyStations} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode:'cover',
    height:'100%',
    width:'100%',
    backgroundColor:'#0A1613'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
