import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Button.styles';

const Button = ({ children, onPress, className = 'primary', disabled = false, big = false }) => {
  // Determinar estilos dinámicos
  const buttonStyles = [
    styles.button,
    styles[className],
    big && styles.big,
    disabled && styles.disabled,
  ];
  const textStyles = [
    { color: styles[className]?.color || styles.button.color },
    big && { fontSize: styles.big.fontSize },
    disabled && { color: styles.disabled.color },
  ];
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;