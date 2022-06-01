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
    BackHandler
  } from "react-native";
  import {useState, React, useEffect} from "react";
  
import { getGlobalState, setGlobalState } from "../globals/global";
import { fireFunc } from "../globals/firebase";
import { httpsCallable } from "firebase/functions";
import { useIsFocused } from "@react-navigation/native";
  
const getStationData = httpsCallable(fireFunc, "getStationData");

  export default function Enter_kwh({ navigation }) {

    const isFocused = useIsFocused();

    const handleBackButton = () => {
      navigation.navigate('MapNavigator');
      return true;
    };

    useEffect(() => {
      StatusBar.setBarStyle("white-content");
      const back = BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      return () => {
        back.remove();
      };
    }, [isFocused]);

    const [value, setValue] = useState(0);
    const [stationID, setStationID] = useState('');

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#1C2E2B" barStyle="white-content" />
  
          <ImageBackground source={require("../images/streets.png")} style={styles.image}>
            <Text style={styles.title}> Introduce number of kwH you want to charge: </Text>

            <TextInput style={styles.input} 
              placeholder="KwH" 
              placeholderTextColor="#BCBCBC" 
              onChangeText={setValue} 
              keyboardType="decimal-pad"
              
              >

            </TextInput>
            <View style={styles.line} />
  
            <TouchableOpacity
              style={styles.buttonCharge}
              onPress={() => { 
                setGlobalState('kwhToCharge',parseInt(value,10))
                navigation.navigate("Charging Page", {
                kWh: parseInt(value, 10)
              })
                
                // if ((!isNaN(value)) && (value >= 10) && (value <= parseFloat(getGlobalState('carData').chargingCap))) {
                //   //todo this screen comes right after the car selection screen and instead of 100,
                //   //the app will use the car's battery cap as the max value
                //   //console.log(value);
                //   //console.log(stationID);
                //   setGlobalState("kwhToCharge", value);
                //   navigation.navigate("LoadingScreen");
                // } else {
                //   alert("You have to enter a numeric value between 10 and "+getGlobalState('carData').chargingCap);
                // }
              }}
            >
              <Text style={styles.buttonText}> Charge Now </Text>
            </TouchableOpacity>
          </ImageBackground>
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
      // marginBottom: -15,
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

    title: {
      fontSize: 24,
      color: "white",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      bottom: "5%",
      marginLeft: "3%",
      marginRight: "3%",
      marginTop: "3%",
      textAlign: "center",
    },
  });
  