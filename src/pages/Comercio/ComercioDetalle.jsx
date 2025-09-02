// src/components/ComercioDetalle.jsx (o ComercioDetalle.js)
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native';
import comercioService from '../../services/comercio.service';
import productoService from '../../services/producto.service';
import serviciosService from '../../services/servicios.service';
import LoadingModal from '../../../components/modals/LoadingModal';
import ExitosoModal from '../../../components/modals/ExitosoModal';
import ButtonVolver from '../../../components/buttons/ButtonVolver';
import styles from './ComercioDetalle.styles';
import variables from '../../constants/VariablesBase.styles';
import hamburguesaPlaceholder from '../../assets/hamburguesa.png';
import aguaPlaceholder from '../../assets/agua.jpg';
import { useCarrito } from '../../context/CartContext';

// Si tienes un placeholder de imagen de comercio, usa require o import adecuado
const comercioImagePlaceholder = require('../../assets/partial-react-logo.png');

// Adaptación de ProductoCard a React Native
const ProductoCard = ({ producto, handleAddToCarrito, productoEnCarrito }) => (
    <View style={styles.productoCard}>
        <Image
            source={hamburguesaPlaceholder}
            style={styles.productoImg}
            resizeMode="cover"
        />
        <View style={styles.productoCardContent}>
            <Text style={styles.productoName}>{producto.nombre_producto}</Text>
            <Text style={styles.productoDescription}>{producto.descripcion_producto}</Text>
            <Text style={styles.productoPrice}>${Number(producto.precio_producto).toFixed(2)}</Text>
            {productoEnCarrito ? (
                <Text style={styles.productoAnadido}>Añadido al Carrito</Text>
            ) : (
                <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCarrito(producto)}>
                    <Text style={{ color: '#fff', flex: 1, textAlign: 'center' }}>Añadir al Carrito</Text>
                </TouchableOpacity>
            )}
        </View>
    </View>
);

const ServicioCard = ({ servicio, handleServicioClick }) => (
    <TouchableOpacity style={styles.servicioCard} onPress={() => handleServicioClick(servicio.id_servicio_reservable)}>
        <Text style={styles.servicioName}>{servicio.nombre_servicio_reservable}</Text>
        <Text style={styles.servicioDescription}>{servicio.descripcion}</Text>
        <Text style={styles.servicioPrice}>${Number(servicio.costo_servicio).toFixed(2)}</Text>
    </TouchableOpacity>
);

// ...existing code...

export default function ComercioDetalle({ route, navigation }) {
    // route.params.id debe venir de la navegación
    const id = route?.params?.id;
    const [loading, setLoading] = useState(false);
    const [comercio, setComercio] = useState({});
    const [productos, setProductos] = useState([]);
    const [categoriasProductos, setCategoriasProductos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [categoriasServicios, setCategoriasServicios] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeCategoryServicios, setActiveCategoryServicios] = useState(0);
    const [tipoEmpresa, setTipoEmpresa] = useState(null);
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const { addToCarrito, isProductoEnCarrito } = useCarrito();
    // Para volver, navigation.goBack() o navigation.navigate('Comercios')
    const backLocation = navigation?.canGoBack() ? null : 'Comercios';

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            setLoading(true);
            try {
                const comercioData = await comercioService.getComercioById(id);
                if (!comercioData) {
                    setComercio(null);
                } else {
                    setComercio(comercioData);
                }
                if (comercioData.id_tipo_comercio == 1) {
                    const [productosData, categoriasData] = await Promise.all([
                        productoService.getProductosPorComercio(id),
                        productoService.getCategoriasDeProductosPorComercio(id),
                    ]);
                    setProductos(productosData || []);
                    setCategoriasProductos(categoriasData || []);
                    setTipoEmpresa(1);
                } else if (comercioData.id_tipo_comercio == 2) {
                    const [serviciosData, categoriasServiciosData] = await Promise.all([
                        serviciosService.getServiciosPorEmpresaReservadora(id),
                        serviciosService.getCategoriasServiciosActivosPorEmpresaReservadora(id),
                    ]);
                    setServicios(serviciosData || []);
                    setCategoriasServicios(categoriasServiciosData || []);
                    setTipoEmpresa(2);
                } else {
                    const [productosData, categoriasData, serviciosData, categoriasServiciosData] = await Promise.all([
                        productoService.getProductosPorComercio(id),
                        productoService.getCategoriasDeProductosPorComercio(id),
                        serviciosService.getServiciosPorEmpresaReservadora(id),
                        serviciosService.getCategoriasServiciosActivosPorEmpresaReservadora(id),
                    ]);
                    setProductos(productosData || []);
                    setCategoriasProductos(categoriasData || []);
                    setServicios(serviciosData || []);
                    setCategoriasServicios(categoriasServiciosData || []);
                    setTipoEmpresa(3);
                }
            } catch (error) {
                setComercio(null);
                setProductos([]);
                setCategoriasProductos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCarrito = (producto) => {
        addToCarrito(producto, id);
        setShowExitosoModal(true);
        setTimeout(() => setShowExitosoModal(false), 1500);
    };

    const handleServicioClick = (idServicio) => {
        // Navegación a detalle de servicio
        navigation.navigate('ServicioDetalle', { id: idServicio, returnTo: { id } });
    };

    const displayCategorias = useMemo(
        () => [
            { id_categoria_producto: 0, nombre_categoria_producto: 'Todos' },
            ...categoriasProductos,
        ],
        [categoriasProductos]
    );
    const displayCategoriasServicios = useMemo(
        () => [
            { id_categoria_servicio: 0, nombre_categoria_servicio: 'Todos' },
            ...categoriasServicios,
        ],
        [categoriasServicios]
    );
    const handleSeleccionarCategoria = (categoriaId) => setActiveCategory(categoriaId);
    const handleSeleccionarCategoriaServicios = (categoriaId) => setActiveCategoryServicios(categoriaId);
    const productosFiltrados = useMemo(() => {
        let productosTotales = productos;
        if (activeCategory != 0) {
            productosTotales = productos.filter(
                (business) => business.id_categoria_producto === activeCategory
            );
        }
        return productosTotales;
    }, [activeCategory, productos]);
    const serviciosFiltrados = useMemo(() => {
        let serviciosTotales = servicios;
        if (activeCategoryServicios != 0) {
            serviciosTotales = servicios.filter(
                (servicio) => servicio.id_categoria_servicio === activeCategoryServicios
            );
        }
        return serviciosTotales;
    }, [activeCategoryServicios, servicios]);

    if (!comercio) {
        return (
            <View style={styles.detalleContainer}>
                <TouchableOpacity onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Comercios'))}>
                    <Text style={{ color: '#007bff', fontWeight: 'bold', marginBottom: 16 }}>← Volver</Text>
                </TouchableOpacity>
                <Text style={{ color: '#c00', textAlign: 'center' }}>
                    Lo sentimos, el comercio que buscas no fue encontrado.
                </Text>
            </View>
        );
    }

    return (
        <>
            <ExitosoModal visible={showExitosoModal} mensaje="Producto Añadido al Carrito" />
            <LoadingModal visible={loading} />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
                <View style={styles.detalleContainer}>
                    <View style={styles.reservaImgWrapper}>
                        <Image
                            source={comercio.img ? { uri: comercio.img } : comercioImagePlaceholder}
                            style={styles.reservaImg}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={[styles.detalleHeaderTitle, { textAlign: 'center' }]}>{comercio.nombre_comercio}</Text>
                    <Text style={styles.reservaDescription}>{comercio.descripcion_comercio}</Text>
                    <View style={styles.reservaInfoSection}>
                        <Text style={styles.detalleInfoSectionTitle}>Información de Contacto</Text>
                        <Text style={styles.reservaInfoText}>
                            <Text style={{ fontWeight: 'bold' }}>Horario:</Text>{'\n'}Lunes a Viernes: {comercio.hora_apertura ? comercio.hora_apertura.slice(0, 5) : '--:--'} - {comercio.hora_cierre ? comercio.hora_cierre.slice(0, 5) : '--:--'}
                        </Text>
                        <Text style={styles.reservaInfoText}>
                            <Text style={{ fontWeight: 'bold' }}>Teléfono: </Text>
                            <Text style={{ color: '#007bff' }} onPress={() => Linking.openURL(`tel:${comercio.telefono || '+584123456789'}`)}>
                                {comercio.telefono || '+58-412-3456789'}
                            </Text>
                        </Text>
                    </View>

                    {productos.length > 0 && servicios.length > 0 && (
                        <View style={styles.selectorTipoEmpresa}>
                            <TouchableOpacity
                                style={[styles.tipoEmpresaButton, tipoEmpresa === 1 && styles.tipoEmpresaButtonActive]}
                                onPress={() => setTipoEmpresa(1)}
                            >
                                <Text style={{ textAlign: 'center', color: tipoEmpresa === 1 ? '#fff' : '#555' }}>Productos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tipoEmpresaButton, tipoEmpresa === 2 && styles.tipoEmpresaButtonActive]}
                                onPress={() => setTipoEmpresa(2)}
                            >
                                <Text style={{ textAlign: 'center', color: tipoEmpresa === 2 ? '#fff' : '#555' }}>Servicios</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {productos.length > 0 && tipoEmpresa === 1 && (
                        <View style={styles.reservaCatalogoSection}>
                            <Text style={styles.detalleInfoSectionTitle}>Catálogo de Productos</Text>
                            <SelectorCategorias
                                id={'id_categoria_producto'}
                                nombre={'nombre_categoria_producto'}
                                displayCategorias={displayCategorias}
                                activeCategory={activeCategory}
                                handleSeleccionarCategoria={handleSeleccionarCategoria}
                            />
                            <View style={styles.productosGrid}>
                                {productosFiltrados.map((producto) => (
                                    <ProductoCard
                                        producto={producto}
                                        handleAddToCarrito={handleAddToCarrito}
                                        key={producto.id_producto}
                                        productoEnCarrito={isProductoEnCarrito(producto.id_producto)}
                                    />
                                ))}
                                {productosFiltrados.length === 0 && (
                                    <Text style={styles.noProducts}>No hay productos disponibles en este momento.</Text>
                                )}
                            </View>
                        </View>
                    )}

                    {servicios.length > 0 && tipoEmpresa === 2 && (
                        <View style={styles.reservaCatalogoSection}>
                            <Text style={styles.detalleInfoSectionTitle}>Catálogo de Servicios</Text>
                            <SelectorCategorias
                                id={'id_categoria_servicio'}
                                nombre={'nombre_categoria_servicio'}
                                displayCategorias={displayCategoriasServicios}
                                activeCategory={activeCategoryServicios}
                                handleSeleccionarCategoria={handleSeleccionarCategoriaServicios}
                            />
                            <View style={styles.serviciosGrid}>
                                {serviciosFiltrados.map((servicio) => (
                                    <ServicioCard
                                        servicio={servicio}
                                        key={servicio.id_servicio_reservable_empresa}
                                        handleServicioClick={handleServicioClick}
                                    />
                                ))}
                                {serviciosFiltrados.length === 0 && (
                                    <Text style={styles.noProducts}>No hay servicios disponibles en este momento.</Text>
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    );
}


const SelectorCategorias = ({ id, nombre, displayCategorias, activeCategory, handleSeleccionarCategoria }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasProductos}>
            {displayCategorias.map((cat) => (
                <TouchableOpacity
                    key={cat[id]}
                    style={[styles.spanCategoriaProductos, activeCategory === cat[id] && styles.spanCategoriaProductosActive]}
                    onPress={() => handleSeleccionarCategoria(cat[id])}
                >
                    <Text style={{ color: activeCategory === cat[id] ? '#fff' : variables.colorTextPrimary, fontWeight: 'bold' }}>{cat[nombre]}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};