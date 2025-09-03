import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons'; // o FontAwesome, MaterialIcons, etc.

// Importa tus componentes de pantalla (deben ser componentes de React Native)
// Debes crear estos archivos de pantalla.
import Home from './Home';
import Espacios from './Espacios/Espacios';
import LecturaQr from './LecturaQR/LecturaQr';
import Comercio from './Comercio/Comercio';
import Perfil from './Perfil/Perfil';

// Importa tu Navbar adaptada a React Native
// Ya no es necesario importar Navbar aquí, el header se gestiona en App.jsx

const Tab = createBottomTabNavigator();

const menuItems = [
    { name: "Inicio", component: Home, icon: "home-alt-2" },
    { name: "Espacios", component: Espacios, icon: "calendar-alt" },
    { name: "QR", component: LecturaQr, icon: "qr-scan" },
    { name: "Comercios", component: Comercio, icon: "store" },
    { name: "Perfil", component: Perfil, icon: "user" },
];

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Se deshabilita el header del Tab.Navigator para usar el del Stack.Navigator principal en App.jsx.
                // Esto evita tener dos barras de navegación y centraliza su control.
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    const item = menuItems.find(item => item.name === route.name);
                    // Muestra un icono sólido (bxs) si está enfocado, si no, el regular (bx)
                    const iconName = focused ? `bxs-${item.icon}` : `bx-${item.icon}`;
                    return <Icon name={iconName} size={size} color={color} />;
                },
                // Colores para los íconos y etiquetas de la barra
                tabBarActiveTintColor: '#007AFF', // Un color activo de ejemplo
                tabBarInactiveTintColor: 'gray',
            })}
        >
            {menuItems.map((item) => (
                <Tab.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                    options={{
                        tabBarLabel: item.name // El texto debajo del icono
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}