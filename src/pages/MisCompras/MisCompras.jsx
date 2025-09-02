
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import LoadingModal from '../../components/modals/LoadingModal';
import comprasService from '../../services/compra.service';
import MesSelector from '../../components/MesSelector';
import styles from './MisCompras.styles';

export default function MisCompras() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [listaMisCompras, setListaMisCompras] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const mesActual = new Date().getMonth() + 1;
                const anhoActual = new Date().getFullYear();
                const misCompras = await comprasService.getComprasByUsuarioMes(
                    user.id_socio,
                    mesActual,
                    anhoActual
                );
                setListaMisCompras(misCompras);
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
        const fetchCompras = async () => {
            setLoading(true);
            const anhoActual = new Date().getFullYear();
            try {
                const misCompras = await comprasService.getComprasByUsuarioMes(
                    user.id_socio,
                    mes,
                    anhoActual
                );
                setListaMisCompras(misCompras);
            } catch (error) {
                console.error('Error al cargar las compras del mes seleccionado:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompras();
    };

    const handleItemPress = (id_compra_comercio) => {
        // navigation.navigate('MisComprasDetalle', { id: id_compra_comercio });
    };

    return (
        <View style={styles.container}>
            <LoadingModal visible={loading} />
            <Text style={styles.title}>Mis Compras</Text>
            <MesSelector
                mesSeleccionado={mesSeleccionado}
                handleMesSeleccionado={handleMesSeleccionado}
            />
            <View style={styles.comprasList}>
                {listaMisCompras.length > 0 ? (
                    <FlatList
                        data={listaMisCompras}
                        keyExtractor={item => item.id_compra_comercio.toString()}
                        contentContainerStyle={styles.comprasListInner}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.compraItem}
                                onPress={() => handleItemPress(item.id_compra_comercio)}
                            >
                                <View style={styles.compraItemHeader}>
                                    <Text style={styles.compraItemTitle}>{item.nombre_comercio}</Text>
                                    <Text style={styles.compraItemDate}>Fecha: {new Date(item.fecha_compra).toLocaleDateString()}</Text>
                                </View>
                                <View style={styles.compraItemDetails}>
                                    <Text style={styles.compraItemCantidad}>{item.cantidad_productos} {item.cantidad_productos > 1 ? 'productos' : 'producto'}</Text>
                                    <Text style={styles.compraItemPrice}>{item.precio_total}$</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.noCompras}>
                        <Text style={styles.noComprasText}>No tienes compras para esta fecha.</Text>
                    </View>
                )}
            </View>
        </View>
    );
}