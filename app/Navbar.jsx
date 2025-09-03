// src/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/images/logo.png';
import logoDark from '../assets/images/logo-dark.png';
import { useAuth } from '../src/context/AuthContext';
import NavbarStyles from './Navbar.styles';

// Es una buena práctica definir constantes que no dependen del estado o props fuera del componente.
// Esto evita que se recreen en cada renderizado.
const ownItems = [
    { name: 'Inicio', icon: 'home', path: '/' },
    { name: 'Mis Reservas', icon: 'calendar_month', path: '/reservas' },
    { name: 'Mis Servicios', icon: 'work', path: '/mis-servicios' },
    { name: 'Mis Compras', icon: 'shopping_cart', path: '/compras' },
    
];

const menuItems = [
    { name: 'Espacios', icon: 'location_on', path: '/espacios' },
    { name: 'QR', icon: 'qr_code_scanner', path: '/qr' },
    { name: 'Noticias', icon: 'article', path: '/noticias' },
    { name: 'Comercios', icon: 'storefront', path: '/comercios' },
    { name: 'Servicios', icon: 'build', path: '/servicios' },
    { name: 'Beneficiarios', icon: 'group', path: '/perfil/beneficiarios' },
    { name: 'Ajustes', icon: 'settings', path: '/perfil' },
];




const Navbar = () => {
    const navigation = useNavigation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [activeMenuItem, setActiveMenuItem] = useState('Inicio');
    const { isDarkTheme, toggleTheme } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    const getThemeIcon = () => (isDarkTheme ? 'light-mode' : 'dark-mode');

    const handleSeleccionarBoton = (item) => {
        setActiveMenuItem(item.name);
        navigation.navigate(item.path);
        setIsSidebarCollapsed(true);
    };

    return (
        <View>
            <View style={NavbarStyles.titleHome}>
                <View style={NavbarStyles.titleHomeSide}>
                    <TouchableOpacity style={NavbarStyles.sidebarToggle} onPress={toggleSidebar}>
                        <Icon name="menu" size={28} color="#1976d2" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Sidebar */}
            { !isSidebarCollapsed && (
            <View style={[NavbarStyles.sidebar, isSidebarCollapsed && NavbarStyles.sidebarCollapsed]}>
                <View style={NavbarStyles.sidebarHeader}>
                    <Image source={logo} style={NavbarStyles.headerLogo} />
                    <TouchableOpacity style={NavbarStyles.sidebarToggle} onPress={toggleSidebar}>
                        <Icon name="close" size={28} color="#1976d2" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={NavbarStyles.sidebarContent}>
                    {/* Search Form */}
                    <View style={NavbarStyles.searchForm}>
                        <Icon name="search" size={22} color="#888" />
                        <TextInput
                            style={NavbarStyles.searchInput}
                            placeholder="Buscar..."
                            placeholderTextColor="#888"
                        />
                    </View>
                    {/* Own Sidebar Menu */}
                    <View style={NavbarStyles.menuList}>
                        {ownItems.map((item) => (
                            <TouchableOpacity
                                key={item.name}
                                style={[NavbarStyles.menuLink, activeMenuItem === item.name && NavbarStyles.menuLinkActive]}
                                onPress={() => handleSeleccionarBoton(item)}
                                activeOpacity={0.85}
                            >
                                <Icon name={item.icon} size={22} color={activeMenuItem === item.name ? '#fff' : '#1976d2'} />
                                <Text style={NavbarStyles.menuLabel}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 12 }} />
                    {/* Sidebar Menu */}
                    <View style={NavbarStyles.menuList}>
                        {menuItems.map((item) => (
                            <TouchableOpacity
                                key={item.name}
                                style={[NavbarStyles.menuLink, activeMenuItem === item.name && NavbarStyles.menuLinkActive]}
                                onPress={() => handleSeleccionarBoton(item)}
                                activeOpacity={0.85}
                            >
                                <Icon name={item.icon} size={22} color={activeMenuItem === item.name ? '#fff' : '#1976d2'} />
                                <Text style={NavbarStyles.menuLabel}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                {/* Sidebar Footer */}
                <View style={NavbarStyles.sidebarFooter}>
                    <TouchableOpacity style={NavbarStyles.themeToggle} onPress={toggleTheme} activeOpacity={0.85}>
                        <View style={NavbarStyles.themeLabel}>
                            <Icon name={getThemeIcon()} size={22} color="#1976d2" />
                            <Text style={NavbarStyles.themeText}>Modo Oscuro</Text>
                        </View>
                        <View style={NavbarStyles.themeToggleTrack}>
                            <View style={NavbarStyles.themeToggleIndicator} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        </View>
    );
};

export default Navbar;