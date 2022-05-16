import React from "react";
import StripeApp from "./src/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Journal from "./src/Journal";
import LoadingScreen from "./src/Loading_screen";
import Enter_kwh from "./src/Enter_kwh";

const ComponentStripeProvider = () => {
  return (
    <StripeProvider publishableKey="pk_test_51KvNRAKNgHgd1DYNECNL3IkZfcjDMJHNxedX6KNF854wrKXYGJupNvzqF1lL36f8X9OI1ky9NeDyZxKJ52dPcvrM00DsPmDs4r">
      <StripeApp />
    </StripeProvider>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Enter_kwh"
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "#f1f1f1",
          headerTransparent: true,
          headerTitle: "",
          headerBackVisible: false
        }}
      >
        
        <Stack.Screen name="Enter_kwh" component={Enter_kwh} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Journal" component={Journal} />
        <Stack.Screen name="Pay" component={ComponentStripeProvider} options={{headerBackVisible:true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
