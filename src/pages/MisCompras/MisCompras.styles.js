import { StyleSheet } from 'react-native';
import variables from '../../css/VariablesBase.styles';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: variables.colorSurfacePrimary,
    minHeight: 200,
    flex: 1,
    flexDirection: 'column',
    gap: 16,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: variables.borderRadiusMd,
  },
  title: {
    color: variables.colorTextPrimary,
    marginBottom: 8,
    fontSize: 22,
    fontWeight: 'bold',
  },
  comprasList: {
    flexDirection: 'column',
  },
  comprasListInner: {
    flexDirection: 'column',
    gap: 8,
  },
  compraItem: {
    backgroundColor: variables.colorSurfaceTertiary,
    borderRadius: variables.borderRadiusMd,
    borderWidth: 1,
    borderColor: variables.colorBorderTertiary,
    padding: variables.spacingMd,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  compraItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: variables.colorBorderTertiary,
    paddingBottom: 16,
    marginBottom: 16,
  },
  compraItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
    margin: 0,
  },
  compraItemDate: {
    fontSize: 14,
    color: variables.colorTextSecondary,
    marginLeft: 16,
    whiteSpace: 'nowrap',
  },
  compraItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  compraItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
  },
  compraItemCantidad: {
    fontSize: 16,
    color: variables.colorTextSecondary,
  },
  noCompras: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  noComprasText: {
    color: variables.colorTextSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
