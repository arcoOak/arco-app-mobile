// Adaptación de Points.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  pointContainer: {
    width: '100%',
    height: 'auto',
    borderRadius: VARS.borderRadiusLg,
  },
  cardPoint: {
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusMd,
    padding: VARS.spacingLg,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: VARS.borderRadiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: VARS.spacingMd,
  },
  iconContainerGreen: {
    backgroundColor: VARS.colorSuccess,
  },
  iconContainerPurple: {
    backgroundColor: '#9C27B0',
  },
  icon: {
    color: VARS.colorWhite,
    fontSize: VARS.fontSizeLg,
  },
  textContent: {
    flexGrow: 1,
  },
  label: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextSecondary,
    marginBottom: VARS.spacingXs,
  },
  value: {
    fontSize: VARS.fontSizeXl,
    fontWeight: VARS.fontWeightBold,
    color: VARS.colorTextPrimary,
  },
  percentage: {
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightBold,
    color: VARS.colorSuccess,
    marginLeft: 'auto',
    marginRight: VARS.spacingMd,
  },
  updateButton: {
    paddingVertical: VARS.spacingSm,
    paddingHorizontal: VARS.spacingLg,
    borderWidth: 0,
    borderRadius: VARS.borderRadiusLg,
    fontSize: VARS.fontSizeSm,
    fontWeight: VARS.fontWeightBold,
  },
  updateButtonLight: {
    backgroundColor: VARS.colorSurfaceSecondary,
    color: VARS.colorTextPrimary,
  },
  updateButtonDark: {
    backgroundColor: VARS.colorBlack,
    color: VARS.colorWhite,
  },
  reminderMessage: {
    backgroundColor: '#e0e0f8',
    color: '#5d3f6a',
    padding: VARS.spacingMd,
    borderRadius: VARS.borderRadiusMd,
    fontSize: VARS.fontSizeSm,
    textAlign: 'center',
    lineHeight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default styles;
