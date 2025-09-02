
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SmallIconBox from '../components/boxes/SmallIconBox';
import CalendarioSeleccionable from '../components/calendary/CalendarioSeleccionable';
import HorarioSeleccionable from '../components/calendary/HorarioSeleccionable';
import ReservaUnidadStyles from './ReservaUnidad.styles';

const reservasData = [
    {
        id_espacio: 1,
        nombre_espacio: 'Reserva 1',
        descripcion: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        capacidad: 10,
        costo: 50,
        src: require('../assets/field.webp'),
    },
    {
        id_espacio: 2,
        nombre_espacio: 'Reserva 2',
        descripcion: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        capacidad: 20,
        costo: 100,
        src: require('../assets/field.webp'),
    },
];

const ReservaUnidad = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const route = useRoute();
    const { id } = route.params || {};
    const reserva = reservasData.find(r => r.id_espacio === Number(id));

    if (!reserva) {
        return (
            <View style={ReservaUnidadStyles.reservaUnidadContainer}>
                <Text>No se encontró la reserva.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={ReservaUnidadStyles.reservaUnidad} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={ReservaUnidadStyles.reservaUnidadContainer}>
                <Image
                    source={reserva.src}
                    style={ReservaUnidadStyles.reservaUnidadImage}
                />
                <Text style={ReservaUnidadStyles.reservaUnidadH2}>{reserva.nombre_espacio}</Text>
                <Text style={ReservaUnidadStyles.reservaUnidadP}>
                    <Text style={ReservaUnidadStyles.reservaUnidadB}>Descripción: </Text>
                    {reserva.descripcion}
                </Text>
            </View>
            <View style={ReservaUnidadStyles.reservaUnidadContainerRow}>
                <View style={ReservaUnidadStyles.reservaUnidadIcons}>
                    <SmallIconBox
                        titulo="Capacidad"
                        icono="fa-users"
                        dato={reserva.capacidad === 1 ? `${reserva.capacidad} persona` : `${reserva.capacidad} personas`}
                    />
                </View>
                <View style={ReservaUnidadStyles.reservaUnidadIcons}>
                    <SmallIconBox
                        titulo="Costo"
                        icono="fa-money-bill-wave"
                        dato={`${reserva.costo}$`}
                    />
                </View>
            </View>
            <View style={ReservaUnidadStyles.reservaUnidadContainer}>
                <CalendarioSeleccionable
                    canchaId={reserva.id_espacio}
                    titulo={'Disponibilidad de Reserva'}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                {selectedDate && (
                    <View style={ReservaUnidadStyles.reservaUnidadContainer}>
                        <HorarioSeleccionable fecha={selectedDate} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default ReservaUnidad;