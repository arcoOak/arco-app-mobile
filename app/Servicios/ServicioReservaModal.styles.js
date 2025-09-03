import { StyleSheet } from 'react-native';
import {light} from '../../src/css/VariablesBase.styles';

const variables = light;

const ServicioReservaModalStyles = StyleSheet.create({
  seleccionado: {
    backgroundColor: variables.colorActive,
    color: variables.colorWhite,
    borderColor: variables.colorBorderActive,
  },
  title: {
    marginTop: 0,
    marginBottom: variables.spacingMd,
    fontSize: 18,
    color: variables.colorTextPrimary,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: variables.colorBorderPrimary,
  },
  info: {
    marginBottom: variables.spacingMd,
    padding: variables.spacingMd,
    backgroundColor: variables.colorSurfaceTertiary,
    borderWidth: 1,
    borderColor: variables.colorBorderTertiary,
    borderRadius: variables.borderRadiusSm,
  },
  text: {
    fontSize: 11,
    color: variables.colorTextPrimary,
    lineHeight: 18,
  },
  horarios: {
    padding: 0,
  },
  horarioItem: {
    backgroundColor: variables.colorSurfacePrimary,
    color: variables.colorTextPrimary,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: variables.borderRadiusSm,
    marginBottom: 8,
    fontSize: 16,
  },
  invitados: {
    marginTop: variables.spacingMd,
    gap: variables.spacingSm,
    backgroundColor: variables.colorSurfacePrimary,
    borderRadius: variables.borderRadiusSm,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  invitado: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: variables.colorBorderTertiary,
    borderRadius: variables.borderRadiusLg,
    backgroundColor: variables.colorSurfaceTertiary,
    textAlign: 'center',
    width: '100%',
    color: variables.colorTextTertiary,
  },
  invitadoText: {
    margin: 0,
    fontSize: 14,
    fontWeight: '600',
  },
  textarea: {
    width: '100%',
    padding: 12,
    backgroundColor: variables.colorSurfaceTertiary,
    color: variables.colorTextTertiary,
    borderWidth: 1,
    borderColor: variables.colorBorderTertiary,
    borderRadius: variables.borderRadiusSm,
    fontFamily: 'inherit',
    fontSize: 16,
    minHeight: 100,
  },
});

export default ServicioReservaModalStyles;
