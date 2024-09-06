import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Selectskills() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showError, setShowError] = useState(false);
  
  const router = useRouter();
  const local = useLocalSearchParams();

  const options = [
    { label: 'Figma', value: 'Figma' },
    { label: 'App Development', value: 'App Development' },
    { label: 'Power BI', value: 'Power BI' },
    { label: 'Photoshop', value: 'Photoshop' },
    { label: 'Web Development', value: 'Web Development' },
  ];

  const toggleSkill = (value) => {
    setSelectedSkills(prevSkills => {
      if (prevSkills.includes(value)) {
        return prevSkills.filter(skill => skill !== value);
      } else {
        return [...prevSkills, value];
      }
    });
    setShowError(false);
  };

  const handleNext = () => {
    if (selectedSkills.length === 0) {
      setShowError(true);
      return;
    }

    router.push({
      pathname: '/contact',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Unlock your potential</Text>
      <Text style={styles.subText}>{local.subText}</Text>

      <TouchableOpacity
        style={[styles.dropdownButton, showError && styles.errorBorder]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.dropdownText, { color: selectedSkills.length === 0 ? '#D3D3D3' : 'black' }]}>
          {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'Choose your skills here'}
        </Text>
        <AntDesign name="down" size={20} color="#D3D3D3" />
      </TouchableOpacity>

      {showError && <Text style={styles.errorText}>Please select your skills</Text>}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => toggleSkill(item.value)}
                >
                  <View style={[styles.checkbox, selectedSkills.includes(item.value) && styles.checkedBox]}>
                    {selectedSkills.includes(item.value) && (
                      <AntDesign name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
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
    padding: 10,
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
    marginBottom: 40,
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
    marginBottom: 10,
  },
  errorBorder: {
    borderColor: 'red',
  },
  dropdownText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
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
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#007BFF',
  },
  optionLabel: {
    fontSize: 16,
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
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});