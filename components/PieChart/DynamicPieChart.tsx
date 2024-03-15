// @ts-nocheck
import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, Text, useColorScheme } from "react-native";
import PieChart from "react-native-pie-chart";
import Data from "../../Mock_Data/MOCK_DATA.json";
import { useState } from "react";

export default function App() {
  const [legitCount, setLegitCount] = useState(0);
  const [seemsOffCount, setSeemsOffCount] = useState(0);
  const [noIdeasCount, setNoIdeasCount] = useState(0);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize counts for each vote value
    let legit = 0;
    let seemsOff = 0;
    let noIdeas = 0;

    // Iterate through each data object
    Data.forEach((obj) => {
      // Extract the vote value from the object
      const voteValue = obj.vote;

      // Increment the count based on the vote value
      if (voteValue === "Legit") {
        legit++;
      } else if (voteValue === "Seems Off") {
        seemsOff++;
      } else if (voteValue === "No Idea") {
        noIdeas++;
      }
    });
    // Update state with the counts
    setLegitCount(legit);
    setSeemsOffCount(seemsOff);
    setNoIdeasCount(noIdeas);
  }, []); // Run this effect only once on component mount

  const data = [
    {
      id: 1,
      key: "Legit",
      count: legitCount,
      percentage: Math.round((legitCount / Data.length) * 100),
      color: "#FA8638",
    },
    {
      id: 2,
      key: "No idea",
      count: noIdeasCount,
      percentage: Math.round((noIdeasCount / Data.length) * 100),
      color: "#DFE0DF",
    },
    {
      id: 3,
      key: "Seems off",
      count: seemsOffCount,
      percentage: Math.round((seemsOffCount / Data.length) * 100),
      color: "#757575",
    },
  ];

  const totalCount = data.reduce((acc, item) => acc + parseInt(item.count), 0);

  const calculateSeries = () => {
    return data.map((item) => (item.count / totalCount) * 100);
  };

  const RenderListItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
      <Text style={[styles.key, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{item.key}</Text>
      <Text style={[styles.count, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{item.count}</Text>
      <Text style={styles.percent}>({item.percentage}%)</Text>
    </View>
  );

  return (
    <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? '#151515' : '#ffffff'}}>
      <PieChart
        style={styles.pieChart}
        widthAndHeight={90}
        series={calculateSeries()}
        sliceColor={["#FA8638", "#757575", "#DFE0DF"]}
        coverRadius={0.85}
        coverFill={colorScheme === 'dark' ? '#151515' : '#ffffff'}
        innerRadius={100}
      />
      <FlatList
        data={data}
        renderItem={(item) => RenderListItem(item)}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 30,
  },
  pieChart: {
    marginRight: 20,
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "500",
  },
  colorIndicator: {
    marginTop: 2,
    width: 12,
    height: 12,
    borderRadius: 8,
    marginRight: 6,
  },
  key: {
    width: 80,
    fontSize: 12,
    marginLeft: 6,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  count: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 8,
  },
  percent: {
    color: "#757575",
    fontSize: 12,
  },
});
