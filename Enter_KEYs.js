import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  View,
  Pressable,
  StatusBar,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {useState, React} from "react";

// import Constants from "./Constants";



export default function Enter_KEYs() {
  const [value, setValue] = useState("");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1C2E2B" barStyle="white-content" />

        {/* <ImageBackground source={require("./streets.png")} style={styles.image}> */}
          <Text style={styles.label}> Publisher Key: </Text>
          <TextInput style={styles.input} 
            placeholder="Publisher Key" 
            placeholderTextColor="#BCBCBC" 
            onChangeText={setValue} 
            keyboardType="decimal-pad"
            />
            <View style={styles.line} />

            <Text style={styles.label}> Private Key: </Text>
          <TextInput style={styles.input} 
            placeholder="Private Key" 
            placeholderTextColor="#BCBCBC" 
            onChangeText={setValue} 
            keyboardType="decimal-pad"
            />

          <View style={styles.line} />

          <TouchableOpacity
            style={styles.buttonCharge}
          >
            <Text style={styles.buttonText}> Charge Now </Text>
          </TouchableOpacity>
        {/* </ImageBackground> */}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "#0C1615",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    paddingLeft: 10,
    color: "#C0C0C0",
    fontSize: 22,
    backgroundColor: "#1C2E2B",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 45,
    width: Dimensions.get('window').width - 40,
  },

  buttonCharge: {
    backgroundColor: "#04ae95",
    width: "75%",
    maxHeight: 65,
    marginTop: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  buttonText: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
  },

  line: {
    borderBottomColor: "#05CAAD",
    borderWidth: 2,
    width: "90%",
  },

  label: {
    marginTop: 50,
    marginBottom: 5,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
});
