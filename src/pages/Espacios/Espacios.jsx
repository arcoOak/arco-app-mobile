
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import CategoriaSelector from '../../components/CategoriaSelector';
import espacioService from '../../services/espacio.service';
import comercioImagePlaceholder from '../../assets/comercio_placeholder.webp';
import { useAuth } from '../../context/AuthContext';
import BuscadorTexto from '../../components/BuscadorTexto';
import styles from './Espacios.styles';

export default function Espacios({ navigation }) {
    const [activeCategory, setActiveCategory] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, isDarkTheme } = useAuth();
    const [loading, setLoading] = useState(false);
    const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);
    const [espacios, setEspacios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [categorias, espaciosData] = await Promise.all([
                    espacioService.getCategoriasEspacioDisponible(user.id_club),
                    espacioService.getAllEspaciosReservables(user.id_club)
                ]);
                setCategoriasDisponibles(categorias);
                setEspacios(espaciosData);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const displayCategorias = useMemo(() => ([
        {
            id_categoria_espacio: 0,
            nombre_categoria_espacio: 'Todos',
            icon_fa: 'fa-store',
        },
        ...categoriasDisponibles,
    ]), [categoriasDisponibles]);

    const handleVerMasClick = (espacioId) => {
        if (navigation && navigation.navigate) {
            navigation.navigate('EspaciosDetalle', { id: espacioId });
        }
        // Si usas otro sistema de navegación, ajusta aquí
    };

    const filteredEspacios = useMemo(() => {
        if (!espacios) return [];
        let filtered = espacios;
        if (activeCategory !== 0) {
            filtered = filtered.filter(
                (espacio) => espacio.id_categoria_espacio === activeCategory
            );
        }
        if (searchTerm) {
            filtered = filtered.filter(espacio =>
                espacio.nombre_espacio_reservable.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (espacio.descripcion_espacio_reservable && espacio.descripcion_espacio_reservable.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        return filtered;
    }, [activeCategory, searchTerm, espacios]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <LoadingModal visible={loading} />
            <ScrollView>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 16, marginBottom: 8, textAlign: 'center', color: isDarkTheme ? '#fff' : '#222' }}>
                    Espacios Reservables
                </Text>
                <CategoriaSelector
                    displayCategorias={displayCategorias}
                    activeCategory={activeCategory}
                    handleSeleccionarCategoria={setActiveCategory}
                    id="id_categoria_espacio"
                    nombre="nombre_categoria_espacio"
                />
                <BuscadorTexto
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Busca el espacio que necesitas"
                />
                <View style={styles.espacios}>
                    {filteredEspacios.length > 0 ? (
                        filteredEspacios.map((espacio) => (
                            <TouchableOpacity
                                key={espacio.id_espacio_reservable}
                                style={styles.espacioCard}
                                onPress={() => handleVerMasClick(espacio.id_espacio_reservable)}
                            >
                                <Image
                                    source={espacio.img ? { uri: espacio.img } : comercioImagePlaceholder}
                                    style={styles.espacioCardImg}
                                />
                                <Text style={styles.espacioCardTitle}>{espacio.nombre_espacio_reservable}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', color: isDarkTheme ? '#fff' : '#777', width: '100%' }}>
                            No se encontraron espacios reservables para esta búsqueda o categoría.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}