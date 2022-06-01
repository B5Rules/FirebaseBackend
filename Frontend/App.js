import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground } from 'react-native';
import {useEffect} from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';

import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";  // 
import { store } from "./store"; //
import ProfilePage from './screens/ProfileHome';
import ProfileSetup from './screens/ProfileSetup';
import Journal from './screens/Journal';
import Enter_kwh from './screens/Enter_kwh';
import LoadingScreen from './screens/Loadingscreen';
import StripeApp from "./screens/StripeApp";
import NearbyStations from './screens/NearbyStations';
import MapNavigator from './screens/MapNavigator';
import AuthHandler from './screens/AuthHandler';
import HomeScreen from './screens/HomeScreen';
import ManageStations from './screens/ManageStations';
import EditStation from './screens/EditStation';
import StationInfo from './screens/StationInfo';
import AddKwh from './screens/AddKwh';
import StationLocationOnMap from './screens/StationLocationOnMap';
import CarList from './screens/CarList';
import {Platform} from 'react-native';
import CarDetail from './screens/CarDetail';
import CarMenu from './screens/CarMenu';
import CarUpdate from './screens/CarUpdate';
import CarAdd from './screens/CarAdd';
import CarListPayment from './screens/CarListPayment';
import Enter_password from './screens/Enter_password';
import MapHomeScreen from './screens/MapHomeScreen';
import StripeProv from './screens/StripeProv';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { fireAuth } from './globals/firebase';

import ChargingPage from './screens/ChargingPage';

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage", 
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
  "Require cycle: screens/MapHomeScreen.js -> components/Map.js -> slices/routeCalculator.js -> screens/MapHomeScreen.js"
]);

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
  AsyncStorage.getItem('email').then(email=>{
    console.log(email);
    if(email){
      AsyncStorage.getItem('password').then(password=>{
        if(password){
          signInWithEmailAndPassword(fireAuth,email,password).then(()=>{
            console.log('signed in');
          });
        } 
      });
    }
  });
  
  useEffect(()=>{
    Platform.OS === 'android' && NavigationBar.setBackgroundColorAsync('#182724')
  },[]);
  return (
    <Provider store={store}>
    <ImageBackground source={require('./images/streets.png')} style={styles.backgroundImage}>
      <NavigationContainer theme={navTheme}>
        {/*<StatusBar translucent={true} backgroundColor={'transparent'} />*/}
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="AuthHandler" component={AuthHandler}/>
          <Stack.Screen options={{headerShown:false}} name="ProfilePage" component={ProfilePage}/>
          <Stack.Screen options={{headerShown:false}} name="ProfileSetup" component={ProfileSetup}/>
          <Stack.Screen options={{headerShown:false}} name="Enter_kwh" component={Enter_kwh} />
          <Stack.Screen options={{headerShown:false}} name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen options={{headerShown:false}} name="Journal" component={Journal} />
          <Stack.Screen options={{headerShown:false}} name="Pay" component={StripeProv} />
          <Stack.Screen options={{headerShown:false}} name="MapNavigator" component={MapNavigator} />
          <Stack.Screen options={{headerShown:false}} name="NearbyStations" component={NearbyStations} />
          <Stack.Screen options={{headerShown:false}} name="MapHomeScreen" component={MapHomeScreen} />
          {/* provider pages */}

          <Stack.Screen options={{headerShown:false}} name="Provider Homepage" component={HomeScreen}/>
          <Stack.Screen options={{headerShown:false}} name="Manage Stations"  component={ManageStations}/>
          <Stack.Screen options={{headerShown:false}} name="Edit Station" component={EditStation}/>
          <Stack.Screen options={{headerShown:false}} name="StationLocationOnMap" component={StationLocationOnMap}/>
          <Stack.Screen options={{headerShown:false}} name="Station Info" component={StationInfo}/>
          <Stack.Screen options={{headerShown:false}} name="Charging Page" component={ChargingPage}/>
          <Stack.Screen options={{headerShown:false}} name="Car List" component={CarList}/>
          <Stack.Screen options={{headerShown:false}} name="Car List Payment" component={CarListPayment}/>
          <Stack.Screen options={{headerShown:false}} name="Car Detail" component={CarDetail}/>
          <Stack.Screen options={{headerShown:false}} name="Car Menu" component={CarMenu}/>
          <Stack.Screen options={{headerShown:false}} name="Car Update" component={CarUpdate}/>
          <Stack.Screen options={{headerShown:false}} name="Car Add" component={CarAdd}/>
          <Stack.Screen options={{headerShown:false}} name="Enter Password" component={Enter_password}/>
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
