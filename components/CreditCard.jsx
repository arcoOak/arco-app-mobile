
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import styles from '../src/css/CreditCard.styles';

const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
    }).format(monto);
};

const CreditCard = ({ user, saldo, cardColorClass, iconChip, iconVisa }) => {
    const { saldoBilletera } = useAuth();

    // Color de fondo: usar LinearGradient si cardColorClass es relevante
    return (
        <View style={[styles.creditCard, styles[cardColorClass]]}>
            <View style={styles.creditCardTop}>
                <Text style={styles.creditCardChip}>Socio {user.nombre_tipo_socio}</Text>
            </View>
            <View style={styles.creditCardNumber}>
                <Text style={styles.creditCardNumber}>{formatearMonto(saldoBilletera)}</Text>
            </View>
            <View style={styles.creditCardBottom}>
                <Text style={styles.creditCardHolderName}>
                    {user.nombre} {user.apellido}
                </Text>
                <Image source={typeof iconVisa === 'string' ? { uri: iconVisa } : iconVisa} style={styles.creditCardLogo} resizeMode="contain" />
            </View>
        </View>
    );
};

export default CreditCard;