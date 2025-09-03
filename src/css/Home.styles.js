// Adaptación de Home.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  app: {
    paddingBlock: VARS.spacingLg,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  appHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: VARS.spacingMd,
    elevation: 2,
    textAlign: 'left',
    width: '100%',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeBienvenida: {
    textAlign: 'left',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    fontSize: VARS.fontSizeMd,
    color: VARS.colorTextButtonNeutral,
  },
  username: {
    fontSize: 14,
  },
  bannerImg: {
    width: '100%',
    borderRadius: VARS.borderRadiusMd,
    marginVertical: VARS.spacingSm,
  },
  textLeft: {
    textAlign: 'left',
  },
  titleNotification: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleNotificationIcon: {
    color: VARS.colorTextSecondary,
    marginRight: VARS.spacingXxl,
  },
  notification: {
    width: 7,
    height: 7,
    backgroundColor: VARS.colorDanger,
    borderRadius: VARS.borderRadiusFull,
    position: 'absolute',
    left: VARS.spacingSm,
    top: VARS.spacingXs + 5,
  },
  titleHomeSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: VARS.spacingMd,
    fontSize: VARS.fontSizeXs,
    color: VARS.colorTextSecondary,
  },
  section: {
    padding: VARS.spacingLg,
  },
  status: {
    fontWeight: 'bold',
  },
  statusAlDia: {
    color: VARS.colorSuccess,
  },
  statusPending: {
    color: VARS.colorDanger,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: VARS.colorBorderPrimary,
    borderRadius: VARS.borderRadiusSm,
    overflow: 'hidden',
    marginTop: VARS.spacingSm,
  },
  filled: {
    height: '100%',
    backgroundColor: VARS.colorSuccess,
    width: '30%', // animación requiere Animated
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: VARS.spacingSm,
    paddingVertical: VARS.spacingSm,
  },
  bottomNav: {
    position: 'absolute', // fixed no existe, usar absolute
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: VARS.colorSurfacePrimary,
    paddingVertical: VARS.spacingSm,
    borderTopWidth: 1,
    borderTopColor: VARS.colorBorderPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 100,
  },
  bottomNavIcon: {
    fontSize: VARS.fontSizeMd,
    color: VARS.colorTextButtonNeutral,
  },
  duesSection: {
    paddingVertical: VARS.spacingMd,
    paddingHorizontal: VARS.spacingXl,
  },
  homeBienvenidaText: {
    color: VARS.colorTextSecondary,
    fontSize: VARS.fontSizeXxl, // font-size-md
  },
  username:{
    color: VARS.colorTextPrimary,
    fontSize: VARS.fontSizeLg,
    fontWeight: VARS.fontWeightBold,
  },
  newsSectionContainer: {
    marginTop: VARS.spacingMd,
    marginBottom: VARS.spacingMd,
  },
  newsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  newsSectionTitle: {
    fontSize: VARS.fontSizeLg,
    fontWeight: VARS.fontWeightBold,
    margin: 0,
  },
  newsSectionSeeAll: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorWhite,
    textDecorationLine: 'none',
    fontWeight: VARS.fontWeightMedium,
  },
  newsSectionCarousel: {
    flexDirection: 'row',
    // horizontal scroll: usar ScrollView horizontal
    paddingBottom: VARS.spacingLg,
    gap: VARS.spacingMd,
  },
  paymentAction: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  addCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: VARS.spacingXl,
    marginTop: VARS.spacingMd,
    alignItems: 'flex-end',
  },
});

export default styles;
