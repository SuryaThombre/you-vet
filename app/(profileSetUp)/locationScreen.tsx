import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NextButton from '@/components/NextButton'
import { AntDesign } from '@expo/vector-icons';
const LocationScree = () => {
  return (
    <View>
      <Text>LocationScreen</Text>
      <NextButton text='Enable' href='/(dashboard)' isDisabled={false} icon={<AntDesign name="arrowright" size={20} color="white" />}/>
    </View>
  )
}

export default LocationScree

const styles = StyleSheet.create({})