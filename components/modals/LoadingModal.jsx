
import React, { useRef, useEffect } from 'react';
import { Modal, View, Text, Animated, Easing } from 'react-native';
import styles from './LoadingModal.styles';

const LoadingModal = ({ visible = false, mensaje = "Cargando..." }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.stopAnimation();
      spinAnim.setValue(0);
    }
  }, [visible]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
          <Text style={styles.mensaje}>{mensaje}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;