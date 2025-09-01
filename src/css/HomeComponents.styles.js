// Adaptación de HomeComponents.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextSecondary,
  },
  userName: {
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightBold,
  },
  iconButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: VARS.fontSizeMd,
    padding: VARS.spacingSm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: VARS.borderRadiusFull,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContainer: {
    width: '100%',
    height: 240,
  },
  card: {
    width: '90%',
    maxWidth: 320,
    height: 180,
    borderRadius: VARS.borderRadiusMd,
    padding: VARS.spacingMd,
    color: VARS.colorTextPrimary,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    position: 'absolute',
    top: 100,
    left: '50%',
    transform: [{ translateX: -160 }], // Aproximación para centrar
    zIndex: 2,
  },
  blueCard: {
    // background: linear-gradient(135deg, ...)
    zIndex: 3,
  },
  brownCard: {
    // background: linear-gradient(135deg, ...)
    top: 130,
    left: '55%',
    transform: [{ translateX: -160 }, { rotate: '5deg' }],
    zIndex: 1,
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBalanceLabel: {
    fontSize: VARS.fontSizeSm,
    opacity: 0.8,
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: VARS.spacingSm,
  },
  cardIndicator: {
    width: 8,
    height: 8,
    borderRadius: VARS.borderRadiusFull,
    backgroundColor: '#ff4500',
  },
  cardBalance: {
    fontSize: 40,
    fontWeight: VARS.fontWeightBold,
  },
  cardBalanceCurrency: {
    fontSize: 24,
    marginRight: 5,
  },
  cardNumber: {
    fontSize: VARS.fontSizeMd,
    letterSpacing: 1,
    opacity: 0.9,
  },
  transactionsSection: {
    flexGrow: 1,
    borderTopLeftRadius: VARS.borderRadiusLg,
    borderTopRightRadius: VARS.borderRadiusLg,
    padding: VARS.spacingLg,
    paddingTop: 20,
    position: 'relative',
    zIndex: 4,
    overflow: 'scroll',
    borderWidth: 2,
    borderColor: VARS.colorBorderTertiary,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: VARS.spacingMd,
    color: VARS.colorTextPrimary,
  },
  transactionsTitle: {
    fontSize: VARS.fontSizeLg,
    margin: 0,
  },
  transactionsList: {
    flexDirection: 'column',
    gap: VARS.spacingMd,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: VARS.spacingSm,
    borderBottomWidth: 1,
    borderBottomColor: VARS.colorBorderTertiary,
  },
  transactionIconWrapper: {
    width: 45,
    height: 45,
    borderRadius: VARS.borderRadiusMd,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: VARS.spacingMd,
    flexShrink: 0,
  },
  transactionIcon: {
    color: VARS.colorTextPrimary,
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightBold,
  },
  transactionDetails: {
    flexGrow: 1,
    flexDirection: 'column',
    textAlign: 'left',
  },
  transactionTitle: {
    color: VARS.colorTextButtonNeutral,
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightMedium,
  },
  transactionTime: {
    color: VARS.colorTextButtonNeutral,
    fontSize: VARS.fontSizeSm,
  },
  transactionAmount: {
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightBold,
    marginLeft: VARS.spacingMd,
    flexShrink: 0,
  },
  amountDebit: {
    color: VARS.colorTextButtonNeutral,
  },
  amountCredit: {
    color: VARS.colorSuccess,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: VARS.colorSurfaceContrast,
    paddingVertical: VARS.spacingMd,
    borderTopWidth: 1,
    borderTopColor: VARS.colorBorderTertiary,
    zIndex: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: VARS.colorTextSecondary,
    fontSize: VARS.fontSizeLg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: VARS.spacingSm,
    borderRadius: VARS.borderRadiusSm,
    transition: 'all 0.2s',
  },
  navItemActive: {
    backgroundColor: VARS.colorButtonSecondary,
    color: VARS.colorTextPrimary,
    padding: VARS.spacingMd,
    borderRadius: VARS.borderRadiusMd,
    transform: [{ translateY: -5 }],
  },
});

export default styles;
