import { StyleSheet } from "react-native";
import { ScrollView } from 'react-native-virtualized-view'
import React from "react";
import { BarGraph } from "../../components/Barchart/BarChart";
import DynamicPieChart from "../../components/PieChart/DynamicPieChart";
import CityDropDown from "../../components/CityDropDown/CityDropDown";

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
