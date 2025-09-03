// Adaptación de Concecionario.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  servicioContainer: {
    backgroundColor: VARS.colorSurfacePrimary,
    borderWidth: 2,
    borderColor: VARS.colorBorderPrimary,
    borderRadius: VARS.borderRadiusLg,
    width: '90%',
    overflow: 'hidden',
    flexDirection: 'column',
    minHeight: 700,
    marginTop: -VARS.spacingMd,
    alignSelf: 'center',
    position: 'relative',
    // Sombra básica para RN, puedes personalizar según VARS.shadowSm si lo adaptas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bookingMainContent: {
    paddingTop: 25,
    paddingHorizontal: 25,
    flexDirection: 'column',
  },
  reservaUnidadesContainer: {
    width: '100%',
    marginBottom: 32, // 2rem
  },
  unidadesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  unidadItem: {
    width: '48%', // Aproximación para 2 por fila
    borderWidth: 1,
    borderColor: VARS.colorBorderPrimary,
    borderRadius: VARS.borderRadiusMd,
    overflow: 'hidden',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unidadImg: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    backgroundColor: VARS.colorSurfaceSecondary,
    borderBottomWidth: 1,
    borderBottomColor: VARS.colorBorderTertiary,
  },
  unidadInfo: {
    padding: 16,
  },
  unidadInfoTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: VARS.fontSizeMd,
    color: VARS.colorTextPrimary,
  },
  unidadCapacity: {
    margin: 0,
    fontSize: VARS.fontSizeSm,
    color: VARS.colorTextSecondary,
  },
  noUnidades: {
    textAlign: 'center',
    padding: VARS.spacingXl,
    color: VARS.colorTextSecondary,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: VARS.colorBorderTertiary,
    borderRadius: VARS.borderRadiusMd,
    width: '100%',
  },
  dateSection: {
    padding: 0,
    // boxShadow: 'none',
  },
  dateSelectorsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeSection: {
    padding: 10,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayOfWeek: {
    fontWeight: VARS.fontWeightSemibold,
    color: VARS.colorTextSecondary,
    paddingVertical: VARS.spacingSm,
    textAlign: 'center',
  },
  calendarDay: {
    paddingVertical: VARS.spacingMd,
    borderRadius: VARS.borderRadiusMd,
    backgroundColor: VARS.colorWhite,
    color: VARS.colorTextPrimary,
    borderWidth: 1,
    borderColor: VARS.colorBorderPrimary,
    textAlign: 'center',
  },
  calendarDaySelected: {
    backgroundColor: VARS.colorActive,
    color: VARS.colorTextContrast,
    fontWeight: VARS.fontWeightBold,
  },
  calendarDayDisabled: {
    color: VARS.colorWhite,
    backgroundColor: VARS.colorButtonNeutral,
    opacity: 0.7,
  },
  timeRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VARS.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: VARS.colorBorderTertiary,
    borderRadius: VARS.borderRadiusMd,
    paddingVertical: VARS.spacingMd,
    paddingHorizontal: VARS.spacingLg,
    marginBottom: VARS.spacingMd,
    alignSelf: 'center',
  },
  timeValue: {
    fontSize: VARS.fontSizeXl,
    fontWeight: VARS.fontWeightBold,
    color: VARS.colorTextPrimary,
    fontFamily: 'monospace',
  },
  timeSeparator: {
    fontSize: VARS.fontSizeLg,
    color: VARS.colorTextSecondary,
    lineHeight: VARS.fontSizeLg,
  },
  // ...agrega más estilos según necesidad
});

export default styles;
