import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

const AddTimer = ({ visible, onClose, onAddTimer, categories }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddTimer = () => {
    if (name && duration && category) {
      const finalCategory = showNewCategory ? newCategory : category;
      onAddTimer(name, parseInt(duration, 10), finalCategory);
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setName('');
    setDuration('');
    setCategory(categories[0] || '');
    setShowNewCategory(false);
    setNewCategory('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Add New Timer</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Timer Name"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Duration (in seconds)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
          
          {!showNewCategory ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                {categories.map((cat, index) => (
                  <Picker.Item key={index} label={cat} value={cat} />
                ))}
              </Picker>
            </View>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="New Category Name"
              value={newCategory}
              onChangeText={setNewCategory}
            />
          )}
          
          <TouchableOpacity
            style={styles.toggleCategoryButton}
            onPress={() => setShowNewCategory(!showNewCategory)}
          >
            <Text style={styles.toggleCategoryButtonText}>
              {showNewCategory ? 'Select Existing Category' : 'Add New Category'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addButton} onPress={handleAddTimer}>
            <Text style={styles.addButtonText}>Add Timer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
  },
  picker: {
    width: '100%',
  },
  toggleCategoryButton: {
    marginBottom: 15,
  },
  toggleCategoryButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddTimer;
