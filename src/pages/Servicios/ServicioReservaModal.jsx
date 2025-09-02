
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../../components/buttons/Button';
import ServicioReservaModalStyles from './ServicioReservaModal.styles';


export default function ConfirmacionReservaModal({
    visible,
    onClose,
    onConfirm,
    servicio,
    empresaSeleccionada,
    fecha,
    horarios,
    costeTotal,
    nota,
    setNota,
}) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatearHorarios = (horarios) => {
        if (!horarios || horarios.length === 0) {
            return [];
        }
        const sortedHorarios = [...horarios].sort((a, b) => a - b);
        const result = [];
        let startHour = parseInt(sortedHorarios[0]);
        let endHour = parseInt(sortedHorarios[0]);
        for (let i = 0; i < sortedHorarios.length; i++) {
            const currentHour = parseInt(sortedHorarios[i]);
            const nextHour = parseInt(sortedHorarios[i + 1]);
            if (currentHour + 1 === nextHour) {
                endHour = nextHour;
            } else {
                let formattedStart = `${startHour.toString().padStart(2, '0')}:00`;
                let formattedEnd = `${(endHour + 1).toString().padStart(2, '0')}:00`;
                if (endHour === 23) {
                    formattedEnd = '00:00';
                }
                result.push(`${formattedStart} - ${formattedEnd}`);
                if (nextHour !== undefined) {
                    startHour = nextHour;
                    endHour = nextHour;
                }
            }
        }
        return result;
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%' }}>
                    <Text style={ServicioReservaModalStyles.title}>Confirmar Servicio</Text>
                    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
                        <View style={ServicioReservaModalStyles.info}>
                            <Text style={ServicioReservaModalStyles.text}>
                                <Text style={{ fontWeight: 'bold' }}>Servicio: </Text>
                                {servicio?.nombre_servicio_reservable}
                            </Text>
                            {empresaSeleccionada && (
                                <Text style={ServicioReservaModalStyles.text}>
                                    <Text style={{ fontWeight: 'bold' }}>Empresa: </Text>
                                    {empresaSeleccionada.nombre_comercio}
                                </Text>
                            )}
                        </View>
                        <View style={ServicioReservaModalStyles.info}>
                            <Text style={ServicioReservaModalStyles.text}>
                                <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>
                                {formatearFecha(fecha)}
                            </Text>
                            <Text style={ServicioReservaModalStyles.text}>
                                <Text style={{ fontWeight: 'bold' }}>Horarios: </Text>
                            </Text>
                            <View style={ServicioReservaModalStyles.horarios}>
                                {formatearHorarios(horarios).map((horario, index) => (
                                    <Text key={index} style={ServicioReservaModalStyles.horarioItem}>{horario}</Text>
                                ))}
                            </View>
                        </View>
                        <View style={ServicioReservaModalStyles.info}>
                            <Text style={ServicioReservaModalStyles.text}>
                                <Text style={{ fontWeight: 'bold' }}>Coste Total: </Text>${costeTotal}
                            </Text>
                        </View>
                        <View style={{ marginBottom: 16 }}>
                            <Text style={{ marginBottom: 4 }}>Añadir una nota (opcional)</Text>
                            <TextInput
                                value={nota}
                                style={ServicioReservaModalStyles.textarea}
                                onChangeText={setNota}
                                multiline
                                numberOfLines={3}
                                placeholder="Instrucciones especiales, etc."
                                textAlignVertical="top"
                            />
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                        <Button
                            style={{ flex: 1, marginRight: 8 }}
                            onPress={onConfirm}
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : 'Confirmar'}
                        </Button>
                        <Button
                            style={{ flex: 1 }}
                            onPress={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

