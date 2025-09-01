import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  button: {
    borderRadius: light.borderRadiusMd,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 8, // 0.4em aprox
    paddingHorizontal: 16, // 0.8em aprox
    fontSize: 16, // 1em
    fontWeight: '500',
    fontFamily: light.fontFamilySans,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: light.colorButtonPrimary,
    color: light.colorTextButtonPrimary,
    transitionDuration: `${light.transitionDuration}s`,
  },
  disabled: {
    backgroundColor: light.colorButtonNeutral,
    color: light.colorTextButtonNeutral,
    borderColor: light.colorBorderPrimary,
  },
  primary: {
    backgroundColor: light.colorButtonPrimary,
    color: light.colorTextButtonPrimary,
    borderColor: light.borderColor,
  },
  secondary: {
    backgroundColor: light.colorButtonSecondary,
    color: light.colorTextButtonSecondary,
    borderColor: light.borderColor,
  },
  tertiary: {
    backgroundColor: light.colorButtonTertiary,
    color: light.colorTextButtonTertiary,
    borderColor: light.borderColor,
  },
  neutral: {
    backgroundColor: light.colorButtonNeutral,
    color: light.colorTextButtonNeutral,
    borderColor: light.borderColor,
    fontWeight: '600',
  },
  big: {
    fontSize: 20, // 1.25rem
    paddingVertical: 12, // 0.6em aprox
    paddingHorizontal: 24, // 1.2em aprox
  },
});
