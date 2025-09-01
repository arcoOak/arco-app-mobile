import { StyleSheet } from 'react-native';
import Variables from '../constants/VariablesBase.styles';

export default StyleSheet.create({
  section: {
    backgroundColor: Variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: Variables.colorBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: Variables.borderRadiusMd,
    padding: 16,
    marginVertical: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Variables.colorTextPrimary,
  },
  text: {
    fontSize: 17,
    color: '#555',
    marginVertical: 0,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: Variables.borderRadiusLg,
    maxWidth: '80%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  abierto: {
    color: Variables.colorWhite,
    backgroundColor: Variables.colorSuccess,
  },
  cerrado: {
    color: Variables.colorWhite,
    backgroundColor: Variables.colorDanger,
  },
});
