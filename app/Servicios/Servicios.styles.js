// Adaptación de Servicios.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from '../../src/css/VariablesBase.styles';

const VARS = light;

const styles = StyleSheet.create({
  section: {
    marginVertical: VARS.spacingMd,
    paddingHorizontal: VARS.spacingLg,
  },
  h2: {
    fontSize: VARS.fontSizeXl,
    fontWeight: VARS.fontWeightBold,
    marginBottom: VARS.spacingMd,
    marginTop: VARS.spacingMd,
    textAlign: 'center',
  },
  categorias: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: VARS.spacingMd,
    paddingVertical: VARS.spacingSm,
    overflow: 'scroll',
  },
  spanCategoria: {
    backgroundColor: VARS.colorSurfaceSecondary,
    color: VARS.colorTextPrimary,
    borderRadius: VARS.borderRadiusMd,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: VARS.fontSizeBase,
    fontWeight: VARS.fontWeightMedium,
    borderWidth: 0,
  },
  spanCategoriaActive: {
    backgroundColor: VARS.colorBrandPrimary,
    color: VARS.colorWhite,
  },
  servicios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: VARS.spacingMd,
    marginBottom: VARS.spacingMd,
    justifyContent: 'center',
  },
  servicioCard: {
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusMd,
    padding: VARS.spacingMd,
    alignItems: 'center',
    width: 160,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  servicioCardImg: {
    width: 120,
    height: 80,
    borderRadius: VARS.borderRadiusSm,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  servicioCardH3: {
    fontSize: VARS.fontSizeMd,
    fontWeight: VARS.fontWeightSemibold,
    color: VARS.colorTextPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  notFoundText: {
    textAlign: 'center',
    color: '#777',
    fontSize: VARS.fontSizeBase,
    marginTop: VARS.spacingMd,
  },
});

export default styles;
