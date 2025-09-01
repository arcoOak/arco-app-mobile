import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  smallIconBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f5f6fa', // Puedes cambiar a light.colorSurfaceSecondary si prefieres
    borderRadius: light.borderRadiusMd,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 24, // 1.5rem aprox
    color: '#4a69bd',
  },
  title: {
    marginVertical: 0,
    fontSize: 18, // 1.1rem aprox
    fontWeight: '600',
    color: '#222f3e',
  },
  data: {
    fontSize: 16, // 1rem aprox
    color: '#576574',
  },
  boxFormContainer: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
});
