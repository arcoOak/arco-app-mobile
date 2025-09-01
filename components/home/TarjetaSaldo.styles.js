import { StyleSheet, Dimensions } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    borderRadius: light.borderRadiusLg,
    maxWidth: 600,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slide: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '90%',
    maxWidth: 800,
    minWidth: 250,
    height: '50%',
    minHeight: 230,
    maxHeight: 500,
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    borderRadius: light.borderRadiusLg,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // Animaciones y transformaciones se manejan en el componente
  },
  // No se puede exportar keyframes ni media queries, pero puedes ajustar height con Dimensions
});
