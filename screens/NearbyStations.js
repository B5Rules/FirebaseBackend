import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import {selectNearByStations} from '../navSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text, Image, component } from 'react-native';

function NearbyStations(navigation) {
  const nearByStations = useSelector(selectNearByStations);

  useEffect(() => {
    //console.log(nearByStations);
  });

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <TouchableOpacity style={styles.direction}>
        <MaterialCommunityIcons name="directions" color="#01F2CF" size={36} /> 
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Distance:</Text>
          <Text style={styles.txtRight}>{nearByStations[0]?.distance?.doubleValue / 1000} km</Text>
          <Image
            style={styles.image}
            source={require('../assets/icon.png')}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Price:</Text>
          <Text style={styles.txtRight}>{nearByStations[0]?.price?.doubleValue}  /kWh</Text>
          <Image style={styles.image} source={require('../assets/icon.png')} />
          <Text style={styles.txtRight}>{nearByStations[0]?.type?.stringValue}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Status:</Text>
          <Text style={styles.txtRight}>Text</Text>
        </View>

        <View style={styles.row}>
            {nearByStations[0]?.services?.arrayValue?.values.length > 0 && <Text style={styles.txtLeft}>Services:</Text>}
            { nearByStations[0]?.services?.arrayValue?.values.length > 0 &&
              nearByStations[0]?.services?.arrayValue?.values.map((service, index) => {
              return (
                <Text key={index} style={styles.txtRight}>{service.stringValue}</Text>
              );
            })}
        </View>
      </View>

      <View style={styles.rectangle}>
      <TouchableOpacity style={styles.direction}>
        <MaterialCommunityIcons name="directions" color="#01F2CF" size={36} /> 
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Distance:</Text>
          <Text style={styles.txtRight}>{nearByStations[1]?.distance?.doubleValue / 1000 } km</Text>
          <Image
            style={styles.image}
            source={require('../assets/icon.png')}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Price:</Text>
          <Text style={styles.txtRight}>{ nearByStations[1]?.price?.doubleValue } /kWh</Text>
          <Image style={styles.image} source={require('../assets/icon.png')} />
          <Text style={styles.txtRight}>{nearByStations[1]?.type?.stringValue}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Status:</Text>
          <Text style={styles.txtRight}>Text</Text>
        </View>

        <View style={styles.row}>
        {nearByStations[1]?.services?.arrayValue?.values.length > 0 && <Text style={styles.txtLeft}>Services:</Text>}
          { nearByStations[1]?.services?.arrayValue?.values.length > 0 &&
              nearByStations[1]?.services?.arrayValue?.values.map((service, index) => {
              return (
                <Text key={index} style={styles.txtRight}>{service.stringValue}</Text>
              );
            })}
        </View>
      </View>

      <View style={styles.rectangle}>
      <TouchableOpacity style={styles.direction}>
        <MaterialCommunityIcons name="directions" color="#01F2CF" size={36} /> 
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Distance:</Text>
          <Text style={styles.txtRight}>{nearByStations[2]?.distance?.doubleValue / 1000} km</Text>
          <Image
            style={styles.image}
            source={require('../assets/icon.png')}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Price:</Text>
          <Text style={styles.txtRight}>{nearByStations[2]?.price?.doubleValue} /kWh</Text>
          <Image style={styles.image} source={require('../assets/icon.png')} />
          <Text style={styles.txtRight}>{nearByStations[2]?.type?.stringValue}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.txtLeft}>Status:</Text>
          <Text style={styles.txtRight}>Text</Text>
        </View>

        <View style={styles.row}>
        {nearByStations[2]?.services?.arrayValue?.values.length > 0 && <Text style={styles.txtLeft}>Services:</Text>}
          { nearByStations[2]?.services?.arrayValue?.values.length > 0 &&
              nearByStations[2]?.services?.arrayValue?.values.map((service, index) => {
              return (
                <Text key={index} style={styles.txtRight}>{service.stringValue}</Text>
              );
            })}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  direction: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040506',
    flexDirection: 'column',
  },
  image: {
    width: 20,
    height: 30,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    // padding: '2%',
    marginLeft: '7%',
    flex: 1,
  },
  rectangle: {
    marginTop: 22,
    width: '80%',
    height: '22%',
    backgroundColor: '#182724',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  txtLeft: {
    color: 'white',
    marginRight: 20,
    fontSize:16,
  },
  txtRight: {
    fontWeight: 'bold',
    color: '#01F2CF',
    marginRight: 10,
    fontSize:18,
  },
});

export default NearbyStations;