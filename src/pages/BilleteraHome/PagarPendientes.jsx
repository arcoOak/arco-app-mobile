// src/components/PaymentDetail.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import LoadingModal from '../../../components/modals/LoadingModal';
import ExitosoModal from '../../../components/modals/ExitosoModal';
import transaccionesService from '../../services/transacciones.service';
import billeteraService from '../../services/billetera.service.js';
import { useAuth } from '../../context/AuthContext';
import ButtonVolver from '../../../components/buttons/ButtonVolver';
import styles from './PagosPendientes.styles';
import { TIPOS_TRANSACCION } from '../../constants/transaccion.constants.js';


const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};



const PagarPendientes = ({ navigation }) => {
    const { user, actualizarSaldoBilletera } = useAuth();
    const [pagosPendientes, setPagosPendientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const backLocation = navigation?.canGoBack() ? null : '/';

    useEffect(() => {
        const obtenerPagosPendientes = async () => {
            try {
                const response = await transaccionesService.getTransaccionesPendientes(user.id_socio);
                setPagosPendientes(response);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error al obtener los pagos pendientes:', error);
            }
        };
        if (user) obtenerPagosPendientes();
        setTimeout(() => setLoading(false), 500);
    }, [user]);

    const handlePagar = async (transaccion) => {
        const obtenerPagosPendientes = async () => {
            try {
                const response = await transaccionesService.getTransaccionesPendientes(user.id_socio);
                setPagosPendientes(response);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error al obtener los pagos pendientes:', error);
            }
        };
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
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error al procesar el pago:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setShowExitosoModal(false);
                if (user) obtenerPagosPendientes();
            }, 2000);
        }
    };

    const renderPayment = ({ item }) => (
        <View style={styles.detailCard}>
            <View style={[styles.paymentHeader, styles.paymentHeaderPendiente]}>
                <Text style={styles.paymentTitle}>{item.descripcion_contenido}</Text>
            </View>
            <View style={styles.paymentDetails}>
                <Text style={styles.paymentDate}>
                    <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>
                    {formatDate(item.fecha_generacion)}
                </Text>
                <Text style={styles.paymentAmount}>
                    <Text style={{ fontWeight: 'bold' }}>Monto: </Text>${item.total_transaccion}
                </Text>
                {item.id_tipo_transaccion !== TIPOS_TRANSACCION.RECARGA && (
                    <TouchableOpacity
                        style={{ backgroundColor: '#19875422', borderRadius: 8, marginTop: 10, padding: 10, alignItems: 'center' }}
                        onPress={() => handlePagar(item)}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: '#198754', fontWeight: 'bold' }}>Pagar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    if (!pagosPendientes || pagosPendientes.length === 0) {
        return (
            <>
                <ButtonVolver to={backLocation} className="boton-volver" />
                <View style={styles.paymentDetailContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
                        No se encontraron pagos pendientes
                    </Text>
                </View>
            </>
        );
    }

    return (
        <>
            <LoadingModal visible={loading} />
            <ButtonVolver to={backLocation} className="boton-volver" />
            <ExitosoModal visible={showExitosoModal} mensaje="¡Pago con éxito!" />
            <View style={styles.paymentDetailContainer}>
                <View style={styles.detailHeader}>
                    <Text style={styles.detailHeaderTitle}>Pagos Pendientes</Text>
                </View>
                <FlatList
                    data={pagosPendientes}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={renderPayment}
                    ListEmptyComponent={
                        <Text style={styles.noPaymentsMessage}>No hay pagos pendientes.</Text>
                    }
                    contentContainerStyle={{ paddingBottom: 32 }}
                />
            </View>
        </>
    );
};

export default PagarPendientes;
