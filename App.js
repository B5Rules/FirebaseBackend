import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground } from 'react-native';
import {useEffect} from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar'

import HomeScreen from './screens/HomeScreen';
import SignInHandler from './screens/SignInHandler';
import SignUpHandler from './screens/SignUpHandler';
import ProfileSetup from './screens/ProfileSetup';

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
    <ImageBackground source={require('./images/streets.png')} style={styles.backgroundImage}>
      <NavigationContainer style={{backgroundColor:'transparent'}} theme={navTheme}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator>
          <Stack.Screen  options={{headerShown:false}} name="SignInHandler" component={SignInHandler}/>
          <Stack.Screen options={{headerShown:false}} name="SignUpHandler" component={SignUpHandler}/>
          <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen options={{headerShown:false}} name="ProfileSetup" component={ProfileSetup}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
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
