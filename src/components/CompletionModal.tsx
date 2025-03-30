import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

const CompletionModal = ({ visible, onClose, timerName }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MaterialIcons name="check-circle" size={60} color="#4CAF50" />
          <Text style={styles.modalTitle}>Congratulations!</Text>
          <Text style={styles.modalText}>
            You've completed the timer:
          </Text>
          <Text style={styles.timerName}>{timerName}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    margin: 20,
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
    elevation: 5
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  timerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompletionModal;
