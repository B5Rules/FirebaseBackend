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
    Alert
  } from "react-native";
  import {useState, React} from "react";
  
  import { useValidation } from "react-native-form-validator";
import { AuthCredential, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { fireAuth } from "../globals/firebase";
  
  
  
  export default function Enter_password({ navigation }) {
    const [password, setPassword] = useState("");
  
    // const { validate, isFieldInError, getErrorMessages } = useValidation({
    //   state: {  password },
    // });
  
    const onPressButton = () => {
      // validate({
      //   password: {
      //     minlength: 10,
      //     maxlength: 20,
      //     hasNumber: true,
      //     hasUpperCase: true,
      //     hasSpecialCharacter: true,
      //     required: true,
      //   },
      // });
      
      // if (!isFieldInError("password") && password != "") {
      //   console.log(password);
      // }
      // de adaugat validarile calumea
      if (password != "") {
        console.log(password);
        reauthenticateWithCredential(fireAuth.currentUser,EmailAuthProvider.credential(fireAuth.currentUser,password))
        .then(()=>{
            navigation.navigate("Pay")
        }).catch(err=>{
            console.log(err);
            Alert(err.message);
        });
      }else{
          Alert("Password required");
      } 
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#1C2E2B" barStyle="white-content" />
  
          <ImageBackground source={require("../images/streets.png")} style={styles.image}>
            <Text style={styles.title}> Please enter your password: </Text>
            
            <TextInput style={styles.input} 
              placeholder="Password" 
              placeholderTextColor="#BCBCBC" 
              onChangeText={setPassword} 
              secureTextEntry={true}
              
              >
  
            </TextInput>
            <View style={styles.line} />
  
            <TouchableOpacity
              style={styles.buttonCharge}
              onPress={onPressButton}
            >
              <Text style={styles.buttonText}> Continue </Text>
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