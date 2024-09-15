//contact.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ContactScreen() {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCodeError, setCountryCodeError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const router = useRouter();
  const { userId } = useLocalSearchParams();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateCountryCode = (code: string) => {
    const countryCodeRegex = /^\+\d+$/;
    return countryCodeRegex.test(code);
  };

  const handleNext = async () => {
    let isValid = true;

    // Validate Country Code
    if (!validateCountryCode(countryCode)) {
      setCountryCodeError('Please enter a valid country code');
      isValid = false;
    } else {
      setCountryCodeError('');
    }

    // Validate Phone Number
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    if (isValid) {
      try {
        const response = await fetch('http://localhost:5000/api/users/contact', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, countryCode, phoneNumber }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User contact details updated successfully:', data);
          router.push({
            pathname: '/home',
            params: { userId }
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update contact details');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to update contact information. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Welcome!</Text>
      <Text style={styles.subText}>Let's keep you connected</Text>

      <TextInput
        style={[styles.input, countryCodeError ? { borderColor: 'red' } : {}]}
        placeholder="Country code (e.g., +91)"
        placeholderTextColor="#D3D3D3"
        value={countryCode}
        onChangeText={(text) => setCountryCode(text)}
        keyboardType="phone-pad"
      />
      {countryCodeError ? <Text style={styles.errorText}>{countryCodeError}</Text> : null}

      <TextInput
        style={[styles.input, phoneNumberError ? { borderColor: 'red' } : {}]}
        placeholder="Phone number"
        placeholderTextColor="#D3D3D3"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

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