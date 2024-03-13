// @ts-nocheck - may need to be at the start of file
import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function Dropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      disableBorderRadius={true}
    />
  );
}

export default function CityDropDown() {
  return (
    <>
      <View style={{ marginBottom: 2 }}>
        <Dropdown />
      </View>
      <Image
        source={require("../../assets/images/Map.jpg")}
        style={{ width: "100%", height: 250 }}
      />
    </>
  );
}
