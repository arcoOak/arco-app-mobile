// Adaptación de Faqs.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  faqContainer: {
    backgroundColor: VARS.colorSurfaceSecondary,
    minHeight: '100%',
    paddingVertical: VARS.spacingXl,
    paddingHorizontal: VARS.spacingLg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  faqContent: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  faqTitle: {
    fontSize: VARS.fontSizeXxl,
    fontWeight: VARS.fontWeightBold,
    textAlign: 'center',
    marginBottom: VARS.spacingXl,
    color: VARS.colorTextPrimary,
  },
  faqItem: {
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusMd,
    padding: VARS.spacingMd,
    marginBottom: VARS.spacingMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  faqQuestion: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: '100%',
    textAlign: 'left',
    fontSize: VARS.fontSizeBase,
    fontWeight: VARS.fontWeightSemibold,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: VARS.colorTextPrimary,
  },
  faqToggle: {
    fontSize: 19,
    marginLeft: 10,
  },
  faqAnswer: {
    marginTop: VARS.spacingSm,
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextSecondary,
    lineHeight: 21,
  },
});

export default styles;
