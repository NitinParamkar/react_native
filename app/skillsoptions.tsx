import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';


export default function Selectskills() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const options = [
    { label: 'Figma', value: 'Figma' },
    { label: 'App Development', value: 'App Development' },
    { label: 'Power Bi', value: 'Power Bi' },
    { label: 'Photoshop', value: 'Photoshop' },
    { label: 'Web Development', value: 'Web Development' },
  ];

  const toggleRole = (value) => {
    if (selectedRoles.includes(value)) {
      setSelectedRoles(selectedRoles.filter(role => role !== value));
    } else {
      setSelectedRoles([...selectedRoles, value]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
      <Link href='/joinoptions'><AntDesign name="arrowleft" size={24} color="black" /></Link>
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={styles.headerText}>Unlock your potential</Text>
      <Text style={styles.subText}>Discover, ask, and grow</Text>

      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
      <Text style={[styles.dropdownText, { color: selectedRoles.length === 0 ? '#D3D3D3' : 'black' }]}>
         {selectedRoles.length > 0 ? selectedRoles.join(', ') : 'Choose your role here'}
      </Text>

        <AntDesign name="down" size={20} color="#D3D3D3" />
      </TouchableOpacity>

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
                  onPress={() => toggleRole(item.value)}
                >
                  <CheckBox
                    value={selectedRoles.includes(item.value)}
                    onValueChange={() => toggleRole(item.value)}
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

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
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
    marginBottom: 180,
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
    marginLeft: '20%',
    width: '60%',
    marginBottom: 180,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
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
    width: '60%',
    marginLeft: '20%',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '60%',
    marginLeft: '20%',
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
    width: '60%',
    marginLeft: '20%',
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
    width:'40%',
    marginLeft: '30%',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
