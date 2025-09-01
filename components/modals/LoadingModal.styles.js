import { StyleSheet } from 'react-native';
import Variables from '../../constants/VariablesBase.styles';

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  content: {
    backgroundColor: Variables.colorSurfacePrimary,
    paddingVertical: 32,
    paddingHorizontal: 40,
    borderRadius: Variables.borderRadiusLg,
    // boxShadow: Variables.shadowLg, // React Native: use elevation or shadow props if needed
    alignItems: 'center',
    flexDirection: 'column',
    gap: 18, // Only supported in RN >= 0.71, otherwise use marginBottom on children
    color: Variables.colorTextPrimary,
  },
  spinner: {
    borderWidth: 6,
    borderColor: '#f3f3f3',
    borderTopColor: '#4a69bd',
    borderRadius: Variables.borderRadiusFull,
    width: 64,
    height: 64,
    // Animation will be handled with Animated API
  },
  mensaje: {
    color: Variables.colorTextPrimary,
    marginTop: 10,
    fontSize: 16,
  },
});
