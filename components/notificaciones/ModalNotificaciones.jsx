
import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './ModalNotificaciones.styles';

const ModalNotificaciones = ({ visible, onPress, cantidadNoVistas }) => {
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible && cantidadNoVistas > 0) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, { toValue: 1, duration: 75, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: -1, duration: 75, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 1, duration: 75, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 0, duration: 75, useNativeDriver: true }),
                ])
            ).start();
        } else {
            shakeAnim.stopAnimation();
            shakeAnim.setValue(0);
        }
    }, [visible, cantidadNoVistas]);

    if (!visible) return null;

    const shake = shakeAnim.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [-2, 0, 2],
    });

    return (
        <Animated.View
            style={[
                styles.flotante,
                cantidadNoVistas > 0 && { backgroundColor: '#FFC107' },
                cantidadNoVistas > 0 && { transform: [{ translateX: shake }] },
            ]}
        >
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={StyleSheet.absoluteFill}
                accessibilityLabel="Abrir notificaciones"
            >
                <Icon name="bell" size={32} color="white" />
                {/* Contador de notificaciones */}
                {cantidadNoVistas > 0 && (
                    <Animated.View style={styles.contador}>
                        <Icon name="circle" size={16} color="#fff" style={{ position: 'absolute', zIndex: -1 }} />
                        <Animated.Text style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 12 }}>{cantidadNoVistas}</Animated.Text>
                    </Animated.View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

export default ModalNotificaciones;