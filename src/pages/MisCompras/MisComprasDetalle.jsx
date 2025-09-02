/*


Cambio de contraseña en perfil de usuario

*/ 


import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import LoadingModal from '../../components/modals/LoadingModal';
import compraService from '../../services/compra.service';
import BotonVolver from '../../components/buttons/ButtonVolver';
import styles from './MisComprasDetalle.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




export default function MisComprasDetalle() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const { id } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [miCompraDetalle, setMiCompraDetalle] = useState(null);
    const [listaProductos, setListaProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await compraService.getCompraById(id);
                setMiCompraDetalle({
                    id: response.id,
                    fecha_compra: response.fecha_compra,
                    nombre_comercio: response.nombre_comercio,
                    nota: response.nota,
                    estado: response.estado,
                    id_comercio: response.id_comercio,
                    id_compra_comercio: response.id_compra_comercio,
                });
                setListaProductos(response.productos || []);
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
        <ScrollView contentContainerStyle={styles.container}>
            <LoadingModal visible={loading} />
            <BotonVolver to="Compras" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Detalle de la Compra</Text>
            </View>
            {miCompraDetalle ? (
                <View style={styles.compraInfo}>
                    <View style={styles.compraInfoHeader}>
                        <Text style={styles.sectionTitle}>Información de la Compra</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Fecha Compra:</Text> {new Date(miCompraDetalle.fecha_compra).toLocaleDateString()}</Text>

                        <TouchableOpacity style={styles.infoCardLink} onPress={() => handleNavigate('Comercios', miCompraDetalle.id_comercio)}>
                            <View style={styles.infoCardLinkText}>
                                <Text style={styles.infoCardLinkLabel}>Comercio</Text>
                                <Text style={styles.infoCardLinkValue}>{miCompraDetalle.nombre_comercio}</Text>
                            </View>
                            <Icon name="chevron-right" size={24} style={styles.infoCardLinkIcon} />
                        </TouchableOpacity>

                        <View style={styles.productosComprados}>
                            <Text style={styles.sectionTitle}>Productos Comprados</Text>
                            {listaProductos.length > 0 ? (
                                <View style={styles.productosList}>
                                    {listaProductos.map((producto, index) => (
                                        <View key={index} style={styles.productosListItem}>
                                            <Text style={styles.productoNombre}>{producto.nombre_producto}</Text>
                                            <Text style={styles.productoCantidad}>x {producto.cantidad}</Text>
                                            <Text style={styles.productoPrecio}>${producto.precio_producto.toFixed(2)}</Text>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <Text style={styles.loadingText}>No hay productos comprados para esta compra.</Text>
                            )}
                        </View>

                        {miCompraDetalle.nota ? (
                            <Text><Text style={{ fontWeight: 'bold' }}>Información Adicional:</Text> {miCompraDetalle.nota}</Text>
                        ) : null}
                    </View>
                </View>
            ) : (
                <Text style={styles.loadingText}>Cargando detalles de la compra...</Text>
            )}
        </ScrollView>
    );
}