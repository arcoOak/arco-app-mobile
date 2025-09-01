import { StyleSheet } from 'react-native';
import Variables from '../constants/VariablesBase.styles';

export default StyleSheet.create({
  list: {
    flexDirection: 'row',
    overflow: 'scroll',
    marginBottom: 10,
    paddingBottom: 10,
  },
  listInner: {
    flexDirection: 'row',
    paddingVertical: 4,
    gap: 15,
  },
  item: {
    paddingVertical: Variables.spacingSm,
    paddingHorizontal: Variables.spacingMd,
    backgroundColor: Variables.colorSurfacePrimary,
    borderRadius: Variables.borderRadiusLg,
    borderWidth: 1,
    borderColor: Variables.colorBorderTertiary,
    marginRight: 0,
    marginLeft: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    whiteSpace: 'nowrap', // No se usa en RN, pero el padding y minWidth lo simulan
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s', // No se usa en RN
  },
  itemActive: {
    borderColor: Variables.colorBorderActive,
    backgroundColor: Variables.colorActive,
  },
  itemNombre: {
    margin: 0,
    fontSize: 16,
    color: Variables.colorTextPrimary,
    fontWeight: 'normal',
  },
  itemNombreActive: {
    color: Variables.colorWhite,
    fontWeight: 'bold',
  },
});
