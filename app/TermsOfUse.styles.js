// Adaptación de terms.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from '../src/css/VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  termsContainer: {
    backgroundColor: VARS.colorSurfaceSecondary,
    minHeight: '100%',
    paddingVertical: VARS.spacingXl,
    paddingHorizontal: VARS.spacingLg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  termsContent: {
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusMd,
    padding: VARS.spacingXl,
    maxWidth: 700,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    color: VARS.colorTextPrimary,
    fontFamily: 'Segoe UI',
  },
  termsTitle: {
    fontSize: VARS.fontSizeXxl,
    fontWeight: VARS.fontWeightBold,
    marginBottom: VARS.spacingLg,
    textAlign: 'center',
  },
  termsContentH2: {
    fontSize: VARS.fontSizeMd,
    marginTop: VARS.spacingLg,
    marginBottom: VARS.spacingXs,
    color: VARS.colorTextPrimary,
  },
  termsContentP: {
    fontSize: VARS.fontSizeBase,
    lineHeight: 24,
    marginBottom: VARS.spacingSm,
  },
  termsFooter: {
    marginTop: VARS.spacingXl,
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextSecondary,
    textAlign: 'right',
  },
});

export default styles;
