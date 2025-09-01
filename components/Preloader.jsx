
import React, { useRef, useEffect } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

export default function Preloader() {
    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinAnim]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image
                source={require('../src/img/logo.png')}
                style={{ width: 80, height: 80, marginBottom: 24 }}
                accessibilityLabel="Cargando..."
            />
            <Animated.View
                style={{
                    width: 40,
                    height: 40,
                    borderWidth: 4,
                    borderColor: '#e0e0e0',
                    borderTopColor: '#1976d2',
                    borderRadius: 20,
                    marginTop: 8,
                    transform: [{ rotate: spin }],
                }}
            />
        </View>
    );
}