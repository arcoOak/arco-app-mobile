import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  container: {
    marginHorizontal: 'auto',
    padding: 32, // 2rem aprox
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    borderRadius: light.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 6,
    // transition: 'box-shadow 0.2s', // No aplica en RN
  },
});
