
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import LoadingModal from '../../../components/modals/LoadingModal';
import CategoriaSelector from '../../../components/CategoriaSelector';
import comercioService from '../../services/comercio.service';
import { useAuth } from '../../context/AuthContext';
import BuscadorTexto from '../../../components/BuscadorTexto';
import styles from './Comercio.styles';

const comercioImagePlaceholder = require('../../assets/partial-react-logo.png');

// Si usas este componente Comercio, la lista 'allBusinesses' DEBE ser pasada como una prop
export default function Comercio({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [categoriasActivas, setCategoriasActivas] = useState([]);
    const [comercios, setComercios] = useState([]);
    const { user, isDarkTheme } = useAuth();
    const [activeCategory, setActiveCategory] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [categorias, comerciosData] = await Promise.all([
                    comercioService.getCategoriasComercioActivos(user.id_club, 1),
                    comercioService.getComerciosActivos(user.id_club, 1),
                ]);
                setCategoriasActivas(categorias);
                setComercios(comerciosData);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching initial data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);


    const handleVerMasClick = (comercioId) => {
        navigation.navigate('ComercioDetalle', { id: comercioId });
    };

    const handleSeleccionarCategoria = (categoriaId) => setActiveCategory(categoriaId);

    const displayCategorias = useMemo(
        () => [
            { id_categoria_comercio: 0, nombre_categoria_comercio: 'Todos', icon_fa: 'fa-store' },
            ...categoriasActivas,
        ],
        [categoriasActivas]
    );

    const filteredBusinesses = useMemo(() => {
        let businesses = comercios;
        if (activeCategory != 0) {
            businesses = comercios.filter(
                (business) => business.id_categoria_comercio === activeCategory
            );
        }
        if (searchTerm) {
            businesses = businesses.filter(
                (business) =>
                    business.nombre_comercio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (business.descripcion_comercio &&
                        business.descripcion_comercio.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        return businesses;
    }, [activeCategory, searchTerm, comercios]);

    return (
        <>
            <LoadingModal visible={loading} />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 16, textAlign: 'center' }}>
                    Tiendas Disponibles
                </Text>
                <CategoriaSelector
                    displayCategorias={displayCategorias}
                    activeCategory={activeCategory}
                    handleSeleccionarCategoria={handleSeleccionarCategoria}
                    id="id_categoria_comercio"
                    nombre="nombre_categoria_comercio"
                />
                <BuscadorTexto
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Busca la tienda que necesitas"
                />
                <View style={styles.comercios}>
                    {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map((comercio) => (
                            <TouchableOpacity
                                style={styles.comercioCard}
                                key={comercio.id_comercio}
                                onPress={() => handleVerMasClick(comercio.id_comercio)}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={comercio.img ? { uri: comercio.img } : comercioImagePlaceholder}
                                    style={styles.comercioCardImg}
                                    resizeMode="cover"
                                />
                                <Text style={styles.comercioCardTitle}>{comercio.nombre_comercio}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.comerciosEmpty}>
                            No se encontraron tiendas para esta búsqueda o categoría.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </>
    );
}

