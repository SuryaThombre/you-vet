import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Chip } from "react-native-paper";
import NextButton from "@/components/NextButton";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import ProfileSetUpStepOne from "./index";

type Gender = "Female" | "Male" | "Transgender" | "Non-binary/Non-conforming";
type PoliticalPreference =
  | "Very conservative"
  | "Conservative"
  | "Prefer not to say"
  | "Very liberal"
  | "Liberal";
type RacialIdentity =
  | "White"
  | "Black/ African American"
  | "Asian"
  | "American Indian / Alaska Native"
  | "Native Hawaiian & Other Pacific Islander"
  | "Hispanic or Latino"
  | "Two or more races";

const GenderOptions: Gender[] = [
  "Female",
  "Male",
  "Transgender",
  "Non-binary/Non-conforming",
];
const PoliticalOptions: PoliticalPreference[] = [
  "Very conservative",
  "Conservative",
  "Very liberal",
  "Liberal",
];
const RacialIdentityOptions: RacialIdentity[] = [
  "White",
  "Black/ African American",
  "Asian",
  "American Indian / Alaska Native",
  "Native Hawaiian & Other Pacific Islander",
  "Hispanic or Latino",
  "Two or more races",
];

const ProfileSetup = () => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedPolitical, setSelectedPolitical] =
    useState<PoliticalPreference | null>(null);
  const [selectedRacialIdentity, setSelectedRacialIdentity] =
    useState<RacialIdentity | null>(null);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const navigation = useNavigation(); // Initialize useNavigation hook
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (selectedGender && selectedPolitical && selectedRacialIdentity) {
      setIsNextButtonEnabled(true);
    } else {
      setIsNextButtonEnabled(false);
    }
  }, [selectedGender, selectedPolitical, selectedRacialIdentity]);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const handlePoliticalSelect = (political: PoliticalPreference) => {
    setSelectedPolitical(political === selectedPolitical ? null : political);
  };

  const handleRacialIdentitySelect = (racialIdentity: RacialIdentity) => {
    setSelectedRacialIdentity(
      racialIdentity === selectedRacialIdentity ? null : racialIdentity
    );
  };

  const handlePrevious = () => {
    navigation.navigate("index"); // Navigate to ProfileSetUpStepOne component
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <View>
        <Text
          style={[
            styles.pageInfo,
            { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          Tell us a bit about yourself. This information will not be public. It
          allows you to compare your vets with others.
        </Text>

        <Text
          style={[
            styles.label,
            { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          Gender
        </Text>
        <ScrollView>
          <View
            style={[
              styles.optionContainer,
              {
                backgroundColor: colorScheme === "dark" ? "#151515" : "#ffffff",
              },
            ]}
          >
            {GenderOptions.map((gender) => (
              <Chip
                key={gender}
                style={[
                  styles.chip,
                  selectedGender === gender && styles.selectedChip,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#151515" : "#ffffff",
                    borderColor: colorScheme === "dark" ? "#ffffff" : undefined,
                    borderWidth: colorScheme === "dark" ? 1 : undefined,
                  },
                ]}
                icon={({ size, color }) =>
                  selectedGender === gender ? (
                    <AntDesign name="check" size={size} color="#F15D22" />
                  ) : null
                }
                onPress={() => handleGenderSelect(gender)}
                selected={selectedGender === gender}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedGender === gender && styles.selectedChipText,
                    {
                      color: colorScheme === "dark" ? "#ffffff" : "#151515",
                    },
                  ]}
                >
                  {gender}
                </Text>
              </Chip>
            ))}
          </View>
          <Text
            style={[
              styles.label,
              { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            Political Preferences
          </Text>
          <View style={styles.optionContainer}>
            {PoliticalOptions.map((political) => (
              <Chip
                key={political}
                style={[
                  styles.chip,
                  selectedPolitical === political && styles.selectedChip,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#151515" : "#ffffff",
                    borderColor: colorScheme === "dark" ? "#ffffff" : undefined,
                    borderWidth: colorScheme === "dark" ? 1 : undefined,
                  },
                ]}
                icon={({ size, color }) =>
                  selectedPolitical === political ? (
                    <AntDesign name="check" size={size} color="#F15D22" />
                  ) : null
                }
                onPress={() => handlePoliticalSelect(political)}
                selected={selectedPolitical === political}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedPolitical === political && styles.selectedChipText,
                    {
                      color: colorScheme === "dark" ? "#ffffff" : "#151515",
                    },
                  ]}
                >
                  {political}
                </Text>
              </Chip>
            ))}
          </View>
          <Text
            style={[
              styles.label,
              { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            Racial Identity
          </Text>
          <View style={styles.optionContainer}>
            {RacialIdentityOptions.map((racialIdentity) => (
              <Chip
                key={racialIdentity}
                style={[
                  styles.chip,
                  selectedRacialIdentity === racialIdentity &&
                    styles.selectedChip,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#151515" : "#ffffff",
                    borderColor: colorScheme === "dark" ? "#ffffff" : undefined,
                    borderWidth: colorScheme === "dark" ? 1 : undefined,
                  },
                ]}
                icon={({ size, color }) =>
                  selectedRacialIdentity === racialIdentity ? (
                    <AntDesign name="check" size={size} color="#F15D22" />
                  ) : null
                }
                onPress={() => handleRacialIdentitySelect(racialIdentity)}
                selected={selectedRacialIdentity === racialIdentity}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedRacialIdentity === racialIdentity &&
                      styles.selectedChipText,
                    {
                      color: colorScheme === "dark" ? "#ffffff" : "#151515",
                    },
                  ]}
                >
                  {racialIdentity}
                </Text>
              </Chip>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon={({ size, color }) => (
            <AntDesign name="arrowleft" size={size} color={color} />
          )}
          mode="outlined"
          onPress={handlePrevious}
          style={[
            styles.previousButton,
            { borderColor: colorScheme === "dark" ? "#ffffff" : "#000000" },
          ]}
          labelStyle={{
            ...styles.buttonTextPrevious,
            color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
          }}
        >
          Previous
        </Button>
        <NextButton
          href="/(profileSetUp)/locationScreen"
          isDisabled={!isNextButtonEnabled}
          fontSize={18}
          paddinLeftDoneBtn={10}
          text={"Done"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  pageInfo: {
    fontSize: 18,
    lineHeight: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    marginVertical: 4,
    marginRight: 8,
    borderRadius: 500,
    backgroundColor: "#f6f6f6",
    borderColor: "transparent",
    borderWidth: 2,
  },
  chipText: {
    color: "#333333",
  },
  selectedChip: {
    backgroundColor: "#fef9f8",
    borderColor: "#F15D22",
    borderWidth: 2,
  },
  selectedChipText: {
    color: "#F15D22",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  previousButton: {
    width: "35%",
    borderRadius: 500,
  },
  buttonTextPrevious: {
    fontSize: 18,
  },
});

export default ProfileSetup;
