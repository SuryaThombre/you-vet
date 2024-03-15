import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useColorScheme, View } from "react-native";
import getNearestCity from "../../utils/utils";
import { useUserProfile } from "@/providers/profileSetUpProvider";

function Dropdown({ getValue }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const colorScheme = useColorScheme();
  const [items, setItems] = useState([
    {
      label: "New York",
      value: "New York",
      latitude: 40.7128,
      longitude: -74.0059,
    },
    {
      label: "Los Angeles",
      value: "Los Angeles",
      latitude: 34.0522,
      longitude: -118.2437,
    },
    {
      label: "San Diego",
      value: "San Diego",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    {
      label: "Philadelphia",
      value: "Philadelphia",
      latitude: 39.9526,
      longitude: -75.1652,
    },
    {
      label: "Chicago",
      value: "Chicago",
      latitude: 41.8781,
      longitude: -87.6298,
    },
    {
      label: "Houston",
      value: "Houston",
      latitude: 29.7604,
      longitude: -95.3698,
    },
    {
      label: "Phoenix",
      value: "Phoenix",
      latitude: 33.4484,
      longitude: -112.074,
    },
    {
      label: "San Antonio",
      value: "San Antonio",
      latitude: 29.4241,
      longitude: -98.4936,
    },
  ]);

  const extractValue = (itemValue) => {
    setValue(itemValue);
    // extractCity(itemValue);
  };

  const { setCity } = useUserProfile();

  useEffect(() => {
    setValue("New York");
  }, []);

  useEffect(() => {
    if (value !== null) {
      const selectedItem = items.find((item) => item.value === value);
      if (selectedItem) {
        const { latitude, longitude, label, value } = selectedItem;
        getValue({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          label,
          value,
        });
      }
    }
    setCity(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={extractValue}
      setItems={setItems}
      disableBorderRadius={true}
      zIndex={1000}
      maxHeight={200}
      listMode="SCROLLVIEW"
      style={{
        width: "100%",
        alignSelf: "center",
        borderRadius: 25,
        marginVertical: 10,
        borderColor: colorScheme === "dark" ? "#555555" : "lightgray",
        backgroundColor: colorScheme === "dark" ? "#151515" : "#ffffff",
      }}
      textStyle={{
        color: colorScheme === "dark" ? "#ffffff" : "#151515", // Font color
      }}
      dropDownContainerStyle={{
        borderColor: colorScheme === "dark" ? "#555555" : "lightgray",
        backgroundColor: colorScheme === "dark" ? "#151515" : "#ffffff",
      }}
      showArrowIcon={true}
      tickIconStyle={{
        backgroundColor: colorScheme === "dark" ? "#ffffff" : "#151515",
        borderRadius: 50,
      }}
      arrowIconStyle={{
        backgroundColor: colorScheme === "dark" ? "#ffffff" : "#151515",
        borderRadius: 50,
      }}
    />
  );
}

export default function CityDropDown() {
  const [location, setLocation] = useState({});
  const colorScheme = useColorScheme();

  const onSelectLocation = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    let cityName;

    getNearestCity(lat, lng)
      .then((city) => {
        cityName = city;
        setLocation({
          label: location.label,
          value: location.value,
          latitude: lat,
          longitude: lng,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const LightDark = [
    { elementType: "geometry", stylers: [{ color: "#242F3E" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242F3E" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#D59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#D59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263C3F" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6B9A76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414E" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212A37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9CA5B3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1F2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#F3D19C" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2F3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#D59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263C" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515C6D" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263C" }],
    },
  ];

  return (
    <View
      style={{
        backgroundColor: colorScheme === "dark" ? "#151515" : "#ffffff",
      }}
    >
      <Dropdown getValue={setLocation} />
      <MapView
        style={{
          width: "100%",
          height: 300,
          backgroundColor: colorScheme === "dark" ? "#151515" : "#ffffff",
        }}
        provider={PROVIDER_GOOGLE}
        region={location}
        showsUserLocation
        showsMyLocationButton
        onPress={(event) => onSelectLocation(event)}
        customMapStyle={colorScheme === "dark" ? LightDark : []}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
}
