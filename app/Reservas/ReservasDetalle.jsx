
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../src/context/AuthContext';
import LoadingModal from '../../components/modals/LoadingModal';
import reservasService from '../../src/services/reservas.service';
import ButtonVolver from '../../components/buttons/ButtonVolver';
import ReservasDetalleStyles from './ReservasDetalle.styles';




export default function ReservasDetalle() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const { id } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [reservaDetalle, setReservaDetalle] = useState(null);
    const [listaInvitados, setListaInvitados] = useState([]);
    const [listaHoras, setListaHoras] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [reserva, invitados, horas] = await Promise.all([
                    reservasService.getReservaById(id),
                    reservasService.getInvitadosPorReserva(id),
                    reservasService.getHorasReservadasPorReserva(id)
                ]);
                setReservaDetalle(reserva);
                setListaInvitados(invitados);
                setListaHoras(horas);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const formatearHorarios = (horarios) => {
        if (!horarios || horarios.length === 0) {
            return [];
        }
        const horas = horarios.map(h => parseInt(h.hora_reserva.slice(0, 2), 10));
        const sortedHorarios = [...horas].sort((a, b) => a - b);
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

    const handleNavigate = (path, id) => {
        navigation.navigate(path, { id });
    };

    return (
        <ScrollView>
            <LoadingModal visible={loading} />
            <ButtonVolver to="Reservas" style={{ marginBottom: 16 }} />
            <View style={ReservasDetalleStyles.container}>
                <View style={ReservasDetalleStyles.header}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>Detalle de Reserva</Text>
                    {reservaDetalle ? (
                        <View style={ReservasDetalleStyles.info}>
                            <View style={{ marginBottom: 16 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Información de la Reserva</Text>
                                <TouchableOpacity
                                    onPress={() => handleNavigate('Espacios', reservaDetalle.id_espacio_reservable)}
                                    style={{ marginBottom: 8 }}
                                >
                                    <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Espacio Reservado: {reservaDetalle.nombre_espacio_reservable}</Text>
                                    <Text style={{ color: '#888' }}>{reservaDetalle.nombre_unidad}</Text>
                                </TouchableOpacity>
                                <Text style={ReservasDetalleStyles.infoText}>
                                    <Text style={ReservasDetalleStyles.infoTextStrong}>Fecha Reserva:</Text> {new Date(reservaDetalle.fecha_reservacion).toLocaleDateString()}
                                </Text>
                                <Text style={ReservasDetalleStyles.infoText}>
                                    <Text style={ReservasDetalleStyles.infoTextStrong}>Cantidad de Horas Reservadas:</Text> {listaHoras.length}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Detalles del Espacio</Text>
                                <Text style={ReservasDetalleStyles.infoText}>
                                    <Text style={ReservasDetalleStyles.infoTextStrong}>Descripción:</Text> {reservaDetalle.descripcion}
                                </Text>
                                <Text style={ReservasDetalleStyles.infoText}>
                                    <Text style={ReservasDetalleStyles.infoTextStrong}>Capacidad:</Text> {reservaDetalle.capacidad}
                                </Text>
                                <Text style={ReservasDetalleStyles.infoText}>
                                    <Text style={ReservasDetalleStyles.infoTextStrong}>Coste por Hora:</Text> ${reservaDetalle.costo_reserva}
                                </Text>
                                <Text style={ReservasDetalleStyles.infoText}>
                                    <Text style={ReservasDetalleStyles.infoTextStrong}>Ubicación:</Text> {reservaDetalle.ubicacion}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <Text style={{ color: '#888', marginBottom: 12 }}>Cargando detalles de la reserva...</Text>
                    )}
                </View>
                <View style={{ marginTop: 24 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Horas Reservadas</Text>
                    {listaHoras.length > 0 ? (
                        formatearHorarios(listaHoras).map((hora, index) => (
                            <Text key={index} style={ReservasDetalleStyles.infoText}>{hora}</Text>
                        ))
                    ) : (
                        <Text style={ReservasDetalleStyles.infoText}>No hay horas reservadas para esta reserva.</Text>
                    )}
                </View>
                <View style={{ marginTop: 24 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Invitados</Text>
                    {listaInvitados.length > 0 ? (
                        listaInvitados.map((invitado) => (
                            <Text key={invitado.id_rol + '_' + invitado.id} style={ReservasDetalleStyles.infoText}>
                                {invitado.nombre_invitado} ({invitado.tipo_invitado})
                            </Text>
                        ))
                    ) : (
                        <Text style={ReservasDetalleStyles.infoText}>No hay invitados para esta reserva.</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}