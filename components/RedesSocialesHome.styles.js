import { StyleSheet } from 'react-native';
import { light } from '../src/css/VariablesBase.styles';
const Variables = light;

export default StyleSheet.create({
  container: {
    backgroundColor: Variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: Variables.colorBorder,
    borderRadius: Variables.borderRadiusMd,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: '600',
    color: Variables.colorTextPrimary,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
    padding: 0,
    margin: 0,
  },
  iconItem: {
    marginHorizontal: 2,
    marginVertical: 2,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    textDecorationLine: 'none',
    color: Variables.colorTextSecondary,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: Variables.borderRadiusLg,
    backgroundColor: Variables.colorSurfaceSecondary,
  },
  linkHover: {
    backgroundColor: '#e4e6eb',
    color: '#000',
  },
  icon: {
    marginRight: 8,
    fontSize: 20,
  },
  facebook: {
    color: '#3b5998',
  },
  instagram: {
    color: '#e4405f',
  },
  twitter: {
    color: '#1da1f2',
  },
});
