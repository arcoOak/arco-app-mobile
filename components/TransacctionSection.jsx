
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Transacctions from './Transacctions';
import { useAuth } from '../src/context/AuthContext';
import transaccionesService from '../src/services/transacciones.service';
import Button from './buttons/Button';

export default function TransacctionSection({ navigation }) {
    const [ultimasTransacciones, setUltimasTransacciones] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const cargarUltimasTransacciones = async () => {
            try {
                const transacciones = await transaccionesService.getUltimasTransaccionesSocio(user.id_socio);
                setUltimasTransacciones(transacciones);
            } catch (error) {
                // Manejo de error opcional
            }
        };
        if (user) {
            cargarUltimasTransacciones();
        }
    }, [user]);

    const handleHistoryItemClick = (id_billetera_transaccion) => {
        if (navigation && id_billetera_transaccion) {
            navigation.navigate('TransaccionDetalle', { id: id_billetera_transaccion });
        }
    };

    return (
        <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Últimas Transacciones</Text>
                <Button onPress={() => navigation && navigation.navigate('TransaccionLista')} type="primary">
                    Ver Todo
                </Button>
            </View>
            <ScrollView style={{ backgroundColor: 'transparent' }}>
                {ultimasTransacciones.map(item => (
                    <TouchableOpacity
                        key={item.id_billetera_transaccion}
                        onPress={() => handleHistoryItemClick(item.id_billetera_transaccion)}
                        activeOpacity={0.8}
                    >
                        <Transacctions
                            id={item.id_billetera_transaccion}
                            descripcion_transaccion={item.descripcion_transaccion}
                            monto={item.monto}
                            fecha_transaccion={item.fecha_transaccion}
                            nombre_transaccion={item.nombre_transaccion}
                            classAmount={item.monto < 0 ? 'negative' : 'positive'}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
