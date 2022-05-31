import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, Pressable, Image } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

//ADD localhost address of your server
//const API_URL = "http://10.0.2.2:3000"; // emulator
const API_URL = "http://192.168.0.101:3000";// - telefon

const StripeApp = props => {
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
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
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
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container_black}>

      <View style={styles.container}>

      <Image source={require("./Logo.svg")} style={styles.logo} >
      </Image>

        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          placeholderTextColor={"#f1f1f1"}
          keyboardType="email-address"
          onChange={value => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />

        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          placeholderTextColor={"#f1f1f1"}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={cardDetails => {
            setCardDetails(cardDetails);
          }}
        />

        {/* <Button onPress={handlePayPress} title="Pay" disabled={loading} /> */}
        <Pressable style={styles.button} onPress={handlePayPress}> 
          <Text style={styles.buttonText}> 
            Pay 
          </Text> 
        </Pressable>

      </View>
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
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
    padding: 20,
    backgroundColor: "#0C1615",
  },
  input: {
    backgroundColor: "#1C2E2B",
    color: "#f1f1f1",  
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#1C2E2B",
    color: "#f1f1f1",
    borderRadius: 8,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
  },
  cardContainer: {
    color: "#f1f1f1",
    height: 50,
    marginVertical: 30,
  },
  line: {
    borderBottomColor: '#05CAAD',
    borderWidth: 2,
    width: '100%',
  },
  button: {
    backgroundColor: '#04ae95',
    width: '75%',
    maxHeight: 55,
    marginTop: 50,
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
  width: 250,
  height: 250,
  marginBottom: 10
},
});
