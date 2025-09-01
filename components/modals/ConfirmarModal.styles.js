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
    zIndex: 10000,
  },
  content: {
    width: '80%',
    backgroundColor: light.colorSurfaceSecondary,
    padding: light.spacingLg,
    borderRadius: light.borderRadiusLg,
    borderWidth: 1,
    borderColor: light.colorBorderSecondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    alignItems: 'center',
    gap: 18,
  },
  icon: {
    color: '#f1c40f',
    fontSize: 54,
    marginBottom: 8,
  },
  mensaje: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: light.colorTextSecondary,
    marginVertical: 8,
  },
  botones: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 10,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: light.borderRadiusMd,
    fontSize: 16,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 4,
  },
  btnSi: {
    backgroundColor: '#27ae60',
    color: '#fff',
  },
  btnNo: {
    backgroundColor: '#e74c3c',
    color: '#fff',
  },
});
