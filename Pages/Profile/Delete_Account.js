import { StatusBar, StyleSheet, Text, TextInput, SafeAreaView, Image, View, Pressable, ScrollView } from 'react-native';
import React ,{useState}from 'react';
import { fireFunc,fireAuth } from '../../firebase';
import { httpsCallable } from 'firebase/functions';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import { setGlobalState,useGlobalState } from '../../state';

const deleteAccount = httpsCallable(fireFunc, 'deleteAccount');

export default function DeleteAccount({ navigation }) {
  onAuthStateChanged(fireAuth, user => {
    if (user != null) {
      //navigation.navigate('ViewProfile');
    }else{
      //console.log('oh no');
      navigation.navigate('SignIn'); 
    }
    // Do other things
  });

  const [username, setUsername] = useState('');

  if(useGlobalState('data')[0].username==''){
    navigation.navigate('ViewProfile');
  }

  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={{backgroundColor: '#000000', minHeight: '100%',}}>

        <StatusBar barStyle="default"/>
        <View style={styles.container}>
              
          <Text style={{fontSize: 32, color: 'red', fontWeight: 'bold', marginTop: '40%'}}>WARNING!</Text>
          <Text style={{display: 'flex', fontSize: 22, color: 'red', textAlign: 'center', margin: 10}}> 
          This action is permanent, irreversible and normally takes effect immediately.
          </Text>

          
          <Pressable style={styles.buttonEdit} onPress={() => {

            deleteAccount().then(() => {
              signOut(fireAuth).then(() => {
                Alert.alert("Notice","Account deleted successfully");
                navigation.navigate('SignIn');
              });
            });
        }}>
              <Text style={styles.buttonText}> Confirm deletion </Text>
          </Pressable>

          <Pressable style={styles.buttonLogOut} onPress={() => navigation.navigate("EditProfile")}>
              <Text style={styles.buttonText}> Cancel </Text>
          </Pressable>

        </View>

      </SafeAreaView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0C1615",
      alignItems: "center",
      justifyContent: "center",
      margin: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ffffff',
      paddingBottom: 50,
      },
    profileImage: {
        width: 68,
        height: 68,
        borderRadius: 400/ 2,
        borderWidth: 3,
        borderColor: '#05CAAD',
        marginRight: 15,
        marginTop: 10,
      },
    nameLabel: {
        color: '#fff',
        fontSize: 44,
        alignSelf: 'center',
        width: '50%',
      },
    attachLabel: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        color: '#C0C0C0',
        fontSize: 22,
        //marginTop: 32,
      },
    dataLabel: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        color: '#fff',
        fontSize: 24,
      },
    buttonEdit: {
        backgroundColor: '#04ae95',
        width: '85%',
        height: '8%',
        marginTop: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogOut: {
        backgroundColor: '#024b40',
        width: '60%',
        height: '7%',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

      },
    buttonText: {
        fontSize: 32,
        color: 'white',
      },
    paymentJournal: {
      marginTop: 30,
      padding: '2%',
      width: '90%',
      height: '20%',
      borderWidth: 3,
      borderColor: '#04ae95',
      borderRadius: 20,
      backgroundColor: '#182724',
     },
});

