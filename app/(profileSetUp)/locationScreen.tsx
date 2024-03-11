import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NextButton from '@/components/NextButton'

const LocationScree = () => {
  return (
    <View>
      <Text>LocationScreen</Text>
      <NextButton text='Enable' href='/(dashboard)' isDisabled={false}/>
    </View>
  )
}

export default LocationScree

const styles = StyleSheet.create({})