import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  botonVolver: {
    zIndex: 10,
    backgroundColor: light.colorButtonVolver,
    color: light.colorWhite,
    borderWidth: 1,
    borderColor: light.colorBorderPrimary,
    borderRadius: light.borderRadiusPill,
    paddingVertical: light.spacingSm,
    paddingHorizontal: light.spacingMd,
    gap: light.spacingSm,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: light.fontSizeMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    fontSize: 29, // 1.8rem aprox
    color: light.colorWhite,
  },
  text: {
    fontSize: 19, // 1.2rem aprox
    color: light.colorWhite,
    fontWeight: '500',
  },
  botonVolverWhite: {
    backgroundColor: 'transparent',
    borderColor: light.colorWhite,
  },
  textWhite: {
    color: light.colorWhite,
  },
});
