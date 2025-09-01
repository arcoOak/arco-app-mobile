
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import NewsCard from './NewsCard';
import { useAuth } from '../src/context/AuthContext';
import noticiasService from '../src/services/noticias.service';
import Button from './buttons/Button';
import placeholder_1 from '../img/news/placeholder_1.jpg';
import placeholder_2 from '../img/news/placeholder_2.jpg';
import placeholder_3 from '../img/news/placeholder_3.jpg';
import placeholder_4 from '../img/news/placeholder_4.jpg';

const NewsSection = ({ navigation }) => {
    const { user } = useAuth();
    const [ultimasNoticias, setUltimasNoticias] = useState([]);

    useEffect(() => {
        const fetchUltimasNoticias = async () => {
            try {
                const noticias = await noticiasService.getUltimasNoticias(user.id_club);
                setUltimasNoticias(noticias);
            } catch (error) {
                setUltimasNoticias([]);
            }
        };
        if (user) {
            fetchUltimasNoticias();
        }
    }, [user]);

    const handleNavigate = (id) => {
        navigation && navigation.navigate('NoticiasDetalle', { id });
    };

    const getPlaceholder = (id_categoria) => {
        if (id_categoria == 1) return placeholder_1;
        if (id_categoria == 2) return placeholder_2;
        if (id_categoria == 3) return placeholder_3;
        if (id_categoria == 4) return placeholder_4;
        return '';
    };

    return (
        <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Noticias Recientes</Text>
                <Button onPress={() => navigation && navigation.navigate('NoticiasLista')} type="primary">
                    Ver Todo
                </Button>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row', paddingLeft: 4 }}
            >
                {ultimasNoticias.map(news => (
                    <NewsCard
                        key={news.id_noticia}
                        categoria={news.nombre_categoria_noticia}
                        titulo={news.titulo}
                        autor={news.nombre_autor}
                        imageUrl={news.imageUrl || getPlaceholder(news.id_categoria)}
                        imageAlt={news.titulo}
                        onClick={() => handleNavigate(news.id_noticia)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default NewsSection;