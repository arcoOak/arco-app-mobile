
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './ConfirmarModal.styles';

const ConfirmarModal = ({
  visible = false,
  mensaje = "¿Estás seguro?",
  onConfirm, onCancel
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Icon name="circle-question" style={styles.icon} />
          <Text style={styles.mensaje}>{mensaje}</Text>
          <View style={styles.botones}>
            <TouchableOpacity style={[styles.btn, styles.btnSi]} onPress={onConfirm}>
              <Icon name="check" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnNo]} onPress={onCancel}>
              <Icon name="times" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmarModal;