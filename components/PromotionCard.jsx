

import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PromotionCardStyles from '../src/css/PromotionCard.styles';

const promoImages = [
    require('../src/img/proms/1.png'),
    require('../src/img/proms/2.png'),
    require('../src/img/proms/3.png'),
];

export default function PromotionCard() {
    const navigation = useNavigation();

    return (
        <View style={PromotionCardStyles.sliderSection}>
            <View style={PromotionCardStyles.promotionSectionHeader}>
                <Text style={PromotionCardStyles.promotionSectionTitle}>Promociones</Text>
                <TouchableOpacity
                    style={styles.seeAllButton}
                    onPress={() => navigation.navigate('Promociones')}
                    activeOpacity={0.85}
                >
                    <Text style={PromotionCardStyles.promotionSectionSeeAll}>Ver Todo</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={PromotionCardStyles.promotionSectionCarousel}
                contentContainerStyle={{ gap: 16 }}
            >
                {promoImages.map((img, idx) => (
                    <View key={idx} style={[PromotionCardStyles.promotionCard, { width: 220 }]}> 
                        <View style={PromotionCardStyles.promotionCardImageContainer}>
                            <Image
                                source={img}
                                style={[PromotionCardStyles.promotionCardImage, { height: 120 }]}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={PromotionCardStyles.promotionContent}>
                            <Text style={PromotionCardStyles.promotionCardCategory}>Categoría</Text>
                            <View style={PromotionCardStyles.promotionCardTitle}>
                                <Text style={PromotionCardStyles.promotionCardTitleH5}>Título Promo {idx + 1}</Text>
                            </View>
                            <View style={PromotionCardStyles.promotionPrice}>
                                <Text style={{ fontWeight: 'bold', color: '#1976d2' }}>$99.99</Text>
                            </View>
                            <Text style={PromotionCardStyles.promotionCardDescription}>
                                Descripción breve de la promoción {idx + 1}.
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    seeAllButton: {
        backgroundColor: '#1976d2',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginLeft: 8,
    },
});