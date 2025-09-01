// Adaptación de Perfil.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  exitButtonIcon: {
    color: VARS.colorTextContrast,
  },
  bx: {
    color: VARS.colorTextPrimary,
  },
  pP: {
    paddingHorizontal: VARS.spacingXl,
    paddingVertical: 0,
  },
  profileInfo: {
    paddingVertical: VARS.spacingSm,
    paddingHorizontal: VARS.spacingMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
    height: 'auto',
    borderRadius: VARS.borderRadiusLg,
    marginBottom: VARS.spacingXl,
    backgroundColor: VARS.colorWhite,
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  labelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: VARS.fontWeightMedium,
  },
  labelInfoIcon: {
    fontSize: 20,
    marginRight: VARS.spacingLg,
  },
  b0: {
    borderWidth: 0,
  },
  pass: {
    color: '#03206f',
  },
  exit: {
    color: '#c31313',
  },
});

export default styles;
