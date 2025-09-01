
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './VistaCarrito.styles';
import Button from '../buttons/Button';

// NOTA: Los modales LoadingModal, ExitosoModal y ConfirmarModal deben ser adaptados a React Native si no lo están.

import { useCarrito } from '../../src/context/CartContext.jsx';
import { useAuth } from '../../src/context/AuthContext.jsx';
import compraService from '../../src/services/compra.service.js';
import productosService from '../../src/services/producto.service.js';
import hamburguesaPlaceholder from '../../assets/hamburguesa.png';
import { TIPOS_TRANSACCION } from '../../src/constants/transaccion.constants.js';

function VistaCarrito({ visible, onClose }) {
    const { elementosCarrito, removeFromCarrito, updateCantidad, limpiarCarrito } = useCarrito();
    const { user, actualizarSaldoBilletera } = useAuth();
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const [nota, setNota] = useState('');
    const [showConfirmarModal, setShowConfirmarModal] = useState(false);
    const [itemsNoDisponibles, setItemsNoDisponibles] = useState([]);
    const [loading, setLoading] = useState(false);

    const total = useMemo(() => {
        return elementosCarrito
            .filter(item =>
                !itemsNoDisponibles.some(noDisp =>
                    noDisp.id_producto === item.id_producto && String(noDisp.id_comercio) === String(item.id_comercio)))
            .reduce((acc, item) => acc + (item.precio_producto * item.cantidad), 0);
    }, [elementosCarrito, itemsNoDisponibles]);

    const verificarDisponibilidad = useCallback(async () => {
        if (elementosCarrito.length === 0) return [];
        try {
            const productosConsultar = elementosCarrito.map(item => ({ id_producto: item.id_producto, id_comercio: item.id_comercio }));
            const idsNoDisponibles = await productosService.verificarDisponibilidad(productosConsultar) || [];
            setItemsNoDisponibles(idsNoDisponibles);
            return idsNoDisponibles;
        } catch (error) {
            return [];
        }
    }, [elementosCarrito]);

    useEffect(() => { verificarDisponibilidad(); }, [verificarDisponibilidad]);

    const handleLimpiarCarrito = () => {
        limpiarCarrito();
        setShowConfirmarModal(false);
    };
    const confirmLimpiarCarrito = () => setShowConfirmarModal(true);

    const handlePagar = useCallback(async () => {
        setLoading(true);
        const idsNoDisponiblesActualizados = await verificarDisponibilidad();
        const itemsDisponibles = elementosCarrito.filter(
            item => !idsNoDisponiblesActualizados.some(
                noDisp => noDisp.id_producto === item.id_producto && String(noDisp.id_comercio) === String(item.id_comercio)
            ) && item.cantidad > 0
        );
        if (itemsDisponibles.length === 0) return;
        const comprasPorComercio = itemsDisponibles.reduce((acc, item) => {
            const idComercio = item.id_comercio;
            if (!acc[idComercio]) acc[idComercio] = [];
            acc[idComercio].push(item);
            return acc;
        }, {});
        const comprasCompletas = Object.values(comprasPorComercio).map(itemsComercio => {
            const totalComercio = itemsComercio.reduce((acc, item) => acc + (item.precio_producto * item.cantidad), 0);
            return {
                id_usuario: user.id_usuario,
                id_billetera: user.id_billetera,
                monto: totalComercio,
                id_tipo_transaccion: TIPOS_TRANSACCION.COMPRA_COMERCIO,
                listaItems: itemsComercio,
                compraData: {
                    id_socio: user.id_socio,
                    id_comercio: itemsComercio[0].id_comercio,
                    fecha_compra: new Date().toISOString(),
                    nota: nota,
                    precio_total: totalComercio
                },
            };
        });
        try {
            await Promise.all(comprasCompletas.map(compraData => compraService.crearCompra(compraData)));
            setLoading(false);
            setShowExitosoModal(true);
            limpiarCarrito();
        } catch (error) {
        } finally {
            await actualizarSaldoBilletera();
            setTimeout(() => setShowExitosoModal(false), 2000);
        }
    }, [elementosCarrito, user, nota, verificarDisponibilidad]);

    // NOTA: LoadingModal, ExitosoModal y ConfirmarModal deben ser adaptados a React Native.

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Icon name="cart-shopping" size={28} color={styles.title.color} />
                        <Text style={styles.title}>Tu Carrito</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Text style={{ fontSize: 24, color: styles.closeBtn.color }}>&times;</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.list} contentContainerStyle={{ flexGrow: 1 }}>
                        {elementosCarrito.length > 0 ? (
                            elementosCarrito.map((item, idx) => {
                                const noDisponible = itemsNoDisponibles.some(noDisp => noDisp.id_producto === item.id_producto && String(noDisp.id_comercio) === String(item.id_comercio));
                                return (
                                    <View
                                        key={item.id_producto}
                                        style={[
                                            styles.item,
                                            idx === elementosCarrito.length - 1 && styles.itemLast,
                                            noDisponible && styles.itemNoDisponible,
                                        ]}
                                    >
                                        <Image source={hamburguesaPlaceholder} style={styles.imagen} />
                                        <Text style={styles.itemText}>{item.nombre_producto} - ${item.precio_producto.toFixed(2)}</Text>
                                        <Text style={styles.comercio}>{item.nombre_comercio}</Text>
                                        <View style={styles.controlesCantidad}>
                                            <TouchableOpacity style={styles.cantidadBtn} onPress={() => updateCantidad(item.id_producto, item.id_comercio, -1)}>
                                                <Text style={styles.cantidadBtnText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.cantidadText}>Cantidad: {item.cantidad}</Text>
                                            <TouchableOpacity style={styles.cantidadBtn} onPress={() => updateCantidad(item.id_producto, item.id_comercio, 1)}>
                                                <Text style={styles.cantidadBtnText}>+</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.eliminarBtn} onPress={() => removeFromCarrito(item.id_producto, item.id_comercio)}>
                                                <Icon name="trash" size={18} color={styles.cantidadBtn.color} />
                                            </TouchableOpacity>
                                        </View>
                                        {noDisponible && (
                                            <View style={styles.itemNoDisponibleOverlay}>
                                                <Text style={styles.itemNoDisponibleText}>No Disponible</Text>
                                                <TouchableOpacity style={styles.eliminarBtn} onPress={() => removeFromCarrito(item.id_producto, item.id_comercio)}>
                                                    <Icon name="trash" size={18} color={styles.cantidadBtn.color} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                );
                            })
                        ) : (
                            <View style={[styles.item, styles.vacio]}>
                                <Text style={styles.mensaje}>No hay productos en el carrito.</Text>
                            </View>
                        )}
                    </ScrollView>
                    {elementosCarrito.length > 0 && (
                        <View style={{ width: '100%' }}>
                            <TextInput
                                placeholder="Añadir una nota..."
                                style={styles.nota}
                                value={nota}
                                onChangeText={setNota}
                                multiline
                                numberOfLines={4}
                            />
                            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                            <View style={styles.acciones}>
                                <Button className="primary" onPress={handlePagar}>
                                    Proceder al Pago
                                </Button>
                                <Button className="tertiary" onPress={confirmLimpiarCarrito}>
                                    Limpiar Carrito
                                </Button>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

export default VistaCarrito;