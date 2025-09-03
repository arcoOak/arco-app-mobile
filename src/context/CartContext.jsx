
import React, { createContext, useState, useEffect ,useContext, useMemo } from 'react';
import { Platform } from 'react-native';
let AsyncStorage;
if (Platform.OS !== 'web') {
    AsyncStorage = require('@react-native-async-storage/async-storage').default;
}



export const CartContext = createContext(null); // Contexto

export const CartProvider = ({ children }) => {
    const [elementosCarrito, setElementosCarrito] = useState([]); // Almacena los productos en el carrito
    const [loading, setLoading] = useState(true); // Para saber si estamos cargando los datos iniciales
    


    // Cargar los datos del carrito desde almacenamiento persistente al iniciar la aplicación
    useEffect(() => {
        const loadCarrito = async () => {
            try {
                let carritoAlmacenado = null;
                if (Platform.OS === 'web') {
                    carritoAlmacenado = localStorage.getItem('carrito');
                } else if (AsyncStorage) {
                    carritoAlmacenado = await AsyncStorage.getItem('carrito');
                }
                if (carritoAlmacenado) {
                    setElementosCarrito(JSON.parse(carritoAlmacenado));
                }
            } catch (error) {
                console.error('Error al cargar el carrito desde almacenamiento persistente:', error);
                setElementosCarrito([]);
            } finally {
                setLoading(false);
            }
        };
        loadCarrito();
    }, []);


    // Guardar los datos del carrito en almacenamiento persistente cada vez que cambie
    useEffect(() => {
        const saveCarrito = async () => {
            if (!loading) {
                try {
                    if (Platform.OS === 'web') {
                        localStorage.setItem('carrito', JSON.stringify(elementosCarrito));
                    } else if (AsyncStorage) {
                        await AsyncStorage.setItem('carrito', JSON.stringify(elementosCarrito));
                    }
                } catch (error) {
                    console.error('Error al guardar el carrito:', error);
                }
            }
        };
        saveCarrito();
    }, [elementosCarrito, loading]);


    // Funciones para agregar y eliminar productos del carrito
    const addToCarrito = (producto, id_comercio) => {
        setElementosCarrito((prevCarrito) => {
            // Buscar si el producto de la misma tienda ya existe en el carrito
            const elementoExistente = prevCarrito.find(
                (ele) => ele.id_producto === producto.id_producto && ele.id_comercio === id_comercio
            );

            // Si el producto ya existe, solo incrementamos la cantidad
            if (elementoExistente) {
                return prevCarrito.map((ele) =>
                    ele.id_producto === producto.id_producto && ele.id_comercio === id_comercio
                        ? { ...ele, cantidad: ele.cantidad + 1 }
                        : ele
                );
            }
            
            // Si no existe, lo agregamos al carrito con cantidad 1
            return [...prevCarrito, { ...producto, id_comercio, cantidad: 1 }];
        });
    };
    
    const removeFromCarrito = (productId, id_comercio) => {
        setElementosCarrito((prevCarrito) =>
            prevCarrito.filter(
                (ele) => !(ele.id_producto === productId && ele.id_comercio === id_comercio)
            )
        );
    };

    const updateCantidad = (productId, id_comercio, valorCambio) => {
        setElementosCarrito((prevCarrito) =>
            prevCarrito
                .map((ele) => {
                    if (ele.id_producto === productId && ele.id_comercio === id_comercio) {
                        const nuevaCantidad = ele.cantidad + valorCambio;
                        return nuevaCantidad > 0 ? { ...ele, cantidad: nuevaCantidad } : null;
                    }
                    return ele;
                })
                .filter(Boolean) // Elimina los elementos nulos (productos con cantidad <= 0)
        );
    };


    const limpiarCarrito = async () => {
        setElementosCarrito([]); // Limpiar el carrito
        try {
            if (Platform.OS === 'web') {
                localStorage.removeItem('carrito');
            } else if (AsyncStorage) {
                await AsyncStorage.removeItem('carrito');
            }
        } catch (error) {
            console.error('Error al limpiar el carrito:', error);
        }
    };

    const isProductoEnCarrito = (productId, id_comercio) => {
        return elementosCarrito.some(ele => ele.id_producto === productId && ele.id_comercio === id_comercio);
    };

    const totalItems = useMemo(() => {
        return elementosCarrito.reduce((total, item) => total + item.cantidad, 0);
    }, [elementosCarrito]);
    
    return (
        <CartContext.Provider value={{ elementosCarrito, addToCarrito, removeFromCarrito, updateCantidad, limpiarCarrito, isProductoEnCarrito, totalItems,  loading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCarrito = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCarrito ha de ser utilizado en el contexto de CartProvider');
    }
    return context;
};
