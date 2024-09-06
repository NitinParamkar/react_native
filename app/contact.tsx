import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [countryCode, setCountryCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCodeError, setCountryCodeError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const router = useRouter();

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateCountryCode = (code) => {
    const countryCodeRegex = /^\+\d+$/;
    return countryCodeRegex.test(code);
  };

  const handleNext = () => {
    let isValid = true;

    // Validate Country Code
    if (!validateCountryCode(countryCode)) {
      setCountryCodeError('Please enter a valid country code');
      isValid = false;
    } else {
      setCountryCodeError('');
    }

    // Validate Mobile Number
    if (!validatePhoneNumber(mobileNumber)) {
      setMobileNumberError('Please enter a valid 10-digit phone number');
      isValid = false;
    } else {
      setMobileNumberError('');
    }

    if (isValid) {
      console.log('Country Code:', countryCode, 'Mobile Number:', mobileNumber);
      // Only navigate if the input is valid
      router.push({
        pathname: '/home',
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerText}>Welcome!</Text>
      <Text style={styles.subText}>Let's keep you connected</Text>

      {/* Country Code Input */}
      <TextInput
        style={[styles.input, countryCodeError ? { borderColor: 'red' } : {}]}
        placeholder="country code ex:+91"
        placeholderTextColor="#D3D3D3"
        value={countryCode}
        onChangeText={(text) => setCountryCode(text)}
        keyboardType="phone-pad"
      />
      {countryCodeError ? <Text style={styles.errorText}>{countryCodeError}</Text> : null}

      {/* Mobile Number Input */}
      <TextInput
        style={[styles.input, mobileNumberError ? { borderColor: 'red' } : {}]}
        placeholder="Mobile number"
        placeholderTextColor="#D3D3D3"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
        keyboardType="phone-pad"
      />
      {mobileNumberError ? <Text style={styles.errorText}>{mobileNumberError}</Text> : null}

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          Next <AntDesign name="arrowright" size={16} color="#FFFFFF" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A0A0A0',
    marginBottom: 50,
  },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
    width: '60%',
    marginLeft: '20%',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 10,
  },
});