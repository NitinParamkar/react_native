import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function JoinAsLearnerAndGuru() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const options = [
    { label: 'Learner', value: 'Learner' },
    { label: 'Guru', value: 'Guru' },
  ];

  const toggleRole = (value) => {
    setSelectedRoles(prevRoles => {
      if (prevRoles.includes(value)) {
        return prevRoles.filter(role => role !== value);
      } else {
        return [...prevRoles, value];
      }
    });
    setShowError(false);
  };

  const handleNext = () => {
    if (selectedRoles.length === 0) {
      setShowError(true);
      return;
    }

    const subText = selectedRoles.includes('Guru') && selectedRoles.includes('Learner')
      ? 'Learn, Guide, and Inspire'
      : selectedRoles.includes('Guru')
      ? 'Guide and Inspire'
      : 'Discover, ask, and grow';

    router.push({
      pathname: '/skillsoptions',
      params: { subText },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Join as Learner & Guru</Text>
      <Text style={styles.subText}>Learn and share.</Text>

      <TouchableOpacity
        style={[styles.dropdownButton, showError && styles.errorBorder]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.dropdownText, { color: selectedRoles.length === 0 ? '#D3D3D3' : 'black' }]}>
          {selectedRoles.length > 0 ? selectedRoles.join(', ') : 'Choose your role here'}
        </Text>
        <AntDesign name="down" size={20} color="#D3D3D3" />
      </TouchableOpacity>

      {showError && <Text style={styles.errorText}>Please select your role</Text>}

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
                  onPress={() => toggleRole(item.value)}
                >
                  <View style={[styles.checkbox, selectedRoles.includes(item.value) && styles.checkedBox]}>
                    {selectedRoles.includes(item.value) && (
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