import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Modal, Text, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function QuestionScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedSkill, setSelectedSkill] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    Animated.timing(animation, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['3%', '63%'],
  });

  const thumbColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f4f3f4', '#ffffff'],
  });

  const backgroundColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D3D3D3', '#34C759'],
  });

  const options = [
    { label: 'Figma', value: 'Figma' },
    { label: 'App Development', value: 'App Development' },
    { label: 'Power BI', value: 'Power BI' },
    { label: 'Photoshop', value: 'Photoshop' },
    { label: 'Web Development', value: 'Web Development' },
  ];

  const selectSkill = (value) => {
    setSelectedSkill(value);
    setShowError(false);
  };

  return (
    <View style={styles.container}>
      {/* Custom Toggle Button */}
      <TouchableOpacity onPress={toggleSwitch} style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.toggleBackground,
            {
              backgroundColor: backgroundColorInterpolation,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.toggleThumb,
              {
                left: toggleInterpolation,
                backgroundColor: thumbColorInterpolation,
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
        multiline={true}
        textAlignVertical="top"
        scrollEnabled={true}
      />

      {/* Skill Dropdown */}
      <TouchableOpacity
        style={[styles.dropdownButton, showError && { borderColor: 'red' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.dropdownText, { color: selectedSkill ? 'black' : '#D3D3D3' }]}>
          {selectedSkill || 'Choose your skill here'}
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
                  onPress={() => {
                    selectSkill(item.value);
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.radioButton}>
                    {selectedSkill === item.value && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
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
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionLabel: {
    fontSize: 16,
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: '42%',
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