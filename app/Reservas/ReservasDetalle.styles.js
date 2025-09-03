import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';
const variables = light;

const ReservasDetalleStyles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: variables.spacingMd,
    padding: variables.spacingMd,
    backgroundColor: variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    // boxShadow: variables.shadowMd, // React Native: usar shadow props si es necesario
    minHeight: '100%',
    gap: 16,
    borderRadius: variables.borderRadiusMd,
  },
  header: {
    flexDirection: 'column',
    gap: 16,
  },
  info: {
    flexDirection: 'column',
    gap: 32,
    backgroundColor: variables.colorSurfaceTertiary,
    padding: variables.spacingMd,
    borderWidth: 1,
    borderColor: variables.colorBorderTertiary,
    borderRadius: variables.borderRadiusMd,
    // boxShadow: variables.shadowMd, // React Native: usar shadow props si es necesario
  },
  infoText: {
    color: variables.colorTextSecondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  infoTextStrong: {
    color: variables.colorTextPrimary,
    marginRight: 8,
    fontWeight: 'bold',
  },
});

export default ReservasDetalleStyles;
