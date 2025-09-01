import { StyleSheet } from 'react-native';
import { light, dark } from '../css/VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;


const styles = StyleSheet.create({
  titleHome: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: VARS.colorSurfacePrimary,
    shadow: VARS.shadowSm,
    zIndex: 10,
  },
  titleHomeImg: {
    width: 50,
    height: 50,
    borderRadius: VARS.borderRadiusLg,
  },
  titleHomeIcon: {
    fontSize: 24,
  },
  mainContent: {
    paddingTop: VARS.headerHeight,
    minHeight: '80%',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: VARS.colorTextPrimary,
    height: VARS.footerHeight + VARS.spacingXxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: VARS.colorSurfacePrimary,
    borderWidth: 2,
    borderColor: VARS.colorBorderPrimary,
    padding: VARS.spacingLg,
    borderRadius: VARS.borderRadiusLg,
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    marginVertical: '5%',
    display: 'flex',
    gap: VARS.spacingSm,
    flexDirection: 'column',
    shadow: VARS.shadowMd,
  },
  formGroup: {
    marginBottom: 20,
  },
  formGroupLabel: {
    marginBottom: 8,
    fontWeight: '600',
    color: VARS.colorTextSecondary,
  },
  formGroupInput: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: VARS.colorBorderSecondary,
    backgroundColor: VARS.colorSurfaceSecondary,
    color: VARS.colorTextSecondary,
    borderRadius: VARS.borderRadiusMd,
    fontSize: 16,
  },
  botonVolverContainer: {
    padding: VARS.spacingMd,
  },
});

export default styles;