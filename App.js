import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar'

import HomeScreen from './screens/HomeScreen';
import SignInHandler from './screens/SignInHandler';
import SignUpHandler from './screens/SignUpHandler';
import ProfileSetup from './screens/ProfileSetup';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=>{
    
  },[]);
  return (
    <NavigationContainer style={{backgroundColor: '#182724',}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Stack.Navigator>
        <Stack.Screen  options={{headerShown:false}} name="SignInHandler" component={SignInHandler}/>
        <Stack.Screen options={{headerShown:false}} name="SignUpHandler" component={SignUpHandler}/>
        <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen options={{headerShown:false}} name="ProfileSetup" component={ProfileSetup}/>
      </Stack.Navigator>
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
