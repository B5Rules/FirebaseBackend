import { StyleSheet, Image } from 'react-native'
import React from 'react'

const EditButton = () => {
  return (
    <Image
    source={require('../images/Edit_Button.png')}
    style={{
        width: 17,
        height: 17,
        marginTop:10,
        alignSelf:'flex-end'
    }}
    ></Image>
  )
}

export default EditButton

const styles = StyleSheet.create({})