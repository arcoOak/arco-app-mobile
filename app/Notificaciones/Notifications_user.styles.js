import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';
const variables = light;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variables.colorSurfacePrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
    marginBottom: 12,
  },
  categoriasContainer: {
    marginBottom: 16,
  },
  categoriasTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
    marginBottom: 8,
  },
  categoriasList: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoriaItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: variables.borderRadiusSm,
    backgroundColor: variables.colorSurfaceSecondary,
    marginRight: 8,
  },
  categoriaItemActive: {
    backgroundColor: variables.colorBrandPrimary,
  },
  categoriaItemText: {
    color: variables.colorTextPrimary,
    fontWeight: '500',
  },
  categoriaItemTextActive: {
    color: variables.colorWhite,
  },
  list: {
    flex: 1,
  },
  listInner: {
    flexDirection: 'column',
    gap: 12,
  },
  item: {
    backgroundColor: variables.colorWhite,
    borderRadius: variables.borderRadiusMd,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  itemHeader: {
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
  },
  itemDetails: {
    flexDirection: 'column',
    gap: 4,
  },
  itemResumen: {
    fontSize: 14,
    color: variables.colorTextSecondary,
    marginBottom: 2,
  },
  itemAuthor: {
    fontSize: 12,
    color: variables.colorTextSecondary,
    marginBottom: 2,
  },
  itemImage: {
    width: '100%',
    height: 140,
    borderRadius: variables.borderRadiusSm,
    marginBottom: 4,
    resizeMode: 'cover',
  },
  itemCategory: {
    fontSize: 12,
    color: variables.colorBrandPrimary,
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 12,
    color: variables.colorTextSecondary,
  },
  noNotificacionesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  noNotificacionesMessage: {
    color: variables.colorTextSecondary,
    fontSize: 16,
  },
});

export default styles;
