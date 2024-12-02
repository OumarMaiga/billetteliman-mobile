import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface ErrorModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({isVisible, toggleModal, message=""}) => {
  return (
    <Modal isVisible={isVisible}>

      <View style={styles.modalContent}>
        <View style={styles.icon_container}>
          <Ionicons name='close' size={32} color="#FFF" />
        </View>
        <Text style={styles.text}>{message != "" ? message : "Une erreur s'est produite."}</Text>
        <View style={styles.button_container}>
          <Button title="OK" onPress={toggleModal} color="#8B0F04" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#D59E99',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 40
  },
  icon_container: {
    width: 50,
    height: 50,
    backgroundColor: "#8B0F04",
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

export default ErrorModal;
