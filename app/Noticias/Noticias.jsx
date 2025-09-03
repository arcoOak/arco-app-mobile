
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import noticiasService from '../../src/services/noticias.service';
import LoadingModal from '../../components/modals/LoadingModal';
import { useAuth } from '../../src/context/AuthContext';
import MesSelector from '../../components/MesSelector';
import styles from './Noticias.styles';
const placeholder_1 = require('../../assets/images/news/placeholder_1.jpg');
const placeholder_2 = require('../../assets/images/news/placeholder_2.jpg');
const placeholder_3 = require('../../assets/images/news/placeholder_3.jpg');
const placeholder_4 = require('../../assets/images/news/placeholder_4.jpg');


const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [noticiasFiltradas, setNoticiasFiltradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [anhoSeleccionado, setAnhoSeleccionado] = useState(new Date().getFullYear());
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const [noticiasRespuesta, categoriasRespuesta] = await Promise.all([
                    noticiasService.getNoticiasPorMesAnho(user.id_club, mesSeleccionado || new Date().getMonth() + 1, new Date().getFullYear()),
                    noticiasService.getCategoriasNoticias(user.id_club)
                ]);
                setNoticias(noticiasRespuesta);
                setCategorias(categoriasRespuesta);
                setNoticiasFiltradas(noticiasRespuesta);
            } catch (error) {
                console.error('Error fetching noticias:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchNoticias();
    }, [user]);

    const handleMesSeleccionado = (mes) => {
        setMesSeleccionado(mes);
        const fetchNoticiasFecha = async () => {
            try {
                setLoading(true);
                const noticiasRespuesta = await noticiasService.getNoticiasPorMesAnho(user.id_club, mes, anhoSeleccionado);
                setNoticias(noticiasRespuesta);
                setNoticiasFiltradas(noticiasRespuesta);
                setCategoriaSeleccionada(null);
            } catch (error) {
                console.error('Error fetching noticias por fecha:', error);
                setNoticiasFiltradas([]);
                setCategoriaSeleccionada(null);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };
        fetchNoticiasFecha();
    };

    const handleCategoriaSeleccionada = (categoria) => {
        if (categoriaSeleccionada === categoria) {
            setCategoriaSeleccionada(null);
            setNoticiasFiltradas(noticias);
        } else {
            setCategoriaSeleccionada(categoria);
            setNoticiasFiltradas(
                noticias.filter(noticia => noticia.id_categoria === categoria)
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

    const handleItemPress = (id_noticia) => {
        // Aquí deberías navegar a la pantalla de detalle
        // Por ejemplo, usando React Navigation:
        // navigation.navigate('NoticiasDetalle', { id: id_noticia });
    };

    return (
        <View style={styles.container}>
            <LoadingModal visible={loading} />
            <Text style={styles.title}>Noticias</Text>
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
                                {categoria.nombre_categoria_noticia}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View>
                {noticiasFiltradas && noticiasFiltradas.length > 0 ? (
                    <FlatList
                        data={noticiasFiltradas}
                        keyExtractor={item => item.id_noticia.toString()}
                        contentContainerStyle={styles.listInner}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.noticiaItem}
                                onPress={() => handleItemPress(item.id_noticia)}
                            >
                                <View style={styles.noticiaItemHeader}>
                                    <Text style={styles.noticiaItemTitle}>{item.titulo}</Text>
                                </View>
                                <View style={styles.noticiaItemDetails}>
                                    <Text style={styles.noticiaItemResumen}>{item.resumen}</Text>
                                    <Text style={styles.noticiaItemAuthor}>{item.nombre_autor}</Text>
                                    <Image
                                        style={styles.noticiaItemImage}
                                        source={item.imagen ? { uri: item.imagen } : getPlaceholderImage(item.id_categoria)}
                                    />
                                    <Text style={styles.noticiaItemCategory}>{item.nombre_categoria_noticia}</Text>
                                    <Text style={styles.noticiaItemDate}>{new Date(item.fecha_publicacion).toLocaleDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.noNoticiasContainer}>
                        <Text style={styles.noNoticiasMessage}>No hay noticias disponibles.</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Noticias;