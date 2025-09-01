
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import climaService from '../src/services/clima.service';
import { useAuth } from '../src/context/AuthContext';
import styles from './ClimaHome.styles';

const getDayName = (dateString) => {
    const date = new Date(dateString);
    const utcDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('es-ES', options).format(utcDate).slice(0, 3).toUpperCase();
};

const getWeatherIcon = (precipitacion, temperatura) => {
    if (precipitacion > 60) return '🌧️';
    if (precipitacion > 30) return '🌦️';
    if (temperatura < 15) return '☁️';
    return '☀️';
};

const ClimaSemanal = () => {
    const [climaPorDia, setClimaPorDia] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchClima = async () => {
            try {
                const data = await climaService.getClimaSemanal(user.id_club);
                const grouped = data.reduce((acc, item) => {
                    const date = item.fecha.split('T')[0];
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(item);
                    return acc;
                }, {});
                const sortedDays = Object.keys(grouped).sort();
                const processedData = sortedDays.map(day => grouped[day].sort((a, b) => a.hora.localeCompare(b.hora)));
                setClimaPorDia(processedData.slice(0, 7));
                setLoading(false);
            } catch (err) {
                setError('No se pudo cargar la información del clima.');
                setLoading(false);
            }
        };
        fetchClima();
    }, []);

    if (loading) {
        return <Text style={{ textAlign: 'center', marginVertical: 20 }}>Cargando clima...</Text>;
    }
    if (error) {
        return <Text style={{ textAlign: 'center', marginVertical: 20 }}>{error}</Text>;
    }
    if (!climaPorDia || climaPorDia.length === 0) {
        return <Text style={{ textAlign: 'center', marginVertical: 20 }}>No hay datos de clima disponibles.</Text>;
    }

    const selectedDayData = climaPorDia[selectedDayIndex];

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabs}
            >
                {climaPorDia.map((day, index) => (
                    <TouchableOpacity
                        key={day[0].fecha}
                        style={[
                            styles.tab,
                            index === selectedDayIndex && styles.tabActive,
                        ]}
                        onPress={() => setSelectedDayIndex(index)}
                        activeOpacity={0.8}
                    >
                        <Text style={index === selectedDayIndex ? { fontWeight: 'bold', color: '#007bff' } : {}}>
                            {getDayName(day[0].fecha)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.forecast}
            >
                {selectedDayData?.map((forecast) => (
                    <View key={forecast.hora} style={styles.forecastItem}>
                        <Text style={styles.forecastTime}>{forecast.hora.substring(0, 5)}</Text>
                        <Text style={styles.forecastIcon}>{getWeatherIcon(forecast.precipitacion_porcentaje, forecast.temperatura)}</Text>
                        <Text style={styles.forecastTemp}>{Math.round(forecast.temperatura)}°C</Text>
                        <Text style={styles.forecastPrecip}>💧 {forecast.precipitacion_porcentaje}%</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const ClimaHome = () => {
    return (
        <View style={styles.home}>
            <Text style={styles.title}>Clima Semanal</Text>
            <ClimaSemanal />
        </View>
    );
};

export default ClimaHome;