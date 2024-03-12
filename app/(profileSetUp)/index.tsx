import { Button, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";

import React from "react";
import NextButton from "@/components/NextButton";
import { AntDesign } from '@expo/vector-icons';
const ProfileSetUp = () => {
    const navigation = useNavigation()
  return (
    <View>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <Text>ProfileSetUp</Text>
      <NextButton href="/(profileSetUp)/profileSetUp" isDisabled={false} text={"Next"} styleBtn={""}  icon={<AntDesign name="arrowright" size={20} color="white" />} />   
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}

    </View>
  );
};

export default ProfileSetUp;

const styles = StyleSheet.create({});
