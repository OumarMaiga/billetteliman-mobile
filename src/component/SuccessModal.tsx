import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface SuccessModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, toggleModal, message="" }) => {
  return (
    <Modal isVisible={isVisible}>

      <View style={styles.modalContent}>
        <View style={styles.icon_container}>
          <Ionicons name='checkmark-sharp' size={32} color="#FFF" />
        </View>
        <Text style={styles.text}>{message != "" ? message : "Votre action a été réalisée avec succès."}</Text>
        <View style={styles.button_container}>
          <Button title="OK" onPress={toggleModal} color="#22812B" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 40
  },
  icon_container: {
    width: 50,
    height: 50,
    backgroundColor: "#22812B",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center"
  },
  button_container: {
    alignSelf: "stretch",
  }
});

export default SuccessModal;
