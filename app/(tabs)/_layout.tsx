

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Platform, View, Text } from 'react-native';
import type { BottomTabBarIconProps } from '@react-navigation/bottom-tabs';

let Tabs: any = null;
try {
  // Solo importa Tabs si no es web
  if (Platform.OS !== 'web') {
    Tabs = require('expo-router').Tabs;
  }
} catch (e) {
  Tabs = null;
}



export default function TabLayout() {
  const { user } = useAuth();


  if (!user) {
    return <Redirect href="/login" />;
  }

  if (Platform.OS === 'web' || !Tabs) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 18, color: '#333', textAlign: 'center', padding: 32 }}>
          La navegación por pestañas solo está disponible en la app móvil. Usa Expo Go o un emulador para probar la app completa.
        </Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: BottomTabBarIconProps) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }: BottomTabBarIconProps) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
