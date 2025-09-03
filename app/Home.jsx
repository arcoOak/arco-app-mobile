
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

import HomeStyles from '../src/css/Home.styles';
import RedesSocialesHome from '../components/RedesSocialesHome';

export default function Home() {
    const { user, clubInfo } = useAuth();
    if (!user) {
        return (
            <View style={HomeStyles.app}>
                <Text>Cargando usuario...</Text>
            </View>
        );
    }
    return (
        <ScrollView style={HomeStyles.app} contentContainerStyle={{ paddingBottom: 32 }}>
            <View style={HomeStyles.appHeader}>
                
                    <Text style={HomeStyles.homeBienvenidaText}>Bienvenido,</Text>
                    <Text style={HomeStyles.username}>{(user?.nombre || '') + ' ' + (user?.apellido || '')}</Text>
                
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
