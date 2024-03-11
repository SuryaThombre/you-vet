import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

type propsTypes = {
  href: string;
  isDisabled: boolean;
  text: string;
};

const NextButton = ({ href, isDisabled, text = 'Next'}: propsTypes) => {
  return (
    <Link href={href} style={{ 
        backgroundColor: '#F15D22',
        borderRadius: 25,
        width: 100,
        paddingVertical: 10,
        paddingHorizontal: 15
    }} asChild>
      <Pressable style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Text style={{ marginRight: 10, color: 'white' }}>{text}</Text>
        <AntDesign name="arrowright" size={20} color="white" />
      </Pressable>
    </Link>
  );
};

export default NextButton;
