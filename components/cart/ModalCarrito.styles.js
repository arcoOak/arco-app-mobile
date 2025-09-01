import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  carritoFlotante: {
    backgroundColor: light.colorButtonPrimary,
    color: light.colorWhite,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: light.borderRadiusFull,
    width: 64, // 4rem aprox
    height: 64, // 4rem aprox
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32, // 2rem aprox
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    // cursor: pointer, // No aplica en RN
    // transition: 'transform 0.2s', // No aplica en RN
  },
  carritoContador: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    right: 8, // Ajuste visual
    height: 14,
    width: 14,
    color: light.colorButtonPrimary,
    borderRadius: light.borderRadiusFull,
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: light.colorWhite,
  },
  icon: {
    fontSize: 32,
    color: light.colorWhite,
  },
});
