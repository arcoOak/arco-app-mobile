
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SmallIconBox.styles';

const SmallIconBox = ({ titulo, icono = 'star', dato = '' }) => (
  <View style={styles.smallIconBox}>
    <Icon name={icono} style={styles.icon} />
    <View>
      <Text style={styles.title}>{titulo}</Text>
      {!!dato && <Text style={styles.data}>{dato}</Text>}
    </View>
  </View>
);

export default SmallIconBox;