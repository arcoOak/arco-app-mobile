import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: light.borderRadiusMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginTop: 12,
    width: '100%',
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: '45%',
    borderWidth: 0,
    borderRadius: light.borderRadiusMd,
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  btnNoDisponible: {
    backgroundColor: '#ccc',
    color: '#888',
  },
  btnNoDisponibleText: {
    color: '#888',
  },
  btnGuardar: {
    marginTop: 18,
    backgroundColor: '#007bff',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
