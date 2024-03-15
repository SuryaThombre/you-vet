// @ts-nocheck - may need to be at the start of file
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Dropdown } from "react-native-element-dropdown";
import mockData from "../../Mock_Data/MOCK_DATA.json";
import { useUserProfile } from "@/providers/profileSetUpProvider";

//array for labels bwlow the bar graph
const data = [
  { label: "Age", value: "1" },
  { label: "Gender", value: "2" },
  { label: "Politics", value: "3" },
  { label: "Race", value: "4" },
];

export function BarGraph() {
  const [value, setValue] = useState(null);
  const [barLabels, setBarLabels] = useState([
    "18-25",
    "26-40",
    "41-60",
    "60+, y/o",
  ]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("1");
  const [selectedCityArr, setSelectedCityArr] = useState([]);
  const colorScheme = useColorScheme();
  //functions for filter the bar graph data
  const { city } = useUserProfile();
  console.log(city, "city");

  //function for filter age data

  const ageFilterData = (city, vote, minAge, maxAge = Infinity) => {
    return mockData.filter(
      (item) =>
        item.city_name === city &&
        item.vote === vote &&
        item.age >= minAge &&
        item.age <= maxAge
    );
  };

  const legitData1825 = ageFilterData(city, "Legit", 18, 25);
  const noIdea1825 = ageFilterData(city, "No Idea", 18, 25);
  const seemsOff1825 = ageFilterData(city, "Seems Off", 18, 25);

  const legitData2640 = ageFilterData(city, "Legit", 26, 40);
  const noIdea2640 = ageFilterData(city, "No Idea", 26, 40);
  const seemsOff2640 = ageFilterData(city, "Seems Off", 26, 40);

  const legitData4160 = ageFilterData(city, "Legit", 41, 60);
  const noIdea4160 = ageFilterData(city, "No Idea", 41, 60);
  const seemsOff4160 = ageFilterData(city, "Seems Off", 41, 60);

  const legitData60Above = ageFilterData(city, "Legit", 60);
  const noIdea60Above = ageFilterData(city, "No Idea", 60);
  const seemsOff60Above = ageFilterData(city, "Seems Off", 60);

  //function for filter gender data

  const genderFilterData = (city, vote, gender) => {
    return mockData.filter(
      (item) =>
        item.city_name === city && item.vote === vote && item.gender === gender
    ).length;
  };

  const genderVoteOptions = ["Legit", "No Idea", "Seems Off"];
  const genderOptions = ["Male", "Female", "Transgender", "Non-Binary"];

  const genderResult = {};

  genderVoteOptions.forEach((vote) => {
    genderOptions.forEach((gender) => {
      genderResult[`${vote}${gender}`] = genderFilterData(city, vote, gender);
    });
  });

  //function for filter politics data

  const politicsFilterData = (city, vote, politics) => {
    return mockData.filter(
      (item) =>
        item.city_name === city &&
        item.vote === vote &&
        item.politics === politics
    ).length;
  };

  const politicsVoteOptions = ["Legit", "No Idea", "Seems Off"];
  const politicsOptions = [
    "Conservative",
    "Liberal",
    "Very Conservative",
    "Very Liberal",
  ];

  const politicsResult = {};

  politicsVoteOptions.forEach((vote) => {
    politicsOptions.forEach((politics) => {
      politicsResult[`${vote}${politics}`] = politicsFilterData(
        city,
        vote,
        politics
      );
    });
  });

  // console.log("result", politicsResult, city);

  //function for filter race data

  const raceFilterData = (city, vote, race) => {
    return mockData.filter(
      (item) =>
        item.city_name === city && item.vote === vote && item.race === race
    ).length;
  };

  const raceVoteOptions = ["Legit", "No Idea", "Seems Off"];
  const raceOptions = [
    "White",
    "black/African American",
    "Asian",
    "American Indian/Alaska Native",
    "Native Hawaiian & Other Pacific islanders",
    "Hispanic or Latino",
    "Two or more races",
  ];

  const raceResult = {};

  raceVoteOptions.forEach((vote) => {
    raceOptions.forEach((race) => {
      raceResult[`${vote}${race}`] = raceFilterData(city, vote, race);
    });
  });

  // console.log("result", raceResult, city);

  //bar chart data's
  const ageBarData = [
    {
      value: legitData1825.length,
      label: barLabels[0],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: noIdea1825.length,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: seemsOff1825.length, frontColor: "#757575" },
    //Seems off

    {
      value: legitData2640.length,
      label: barLabels[1],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: noIdea2640.length,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: seemsOff2640.length, frontColor: "#757575" },
    //Seems off
    {
      value: legitData4160.length,
      label: barLabels[2],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: noIdea4160.length,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: seemsOff4160.length, frontColor: "#757575" },
    //Seems off
    {
      value: legitData60Above.length,
      label: barLabels[3],
      spacing: 2,
      labelWidth: 60,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: noIdea60Above.length,
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: seemsOff60Above.length, frontColor: "#757575" },
    //Seems off
  ];

  const genderBarData = [
    {
      value: genderResult["LegitMale"],
      label: barLabels[0],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: genderResult["No IdeaMale"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: genderResult["Seems OffMale"], frontColor: "#757575" },
    //Seems off

    {
      value: genderResult["LegitFemale"],
      label: barLabels[1],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: genderResult["No IdeaFemale"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: genderResult["Seems OffFemale"], frontColor: "#757575" },
    //Seems off
    {
      value: genderResult["LegitTransgender"],
      label: barLabels[2],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: genderResult["No IdeaTransgender"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: genderResult["Seems OffTransgender"], frontColor: "#757575" },
    //Seems off
    {
      value: genderResult["LegitNon-Binary"],
      label: barLabels[3],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: genderResult["No IdeaNon-Binary"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: genderResult["Seems OffNon-Binary"], frontColor: "#757575" },
    //Seems off
  ];

  const politicsBarData = [
    {
      value: politicsResult["LegitLiberal"],
      label: barLabels[0],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: politicsResult["No IdeaLiberal"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: politicsResult["Seems OffLiberal"], frontColor: "#757575" },
    //Seems off

    {
      value: politicsResult["LegitConservative"],
      label: barLabels[1],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: politicsResult["No IdeaConservative"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: politicsResult["Seems OffConservative"], frontColor: "#757575" },
    //Seems off
    {
      value: politicsResult["LegitVery Conservative"],
      label: barLabels[2],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: politicsResult["No IdeaVery Conservative"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    {
      value: politicsResult["Seems OffVery Conservative"],
      frontColor: "#757575",
    },
    //Seems off
    {
      value: politicsResult["LegitVery Liberal"],
      label: barLabels[3],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: politicsResult["No IdeaVery Liberal"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    {
      value: politicsResult["Seems OffVery Liberal"],
      frontColor: "#757575",
    },
    //Seems off
  ];

  const raceBarData = [
    {
      value: raceResult["LegitWhite"],
      label: barLabels[0],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: raceResult["No IdeaWhite"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: raceResult["Seems OffWhite"], frontColor: "#757575" },
    //Seems off

    {
      value: raceResult["Legitblack/African American"],
      label: barLabels[1],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: raceResult["No Ideablack/African American"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    {
      value: raceResult["Seems Offblack/African American"],
      frontColor: "#757575",
    },
    //Seems off
    {
      value: raceResult["LegitAsian"],
      label: barLabels[2],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: raceResult["No IdeaAsian"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    { value: raceResult["Seems OffAsian"], frontColor: "#757575" },
    //Seems off
    {
      value: raceResult["LegitAmerican Indian/Alaska Native"],
      label: barLabels[3],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: raceResult["No IdeaAmerican Indian/Alaska Native"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    {
      value: raceResult["Seems OffAmerican Indian/Alaska Native"],
      frontColor: "#757575",
    },
    //Seems off
    {
      value: raceResult["LegitNative Hawaiian & Other Pacific islanders"],
      label: barLabels[4],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: raceResult["No IdeaNative Hawaiian & Other Pacific islanders"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    {
      value: raceResult["Seems OffNative Hawaiian & Other Pacific islanders"],
      frontColor: "#757575",
    },
    //Seems off
    {
      value: raceResult["LegitHispanic or Latino"],
      label: barLabels[5],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: raceResult["No IdeaHispanic or Latino"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    {
      value: raceResult["Seems OffHispanic or Latino"],
      frontColor: "#757575",
    },
    //Seems off
    {
      value: raceResult["LegitTwo or more races"],
      label: barLabels[6],
      spacing: 2,
      labelWidth: 50,
      frontColor: "#FA8638",
      labelTextStyle: { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
      //legit
    },
    {
      value: raceResult["No IdeaTwo or more races"],
      spacing: 2,
      frontColor: "#DFE0DF",
      //No idea
    },
    {
      value: raceResult["Seems OffTwo or more races"],
      frontColor: "#757575",
    },
    //Seems off
  ];

  // Function to filter data by city
  function filterDataByCity(selectedCity) {
    return mockData.filter((item) => item.city_name === selectedCity);
  }

  function renderSelectedCityData(selectedCity) {
    const selectedCityData1 = filterDataByCity(selectedCity);
  }

  const selectedCity = city;

  renderSelectedCityData(selectedCity);

  const handleDropdownChange = (selectedValue) => {
    setValue(selectedValue);
    setSelectedDropdownValue(selectedValue);

    // adjust bar chart labels based on selected dropdown value
    switch (selectedValue) {
      case "1":
        setBarLabels(["18-25", "26-40", "41-60", "60+, y/o"]);
        break;
      case "2":
        setBarLabels(["Male", "Female", "Transgender", "Non-binary"]);
        break;
      case "3":
        setBarLabels([
          "Liberal",
          "Conservative",
          "Very Conservative",
          "Very Liberal",
        ]);
        break;
      case "4":
        setBarLabels([
          "White",
          "Black",
          "Asian",
          "American Indian",
          "Native Hawaiian ",
          "Hispanic",
          "Two or more races",
        ]);
        break;
      case "5":
        setBarLabels([
          "New York",
          "Los Angeles",
          "San Diego",
          "Philadelphia",
          "Chicago",
          "Houston",
          "Phoenix",
          "San Antonio",
        ]);
        break;
      default:
        setBarLabels(["18-25", "26-40", "41-60", "60+ y/o"]);
        break;
    }
  };

  let barData = [];

  switch (selectedDropdownValue) {
    case "1":
      barData = ageBarData;
      break;
    case "2":
      barData = genderBarData;
      break;
    case "3":
      barData = politicsBarData;
      break;
    case "4":
      barData = raceBarData;
      break;
    default:
      barData = ageBarData;
      break;
  }

  return (
    <View
      style={[
        styles.barChartContainer,
        { backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff" },
      ]}
    >
      <View style={styles.chartHeading}>
        <Text
          style={[
            styles.heading,
            { color: colorScheme === "dark" ? "#ffffff" : "#222222" },
          ]}
        >
          Details
        </Text>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: colorScheme === "dark" ? "#ffffff" : "#FA8638" },
            ]}
            placeholderStyle={[
              styles.placeholderStyle,
              { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
            ]}
            inputSearchStyle={[
              styles.inputSearchStyle,
              { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
            ]}
            iconStyle={[
              styles.iconStyle,
              { tintColor: colorScheme === "dark" ? "#ffffff" : "#000000" },
            ]}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Age"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => handleDropdownChange(item.value)}
            containerStyle={{
              backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff",
              borderRadius: 10,
            }}
            itemTextStyle={{
              color: colorScheme === "dark" ? "#ffffff" : "#000000",
            }}
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
        yAxisTextStyle={{
          color: colorScheme === "dark" ? "#ffffff" : "#808080",
        }}
        noOfSections={4}
        maxValue={100}
        barColor={(index) => {
          const colorSchemeDark = colorScheme === "dark";
          switch (index % 3) {
            case 0:
              return colorSchemeDark ? "#FA8638" : "#FFA07A";
            case 1:
              return colorSchemeDark ? "#DFE0DF" : "#D3D3D3";
            case 2:
              return colorSchemeDark ? "#757575" : "#A9A9A9";
            default:
              return "#FA8638";
          }
        }}
      />

      <View style={styles.chartBottomLabels}>
        <Text style={{ color: "#FA8638", fontSize: 50 }}>.</Text>
        <Text
          style={{
            color: colorScheme === "dark" ? "#ffffff" : "#000000",
            fontSize: 10,
          }}
        >
          Legit
        </Text>
        <Text style={{ color: "#DFE0DF", fontSize: 50 }}>.</Text>
        <Text
          style={{
            color: colorScheme === "dark" ? "#ffffff" : "#000000",
            fontSize: 10,
          }}
        >
          No idea
        </Text>
        <Text style={{ color: "#757575", fontSize: 50 }}>.</Text>
        <Text
          style={{
            color: colorScheme === "dark" ? "#ffffff" : "#000000",
            fontSize: 10,
          }}
        >
          Seems off
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { borderColor: colorScheme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          Discover New Posts
        </Text>
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
  labels: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 70,
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
  dropdownContainer: {
    width: 120,
  },
  dropdown: {
    borderColor: "#FA8638",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    fontWeight: 700,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontWeight: 700,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    display: "none",
  },
});
