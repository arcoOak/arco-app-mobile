
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import LoadingModal from '../../components/modals/LoadingModal';
import reservasServicioService from '../../services/reservasServicio.service';
import MesSelector from '../../components/MesSelector';
import styles from './MisServicios.styles';

export default function MisServicios() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [listaMisServicios, setListaMisServicios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const mesActual = new Date().getMonth() + 1;
                const anhoActual = new Date().getFullYear();
                const misServicios = await reservasServicioService.getReservasServicioPorSocioYMes(
                    user.id_socio,
                    user.id_club,
                    anhoActual,
                    mesActual,
                );
                setListaMisServicios(misServicios);
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
            const anhoActual = new Date().getFullYear();
            try {
                const misServicios = await reservasServicioService.getReservasServicioPorSocioYMes(
                    user.id_socio,
                    user.id_club,
                    anhoActual,
                    mes
                );
                setListaMisServicios(misServicios);
            } catch (error) {
                console.error('Error al cargar las reservas del mes seleccionado:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReservas();
    };

    const handleItemPress = (id_reservacion_servicio) => {
        // navigation.navigate('MisServiciosDetalle', { id: id_reservacion_servicio });
    };

    return (
        <View style={styles.container}>
            <LoadingModal visible={loading} />
            <Text style={styles.title}>Servicios Reservados</Text>
            <MesSelector
                mesSeleccionado={mesSeleccionado}
                handleMesSeleccionado={handleMesSeleccionado}
            />
            <View style={styles.reservasList}>
                {listaMisServicios.length > 0 ? (
                    <FlatList
                        data={listaMisServicios}
                        keyExtractor={item => item.id_reservacion_servicio.toString()}
                        contentContainerStyle={styles.reservasListInner}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.reservaItem}
                                onPress={() => handleItemPress(item.id_reservacion_servicio)}
                            >
                                <View style={styles.reservaItemHeader}>
                                    <Text style={styles.reservaItemTitle}>{item.nombre_servicio_reservable}</Text>
                                    <Text style={styles.reservaItemDate}>{item.nombre_comercio}</Text>
                                </View>
                                <View style={styles.reservaItemDetails}>
                                    <Text style={styles.reservaItemDate}>Fecha: {new Date(item.fecha_reservacion).toLocaleDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.noReservas}>
                        <Text style={styles.noReservasText}>No tienes servicios reservados para esta fecha.</Text>
                    </View>
                )}
            </View>
        </View>
    );
}