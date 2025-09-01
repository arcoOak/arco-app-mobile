
import React from 'react';
import { View } from 'react-native';
import styles from './Container.styles';

const Container = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default Container;