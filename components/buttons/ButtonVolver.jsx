
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './ButtonVolver.styles';

/**
 * Un botón reutilizable que navega a una ruta específica.
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.navigation - Navigation prop de React Navigation.
 * @param {string} props.to - La ruta a la que navegar.
 * @param {string} [props.variant] - Variante de color: 'white' o default.
 */
const BotonVolver = ({ navigation, to, variant }) => {
    const buttonStyles = [styles.botonVolver, variant === 'white' && styles.botonVolverWhite];
    const textStyles = [styles.text, variant === 'white' && styles.textWhite];
    return (
        <TouchableOpacity style={buttonStyles} onPress={() => navigation.navigate(to)} activeOpacity={0.7}>
            <Icon name="circle-arrow-left" style={styles.icon} />
            <Text style={textStyles}>Volver</Text>
        </TouchableOpacity>
    );
};

export default BotonVolver;

