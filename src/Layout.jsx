
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCarrito } from './context/CartContext';
import VistaCarrito from '../components/cart/VistaCarrito';
import ModalCarrito from '../components/cart/ModalCarrito';
import { useNotificaciones } from './context/NotificacionesContext';
import VistaNotificaciones from '../components/notificaciones/VistaNotificaciones';
import ModalNotificaciones from '../components/notificaciones/ModalNotificaciones';
import Navbar from './pages/Navbar';
import WrapperStyles from './css/Wrapper.styles';


export default function Layout() {
    const navigation = useNavigation();
    const route = useRoute();
    const [activeIndex, setActiveIndex] = useState(0);
    const { elementosCarrito, totalItems } = useCarrito();
    const [carritoVisible, setCarritoVisible] = useState(false);
    const { notificaciones, noVistasCount } = useNotificaciones();
    const [notificacionesVisible, setNotificacionesVisible] = useState(false);

    const menuItems = [
        { icon: 'house', label: 'Inicio', path: 'Home' },
        { icon: 'calendar', label: 'Espacios', path: 'Espacios' },
        { icon: 'qrcode', label: 'QR', path: 'QR' },
        { icon: 'store', label: 'Comercios', path: 'Comercios' },
        { icon: 'user', label: 'Perfil', path: 'Perfil' },
    ];

    useEffect(() => {
        const index = menuItems.findIndex(item => route.name === item.path);
        if (index !== -1) setActiveIndex(index);
    }, [route.name]);

    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <View style={WrapperStyles.floatingModalsContainer}>
                <ModalCarrito visible={totalItems > 0} cantidad={totalItems} onPress={() => setCarritoVisible(!carritoVisible)} />
                <ModalNotificaciones cantidadNoVistas={noVistasCount} visible={notificaciones.length > 0} onPress={() => setNotificacionesVisible(!notificacionesVisible)} />
            </View>

            {carritoVisible && <VistaCarrito onClose={() => setCarritoVisible(false)} />}
            {notificacionesVisible && <VistaNotificaciones onClose={() => setNotificacionesVisible(false)} />}

            <Navbar />

            <View style={{ flex: 1, paddingBottom: 80 }}>
                {/* Aquí iría el contenido principal, por ejemplo, children o un Stack.Navigator */}
            </View>

            <View style={WrapperStyles.wrapper}>
                <View style={WrapperStyles.wrapperUl}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={WrapperStyles.wrapperLi}
                            onPress={() => navigation.navigate(item.path)}
                            activeOpacity={0.85}
                        >
                            <View style={WrapperStyles.wrapperA}>
                                <Icon
                                    name={item.icon}
                                    size={32}
                                    color={activeIndex === index ? '#fff' : '#1976d2'}
                                    style={[
                                        WrapperStyles.wrapperIcon,
                                        activeIndex === index && WrapperStyles.wrapperIconActive,
                                    ]}
                                />
                                <Text
                                    style={[
                                        WrapperStyles.wrapperSpan,
                                        activeIndex === index && WrapperStyles.wrapperSpanActive,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={WrapperStyles.indicator} />
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    <Text style={styles.footerLink} onPress={() => navigation.navigate('PrivacyPolicy')}>Política de Privacidad</Text>
                    {' | '}
                    <Text style={styles.footerLink} onPress={() => navigation.navigate('TermsOfUse')}>Términos de Uso</Text>
                    {' | '}
                    <Text style={styles.footerLink} onPress={() => navigation.navigate('FAQPage')}>FAQs</Text>
                </Text>
                <Text style={styles.footerText}>© 2025 Oak Tree C.A.</Text>
                <Text style={styles.footerText}>Todos los derechos reservados.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerText: {
        color: '#888',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 2,
    },
    footerLink: {
        color: '#1976d2',
        textDecorationLine: 'underline',
    },
});
