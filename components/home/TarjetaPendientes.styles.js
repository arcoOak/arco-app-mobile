import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  section: {
    backgroundColor: light.colorSurfacePrimary,
    borderRadius: light.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: 0,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    textAlign: 'left',
    fontWeight: '500',
    color: light.colorTextPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 15,
    color: light.colorTextPrimary,
  },
  balanceBody: {
    height: 80,
    paddingHorizontal: 8,
  },
  balanceScroll: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  calendarItem: {
    padding: 12,
    borderRadius: light.borderRadiusMd,
    minWidth: 60,
    fontWeight: '500',
    backgroundColor: light.colorSurfacePrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 3,
    borderWidth: 1,
    borderColor: light.colorBorderPrimary,
    alignItems: 'center',
    marginRight: 5,
  },
  calendarItemText: {
    fontSize: 14,
    color: light.colorTextPrimary,
    marginBottom: 0,
    textAlign: 'center',
  },
  activeMonth: {
    borderColor: light.colorBorderInteractive,
    backgroundColor: light.colorSurfaceSecondary,
  },
  activeMonthText: {
    color: light.colorTextSecondary,
    fontWeight: '700',
  },
  balanceFooter: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recibosBalance: {
    fontWeight: '700',
    fontSize: 14,
    color: light.colorTextSecondary,
  },
  totalBalance: {
    fontWeight: '700',
    fontSize: 14,
  },
  hasDebt: {
    color: light.colorDanger,
  },
  noDebt: {
    color: light.colorSuccess,
  },
});
