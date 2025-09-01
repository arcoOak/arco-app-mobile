// Adaptación de Login.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  appLogoHeader: {
    alignItems: 'center',
    marginBottom: VARS.spacingXl,
    marginTop: VARS.spacingLg,
    width: '100%',
  },
  appLogoHeaderImg: {
    maxWidth: 250,
    height: 'auto',
    // No filter en RN, usar shadow si es necesario
  },
  loginContainer: {
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 8,
    borderWidth: 1,
    borderColor: VARS.colorBorderPrimary,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
    maxWidth: 950,
    minHeight: 550,
    flexDirection: 'row',
  },
  loginImage: {
    flex: 1,
    // backgroundImage: require('../src/img/bg-pool3.jpg'), // Usar ImageBackground en el componente
    justifyContent: 'center',
    alignItems: 'center',
    padding: VARS.spacingLg,
  },
  loginFormArea: {
    flex: 1,
    paddingVertical: VARS.spacingXl,
    paddingHorizontal: VARS.spacingXxl,
    justifyContent: 'center',
  },
  loginFormTitle: {
    fontSize: VARS.fontSizeXxl,
    fontWeight: VARS.fontWeightBold,
    color: VARS.colorTextPrimary,
    marginBottom: VARS.spacingLg,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: VARS.spacingLg,
  },
  socialIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: VARS.colorSurfaceSecondary,
    color: VARS.colorTextSecondary,
    borderRadius: VARS.borderRadiusFull,
    fontSize: VARS.fontSizeMd,
    marginHorizontal: VARS.spacingXs,
  },
  formOptions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: VARS.spacingMd,
    fontSize: VARS.fontSizeSm,
    gap: VARS.spacingSm,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: VARS.spacingSm,
    color: VARS.colorTextTertiary,
  },
  loginButton: {
    width: '100%',
    padding: VARS.spacingMd,
    backgroundColor: VARS.colorBrandPrimary,
    color: VARS.colorTextButtonPrimary,
    borderWidth: 0,
    borderRadius: VARS.borderRadiusMd,
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightSemibold,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 4,
    marginTop: VARS.spacingMd,
  },
  // ...agrega más estilos según necesidad para los campos y enlaces
});

export default styles;
