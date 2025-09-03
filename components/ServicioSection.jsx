
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import TrainerCard from './TrainerCard';
import { useAuth } from '../src/context/AuthContext';
import serviciosService from '../src/services/servicios.service';
import servicioImagePlaceholder from '../assets/images/comercio_placeholder.webp';
import Button from './buttons/Button';

const ServicioSection = ({ navigation }) => {
    const [servicios, setServicios] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await serviciosService.getHomeServicios(user.id_club);
                setServicios(response || []);
            } catch (error) {
                // Manejo de error opcional
            }
        };
        if (user) {
            fetchServicios();
        }
    }, [user]);

    const handleNavigate = (id) => {
        navigation && navigation.navigate('ServicioDetalle', { id });
    };

    return (
        <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Servicios Disponibles</Text>
                <Button onPress={() => navigation && navigation.navigate('ServiciosLista')} type="primary">
                    Ver Todo
                </Button>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row', paddingLeft: 4 }}
            >
                {servicios.map(data => (
                    <TrainerCard
                        key={data.id_servicio_reservable}
                        sport={data.nombre_categoria_servicio}
                        name={data.nombre_servicio_reservable}
                        description={data.descripcion}
                        imageUrl={data.imageUrl || servicioImagePlaceholder}
                        imageAlt={data.nombre_categoria_servicio}
                        onClick={() => handleNavigate(data.id_servicio_reservable)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default ServicioSection;