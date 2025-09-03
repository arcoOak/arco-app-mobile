// src/components/PaymentDetail.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import transaccionesService from '../../src/services/transacciones.service.js';
import { useAuth } from '../../src/context/AuthContext';
import MesSelector from '../../components/MesSelector';
import ButtonVolver from '../../components/buttons/ButtonVolver';
import ExitosoModal from '../../components/modals/ExitosoModal';
import styles from './PaymentDetail.styles';
import { TIPOS_TRANSACCION } from '../../constants/transaccion.constants.js';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};

const formatPlural = (count, singular, plural) => {
    return count == 1 ? singular : plural;
};





const PaymentDetail = ({ navigation, route }) => {
    const { user, actualizarSaldoBilletera } = useAuth();
    const [registroTransacciones, setRegistroTransacciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const backLocation = navigation?.canGoBack() ? null : '/';

    useEffect(() => {
        const obtenerRegistroTransacciones = async () => {
            if (!user) return;
            const anhoActual = new Date().getFullYear();
            try {
                setLoading(true);
                const response = await transaccionesService.getTransaccionesSocioCompletoPorMes(
                    user.id_socio,
                    mesSeleccionado,
                    anhoActual
                );
                setRegistroTransacciones(response);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error al obtener el registro de transacciones:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };
        obtenerRegistroTransacciones();
    }, [user, mesSeleccionado]);

    const handleHistoryItemClick = (id_billetera_transaccion) => {
        if (id_billetera_transaccion && id_billetera_transaccion !== null) {
            navigation.navigate('TransaccionIndividual', { id: id_billetera_transaccion });
        }
    };

    const actualizarTransacciones = async (mes = mesSeleccionado) => {
        const anhoActual = new Date().getFullYear();
        const transaccionesRespuesta = await transaccionesService.getTransaccionesSocioCompletoPorMes(
            user.id_socio,
            mes,
            anhoActual
        );
        setRegistroTransacciones(transaccionesRespuesta);
    };

    const handleMesSeleccionado = (mes) => {
        setMesSeleccionado(mes);
        actualizarTransacciones(mes);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const formatPlural = (count, singular, plural) => (count == 1 ? singular : plural);

    const handlePagar = async (transaccion) => {
        setLoading(true);
        try {
            const transaccionData = {
                id_pago_asociado: transaccion.id_pago_asociado,
                id_billetera: user.id_billetera,
                id_tipo_transaccion: transaccion.id_tipo_transaccion,
                monto: transaccion.total_transaccion,
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
                    actualizarTransacciones();
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

    const renderPayment = ({ item: payment }) => {
        const estadoPagoUnidad = payment.estado_transaccion;
        const unidadTransaccion =
            payment.id_tipo_transaccion == TIPOS_TRANSACCION.MENSUALIDAD
                ? ['Mensualidad', 'Mensualidades']
                : payment.id_tipo_transaccion == TIPOS_TRANSACCION.RESERVACION
                ? ['Hora Reservada', 'Horas Reservadas']
                : payment.id_tipo_transaccion == TIPOS_TRANSACCION.COMPRA_COMERCIO
                ? ['Producto', 'Productos']
                : payment.id_tipo_transaccion == TIPOS_TRANSACCION.SERVICIO
                ? ['Hora Reservada', 'Horas Reservadas']
                : ['Unidad', 'Unidades'];
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    marginBottom: 16,
                    padding: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 2,
                }}
                onPress={() => handleHistoryItemClick(payment.id_billetera_transaccion)}
                activeOpacity={0.8}
            >
                <View
                    style={{
                        backgroundColor: estadoPagoUnidad ? '#d1e7dd' : '#fff3cd',
                        borderRadius: 8,
                        padding: 10,
                        marginBottom: 10,
                        borderWidth: 2,
                        borderColor: estadoPagoUnidad ? '#28a745' : '#ffc107',
                    }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{payment.tipo_transaccion}</Text>
                </View>
                <View>
                    <Text style={{ color: '#4B5563', marginBottom: 2 }}>
                        <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>
                        {formatDate(payment.fecha_generacion)}
                    </Text>
                    <Text style={{ color: '#4B5563', marginBottom: 2 }}>
                        <Text style={{ fontWeight: 'bold' }}>Monto: </Text>${payment.total_transaccion}
                    </Text>
                    {estadoPagoUnidad == 1 && (
                        <Text style={{ color: '#4B5563', marginBottom: 2 }}>
                            <Text style={{ fontWeight: 'bold' }}>Fecha de Pago: </Text>
                            {formatDate(payment.fecha_transaccion)}
                        </Text>
                    )}
                    {payment.descripcion_cantidad && (
                        <Text style={{ color: '#4B5563', marginBottom: 2 }}>
                            <Text style={{ fontWeight: 'bold' }}>Descripción: </Text>
                            {payment.descripcion_contenido}
                            {'\n'}
                            {payment.descripcion_cantidad + ' ' + formatPlural(payment.descripcion_cantidad, unidadTransaccion[0], unidadTransaccion[1])}
                        </Text>
                    )}
                    {estadoPagoUnidad == 0 && payment.id_tipo_transaccion !== TIPOS_TRANSACCION.RECARGA && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#19875422',
                                borderRadius: 8,
                                marginTop: 10,
                                padding: 10,
                                alignItems: 'center',
                            }}
                            onPress={() => handlePagar(payment)}
                            activeOpacity={0.8}
                        >
                            <Text style={{ color: '#198754', fontWeight: 'bold' }}>Pagar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <LoadingModal visible={loading} />
            <ButtonVolver to={backLocation} className="boton-volver" />
            <ExitosoModal visible={showExitosoModal} mensaje="¡Pago con éxito!" />
            <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16 }}>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Transacciones</Text>
                </View>
                <MesSelector mesSeleccionado={mesSeleccionado} handleMesSeleccionado={handleMesSeleccionado} />
                <FlatList
                    data={registroTransacciones}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={renderPayment}
                    ListEmptyComponent={
                        <View style={styles.noPaymentsContainer}>
                            <Text style={styles.noPaymentsMessage}>No hay pagos registrados.</Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 32 }}
                />
            </View>
        </>
    );
};

export default PaymentDetail;
