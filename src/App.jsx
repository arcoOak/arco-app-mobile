import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screen components (IMPORTANT: These must be converted to use React Native components like <View>, <Text>, etc.)
import Notifications_user from "./pages/Notificaciones/Notifications_user";
import PagarPendientes from "./pages/BilleteraHome/PagarPendientes";
import PaymentDetail from './pages/BilleteraHome/PaymentDetail';
import TransaccionIndividual from "./pages/BilleteraHome/TransaccionIndividual";
import Noticias from "./pages/Noticias/Noticias";
import NoticiasDetalle from "./pages/Noticias/NoticiasDetalle";
import EditarPerfil from "./pages/Perfil/EditarPerfil";
import BeneficiariosLista from './pages/Perfil/BeneficiariosLista';
import EspaciosDetalle from "./pages/Espacios/EspaciosDetalle";
import Comercios from "./pages/Comercio/Comercio";
import ComercioDetalle from './pages/Comercio/ComercioDetalle';
import Servicios from "./pages/Servicios/Servicios";
import ServiciosDetalle from './pages/Servicios/ServiciosDetalle';
import LecturaQr from "./pages/LecturaQR/LecturaQr";
import FAQPage from "./pages/Faqs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Reservas from "./pages/Reservas/Reservas";
import ReservasDetalle from "./pages/Reservas/ReservasDetalle";
import Login from "./Login";
import Preloader from "./components/Preloader";

// Importa las vistas de modales y el nuevo Tab Navigator
import VistaCarrito from "./components/cart/VistaCarrito";
import MainTabNavigator from "./navigation/MainTabNavigator";

// Import Contexts
import { useAuth, AuthProvider } from "./context/AuthContext";
import { CartProvider, useCarrito } from './context/CartContext';
import { NotificacionesProvider, useNotificaciones } from './context/NotificacionesContext';

const Stack = createNativeStackNavigator();

// Este componente contiene la lógica de navegación y decide qué pantallas mostrar.
function AppNavigator() {
    // Asumo que tu hook useAuth puede proveer un estado de carga `isLoading`
    const { isAuthenticated, user, isLoading } = useAuth();
    const { totalItems } = useCarrito();
    const { noVistasCount } = useNotificaciones();
    const [showInitialPreloader, setShowInitialPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInitialPreloader(false);
        }, 2000); // Muestra el preloader por 2 segundos
        return () => clearTimeout(timer);
    }, []);

    // Muestra el preloader mientras los contextos cargan o durante el tiempo inicial
    if (isLoading || showInitialPreloader) {
        return <Preloader />;
    }

    return (
        <NavigationContainer>
            {/* El Stack.Navigator ahora es el contenedor principal para todas las pantallas */}
            <Stack.Navigator>
                {isAuthenticated ? (
                    // Grupo de pantallas para usuarios autenticados.
                    // Incluye el TabNavigator y todas las pantallas a las que se puede navegar desde él.
                    <Stack.Group screenOptions={{ headerBackTitleVisible: false }}>
                        <Stack.Screen
                            name="App" // Pantalla principal que contiene las pestañas
                            component={MainTabNavigator}
                            options={({ navigation }) => ({
                                // Header personalizado para la pantalla principal
                                title: 'Arco App',
                                headerRight: () => (
                                    <React.Fragment>
                                        {noVistasCount > 0 && (
                                            <TouchableOpacity onPress={() => navigation.navigate('NotificationsUser')} style={{ marginRight: 15 }}>
                                                <Ionicons name="notifications" size={24} color="black" />
                                            </TouchableOpacity>
                                        )}
                                        {totalItems > 0 && (
                                            <TouchableOpacity onPress={() => navigation.navigate('VistaCarrito')}>
                                                <Ionicons name="cart" size={24} color="black" />
                                            </TouchableOpacity>
                                        )}
                                    </React.Fragment>
                                ),
                            })}
                        />
                        {/* Pantallas a las que se navega DESDE las pestañas */}
                        <Stack.Screen name="FAQPage" component={FAQPage} options={{ headerShown: true, title: 'FAQs' }} />
                        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: true, title: 'Política de Privacidad' }} />
                        <Stack.Screen name="TermsOfUse" component={TermsOfUse} options={{ headerShown: true, title: 'Términos de Uso' }} />
                        <Stack.Screen name="PagarPendientes" component={PagarPendientes} options={{ headerShown: true, title: 'Pagar Pendientes' }} />
                        <Stack.Screen name="PaymentDetail" component={PaymentDetail} options={{ headerShown: true, title: 'Detalle de Pago' }} />
                        <Stack.Screen name="TransaccionIndividual" component={TransaccionIndividual} options={{ headerShown: true, title: 'Transacción' }} />
                        <Stack.Screen name="Noticias" component={Noticias} options={{ headerShown: true, title: 'Noticias' }} />
                        <Stack.Screen name="NoticiasDetalle" component={NoticiasDetalle} options={{ headerShown: true, title: 'Detalle' }} />
                        <Stack.Screen name="EditarPerfil" options={{ headerShown: true, title: 'Editar Perfil' }}>
                            {(props) => <EditarPerfil {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen name="BeneficiariosLista" component={BeneficiariosLista} options={{ headerShown: true, title: 'Beneficiarios' }} />
                        <Stack.Screen name="EspaciosDetalle" component={EspaciosDetalle} options={{ headerShown: true, title: 'Detalle del Espacio' }} />
                        <Stack.Screen name="Comercios" component={Comercios} options={{ headerShown: true, title: 'Comercios' }} />
                        <Stack.Screen name="ComercioDetalle" component={ComercioDetalle} options={{ headerShown: true, title: 'Detalle del Comercio' }} />
                        <Stack.Screen name="Servicios" component={Servicios} options={{ headerShown: true, title: 'Servicios' }} />
                        <Stack.Screen name="ServiciosDetalle" component={ServiciosDetalle} options={{ headerShown: true, title: 'Detalle del Servicio' }} />
                        <Stack.Screen name="LecturaQr" component={LecturaQr} options={{ headerShown: true, title: 'Escanear QR' }} />
                        <Stack.Screen name="Reservas" component={Reservas} options={{ headerShown: true, title: 'Mis Reservas' }} />
                        <Stack.Screen name="ReservasDetalle" component={ReservasDetalle} options={{ headerShown: true, title: 'Detalle de Reserva' }} />

                        {/* Grupo de pantallas que se presentan como modales */}
                        <Stack.Group screenOptions={{ presentation: 'modal' }}>
                            <Stack.Screen name="VistaCarrito" component={VistaCarrito} options={{ title: 'Mi Carrito' }} />
                            <Stack.Screen name="NotificationsUser" component={Notifications_user} options={{ title: 'Notificaciones' }} />
                        </Stack.Group>
                    </Stack.Group>
                ) : (
                    // Pantallas para usuarios no autenticados
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={Login}  />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// El componente App principal ahora solo envuelve todo con los proveedores de contexto.
function App() {
    return (
        // AuthProvider debe envolver a los demás si estos dependen de la autenticación
        <AuthProvider>
            <NotificacionesProvider>
                <CartProvider>
                    <AppNavigator />
                </CartProvider>
            </NotificacionesProvider>
        </AuthProvider>
    );
}


StyleSheet.create({
    
});

export default App;