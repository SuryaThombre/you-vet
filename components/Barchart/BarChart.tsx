// @ts-nocheck - may need to be at the start of file
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import mockData from '../../Mock_Data/MOCK_DATA.json'

const data = [
  { label: 'Age', value: '1' },
  { label: 'Gender', value: '2' },
  { label: 'Politics', value: '3' },
  { label: 'Race', value: '4' },
];

export function BarGraph() {
  const barData = [
    {
      value: 60000,
      // label: "18-25",
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      //legit
    },
    {
      value: 25000,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: 20000, frontColor: "#757575" },
    //Seems off

    {
      value: 65000,
      // label: "26-40",
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      //legit
    },
    {
      value: 40000,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: 20000, frontColor: "#757575" },
    //Seems off
    {
      value: 50000,
      // label: "41-60",
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      //legit
    },
    {
      value: 75000,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: 20000, frontColor: "#757575" },
    //Seems off
    {
      value: 15000,
      // label: "60+, y/o",
      spacing: 2,
      labelWidth: 60,
      frontColor: "#FA8638",
      //legit
    },
    {
      value: 45000,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: 30000, frontColor: "#757575" },
    //Seems off
  ];

  
  const [value, setValue] = useState(null);
  // const [bardata, setBarData] = useState("");

  // function getFilteredList() {
  //   switch (bardata) {
  //     case "legit":
  //       return mockData.filter((data) => data.type===legit);
  //     case "noIdea":
  //       return mockData.filter((data) => data.type===noIdea);
  //     case "seemsOff":
  //       return mockData.filter((data) => data.type===seemsOff);
  //   }
  // }

  return (
    <View style={styles.barChartContainer}>
      <View style={styles.chartHeading}>
        <Text style={styles.heading}>Details</Text>
        <View style={styles.dropdownContainer} >
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Age"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
       overlayStyle={{ backgroundColor: "transparent" }} 
      />
        </View>
      </View>
      <BarChart
        data={barData}
        barWidth={4}
        spacing={60}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={4}
        maxValue={100000}
      />
      <View style={styles.labels}>
        <Text>18-25</Text>
      <Text>26-40</Text>
      <Text>41-60</Text>
      <Text>60+, y/o</Text>
      </View>
      <View style={styles.chartBottomLabels}>
        <Text style={{ color: "#FA8638", fontSize: 50 }}>.</Text>
        <Text style={{ fontSize: 10 }}>Legit</Text>
        <Text style={{ color: "#DFE0DF", fontSize: 50 }}>.</Text>
        <Text style={{ fontSize: 10 }}>No idea</Text>
        <Text style={{ color: "#757575", fontSize: 50 }}>.</Text>
        <Text style={{ fontSize: 10 }}>Seems off</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Discover New Posts</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  barChartContainer: {
    padding: 20, ///to be removed when merged with others
    paddingTop: 30,
    paddingBottom: 0,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  chartHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  labels:{
    width:300,
    flexDirection:"row",
    justifyContent:"space-around",
    marginLeft:70,
  },
  chartBottomLabels: {
    width: 200,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-around",
  },
  button: {
    width: "100%",
    height: 44,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginVertical: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dropdownContainer:{
    width:120
    
  },
  dropdown: {
    borderColor: "#FA8638",
    borderWidth: 2,
    borderRadius:10,
    padding:5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    fontWeight:700,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontWeight:700,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    display:"none",
  },
});
