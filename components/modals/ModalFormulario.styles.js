import { StyleSheet } from 'react-native';
import {light} from '../../src/css/VariablesBase.styles';

const Variables = light;

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    // No backdrop-filter in RN
  },
  content: {
    backgroundColor: Variables.colorSurfacePrimary,
    borderRadius: Variables.borderRadiusMd,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  form: {
    flexDirection: 'column',
    gap: Variables.spacingMd,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Variables.colorBorderPrimary,
    paddingBottom: Variables.spacingSm,
    margin: 0,
  },
  title: {
    color: Variables.colorTextPrimary,
    textAlign: 'center',
    margin: 0,
  },
  body: {
    width: '100%',
    backgroundColor: Variables.colorSurfacePrimary,
    flexDirection: 'column',
    gap: Variables.spacingMd,
    borderRadius: Variables.borderRadiusMd,
    // boxShadow handled in content
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: Variables.colorBorderSecondary,
    padding: Variables.spacingSm,
  },
});
