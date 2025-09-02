/*

Añadir a consultas de billetera el coste de las reservaciones de servicios

Cambio de contraseña en perfil de usuario

*/ 


import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import LoadingModal from '../../components/modals/LoadingModal';
import reservasServicioService from '../../services/reservasServicio.service';
import BotonVolver from '../../components/buttons/ButtonVolver';
import styles from './MisServiciosDetalle.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const formatearHorarios = (horarios) => {
    if (!horarios || horarios.length === 0) {
        return [];
    }
    const horas = horarios.map(h => parseInt(h.hora_reserva.slice(0, 2), 10));
    const sortedHorarios = [...horas].sort((a, b) => a - b);
    const result = [];
    let startHour = sortedHorarios[0];
    let endHour = sortedHorarios[0];
    for (let i = 0; i < sortedHorarios.length; i++) {
        const currentHour = sortedHorarios[i];
        const nextHour = sortedHorarios[i + 1];
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


export default function MisServiciosDetalle() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const { id } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [miServicioDetalle, setMiServicioDetalle] = useState(null);
    const [listaHoras, setListaHoras] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [servicio, horas] = await Promise.all([
                    reservasServicioService.getReservaServicioById(id),
                    reservasServicioService.getHorasReservadasPorReservaServicios(id)
                ]);
                setMiServicioDetalle(servicio);
                setListaHoras(horas);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleNavigate = (path, id) => {
        // navigation.navigate(path, { id, returnTo: route.name });
    };

    return (
        <ScrollView style={styles.container}>
            <LoadingModal visible={loading} />
            <BotonVolver to="MisServicios" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Detalle del Servicio</Text>
            </View>
            {miServicioDetalle ? (
                <View style={styles.reservaInfo}>
                    <View style={styles.reservaInfoHeader}>
                        <Text style={styles.sectionTitle}>Información de la Reserva</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Fecha Reserva:</Text> {new Date(miServicioDetalle.fecha_reservacion).toLocaleDateString()}</Text>

                        <TouchableOpacity style={styles.infoCardLink} onPress={() => handleNavigate('Comercios', miServicioDetalle.id_comercio)}>
                            <View style={styles.infoCardLinkText}>
                                <Text style={styles.infoCardLinkLabel}>Prestador del Servicio</Text>
                                <Text style={styles.infoCardLinkValue}>{miServicioDetalle.nombre_comercio}</Text>
                            </View>
                            <Icon name="chevron-right" size={24} style={styles.infoCardLinkIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.infoCardLink} onPress={() => handleNavigate('Servicios', miServicioDetalle.id_servicio_reservable)}>
                            <View style={styles.infoCardLinkText}>
                                <Text style={styles.infoCardLinkLabel}>Servicio</Text>
                                <Text style={styles.infoCardLinkValue}>{miServicioDetalle.nombre_servicio_reservable}</Text>
                            </View>
                            <Icon name="chevron-right" size={24} style={styles.infoCardLinkIcon} />
                        </TouchableOpacity>

                        <Text><Text style={{ fontWeight: 'bold' }}>Cantidad de Horas Reservadas:</Text> {listaHoras.length}</Text>
                    </View>
                    <View style={styles.reservaInfoDetails}>
                        <Text style={styles.sectionTitle}>Detalles del Servicio</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Capacidad:</Text> {miServicioDetalle.capacidad}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Coste por Hora:</Text> ${miServicioDetalle.costo_servicio}</Text>
                        {miServicioDetalle.nota ? (
                            <Text><Text style={{ fontWeight: 'bold' }}>Información Adicional:</Text> {miServicioDetalle.nota}</Text>
                        ) : null}
                    </View>
                </View>
            ) : (
                <Text style={styles.loadingText}>Cargando detalles de la reserva...</Text>
            )}
            <View style={styles.horasReservadas}>
                <Text style={styles.sectionTitle}>Horas Reservadas</Text>
                {listaHoras.length > 0 ? (
                    <View style={styles.horasList}>
                        {formatearHorarios(listaHoras).map((hora, index) => (
                            <Text key={index} style={styles.horasListItem}>{hora}</Text>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.loadingText}>No hay horas reservadas para esta reserva.</Text>
                )}
            </View>
        </ScrollView>
    );
}