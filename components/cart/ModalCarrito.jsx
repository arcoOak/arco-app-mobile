
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './ModalCarrito.styles';

const ModalCarrito = ({ visible, cantidad, onPress }) => {
    if (!visible) return null;
    return (
        <TouchableOpacity style={styles.carritoFlotante} onPress={onPress} activeOpacity={0.8}>
            <Icon name="bag-shopping" style={styles.icon} />
            <View style={styles.carritoContador}>
                <Text style={{ color: styles.carritoContador.color, fontWeight: '600', fontSize: 12 }}>{cantidad}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ModalCarrito;