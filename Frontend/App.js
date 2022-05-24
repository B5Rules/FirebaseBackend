import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground } from 'react-native';
import {useEffect} from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';

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
import {Platform} from 'react-native';
import AddCar from "./screens/AddCar";
import CarListOriginal from "./screens/CarListOriginal";
import CarDetailOriginal from "./screens/CarDetailOriginal";
import CarUpdate from "./screens/CarUpdate";
import CarsMenu from "./screens/CarsMenu";



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
    Platform.OS === 'android' && NavigationBar.setBackgroundColorAsync('#182724')
  },[]);
  return (
    <Provider store={store}>
    <ImageBackground source={require('./images/streets.png')} style={styles.backgroundImage}>
      <NavigationContainer style={{backgroundColor:'transparent'}} theme={navTheme}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="AuthHandler" component={AuthHandler}/>
          <Stack.Screen options={{headerShown:false}} name="ProfilePage" component={ProfilePage}/>
          <Stack.Screen options={{headerShown:false}} name="ProfileSetup" component={ProfileSetup}/>
          <Stack.Screen options={{headerShown:false}} name="Enter_kwh" component={Enter_kwh} />
          <Stack.Screen options={{headerShown:false}} name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen options={{headerShown:false}} name="Journal" component={Journal} />
          <Stack.Screen options={{headerShown:false}} name="Pay" component={ComponentStripeProvider} />
          {/*^^^De aici vine problema cu Too many renders de la plata. Nu am reusit sa-i dau de capat 
          --Serbanstein*/}
          <Stack.Screen options={{headerShown:false}} name="MapNavigator" component={MapNavigator} />
          <Stack.Screen options={{headerShown:false}} name="NearbyStations" component={NearbyStations} />

          {/* provider pages */}

          <Stack.Screen options={{headerShown:false}} name="Provider Homepage" component={HomeScreen}/>
          <Stack.Screen options={{headerShown:false}} name="Manage Stations"  component={ManageStations}/>
          <Stack.Screen options={{headerShown:false}} name="Edit Station" component={EditStation}/>
          <Stack.Screen options={{headerShown:false}} name="StationLocationOnMap" component={StationLocationOnMap}/>
          <Stack.Screen  options={{headerShown:false}} name="Station Info" component={StationInfo}/>
          <Stack.Screen  options={{headerShown:false}} name="Add kWh" component={AddKwh}/>

          {/* beneficiary pages */}
          <Stack.Screen options={{headerShown:true}} name="CarsMenu" component={CarsMenu}/>
          <Stack.Screen options={{headerShown:true}} name="CarListOriginal"  component={CarListOriginal}/>
          <Stack.Screen  options={{headerShown:true}} name="CarDetailOriginal" component={CarDetailOriginal}/>
          <Stack.Screen options={{headerShown:true}} name="CarUpdate" component={CarUpdate}/>
          <Stack.Screen options={{headerShown:true}}name="AddCar" component={AddCar}/>

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
