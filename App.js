import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import SignIn from './Pages/Sign_In'
import SignUp from './Pages/Sign_Up'
import ViewProfile from './Pages/Profile/View_Profile'
import EditProfile from './Pages/Profile/Edit_Profile'
import DeleteAccount from './Pages/Profile/Delete_Account'

const Stack = createNativeStackNavigator();

import {fireAuth} from './firebase';

export default function App() {
/*
  if(!!fireAuth.currentUser){
    //user is authenticated
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ViewProfile" component={ViewProfile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    //user is not authenticated
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
*/

  if(!!fireAuth.currentUser){
    //user is authenticated
    return(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ViewProfile"
          screenOptions={{
            headerStyle: {
              backgroundColor: "transparent"
            },
            headerTintColor: "#f1f1f1",
            headerTransparent: true,
            headerTitle: ""
          }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen options={{headerTintColor: "#f1f1f1"}} name="SignUp" component={SignUp} />
          <Stack.Screen name="ViewProfile" component={ViewProfile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent"
          },
          headerTintColor: "#f1f1f1",
          headerTransparent: true,
          headerTitle: ""
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen options={{headerTintColor: "#f1f1f1"}} name="SignUp" component={SignUp} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}