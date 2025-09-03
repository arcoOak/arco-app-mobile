
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../src/context/AuthContext';
import LoadingModal from '../../components/modals/LoadingModal';
import reservasService from '../../src/services/reservas.service';
import MesSelector from '../../components/MesSelector';
import ReservasStyles from './Reservas.styles';


export default function Reservas() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [listaReservas, setListaReservas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const mesActual = new Date().getMonth() + 1;
                const reservas = await reservasService.getReservaByUsuarioMes(user.id_socio, mesActual);
                setListaReservas(reservas);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleMesSeleccionado = (mes) => {
        setMesSeleccionado(mes);
        const fetchReservas = async () => {
            setLoading(true);
            try {
                const reservas = await reservasService.getReservaByUsuarioMes(user.id_socio, mes);
                setListaReservas(reservas);
            } catch (error) {
                console.error('Error al cargar las reservas del mes seleccionado:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReservas();
    };

    return (
        <ScrollView>
            <LoadingModal visible={loading} />
            <View style={ReservasStyles.container}>
                <Text style={ReservasStyles.title}>Reservas</Text>
                <MesSelector
                    mesSeleccionado={mesSeleccionado}
                    handleMesSeleccionado={handleMesSeleccionado}
                />
                <View style={ReservasStyles.list}>
                    <View style={ReservasStyles.listInner}>
                        {listaReservas.length > 0 ? (
                            listaReservas.map((reserva) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ReservasDetalle', { id: reserva.id_reservacion })}
                                    style={ReservasStyles.item}
                                    key={reserva.id_reservacion}
                                    activeOpacity={0.85}
                                >
                                    <View style={ReservasStyles.itemHeader}>
                                        <Text style={ReservasStyles.itemTitle}>{reserva.nombre_espacio_reservable}</Text>
                                        <Text style={ReservasStyles.itemDate}>{reserva.nombre_unidad}</Text>
                                    </View>
                                    <View style={ReservasStyles.itemDetails}>
                                        <Text style={ReservasStyles.itemDate}>Fecha: {new Date(reserva.fecha_reservacion).toLocaleDateString()}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={ReservasStyles.noReservas}>
                                <Text style={ReservasStyles.noReservasText}>No tienes reservas activas para esta fecha.</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}