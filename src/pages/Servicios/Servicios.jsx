
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../../../components/modals/LoadingModal';
import serviciosService from '../../services/servicios.service';
import servicioImagePlaceholder from '../../assets/comercio_placeholder.webp';
import { useAuth } from '../../context/AuthContext';
import BuscadorTexto from '../../../components/BuscadorTexto';
import ServiciosStyles from './Servicios.styles';

// Si usas este componente Servicios, la lista 'allBusinesses' DEBE ser pasada como una prop

export default function Servicios() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [categoriasActivas, setCategoriasActivas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const { user } = useAuth();
    const [activeCategory, setActiveCategory] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [categorias, servicioData] = await Promise.all([
                    serviciosService.getCategoriasServiciosActivos(user.id_club),
                    serviciosService.getTodosServicios(user.id_club)
                ]);
                setCategoriasActivas(categorias);
                setServicios(servicioData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleVerMasClick = (serviciosId) => {
        navigation.navigate('ServiciosDetalle', { id: serviciosId });
    };

    const handleSeleccionarCategoria = (categoriaId) => {
        setActiveCategory(categoriaId);
    };

    const displayCategorias = useMemo(() => [
        {
            id_categoria_servicio: 0,
            nombre_categoria_servicio: 'Todos',
            icon_fa: 'store',
        },
        ...categoriasActivas
    ], [categoriasActivas]);

    const filteredBusinesses = useMemo(() => {
        let businesses = servicios;
        if (activeCategory !== 0) {
            businesses = servicios.filter(
                (business) => business.id_categoria_servicio === activeCategory
            );
        }
        if (searchTerm) {
            businesses = businesses.filter(business =>
                business.nombre_servicio_reservable.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (business.descripcion && business.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        return businesses;
    }, [activeCategory, searchTerm, servicios]);

    return (
        <>
            <LoadingModal visible={loading} />
            <View style={ServiciosStyles.section}>
                <Text style={ServiciosStyles.h2}>Servicios Disponibles</Text>
                <ScrollView
                    style={ServiciosStyles.categorias}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    {displayCategorias.map((cat) => (
                        <TouchableOpacity
                            key={cat.id_categoria_servicio}
                            style={[
                                ServiciosStyles.spanCategoria,
                                activeCategory === cat.id_categoria_servicio && ServiciosStyles.spanCategoriaActive,
                            ]}
                            onPress={() => handleSeleccionarCategoria(cat.id_categoria_servicio)}
                            activeOpacity={0.85}
                        >
                            {/* Puedes usar un icono aquí si tienes FontAwesome o similar */}
                            <Text>{cat.nombre_categoria_servicio}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <BuscadorTexto
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Busca el servicio que necesitas"
                />
                <View style={ServiciosStyles.servicios}>
                    {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map((servicio) => (
                            <TouchableOpacity
                                style={ServiciosStyles.servicioCard}
                                key={servicio.id_servicio_reservable}
                                onPress={() => handleVerMasClick(servicio.id_servicio_reservable)}
                                activeOpacity={0.85}
                            >
                                <Image
                                    source={servicio.img ? { uri: servicio.img } : servicioImagePlaceholder}
                                    style={ServiciosStyles.servicioCardImg}
                                />
                                <Text style={ServiciosStyles.servicioCardH3}>{servicio.nombre_servicio_reservable}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={ServiciosStyles.notFoundText}>
                            No se encontraron servicios para esta búsqueda o categoría.
                        </Text>
                    )}
                </View>
            </View>
        </>
    );
}