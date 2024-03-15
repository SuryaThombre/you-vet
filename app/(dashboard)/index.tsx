// @ts-nocheck - may need to be at the start of file

import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import { BarGraph } from "../../components/Barchart/BarChart";
import DynamicPieChart from "../../components/PieChart/DynamicPieChart";
import CityDropDown from "../../components/CityDropDown/CityDropDown";
import mockData from "../../Mock_Data/MOCK_DATA.json";

const Dashboard = () => {

  return (
    <>
      <ScrollView>
        <CityDropDown />
        <DynamicPieChart />
        <BarGraph />
      </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
