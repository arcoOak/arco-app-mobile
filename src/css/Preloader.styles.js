// Adaptación de Preloader.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  preloader: {
    width: '100%',
    height: '100%', // vh no existe, usar 100%
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: VARS.colorWhite,
  },
  preloaderImg: {
    width: 250,
    height: 90,
    resizeMode: 'contain',
  },
  preloaderIcn: {
    opacity: 0.75,
    width: 14,
    height: 14,
    // Animación: usar Animated API en React Native
  },
  preloaderCut: {
    position: 'absolute',
    width: 7,
    height: 14,
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
  preloaderDonutFake: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: VARS.borderRadiusFull,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    margin: 0,
  },
  preloaderDonut: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: '#000',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRadius: VARS.borderRadiusFull,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    margin: 0,
    // Animación: usar Animated API en React Native
  },
});

export default styles;
