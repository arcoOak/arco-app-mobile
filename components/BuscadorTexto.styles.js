import { StyleSheet } from 'react-native';
import Variables from '../constants/VariablesBase.styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Variables.colorSurfacePrimary,
    borderRadius: Variables.borderRadiusPill,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: Variables.colorSurfaceTertiary,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Variables.colorTextPrimary,
    borderRadius: Variables.borderRadiusPill,
  },
  inputPlaceholder: {
    color: '#999',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#999',
    marginRight: 5,
  },
});
