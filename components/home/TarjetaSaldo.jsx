
import React, { useRef, useState } from 'react';
import { View, Animated, TouchableOpacity, Dimensions } from 'react-native';
import CreditCard from '../CreditCard';
import styles from './TarjetaSaldo.styles';
import { useAuth } from '../../src/context/AuthContext';

const cardData = [
    {
        id: 'card_1',
        color: 'credit-card--blue',
        iconChip: '../src/img/cards/chip.png',
        iconVisa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/640px-Visa_Inc._logo.svg.png',
    },
    {
        id: 'card_2',
        color: 'credit-card--brown',
        iconChip: '../src/img/cards/chip.png',
        iconVisa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/640px-Visa_Inc._logo.svg.png',
    },
];

const animationSpeed = 500;

const TarjetaSaldo = () => {
    const { user, saldoBilletera } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handleSlide = () => {
        const nextIndex = (currentIndex + 1) % cardData.length;
        Animated.timing(animatedValue, {
            toValue: nextIndex,
            duration: animationSpeed,
            useNativeDriver: true,
        }).start(() => {
            setCurrentIndex(nextIndex);
            animatedValue.setValue(0);
        });
    };

    return (
        <View style={styles.container}>
            {cardData.map((card, idx) => {
                const isActive = idx === currentIndex;
                const zIndex = cardData.length - idx;
                const opacity = isActive ? 1 : 0.6;
                const translateY = isActive ? 0 : 30 * (idx - currentIndex);
                return (
                    <Animated.View
                        key={card.id}
                        style={[
                            styles.slide,
                            {
                                zIndex,
                                opacity,
                                transform: [
                                    { translateY: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [translateY, 0],
                                        }) },
                                ],
                            },
                        ]}
                    >
                        <TouchableOpacity activeOpacity={0.9} onPress={handleSlide} style={{ width: '100%', height: '100%' }}>
                            <CreditCard
                                user={user}
                                saldo={saldoBilletera}
                                cardColorClass={card.color}
                                iconChip={card.iconChip}
                                iconVisa={card.iconVisa}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                );
            })}
        </View>
    );
};

export default TarjetaSaldo;