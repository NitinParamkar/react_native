import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Modal, Text, FlatList, CheckBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default function QuestionScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Animation for the toggle
  const [selectedSkill, setSelectedSkill] = useState(''); // Only one selected skill
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [showError, setShowError] = useState(false); // Error state for dropdown

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    // Animate the toggle button
    Animated.timing(animation, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['3%', '63%'], // Adjust this range for smooth thumb movement
  });

  const thumbColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f4f3f4', '#ffffff'], // White when toggled on
  });

  const backgroundColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D3D3D3', '#34C759'], // Green when toggled on
  });

  const options = [
    { label: 'Figma', value: 'Figma' },
    { label: 'App Development', value: 'App Development' },
    { label: 'Power Bi', value: 'Power Bi' },
    { label: 'Photoshop', value: 'Photoshop' },
    { label: 'Web Development', value: 'Web Development' },
  ];

  // Only one skill can be selected at a time
  const selectSkill = (value) => {
    if (selectedSkill === value) {
      setSelectedSkill(''); // Deselect if the same skill is tapped again
    } else {
      setSelectedSkill(value); // Select the new skill
    }
    setShowError(false); // Remove error when a skill is selected
  };

  return (
    <View style={styles.container}>
      {/* Custom Toggle Button */}
      <TouchableOpacity onPress={toggleSwitch} style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.toggleBackground,
            {
              backgroundColor: backgroundColorInterpolation, // Change background color based on toggle state
            },
          ]}
        >
          <Animated.View
            style={[
              styles.toggleThumb,
              {
                left: toggleInterpolation, // Move thumb left or right
                backgroundColor: thumbColorInterpolation, // Change color of thumb
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Question Input */}
      <TextInput
        style={[styles.input, { fontSize: 20 }]} 
        placeholder="Type your question here"
        placeholderTextColor="#D3D3D3"
        multiline={true}         // Allows multiline input
        textAlignVertical="top"  // Starts text from the top-left corner
        scrollEnabled={true}     // Enables scrolling if text exceeds box size
      />

      {/* Skill Dropdown */}
      <TouchableOpacity
        style={[styles.dropdownButton, showError && { borderColor: 'red' }]} // Highlight border if error
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.dropdownText, { color: selectedSkill ? 'black' : '#D3D3D3' }]}>
          {selectedSkill ? selectedSkill : 'Choose your skill here'}
        </Text>
        <AntDesign name="down" size={20} color="#D3D3D3" />
      </TouchableOpacity>

      {/* Error message */}
      {showError && <Text style={styles.errorText}>Please select your skill</Text>}

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => selectSkill(item.value)}
                >
                  <CheckBox
                    value={selectedSkill === item.value}
                    onValueChange={() => selectSkill(item.value)}
                  />
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.doneButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Call Icon */}
      <TouchableOpacity style={styles.callButton}>
        <AntDesign name="phone" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  toggleContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 80,
    height: 40,
  },
  toggleBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D3D3D3',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 2,
  },
  toggleThumb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    position: 'absolute',
    backgroundColor: '#f4f3f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    height: 150,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: '45%',
    backgroundColor: '#32CD32',
    padding: 20,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
