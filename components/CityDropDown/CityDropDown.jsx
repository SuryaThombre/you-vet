import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

function Dropdown({ getValue }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'New York', value: 'New York', latitude: 40.7128, longitude: -74.0059 },
    { label: 'Los Angeles', value: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
    { label: 'San Diego', value: 'San Diego', latitude: 32.7157, longitude: -117.1611 },
    { label: 'Philadelphia', value: 'Philadelphia', latitude: 39.9526, longitude: -75.1652 },
    { label: 'Chicago', value: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
    { label: 'Houston', value: 'Houston', latitude: 29.7604, longitude: -95.3698 },
    { label: 'Phoenix', value: 'Phoenix', latitude: 33.4484, longitude: -112.0740 },
    { label: 'San Antonio', value: 'San Antonio', latitude: 29.4241, longitude: -98.4936 },
  ]);

  const extractValue = (itemValue) => {
    setValue(itemValue);
  };

  useEffect(() => {
    setValue('New York');
  }, []);

  useEffect(() => {
    if (value !== null) {
      const selectedItem = items.find((item) => item.value === value);
      if (selectedItem) {
        const { latitude, longitude, label } = selectedItem;
        getValue({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          label,
        });
      }
    }
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={extractValue}
      setItems={setItems}
      placeholder="Select a city"
      containerStyle={{
        margin: 10,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'lightgray',
      }}
      style={{ borderColor: 'lightgray', borderRadius: 25 }}
      // zIndex={1000}
    listMode="SCROLLVIEW"   
    />
  );
}

export default function CityDropDown() {
  const [location, setLocation] = useState({});

  return (
    <>
    <View style={{ marginTop: 2, zIndex: 1000  }}>
        <Dropdown getValue={setLocation} />
      </View>
      <MapView
        style={{ width: '100%', height: 300, backgroundColor: '#fff'}}
        provider={PROVIDER_GOOGLE}
        region={location}
        showsUserLocation
        showsMyLocationButton
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.label}
          />
        )}
      </MapView>
      
    </>
  );
}