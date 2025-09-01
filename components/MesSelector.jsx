

import React, { useMemo } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import styles from './MesSelector.styles';

const MesSelector = ({ mesSeleccionado, handleMesSeleccionado }) => {
    const listaMeses = useMemo(() => [
        { nombre: 'Enero', numero: 1 },
        { nombre: 'Febrero', numero: 2 },
        { nombre: 'Marzo', numero: 3 },
        { nombre: 'Abril', numero: 4 },
        { nombre: 'Mayo', numero: 5 },
        { nombre: 'Junio', numero: 6 },
        { nombre: 'Julio', numero: 7 },
        { nombre: 'Agosto', numero: 8 },
        { nombre: 'Septiembre', numero: 9 },
        { nombre: 'Octubre', numero: 10 },
        { nombre: 'Noviembre', numero: 11 },
        { nombre: 'Diciembre', numero: 12 },
    ], []);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
        >
            <View style={styles.listInner}>
                {listaMeses.map((mes) => {
                    const isActive = mesSeleccionado == mes.numero;
                    return (
                        <TouchableOpacity
                            key={mes.numero}
                            style={[
                                styles.item,
                                isActive && styles.itemActive,
                            ]}
                            onPress={() => handleMesSeleccionado(mes.numero)}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.itemNombre,
                                isActive && styles.itemNombreActive,
                            ]}>
                                {mes.nombre}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default MesSelector;