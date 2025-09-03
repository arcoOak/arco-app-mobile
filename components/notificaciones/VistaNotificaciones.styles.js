import { StyleSheet } from 'react-native';
import Variables from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Variables.colorSurfaceOverlay,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1050,
    paddingTop: 80, // 5rem
  },
  container: {
    backgroundColor: Variables.colorSurfacePrimary,
    borderRadius: Variables.borderRadiusLg,
    // boxShadow: Variables.boxShadowMd, // handled below
    width: '90%',
    paddingHorizontal: Variables.spacingMd,
    maxWidth: 450,
    maxHeight: '80%',
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: Variables.colorBorderPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Variables.spacingMd,
    borderBottomWidth: 1,
    borderBottomColor: Variables.colorBorderSecondary,
  },
  bellIcon: {
    fontSize: 20,
    color: Variables.colorTextPrimary,
    marginRight: 8,
  },
  title: {
    margin: 0,
    flexGrow: 1,
    fontWeight: 'bold',
    color: Variables.colorTextPrimary,
    fontSize: 20,
  },
  closeButton: {
    fontSize: 24,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Variables.colorBorderPrimary,
    borderRadius: Variables.borderRadiusFull,
    color: Variables.colorTextPrimary,
  },
  list: {
    flex: 1,
    padding: Variables.spacingMd,
    gap: Variables.spacingSm,
  },
  item: {
    flexDirection: 'row',
    gap: Variables.spacingMd,
    padding: Variables.spacingSm,
    borderWidth: 1,
    borderColor: Variables.colorBorderPrimary,
    borderRadius: Variables.borderRadiusLg,
    backgroundColor: Variables.colorSurfaceTertiary,
    alignItems: 'center',
    marginBottom: 8,
  },
  itemNoVisto: {
    // Animación shake: handled by Animated
  },
  icon: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenido: {
    width: '90%',
    flexDirection: 'column',
  },
  titulo: {
    fontWeight: Variables.fontWeightBold,
    color: Variables.colorTextPrimary,
    fontSize: 16,
  },
  comercio: {
    fontWeight: Variables.fontWeightMedium,
    color: Variables.colorTextSecondary,
    fontSize: 14,
  },
  fecha: {
    fontWeight: Variables.fontWeightMedium,
    color: Variables.colorTextSecondary,
    fontSize: 13,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  vacio: {
    textAlign: 'center',
    padding: 32,
    color: Variables.colorTextSecondary,
  },
});
