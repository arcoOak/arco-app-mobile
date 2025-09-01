import React from 'react';
import { View } from 'react-native';
import styles from './ButtonsRow.styles';
import Button from './Button';

const ButtonsRow = ({ buttons }) => {
  return (
    <View style={styles.buttonsRow}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          onPress={button.onPress}
          className={button.className}
          disabled={button.disabled}
          big={button.big}
        >
          {button.label}
        </Button>
      ))}
    </View>
  );
};

export default ButtonsRow;