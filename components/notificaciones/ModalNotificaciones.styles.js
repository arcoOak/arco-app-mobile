import { StyleSheet } from 'react-native';
import Variables from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  flotante: {
    position: 'relative',
    backgroundColor: Variables.colorButtonPrimary,
    color: 'white',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: Variables.borderRadiusFull,
    width: 64, // 4rem
    height: 64, // 4rem
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32, // 2rem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    // cursor: pointer, // not needed in RN
    // transition: handled by Animated
  },
  flotantePressed: {
    transform: [{ scale: 1.1 }],
  },
  contador: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    right: 8, // approx (50% - 0.45rem) from right
    height: 14,
    width: 14,
    color: Variables.colorButtonPrimary,
    borderRadius: Variables.borderRadiusFull,
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  tieneNotificaciones: {
    // handled by Animated shake
  },
});
