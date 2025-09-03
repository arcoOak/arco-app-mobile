import { StyleSheet } from 'react-native';
import { light as variables } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  noPaymentsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: variables.spacingMd,
    height: '50%',
    fontSize: variables.fontSizeMd,
  },
  noPaymentsMessage: {
    margin: 0,
    color: variables.colorTextPrimary,
    textAlign: 'center',
  },
});
