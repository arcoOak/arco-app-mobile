import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';
const variables = light;

const ReservasStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: variables.colorSurfacePrimary,
    minHeight: '100%',
    flex: 1,
    flexDirection: 'column',
    gap: 16,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    color: variables.colorTextPrimary,
    marginBottom: 8,
    fontSize: 22,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'column',
    width: '100%',
  },
  listInner: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  item: {
    backgroundColor: variables.colorSurfaceTertiary,
    borderRadius: variables.borderRadiusMd,
    borderWidth: 1,
    borderColor: variables.colorBorderTertiary,
    padding: variables.spacingMd,
    marginBottom: 8,
    // shadow props for React Native
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: variables.colorBorderTertiary,
    paddingBottom: 16,
    marginBottom: 16,
  },
  itemTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
  },
  itemDate: {
    fontSize: 14,
    color: variables.colorTextSecondary,
    marginLeft: 16,
  },
  itemDetails: {
    margin: 0,
    fontSize: 16,
    color: variables.colorTextPrimary,
  },
  noReservas: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 200,
  },
  noReservasText: {
    fontSize: 18,
    color: '#95a5a6',
    fontWeight: '500',
  },
});

export default ReservasStyles;
