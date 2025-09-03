
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import { useAuth } from '../../src/context/AuthContext';
import MesSelector from '../../components/MesSelector';
import styles from './Notifications_user.styles';
// Si tienes imágenes locales, usa require. Si no, deja como string para remoto.
const placeholder_1 = require('../../assets/images/news/placeholder_1.jpg');
const placeholder_2 = require('../../assets/images/news/placeholder_2.jpg');
const placeholder_3 = require('../../assets/images/news/placeholder_3.jpg');
const placeholder_4 = require('../../assets/images/news/placeholder_4.jpg');


const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [notificacionesFiltradas, setNotificacionesFiltradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    useEffect(() => {
        // Simulación de fetch
        const fetchNotificaciones = async () => {
            try {
                // Aquí deberías hacer fetch real
                const notificacionesRespuesta = [];
                const categoriasRespuesta = [];
                setNotificaciones(notificacionesRespuesta);
                setCategorias(categoriasRespuesta);
                setNotificacionesFiltradas(notificacionesRespuesta);
            } catch (error) {
                console.error('Error fetching notificaciones:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchNotificaciones();
    }, [user]);

    const handleMesSeleccionado = (mes) => {
        setMesSeleccionado(mes);
        // Aquí podrías filtrar por mes si lo deseas
    };

    const handleCategoriaSeleccionada = (categoria) => {
        if (categoriaSeleccionada === categoria) {
            setCategoriaSeleccionada(null);
            setNotificacionesFiltradas(notificaciones);
        } else {
            setCategoriaSeleccionada(categoria);
            setNotificacionesFiltradas(
                notificaciones.filter(n => n.id_categoria === categoria)
            );
        }
    };

    const getPlaceholderImage = (id_categoria) => {
        if (id_categoria === 1) return placeholder_1;
        if (id_categoria === 2) return placeholder_2;
        if (id_categoria === 3) return placeholder_3;
        if (id_categoria === 4) return placeholder_4;
        return placeholder_1;
    };

    const handleItemPress = (id_notificaciones) => {
        // Aquí deberías navegar a la pantalla de detalle
        // Por ejemplo, usando React Navigation:
        // navigation.navigate('NotificacionDetalle', { id: id_notificaciones });
    };

    return (
        <View style={styles.container}>
            <LoadingModal visible={loading} />
            <Text style={styles.title}>Notificaciones</Text>
            <MesSelector mesSeleccionado={mesSeleccionado} handleMesSeleccionado={handleMesSeleccionado} />
            <View style={styles.categoriasContainer}>
                <Text style={styles.categoriasTitle}>Categorías</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasList}>
                    {categorias.map((categoria) => (
                        <TouchableOpacity
                            key={categoria.id_categoria}
                            style={[
                                styles.categoriaItem,
                                categoriaSeleccionada === categoria.id_categoria && styles.categoriaItemActive,
                            ]}
                            onPress={() => handleCategoriaSeleccionada(categoria.id_categoria)}
                        >
                            <Text
                                style={[
                                    styles.categoriaItemText,
                                    categoriaSeleccionada === categoria.id_categoria && styles.categoriaItemTextActive,
                                ]}
                            >
                                {categoria.nombre_categoria_notificaciones}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.list}>
                {notificacionesFiltradas && notificacionesFiltradas.length > 0 ? (
                    <FlatList
                        data={notificacionesFiltradas}
                        keyExtractor={item => item.id_notificaciones.toString()}
                        contentContainerStyle={styles.listInner}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => handleItemPress(item.id_notificaciones)}
                            >
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemTitle}>{item.titulo}</Text>
                                </View>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemResumen}>{item.resumen}</Text>
                                    <Text style={styles.itemAuthor}>{item.nombre_autor}</Text>
                                    <Image
                                        style={styles.itemImage}
                                        source={item.imagen ? { uri: item.imagen } : getPlaceholderImage(item.id_categoria)}
                                    />
                                    <Text style={styles.itemCategory}>{item.nombre_categoria_notificaciones}</Text>
                                    <Text style={styles.itemDate}>{new Date(item.fecha_publicacion).toLocaleDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.noNotificacionesContainer}>
                        <Text style={styles.noNotificacionesMessage}>No hay notificaciones disponibles.</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Notificaciones;