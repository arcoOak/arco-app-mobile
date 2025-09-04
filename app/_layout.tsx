
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { NotificacionesProvider } from '../src/context/NotificacionesContext';
import { CartProvider } from '../src/context/CartContext';
import Footer from '../components/Footer';

import { ImageBackground } from 'react-native';

const backgroundDomexLight = require('../assets/images/background-light.jpg');
const backgroundDomexDark = require('../assets/images/background-dark.jpg');


function ThemedBackgroundWrapper({ children }) {
  const { isDarkTheme } = useAuth();
  return (
    <ImageBackground
      source={isDarkTheme ? backgroundDomexDark : backgroundDomexLight}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotificacionesProvider>
        <CartProvider>
          <ThemedBackgroundWrapper>
            <Stack
              screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <Footer />
            <StatusBar style="auto" />
          </ThemedBackgroundWrapper>
        </CartProvider>
      </NotificacionesProvider>
    </AuthProvider>
  );
}
