// Adaptación de CreditCard.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  creditCard: {
    width: '100%',
    height: '100%',
    borderRadius: VARS.borderRadiusLg,
    padding: VARS.spacingLg,
    color: VARS.colorTextContrast,
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: VARS.fontFamilySans,
    // background gradients se aplican con expo-linear-gradient o similar
    // backgroundColor: VARS.colorBrandPrimary,
    // textShadow: '1px 1px 2px rgba(0,0,0,0.2)', // No soportado directamente
  },
  creditCardGreen: {
    // Usar con LinearGradient
  },
  creditCardBlue: {
    // Usar con LinearGradient
  },
  creditCardBrown: {
    // Usar con LinearGradient
  },
  creditCardOrange: {
    // Usar con LinearGradient
  },
  creditCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  creditCardChip: {
    height: 35,
    borderRadius: VARS.borderRadiusSm,
    color: VARS.colorTextContrast,
    // textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  },
  creditCardBankName: {
    fontSize: VARS.fontSizeLg,
    fontWeight: VARS.fontWeightBold,
    letterSpacing: 1,
    color: VARS.colorTextContrast,
  },
  creditCardNumber: {
    textAlign: 'left',
    fontWeight: VARS.fontWeightMedium,
    fontSize: VARS.fontSizeXxl,
    color: VARS.colorTextContrast,
  },
  creditCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    fontSize: VARS.fontSizeLg,
  },
  creditCardHolderLabel: {
    fontSize: VARS.fontSizeXs,
    opacity: 0.7,
    marginBottom: VARS.spacingXs,
    color: VARS.colorTextContrast,
  },
  creditCardExpiryLabel: {
    fontSize: VARS.fontSizeXs,
    opacity: 0.7,
    marginBottom: VARS.spacingXs,
    color: VARS.colorTextContrast,
  },
  creditCardHolderName: {
    fontSize: VARS.fontSizeBase,
    fontWeight: VARS.fontWeightMedium,
    letterSpacing: 0.5,
    margin: 0,
    color: VARS.colorTextContrast,
  },
  creditCardExpiryDate: {
    fontSize: VARS.fontSizeBase,
    fontWeight: VARS.fontWeightMedium,
    letterSpacing: 0.5,
    margin: 0,
    color: VARS.colorTextContrast,
  },
  creditCardLogo: {
    width: 60,
    height: 24,
    opacity: 0.9,
    resizeMode: 'contain',
  },
});

export default styles;
