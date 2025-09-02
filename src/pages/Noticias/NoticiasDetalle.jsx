
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import LoadingModal from '../../../components/modals/LoadingModal';
import noticiasService from '../../services/noticias.service';
import ButtonVolver from '../../../components/buttons/ButtonVolver';
import styles from './NoticiasDetalle.styles';
const placeholder_1 = require('../../img/news/placeholder_1.jpg');
const placeholder_2 = require('../../img/news/placeholder_2.jpg');
const placeholder_3 = require('../../img/news/placeholder_3.jpg');
const placeholder_4 = require('../../img/news/placeholder_4.jpg');


const NoticiasDetalle = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const { id, returnTo } = route.params || {};
    const backLocation = returnTo || 'Noticias';
    const [loading, setLoading] = useState(false);
    const [noticiaDetalle, setNoticiaDetalle] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const noticia = await noticiasService.getNoticiaPorId(user.id_club, id);
                setNoticiaDetalle(noticia);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const imagenNoticia = useMemo(() => {
        if (!noticiaDetalle) return placeholder_1;
        if (noticiaDetalle && noticiaDetalle.imagen) return { uri: noticiaDetalle.imagen };
        switch (noticiaDetalle.id_categoria) {
            case 1:
                return placeholder_1;
            case 2:
                return placeholder_2;
            case 3:
                return placeholder_3;
            case 4:
                return placeholder_4;
            default:
                return placeholder_1;
        }
    }, [noticiaDetalle]);

    return (
        <ScrollView>
            <LoadingModal visible={loading} />
            <ButtonVolver to={backLocation} style={{ marginBottom: 16 }} />
            <View style={styles.container}>
                <View style={styles.header}>
                    {noticiaDetalle ? (
                        <View style={styles.noticiaInfo}>
                            <View style={styles.noticiaInfoHeader}>
                                <Image
                                    style={styles.noticiaImage}
                                    source={imagenNoticia}
                                />
                                <Text style={styles.noticiaTitle}>{noticiaDetalle.titulo}</Text>
                                <Text style={styles.noticiaDate}><Text style={{ fontWeight: 'bold' }}>Fecha:</Text> {new Date(noticiaDetalle.fecha_publicacion).toLocaleDateString()}</Text>
                            </View>
                            <Text style={styles.noticiaContent}>{noticiaDetalle.contenido}</Text>
                            <View style={styles.noticiaDetails}>
                                <Text style={styles.noticiaDetailsText}><Text style={{ fontWeight: 'bold' }}>Autor:</Text> {noticiaDetalle.nombre_autor}</Text>
                                <Text style={styles.noticiaDetailsText}><Text style={{ fontWeight: 'bold' }}>Categoría:</Text> {noticiaDetalle.nombre_categoria_noticia}</Text>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.loadingText}>Cargando noticia...</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default NoticiasDetalle;