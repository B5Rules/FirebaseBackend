import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { getGlobalState } from '../globals/global'
import { StripeProvider } from '@stripe/stripe-react-native'
import StripeApp from './StripeApp'

const StripeProv = ({navigation}) => {
    const [pubKey,setPubKey] = useState(getGlobalState('currentpubkey'))
  return (
    <StripeProvider publishableKey={pubKey}>
      <StripeApp navigation={navigation}/>
    </StripeProvider>
  )
}

export default StripeProv

const styles = StyleSheet.create({})