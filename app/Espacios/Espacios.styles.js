import { StyleSheet, Dimensions } from 'react-native';
import {light} from '../../src/css/VariablesBase.styles';

const variables = light;

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  espacioContainer: {
    maxWidth: 450,
    width: '100%',
    marginHorizontal: 'auto',
    backgroundColor: 'transparent',
    minHeight: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },
  espacioContainerNoComercio: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
  },
  espacioCard: {
    backgroundColor: variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    borderRadius: variables.borderRadiusLg,
    padding: variables.spacingMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 8,
  },
  espacioCardImg: {
    backgroundColor: variables.colorSurfaceTertiary,
    width: 150,
    height: 150,
    borderRadius: variables.borderRadiusLg,
    resizeMode: 'cover',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: variables.colorBorderTertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  espacioCardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
    color: variables.colorTextPrimary,
  },
  espacioCardDesc: {
    fontSize: 13,
    color: '#777',
    lineHeight: 17,
    marginBottom: 10,
  },
  espacioCardBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: variables.borderRadiusLg,
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  espacioCardBtnHover: {
    backgroundColor: '#0056b3',
  },
  espacios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
    padding: 20,
  },
});
