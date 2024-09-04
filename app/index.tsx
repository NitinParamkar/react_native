import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, color: 'red', fontWeight: 'bold',marginBottom: 20,}}>
          Ignore this page. This page is for my reference. Look at other pages.
      </Text>
      <Text style={styles.headerText}>Index</Text>
      <Link href="/joinoptions" style={styles.linkText}>Join Options</Link>
      <Link href="/skillsoptions" style={styles.linkText}>Select Skills</Link>
      <Link href="/signup" style={styles.linkText}>Signup</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',  // light gray background
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
    color: '#007BFF',  // blue color for links
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
});

export default Index;
