// Adaptación de Wrapper.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: VARS.footerHeight,
    backgroundColor: VARS.colorSurfacePrimary,
    // No box-shadow en RN, usar shadow props si es necesario
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  floatingModalsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    flexDirection: 'row',
    gap: VARS.spacingSm,
  },
  wrapperUl: {
    flexDirection: 'row',
    width: 350,
  },
  wrapperLi: {
    position: 'relative',
    width: 70,
    height: 70,
    zIndex: 1,
  },
  wrapperA: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: VARS.fontWeightSemibold,
    textAlign: 'center',
  },
  wrapperIcon: {
    lineHeight: 70,
    fontSize: VARS.fontSizeLg,
    color: VARS.colorTextPrimary,
    textAlign: 'center',
    // transition no aplica en RN
  },
  wrapperIconActive: {
    transform: [{ translateY: -35 }],
    color: VARS.colorWhite,
  },
  wrapperSpan: {
    position: 'absolute',
    color: VARS.colorTextSecondary,
    fontSize: VARS.fontSizeXs,
    letterSpacing: 0.05,
    opacity: 0,
    marginTop: VARS.spacingSm,
  },
  wrapperSpanActive: {
    opacity: 1,
    transform: [{ translateY: 10 }],
  },
  indicator: {
    position: 'absolute',
    height: 70,
    width: 70,
    backgroundColor: VARS.colorButtonPrimary,
    borderRadius: VARS.borderRadiusFull,
    top: '-50%',
    borderWidth: VARS.footerIndicatorBorder,
    borderColor: '#f0f0ff',
    // transition no aplica en RN
  },
});

export default styles;
