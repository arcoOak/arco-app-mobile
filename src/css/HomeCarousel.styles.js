// Adaptación de HomeCarousel.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  appContainer: {
    width: '100%',
    overflow: 'hidden',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  headerAccountText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  headerBalance: {
    fontSize: 29,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: 'left',
  },
  balanceCards: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 20,
    marginLeft: 20,
    paddingBottom: 10,
    marginBottom: 32,
  },
  balanceCard: {
    textAlign: 'left',
    flexShrink: 0,
    width: 150,
    padding: VARS.spacingLg,
    borderRadius: VARS.borderRadiusLg,
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: VARS.colorWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  balanceCardBlue: {
    backgroundColor: VARS.colorBrandPrimary,
  },
  balanceCardDarkBlue: {
    backgroundColor: VARS.colorBrandSecondary,
  },
  balanceCardIcon: {
    fontSize: VARS.fontSizeLg,
    marginBottom: VARS.spacingMd,
    color: VARS.colorWhite,
  },
  balanceCardType: {
    fontSize: VARS.fontSizeXs,
    opacity: 0.8,
    marginBottom: VARS.spacingXs,
    color: VARS.colorWhite,
  },
  balanceCardValue: {
    fontSize: VARS.fontSizeLg,
    fontWeight: VARS.fontWeightSemibold,
    color: VARS.colorWhite,
  },
  antecipaySection: {
    backgroundColor: VARS.colorWhite,
    paddingTop: 0,
    paddingBottom: VARS.spacingLg,
    paddingHorizontal: VARS.spacingLg,
  },
  antecipayCard: {
    backgroundColor: VARS.colorSurfacePrimary,
    borderRadius: VARS.borderRadiusLg,
    paddingVertical: VARS.spacingMd,
    paddingHorizontal: VARS.spacingLg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  antecipayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  antecipayIconWrapper: {
    backgroundColor: VARS.colorSurfaceSecondary,
    borderRadius: VARS.borderRadiusFull,
    padding: VARS.spacingXs,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  antecipayIcon: {
    color: VARS.colorBrandPrimary,
    fontSize: VARS.fontSizeSm,
  },
  antecipayText: {
    flexDirection: 'column',
    textAlign: 'left',
  },
  antecipayTitle: {
    fontSize: VARS.fontSizeSm,
    fontWeight: VARS.fontWeightMedium,
    color: VARS.colorTextTertiary,
  },
  antecipayValue: {
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightSemibold,
    color: VARS.colorTextPrimary,
  },
  antecipayArrow: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextTertiary,
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: VARS.colorBorderTertiary,
    borderRadius: VARS.borderRadiusSm,
    height: 8,
    marginTop: VARS.spacingSm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: VARS.colorBrandPrimary, // Gradiente requiere LinearGradient
    width: '70%',
    borderRadius: VARS.borderRadiusSm,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
    padding: 10,
  },
  actionItem: {
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusLg,
    padding: VARS.spacingMd,
    alignItems: 'center',
    gap: VARS.spacingSm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    position: 'relative',
  },
  actionIconWrapper: {
    backgroundColor: VARS.colorSurfaceSecondary,
    borderRadius: VARS.borderRadiusFull,
    padding: VARS.spacingSm,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  actionIcon: {
    color: VARS.colorBrandPrimary,
    fontSize: VARS.fontSizeMd,
  },
  actionText: {
    fontSize: VARS.fontSizeBase,
    fontWeight: VARS.fontWeightMedium,
    color: VARS.colorTextPrimary,
    flexGrow: 1,
  },
  actionArrow: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextTertiary,
  },
  newBadge: {
    backgroundColor: VARS.colorBrandPrimary,
    color: VARS.colorWhite,
    fontSize: VARS.fontSizeXs,
    fontWeight: VARS.fontWeightSemibold,
    paddingVertical: VARS.spacingXs,
    paddingHorizontal: VARS.spacingSm,
    borderRadius: VARS.borderRadiusMd,
    position: 'absolute',
    top: VARS.spacingSm,
    right: VARS.spacingSm,
  },
});

export default styles;
