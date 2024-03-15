import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";

import LocationImage from "../../assets/images/LocationImage.png";

const LocationScree = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      console.log( "granted",permissionResponse.granted);
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      console.log("denied");
      
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    try {
      const hasPermission = await verifyPermissions();
      if(!hasPermission) {
        return;
      }
      try {
        navigation.navigate("(dashboard)"); // Navigate to the Dashboard screen
        const location = await getCurrentPositionAsync();
        console.log(location);
        
      } catch (error) {
        console.log("===>", error);
        navigation.navigate("locationScreen"); // Navigate to the Location Screen
        
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <View style={[styles.mainContainer, { backgroundColor: colorScheme === 'dark' ? '#151515' : '#ffffff' }]}>
      <View style={styles.locationContainer}>
        <Image style={styles.imageLocation} source={LocationImage} />
        <Text style={[styles.headingText, { color: colorScheme === 'dark' ? '#ffffff' : '#222222' }]}>Enable Your Location</Text>
        <Text style={[styles.paraText, { color: colorScheme === 'dark' ? '#ffffff' : '#222222' }]}>
          Allow if you would like to see how others in your community, state,
          country, and around the world vetted this information source
        </Text>
      </View>
      <View style={styles.enableButton}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff7f50' }]} onPress={getLocationHandler}>
          <Text style={styles.buttonText}>Enable</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationScree;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 25,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageLocation: {
    width: 300,
    height: 300,
  },
  enableButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontSize: 24,
    paddingTop: 25,
    fontWeight: "800",
  },
  paraText: {
    padding: 16,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    width: "90%",
    paddingVertical: 12,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    paddingRight: 5,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
