
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
};

const Transacctions = ({ descripcion_transaccion, monto, fecha_transaccion, nombre_transaccion, classAmount }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
            <View style={{ marginRight: 12 }}>
                <Icon name="credit-card" size={28} color="#1976d2" />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{nombre_transaccion}</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>{formatearFecha(fecha_transaccion)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', minWidth: 80 }}>
                <Text style={{ color: classAmount === 'negative' ? '#e53935' : '#43a047', fontWeight: 'bold', fontSize: 16 }}>{monto}</Text>
                <Text style={{ color: '#888', fontSize: 12 }}>{descripcion_transaccion}</Text>
            </View>
        </View>
    );
};

export default Transacctions;