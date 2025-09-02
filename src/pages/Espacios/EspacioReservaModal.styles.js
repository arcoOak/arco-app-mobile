import { StyleSheet } from 'react-native';
import variables from '../../constants/VariablesBase.styles';

export default StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: variables.colorSurfaceOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContentBlock: {
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'scroll',
    padding: variables.spacingMd,
    width: '100%',
  },
  seleccionado: {
    backgroundColor: variables.colorActive,
    color: variables.colorWhite,
    borderColor: variables.colorBorderActive,
  },
  seleccionadoText: {
    color: variables.colorWhite,
  },
});
