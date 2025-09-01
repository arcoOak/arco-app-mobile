// Adaptación de PromotionCard.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  promotionSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 0,
    marginBottom: VARS.spacingLg,
  },
  promotionSectionTitle: {
    fontSize: VARS.fontSizeLg,
    fontWeight: VARS.fontWeightBold,
    margin: 0,
  },
  promotionSectionSeeAll: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorWhite,
    textDecorationLine: 'none',
    fontWeight: VARS.fontWeightMedium,
  },
  promotionSectionCarousel: {
    flexDirection: 'row',
    // horizontal scroll: usar ScrollView horizontal
    paddingBottom: VARS.spacingLg,
    gap: VARS.spacingMd,
  },
  promotionCard: {
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusMd,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    marginRight: VARS.spacingMd,
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    scrollSnapAlign: 'start',
  },
  promotionCardImageContainer: {
    borderRadius: VARS.borderRadiusMd,
    width: '40%',
    padding: VARS.spacingSm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promotionCardImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: VARS.borderRadiusMd,
  },
  promotionContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '70%',
    paddingTop: VARS.spacingLg,
    paddingBottom: VARS.spacingLg,
    paddingLeft: 0,
    paddingRight: VARS.spacingLg,
  },
  promotionCardCategory: {
    fontSize: VARS.fontSizeXs,
    textTransform: 'uppercase',
    textAlign: 'left',
    color: VARS.colorTextTertiary,
    fontWeight: VARS.fontWeightSemibold,
  },
  promotionCardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promotionCardTitleH5: {
    fontSize: VARS.fontSizeBase,
    fontWeight: VARS.fontWeightSemibold,
    color: VARS.colorTextPrimary,
    lineHeight: 20,
    textAlign: 'left',
  },
  promotionPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promotionCardDescription: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextPrimary,
    marginTop: VARS.spacingXs,
    lineHeight: 18,
  },
  sliderSection: {
    width: '100%',
    textAlign: 'left',
  },
  swiperSlideImg: {
    width: '100%',
    borderRadius: VARS.borderRadiusSm,
  },
});

export default styles;
