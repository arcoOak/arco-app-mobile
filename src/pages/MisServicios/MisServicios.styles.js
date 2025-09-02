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
  },
  title: {
    color: variables.colorTextPrimary,
    marginBottom: 8,
    fontSize: 22,
    fontWeight: 'bold',
  },
  reservasList: {
    flexDirection: 'column',
  },
  reservasListInner: {
    flexDirection: 'column',
    gap: 8,
  },
  reservaItem: {
    backgroundColor: variables.colorSurfaceSecondary,
    borderRadius: variables.borderRadiusMd,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  reservaItemHeader: {
    marginBottom: 4,
  },
  reservaItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
  },
  reservaItemDate: {
    fontSize: 14,
    color: variables.colorTextSecondary,
  },
  reservaItemDetails: {
    marginTop: 4,
  },
  noReservas: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  noReservasText: {
    color: variables.colorTextSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
