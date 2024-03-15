// @ts-nocheck - may need to be at the start of file

import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { BarGraph } from "../../components/Barchart/BarChart";
import DynamicPieChart from "../../components/PieChart/DynamicPieChart";
import CityDropDown from "../../components/CityDropDown/CityDropDown";

const Dashboard = () => {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "#151515" : "#fff"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        translucent={false}
      />

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
