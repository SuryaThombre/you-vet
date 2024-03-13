import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const ProfileSetup = () => {
  const [userName, setUserName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleNext = () => {
    const errors = validateInputs();
    if (Object.keys(errors).length === 0) {
      // Handle the next step after profile setup
      console.log('Username:', userName);
      console.log('Birth Date:', birthDate);
      // Navigate to the next screen
      navigation.navigate('profileSetUp'); // Change 'ProfileSetUp' to the desired screen name
    } else {
      setErrors(errors);
    }
  };

  const validateInputs = () => {
    const errors = {};

    if (!userName) {
      errors.userName = 'Username is required';
    }

    if (!birthDate) {
      errors.birthDate = 'Birth date is required';
    } else {
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
      if (!dateRegex.test(birthDate)) {
        errors.birthDate = 'Invalid birth date format (MM/DD/YYYY)';
      } else {
        const dateParts = birthDate.split('/');
        if (dateParts.length === 3) {
          const [month, day, year] = dateParts;
          const birthDateObj = new Date(year, month - 1, day);
          const currentDate = new Date();
          let age = currentDate.getFullYear() - birthDateObj.getFullYear();
          const monthDiff = currentDate.getMonth() - birthDateObj.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateObj.getDate())) {
            age--;
          }
          if (age < 18) {
            errors.birthDate = 'You must be at least 18 years old';
          }
        } else {
          errors.birthDate = 'Invalid birth date format (MM/DD/YYYY)';
        }
      }
    }

    return errors;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subtitle}>Type your user name and birth date.</Text>
        <Text style={styles.subtitle}>Only user name will be visible for others.</Text>

        <TextInput
          style={[styles.input, errors.userName && styles.inputError]}
          value={userName}
          onChangeText={setUserName}
          placeholder="User Name"
        />
        {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

        <TextInput
          style={[styles.input, errors.birthDate && styles.inputError]}
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="Birth date (MM/DD/YYYY)"
          keyboardType="numbers-and-punctuation"
        />
        {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
      </View>
      <View style={styles.NextButtonStyle}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
        <AntDesign name="arrowright" size={20} color="white" />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius : 50
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  NextButtonStyle : {
    flex : 1,
    justifyContent : "flex-end",
    alignItems : "flex-end",
  },
  button: {
    width : "30%",
    backgroundColor: '#ff7f50',
    paddingVertical: 12,
    borderRadius: 50,
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center"
  },
  buttonText: {
    paddingRight : 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize : 18
  },
});

export default ProfileSetup;