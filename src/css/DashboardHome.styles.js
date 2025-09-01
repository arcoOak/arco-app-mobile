// Adaptación de DashboardHome.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  dashboardContainer: {
    width: '90%',
    marginVertical: VARS.spacingMd,
    marginHorizontal: 'auto',
    padding: VARS.spacingMd,
    backgroundColor: VARS.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: VARS.colorBorderPrimary,
    borderRadius: VARS.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  dashboardHeaderTitle: {
    marginTop: VARS.spacingXs,
    fontSize: VARS.fontSizeXl,
  },
  icon: {
    fontSize: 22,
    color: '#555',
  },
  balanceSection: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  balanceHeader: {
    textAlign: 'left',
  },
  balanceAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: VARS.spacingSm,
    fontWeight: VARS.fontWeightMedium,
    fontSize: VARS.fontSizeXxl,
  },
  iconButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#333',
    fontSize: 22,
    margin: 0,
  },
  balanceActions: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  balanceButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  balanceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLabelText: {
    fontSize: VARS.fontSizeSm,
    fontWeight: VARS.fontWeightMedium,
  },
  balanceActionButton: {
    width: '100%',
    height: 55,
    margin: 0,
    backgroundColor: VARS.colorBrandPrimary,
    borderWidth: 0,
    padding: VARS.spacingSm,
    color: VARS.colorTextButtonPrimary,
    fontWeight: VARS.fontWeightMedium,
    flexDirection: 'row',
    alignItems: 'center',
    gap: VARS.spacingXs,
    justifyContent: 'center',
    borderRadius: VARS.borderRadiusMd,
  },
  balanceActionButtonIcon: {
    fontSize: 24,
  },
  investmentsSection: {
    paddingVertical: 13,
    paddingHorizontal: 6,
  },
  investmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  investmentsHeaderTitle: {
    margin: 0,
    fontSize: VARS.fontSizeMd,
    color: VARS.colorTextPrimary,
  },
  viewAll: {
    backgroundColor: VARS.colorBrandPrimary,
  },
  investmentsList: {
    padding: 0,
    margin: 0,
    maxHeight: 240,
  },
  investmentsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    fontSize: 15,
  },
  investmentsListItemLast: {
    borderBottomWidth: 0,
  },
  positive: {
    color: VARS.colorSuccess,
    fontWeight: VARS.fontWeightMedium,
  },
  negative: {
    color: VARS.colorDanger,
    fontWeight: VARS.fontWeightMedium,
  },
  balanceText: {
    // Animaciones de opacidad/transform requieren Animated
  },
  balanceTextHidden: {
    opacity: 1,
    transform: [{ scale: 0.95 }],
  },
  balanceTextVisible: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  historyItemAmountNegative: {
    color: VARS.colorDanger,
  },
  historyItemAmountPositive: {
    color: VARS.colorSuccess,
  },
});

export default styles;
