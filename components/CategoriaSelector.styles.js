import { StyleSheet } from 'react-native';
import { light } from '../src/css/VariablesBase.styles';
const Variables = light;

export default StyleSheet.create({
  categorias: {
    flexDirection: 'row',
    gap: Variables.spacingSm,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 10,
    overflow: 'scroll',
  },
  spanCategoria: {
    backgroundColor: Variables.colorSurfacePrimary,
    borderWidth: 2,
    borderColor: Variables.colorBorderPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: Variables.borderRadiusLg,
    paddingVertical: 8,
    paddingHorizontal: 18,
    fontSize: 15,
    color: Variables.colorTextPrimary,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  spanCategoriaActive: {
    backgroundColor: Variables.colorActive,
    color: Variables.colorWhite,
    borderColor: Variables.colorBorderPrimary,
  },
  icon: {
    marginRight: 6,
  },
});
