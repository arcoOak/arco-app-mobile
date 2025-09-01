// Adaptación de TrainerCard.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  trainerSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 0,
    marginBottom: VARS.spacingLg,
  },
  trainerSectionTitle: {
    fontSize: VARS.fontSizeLg,
    fontWeight: VARS.fontWeightBold,
    margin: 0,
  },
  trainerSectionSeeAll: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorWhite,
    textDecorationLine: 'none',
    fontWeight: VARS.fontWeightMedium,
  },
  trainerSectionCarousel: {
    flexDirection: 'row',
    // horizontal scroll: usar ScrollView horizontal
    paddingBottom: VARS.spacingLg,
    gap: VARS.spacingMd,
  },
  trainerCard: {
    backgroundColor: VARS.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: VARS.colorBorderPrimary,
    borderRadius: VARS.borderRadiusMd,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2,
    marginRight: VARS.spacingMd,
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    scrollSnapAlign: 'start',
  },
  trainerCardImageContainer: {
    borderRadius: VARS.borderRadiusMd,
    width: '40%',
    padding: VARS.spacingSm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trainerCardImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: VARS.borderRadiusMd,
  },
  trainerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '70%',
    paddingTop: VARS.spacingLg,
    paddingBottom: VARS.spacingLg,
    paddingLeft: 0,
    paddingRight: VARS.spacingLg,
  },
  trainerCardCategory: {
    fontSize: VARS.fontSizeXs,
    textTransform: 'uppercase',
    textAlign: 'left',
    color: VARS.colorTextSecondary,
    fontWeight: VARS.fontWeightSemibold,
  },
  trainerCardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trainerCardTitleH5: {
    fontSize: VARS.fontSizeBase,
    fontWeight: VARS.fontWeightSemibold,
    color: VARS.colorTextPrimary,
    lineHeight: 20,
    textAlign: 'left',
  },
  trainerPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trainerCardDescription: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextPrimary,
    marginTop: VARS.spacingXs,
    lineHeight: 18,
  },
});

export default styles;
