// Adaptación de Login.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from '../src/css/VariablesBase.styles';

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
    width: 250,
    height: 80,
    resizeMode: 'contain',
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
    flexDirection: 'column',
  },
  loginImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: VARS.borderRadiusLg,
    borderTopRightRadius: VARS.borderRadiusLg,
    marginBottom: VARS.spacingMd,
  },
  loginFormArea: {
    flex: 1,
    paddingVertical: VARS.spacingMd,
    paddingHorizontal: VARS.spacingXl,
    justifyContent: 'center',
    gap: VARS.spacingSm,
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
    padding: VARS.spacingXs,
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
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: VARS.spacingSm,
  },
  input:{
    width: '80%',
    backgroundColor: VARS.colorSurfaceSecondary,
    paddingBlock: VARS.spacingSm,
    paddingHorizontal: VARS.spacingMd,
    borderRadius: VARS.borderRadiusMd,
    borderWidth: 1,
    borderColor: VARS.colorBorderPrimary,
  },


  loginButtonText: {
    width: '100%',
    color: '#fff',
    borderRadius: VARS.borderRadiusMd,
    fontSize: VARS.fontSizeLg,
    fontWeight: VARS.fontWeightBold,
    textAlign: 'center',
    paddingVertical: VARS.spacingSm,
  },
  
  
});

export default styles;
