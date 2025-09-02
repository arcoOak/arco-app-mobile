import { StyleSheet } from 'react-native';
import { light as variables } from '../../css/VariablesBase.styles';

export default StyleSheet.create({
  paymentDetailContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: variables.spacingLg,
    marginBottom: variables.spacingMd,
    padding: variables.spacingMd,
    backgroundColor: variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    borderRadius: variables.borderRadiusLg,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 400,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  detailHeaderTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: variables.fontSizeLg,
  },
  paymentsContainer: {
    flexDirection: 'column',
    gap: 15,
    minHeight: '50%',
  },
  detailCard: {
    backgroundColor: variables.colorSurfaceSecondary,
    borderRadius: variables.borderRadiusLg,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    marginBottom: 16,
    padding: 0,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: variables.spacingSm,
    backgroundColor: variables.colorSurfacePrimary,
    borderBottomWidth: 1,
    borderBottomColor: variables.colorBorderSecondary,
    borderTopLeftRadius: variables.borderRadiusLg,
    borderTopRightRadius: variables.borderRadiusLg,
  },
  paymentHeaderPendiente: {
    backgroundColor: variables.colorDangerBg,
  },
  paymentTitle: {
    color: variables.colorTextPrimary,
    fontWeight: 'bold',
    fontSize: variables.fontSizeMd,
  },
  paymentDetails: {
    flexDirection: 'column',
    gap: variables.spacingSm,
    paddingVertical: variables.spacingMd,
    paddingHorizontal: variables.spacingLg,
    backgroundColor: variables.colorSurfaceTertiary,
  },
  paymentDate: {
    marginBottom: 10,
    color: variables.colorTextTertiary,
  },
  paymentAmount: {
    marginBottom: 10,
    color: variables.colorTextTertiary,
  },
  noPaymentsMessage: {
    color: variables.colorTextPrimary,
    textAlign: 'center',
    marginTop: 24,
  },
});
