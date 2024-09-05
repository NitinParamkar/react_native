import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';  // Import useRouter for navigation

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // Error states for the input fields
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();  // Initialize router for redirection

  // Function to handle Sign Up validation
  const handleSignUp = () => {
    // Reset error states
    let hasError = false;
    if (!fullName) {
      setFullNameError(true);
      hasError = true;
    } else {
      setFullNameError(false);
    }

    if (!email) {
      setEmailError('This field is required');
      hasError = true;
    } else if (!email.endsWith('@gmail.com')) {
      setEmailError('Enter valid email');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    // If all fields are filled, redirect to joinoptions page
    if (!hasError) {
      router.push('/joinoptions');  // Redirect when validation passes
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.subText}>Unlock Potential or Share Wisdom</Text>

      <TextInput
        style={[styles.input, fullNameError && styles.errorInput]}  // Apply error style if field is empty
        placeholder="Your full name"
        placeholderTextColor="#B0B0B0"
        value={fullName}
        onChangeText={setFullName}
      />
      {fullNameError && <Text style={styles.errorText}>This field is required</Text>}  {/* Show error message */}

      <TextInput
        style={[styles.input, emailError && styles.errorInput]}  // Apply error style if field is empty
        placeholder="Email address"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>} {/* Show error message */}
      <View style={[styles.passwordContainer, passwordError && styles.errorInput]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Create password"
          placeholderTextColor="#B0B0B0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.eyeIcon}
        >
          <FontAwesome5
            name={hidePassword ? 'eye-slash' : 'eye'}
            size={20}
            color="#B0B0B0"
          />
        </TouchableOpacity>
      </View>
      {passwordError && <Text style={styles.errorText}>This field is required</Text>}  {/* Show error message */}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or Login with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../assets/images/google.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="linkedin-square" size={24} color="#0077B5" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A0A0A0',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 5,  // Adjusted to add error text margin
    backgroundColor: '#F7F7F7',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 5,  // Adjusted to add error text margin
    backgroundColor: '#F7F7F7',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: '20%',
    marginBottom: 20,
    width: '60%',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#A0A0A0',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  // Style for the error input with red border and shadow effect
  errorInput: {
    borderColor: 'red',
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow effect for Android
  },
  // Style for the error message text
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
