import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  content: {
    maxWidth: '80%',
    backgroundColor: light.colorSurfacePrimary,
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: light.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    alignItems: 'center',
    gap: 18,
    color: light.colorTextPrimary,
  },
  checkIcon: {
    color: '#27ae60',
    fontSize: 64,
    marginBottom: 10,
  },
  mensaje: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: light.colorTextPrimary,
  },
});
