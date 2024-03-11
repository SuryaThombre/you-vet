import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";
import { Header } from "@react-navigation/elements";

export default function MyHeader() {
  return (
    <Header
      title="Profile set up"
      // HeaderBackButton={label : 'Profile'}
      
      headerTitle={"Profile set up"}
      headerTitleAlign="center"
    />
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
  },
  progress: {
    backgroundColor: "#F15D22",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
