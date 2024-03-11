import { Button, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";

import React from "react";
import NextButton from "@/components/NextButton";

const ProfileSetUp = () => {
    const navigation = useNavigation()
  return (
    <View>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <Text>ProfileSetUp</Text>
      <NextButton href="/(profileSetUp)/profileSetUp" isDisabled={false} text={"Next"} />
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}

    </View>
  );
};

export default ProfileSetUp;

const styles = StyleSheet.create({});
