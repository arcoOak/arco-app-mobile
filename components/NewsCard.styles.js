import { StyleSheet } from 'react-native';
import {light} from '../src/css/VariablesBase.styles';

const Variables = light;

export default StyleSheet.create({
  card: {
    backgroundColor: Variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: Variables.colorBorder,
    borderRadius: Variables.borderRadiusLg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    marginRight: 15,
    flexShrink: 0,
    width: '100%',
    flexDirection: 'column',
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    borderTopLeftRadius: Variables.borderRadiusLg,
    borderTopRightRadius: Variables.borderRadiusLg,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: Variables.borderRadiusLg,
    borderTopRightRadius: Variables.borderRadiusLg,
  },
  category: {
    fontSize: 14,
    color: Variables.colorTextPrimary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Variables.colorTextSecondary,
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 21,
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 0,
  },
  author: {
    fontSize: 13,
    color: Variables.colorTextPrimary,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'left',
  },
});
