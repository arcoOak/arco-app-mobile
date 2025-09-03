// src/components/PaymentDetail.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import ExitosoModal from '../../components/modals/ExitosoModal';
import transaccionesService from '../../src/services/transacciones.service';
import billeteraService from '../../src/services/billetera.service.js';
import { useAuth } from '../../src/context/AuthContext';
import BotonVolver from '../../components/buttons/ButtonVolver';
import styles from './TransaccionIndividual.styles';
import { TIPOS_TRANSACCION } from '../../constants/transaccion.constants';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};



const TransaccionIndividual = ({ route, navigation }) => {
    const id = route?.params?.id;
    const { user, actualizarSaldoBilletera } = useAuth();
    const [registroTransaccion, setRegistroTransaccion] = useState();
    const [listaElementosTransaccion, setListaElementosTransaccion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const backLocation = navigation?.canGoBack() ? null : 'Transacciones';

    useEffect(() => {
        const obtenerRegistroTransaccion = async () => {
            try {
                const response = await transaccionesService.getTransaccionPorId(id);
                const { transaccion, datosTransaccion } = response;
                setRegistroTransaccion(transaccion);
                setListaElementosTransaccion(datosTransaccion);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error al obtener el registro de transacciones:', error);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };
        if (user) obtenerRegistroTransaccion();
    }, [user, id]);

    const actualizarTransaccion = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const response = await transaccionesService.getTransaccionPorId(id);
            setRegistroTransaccion(response.transaccion);
            setListaElementosTransaccion(response.datosTransaccion);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error al obtener el registro de transacciones:', error);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    const handlePagar = async () => {
        setLoading(true);
        try {
            const transaccionData = {
                id_pago_asociado: registroTransaccion.id_pago_asociado,
                id_billetera: user.id_billetera,
                id_tipo_transaccion: registroTransaccion.id_tipo_transaccion,
                monto: registroTransaccion.monto,
            };
            let response;
            if (TIPOS_TRANSACCION.RECARGA == transaccionData.id_tipo_transaccion) {
                response = await billeteraService.validarRecarga(transaccionData);
            } else {
                response = await transaccionesService.pagarTransaccion(transaccionData);
            }
            if (response) {
                setShowExitosoModal(true);
                actualizarSaldoBilletera();
                setTimeout(() => {
                    actualizarTransaccion();
                }, 500);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error al procesar el pago:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setShowExitosoModal(false);
            }, 2000);
        }
    };

    if (!registroTransaccion) {
        return (
            <>
                <BotonVolver to={backLocation} />
                <View style={styles.paymentIndividualDetailContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Detalle del Pago no encontrado</Text>
                    <TouchableOpacity onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Transacciones'))}>
                        <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Volver al Inicio</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    return (
        <>
            <LoadingModal visible={loading} />
            <ExitosoModal visible={showExitosoModal} mensaje="¡Pago con éxito!" />
            <BotonVolver to={backLocation} />
            <View style={styles.paymentIndividualDetailContainer}>
                <View style={styles.paymentsIndividualContainer}>
                    <View
                        style={[
                            styles.paymentIndividualHeader,
                            registroTransaccion.estado_transaccion === 1
                                ? styles.paymentIndividualHeaderPago
                                : styles.paymentIndividualHeaderPendiente,
                        ]}
                    >
                        <Text style={styles.paymentTitleIndividual}>{registroTransaccion.tipo_transaccion}</Text>
                    </View>
                    <View style={styles.paymentIndividualDetails}>
                        <Text style={styles.paymentIndividualDate}>
                            <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>
                            {formatDate(registroTransaccion.fecha_generacion)}
                        </Text>
                        <Text style={styles.paymentIndividualAmount}>
                            <Text style={{ fontWeight: 'bold' }}>Monto Total: </Text>${registroTransaccion.monto}
                        </Text>
                        {registroTransaccion.estado_transaccion === 1 && (
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>Fecha de Pago: </Text>
                                {formatDate(registroTransaccion.fecha_transaccion)}
                            </Text>
                        )}
                        <View style={styles.paymentIndividualTablaElementos}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#f9fafb' }}>
                                <Text style={[styles.paymentIndividualTablaTh, { flex: 2 }]}>Nombre</Text>
                                <Text style={[styles.paymentIndividualTablaTh, { flex: 1 }]}>Cantidad</Text>
                                <Text style={[styles.paymentIndividualTablaTh, { flex: 1 }]}>Importe</Text>
                            </View>
                            <FlatList
                                data={listaElementosTransaccion}
                                keyExtractor={(_, idx) => idx.toString()}
                                renderItem={({ item, index }) => (
                                    <View
                                        style={[
                                            { flexDirection: 'row', alignItems: 'center' },
                                            index === listaElementosTransaccion.length - 1 && styles.paymentIndividualElementoLast,
                                        ]}
                                    >
                                        <Text style={[styles.paymentIndividualTablaTd, { flex: 2 }]}>{item.nombre_transaccion}</Text>
                                        <Text style={[styles.paymentIndividualTablaTd, { flex: 1 }]}>{item.cantidad}</Text>
                                        <Text style={[styles.paymentIndividualTablaTd, { flex: 1 }]}>${item.coste_total}</Text>
                                    </View>
                                )}
                                ListEmptyComponent={
                                    <Text style={{ textAlign: 'center', color: '#777', padding: 12 }}>
                                        No hay elementos en la transacción.
                                    </Text>
                                }
                            />
                        </View>
                        {registroTransaccion.estado_transaccion === 0 &&
                            registroTransaccion.id_tipo_transaccion !== TIPOS_TRANSACCION.RECARGA && (
                                <TouchableOpacity
                                    style={styles.paymentIndividualHeaderPago}
                                    onPress={handlePagar}
                                    activeOpacity={0.8}
                                >
                                    <Text style={{ color: '#198754', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
                                        Pagar
                                    </Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
            </View>
        </>
    );
};

export default TransaccionIndividual;