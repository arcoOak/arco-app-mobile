// src/components/ProfileForm.jsx
import React, { useState, useEffect } from 'react';

import Button from './buttons/Button'; // Importa el botón personalizado


const ProfileForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
        //console.log('Datos iniciales del formulario:', initialData);
    }, [initialData]);

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <View style={styles.form}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={formData.telefono || ''}
                    onChangeText={value => handleChange('telefono', value)}
                    placeholder="Ej: +58 412 1234567"
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Dirección</Text>
                <TextInput
                    style={styles.input}
                    value={formData.direccion || ''}
                    onChangeText={value => handleChange('direccion', value)}
                    placeholder="Ej: Av. Principal, Urb. El Sol"
                    required
                />
            </View>
            <View style={styles.formButtons}>
                <Button onPress={handleSubmit} style={styles.saveButton} className="primary">Guardar</Button>
                <Button onPress={onCancel} style={styles.cancelButton} className="neutral">Cancelar</Button>
            </View>
        </View>
    );
};


import { StyleSheet, View, Text, TextInput } from 'react-native';

const styles = StyleSheet.create({
    form: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    formGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#222',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    saveButton: {
        flex: 1,
        marginRight: 8,
    },
    cancelButton: {
        flex: 1,
        marginLeft: 8,
    },
});

export default ProfileForm;