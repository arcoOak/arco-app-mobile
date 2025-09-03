
import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './TarjetaPendientes.styles';
import Button from '../buttons/Button';
import { useAuth } from '../../src/context/AuthContext';
import transaccionesService from '../../src/services/transacciones.service';

export default function TarjetaPendientes({ onMesClick, onPagarClick }) {
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const { user } = useAuth();
    const [pagosPendientes, setPagosPendientes] = useState([]);
    const [mesesConDeuda, setMesesConDeuda] = useState(new Set());
    const [totalDeuda, setTotalDeuda] = useState(0);

    useEffect(() => {
        const obtenerPagosPendientes = async () => {
            try {
                const response = await transaccionesService.getTransaccionesPendientes(user.id_socio);
                setPagosPendientes(response);
                const total = response.reduce((acc, pago) => acc + parseFloat(pago.total_transaccion), 0);
                setTotalDeuda(total);
                const mesesDeudores = new Set(response.map(pago => new Date(pago.fecha_generacion).getMonth() + 1));
                setMesesConDeuda(mesesDeudores);
            } catch (error) {
                setPagosPendientes([]);
                setTotalDeuda(0);
                setMesesConDeuda(new Set());
            }
        };
        if (user?.id_socio) obtenerPagosPendientes();
    }, [user]);

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
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Adelanta duplica <Icon name="gift" size={15} color={styles.headerText.color} /></Text>
                <Button onPress={onPagarClick} className="primary">Pagar</Button>
            </View>
            <View style={styles.balanceBody}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.balanceScroll}>
                    {listaMeses.map((mes, index) => {
                        const isActive = mes.numero === mesSeleccionado;
                        const hasDeuda = mesesConDeuda.has(mes.numero);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.calendarItem, isActive && styles.activeMonth]}
                                onPress={() => {
                                    setMesSeleccionado(mes.numero);
                                    if (onMesClick) onMesClick(mes.numero);
                                }}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.calendarItemText, isActive && styles.activeMonthText]}>{mes.nombre.slice(0, 3).toUpperCase()}</Text>
                                <Icon name="circle" size={11} color={hasDeuda ? '#dc3545' : '#22ad82'} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={styles.balanceFooter}>
                <Text style={styles.recibosBalance}>
                    {pagosPendientes.length} {pagosPendientes.length !== 1 ? 'Recibos pendientes' : 'Recibo pendiente'}
                </Text>
                <Text style={[styles.totalBalance, totalDeuda < 0 ? styles.hasDebt : styles.noDebt]}>
                    {totalDeuda < 0 ? `${totalDeuda}$` : 'Sin deuda'}
                </Text>
            </View>
        </View>
    );
}