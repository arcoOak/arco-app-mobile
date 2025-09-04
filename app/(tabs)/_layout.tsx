import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import { Platform, View, Text } from 'react-native';
import MainTabNavigator from '../MainTabNavigator';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 18, color: '#333', textAlign: 'center', padding: 32 }}>
          La navegación por pestañas solo está disponible en la app móvil. Usa Expo Go o un emulador para probar la app completa.
        </Text>
      </View>
    );
  }

  return <MainTabNavigator />;
}
