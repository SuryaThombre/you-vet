import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

type PropsTypes = {
  href: string;
  isDisabled: boolean;
  text: string;
  icon?: React.ReactNode; 
  styleBtn?: any;
  fontSize?: number;
  paddinLeftDoneBtn?: number;
  onPress? : () => void
};

const NextButton = ({ href, isDisabled, text = 'Next', icon, styleBtn, fontSize, paddinLeftDoneBtn, onPress }: PropsTypes) => {
  const buttonStyle = {
    backgroundColor: '#F15D22',
    borderRadius: 500,
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    opacity: isDisabled ? 0.5 : 1,
    ...styleBtn,
  };

  const textStyle = {
    marginRight: 10,
    paddingLeft: paddinLeftDoneBtn,
    color: 'white',
    fontSize: fontSize,
  };

  return (
    isDisabled ?
      <View style={buttonStyle}>
        <Pressable style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', 
          justifyContent: 'center',
        }}>
          <Text style={textStyle}>{text}</Text>
          {icon && <View style={{ marginLeft: 5 }}>{icon}</View>} 
        </Pressable>
      </View>
    :
      <Link href={href} style={buttonStyle} asChild>
        <Pressable onPress={onPress? () => onPress() : () => {}} style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center', 
        }}>
          <Text style={textStyle}>{text}</Text>
          {icon && <View style={{ marginLeft: 5 }}>{icon}</View>} 
        </Pressable>
      </Link>
  );
};

export default NextButton;
