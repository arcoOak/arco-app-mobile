import { StyleSheet, Dimensions } from 'react-native';
import { light as variables } from '../../css/VariablesBase.styles';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  comercios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
    padding: variables.spacingMd,
  },
  comercioCard: {
    backgroundColor: variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    borderRadius: variables.borderRadiusLg,
    padding: variables.spacingMd,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    width: (width - 60) / 2, // 2-column grid
    minWidth: 150,
    maxWidth: 200,
    flexGrow: 1,
  },
  comercioCardImg: {
    width: 120,
    height: 120,
    borderRadius: variables.borderRadiusLg,
    backgroundColor: variables.colorSurfaceTertiary,
    objectFit: 'cover',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  comercioCardTitle: {
    color: variables.colorTextPrimary,
    fontWeight: 'bold',
    fontSize: variables.fontSizeMd,
    marginBottom: 4,
    textAlign: 'center',
  },
  comercioCardDesc: {
    fontSize: variables.fontSizeSm,
    color: '#777',
    lineHeight: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  comercioCardButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: variables.borderRadiusLg,
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: variables.fontSizeSm,
    fontWeight: '600',
    marginTop: 'auto',
    alignSelf: 'center',
  },
  comerciosEmpty: {
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
    paddingVertical: 20,
    width: '100%',
  },
});
