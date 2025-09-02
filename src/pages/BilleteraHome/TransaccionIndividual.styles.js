import { StyleSheet } from 'react-native';
import { light as variables } from '../../css/VariablesBase.styles';

export default StyleSheet.create({
  paymentIndividualDetailContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: variables.spacingLg,
    marginBottom: variables.spacingMd,
    backgroundColor: variables.colorSurfacePrimary,
    borderRadius: variables.borderRadiusLg,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    padding: variables.spacingMd,
    alignItems: 'center',
    minHeight: 400,
  },
  paymentsIndividualContainer: {
    width: '100%',
  },
  paymentIndividualHeader: {
    paddingVertical: variables.spacingMd,
    paddingHorizontal: variables.spacingLg,
    borderRadius: variables.borderRadiusMd,
    marginBottom: variables.spacingMd,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: variables.colorBorderPrimary,
  },
  paymentIndividualHeaderPago: {
    backgroundColor: variables.colorSuccessBg,
    color: variables.colorSuccess,
  },
  paymentIndividualHeaderPendiente: {
    backgroundColor: variables.colorWarningBg,
    color: variables.colorWarning,
  },
  paymentTitleIndividual: {
    fontSize: variables.fontSizeLg,
    fontWeight: '700',
    margin: 0,
  },
  paymentIndividualDetails: {
    width: '100%',
    paddingVertical: variables.spacingMd,
    flexDirection: 'column',
    gap: variables.spacingSm,
  },
  paymentIndividualDate: {
    fontSize: variables.fontSizeBase,
    color: variables.colorTextSecondary,
    marginBottom: 4,
  },
  paymentIndividualAmount: {
    fontSize: variables.fontSizeBase,
    color: variables.colorTextSecondary,
    marginBottom: 4,
  },
  paymentIndividualTablaElementos: {
    width: '100%',
    marginVertical: variables.spacingMd,
    backgroundColor: variables.colorSurfaceSecondary,
    borderRadius: variables.borderRadiusMd,
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    overflow: 'hidden',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentIndividualTablaTh: {
    backgroundColor: variables.colorSurfaceTertiary,
    color: variables.colorTextPrimary,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: variables.colorBorderPrimary,
    paddingVertical: 10,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  paymentIndividualTablaTd: {
    color: variables.colorTextSecondary,
    borderBottomWidth: 1,
    borderBottomColor: variables.colorBorderPrimary,
    paddingVertical: 10,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  paymentIndividualElementoLast: {
    borderBottomWidth: 0,
  },
});
