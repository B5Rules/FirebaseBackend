import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  ScrollViewComponent,
  TouchableOpacity,
} from "react-native";
import { CardField, useConfirmPayment, CardForm } from "@stripe/stripe-react-native";
import { CreditCardInput } from "react-native-credit-card-input";

//ADD localhost address of your server
//const API_URL = "http://10.0.2.2:3000"; // emulator
const API_URL = "http://192.168.0.100:3000"; // - telefon

const StripeApp = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SafeAreaView style={styles.container_black}>
        <StatusBar backgroundColor="#1C2E2B" barStyle="white-content" />

      <View style={styles.container}>
        <ImageBackground source={require("./streets.png")} style={styles.image}>
          <Image source={require("./Logo.png")} style={styles.logo}></Image>

          <TextInput
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor={"#f1f1f1"}
            keyboardType="email-address"
            onChange={(value) => setEmail(value.nativeEvent.text)}
            style={styles.input}
          />

          <View style={styles.cardForm}>
            <CardForm
              postalCodeEnabled={true}
              cardStyle={styles.card}
              style={styles.cardContainer}
              onFormComplete = {cardDetails => {
                setCardDetails(cardDetails);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handlePayPress}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  container_black: {
    backgroundColor: "#111",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#0C1615",
  },
  input: {
    backgroundColor: "#1C2E2B",
    color: "#f1f1f1",  
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
    marginTop: 25,
    width: "90%",
    alignSelf:"center",
  },
  card: {
    backgroundColor: "#05efcd",
    textColor : "#f1f1f1",
  },
  cardContainer: {
    marginTop: 5,
    height: 300,
    width: "90%",
    alignSelf: "center",
  },
  cardForm: {
    marginTop: 25,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#05efcd",
    height: 275,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#04ae95',
    width: '75%',
    maxHeight: 55,
    marginTop: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: "center",
    margin: 50,
  },
});