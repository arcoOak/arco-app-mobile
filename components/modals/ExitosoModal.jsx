
import React from 'react';
import { Modal, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './ExitosoModal.styles';

const ExitosoModal = ({ visible = false, mensaje = "¡Operación exitosa!" }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Icon name="circle-check" style={styles.checkIcon} />
          <Text style={styles.mensaje}>{mensaje}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ExitosoModal;