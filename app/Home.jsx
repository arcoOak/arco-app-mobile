
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import TarjetaPendientes from '../components/home/TarjetaPendientes';
import TarjetaSaldo from '../components/home/TarjetaSaldo';
import TarjetaRecargar from '../components/home/TarjetaRecargar';
import TarjetaProgress from '../components/home/TarjetaProgress';
import TransacctionSection from '../components/TransacctionSection';
import NewsSection from '../components/NewsSection';
import ServicioSection from '../components/ServicioSection';
import PromotionCard from '../components/PromotionCard';
import ClimaHome from '../components/ClimaHome';
import HorarioHome from '../components/HorarioHome';
import RedesSocialesHome from '../components/RedesSocialesHome';
import HomeComponentsStyles from '../src/css/HomeComponents.styles';
import HomeCarouselStyles from '../src/css/HomeCarousel.styles';

export default function App() {
    const { user, clubInfo } = useAuth();
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f7' }} contentContainerStyle={{ paddingBottom: 32 }}>
            <View style={{ ...HomeCarouselStyles.header, marginTop: 16 }}>
                <View style={{ flex: 1 }}>
                    <Text style={HomeComponentsStyles.welcomeText}>Bienvenido,</Text>
                    <Text style={HomeComponentsStyles.userName}>{user.nombre + ' ' + user.apellido}</Text>
                </View>
            </View>
            <TarjetaPendientes />
            <TarjetaSaldo />
            <TarjetaRecargar />
            <TarjetaProgress percentage={43} />
            <TransacctionSection />
            <View style={{ marginTop: 12 }}>
                <NewsSection />
                <ServicioSection />
                <PromotionCard />
                <ClimaHome />
                <HorarioHome clubInfo={clubInfo} />
                <RedesSocialesHome />
            </View>
        </ScrollView>
    );
}
