
import React, { useState, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Animated, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './VistaNotificaciones.styles';
import LoadingModal from '../modals/LoadingModal';
import { useNotificaciones } from '../../context/NotificacionesContext';
import { useAuth } from '../../context/AuthContext';
import { TIPOS_NOTIFICACION } from '../../constants/notificacion.constants';

const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opciones);
    return fechaFormateada;
};

function VistaNotificaciones({ onClose, navigation }) {
    const { notificaciones, marcarComoVista } = useNotificaciones();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        onClose && onClose();
    };

    const handleMarcarComoVista = useCallback(async (notificacion) => {
        setLoading(true);
        try {
            if (!notificacion.estado_visualizacion) {
                await marcarComoVista(notificacion.id_notificacion);
            }

            // Navegación adaptada a React Navigation
            switch (notificacion.id_categoria_notificacion) {
                case TIPOS_NOTIFICACION.PAGO_MENSUALIDAD_PENDIENTE:
                case TIPOS_NOTIFICACION.PAGO_RESERVACION_PENDIENTE:
                case TIPOS_NOTIFICACION.PAGO_COMPRA_COMERCIO_PENDIENTE:
                case TIPOS_NOTIFICACION.PAGO_SERVICIO_PENDIENTE:
                case TIPOS_NOTIFICACION.RECARGA_VALIDA:
                case TIPOS_NOTIFICACION.RECARGA_NEGADA:
                case TIPOS_NOTIFICACION.RECARGA_EN_VALIDACION:
                    navigation && navigation.navigate('TransaccionDetalle', { id: notificacion.id_billetera_transaccion });
                    break;
                case TIPOS_NOTIFICACION.CONFIRMACION_RESERVACION:
                    navigation && navigation.navigate('ReservaDetalle', { id: notificacion.id_asociado });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error al marcar la notificación como vista:', error);
        } finally {
            setLoading(false);
            handleClose();
        }
    }, [marcarComoVista, navigation]);

    const renderItem = ({ item }) => {
        // Animación shake para no-visto
        const shakeAnim = new Animated.Value(0);
        if (!item.estado_visualizacion) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: -1, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
                ])
            ).start();
        }
        const shake = shakeAnim.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-2, 0, 2],
        });

        return (
            <Animated.View
                style={[
                    styles.item,
                    !item.estado_visualizacion && { borderColor: '#FFC107', transform: [{ translateX: shake }] },
                ]}
            >
                <TouchableOpacity
                    style={{ flexDirection: 'row', flex: 1 }}
                    onPress={() => handleMarcarComoVista(item)}
                    activeOpacity={0.8}
                >
                    <View style={styles.icon}>
                        <Icon name="circle-info" size={24} color={item.estado_visualizacion ? '#1976d2' : '#FFC107'} />
                    </View>
                    <View style={styles.contenido}>
                        <Text style={styles.titulo}>{item.nombre_transaccion}</Text>
                        <Text style={styles.comercio}>{item.nombre_categoria_notificacion}</Text>
                        <Text style={styles.fecha}>{formatearFecha(item.fecha_activacion_notificacion)}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <>
            <LoadingModal visible={loading} />
            <Modal
                visible={true}
                transparent
                animationType="fade"
                onRequestClose={handleClose}
            >
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Icon name="bell" style={styles.bellIcon} />
                            <Text style={styles.title}>Notificaciones</Text>
                            <TouchableOpacity onPress={handleClose} accessibilityLabel="Cerrar">
                                <Text style={styles.closeButton}>×</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={notificaciones}
                            keyExtractor={item => item.id_notificacion?.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={styles.list}
                            ListEmptyComponent={
                                <View style={styles.vacio}>
                                    <Text>No hay notificaciones.</Text>
                                </View>
                            }
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default VistaNotificaciones;