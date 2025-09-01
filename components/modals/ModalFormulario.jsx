
import React from 'react';
import { Modal, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../buttons/Button';
import styles from './ModalFormulario.styles';

export default function ModalFormulario({ visible, onClose, onSubmit, titulo, children }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{titulo}</Text>
                            <TouchableOpacity onPress={onClose} accessibilityLabel="Cerrar modal">
                                <Text style={{ fontSize: 22, color: '#888', paddingHorizontal: 10 }}>×</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.body}>
                            {children}
                        </View>
                        <View style={styles.actions}>
                            <Button onPress={onSubmit} type="primary">Guardar</Button>
                            <Button onPress={onClose} type="neutral">Cancelar</Button>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}