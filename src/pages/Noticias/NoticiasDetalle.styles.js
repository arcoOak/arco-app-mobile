import { StyleSheet } from 'react-native';
import variables from '../../css/VariablesBase.styles';

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 24,
    backgroundColor: variables.colorSurfacePrimary,
    borderRadius: variables.borderRadiusMd,
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  noticiaInfo: {
    // ...
  },
  noticiaInfoHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  noticiaImage: {
    width: '100%',
    height: 180,
    borderRadius: variables.borderRadiusSm,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  noticiaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 28,
  },
  noticiaDate: {
    fontSize: variables.fontSizeSm,
    color: variables.colorTextSecondary,
    marginBottom: variables.spacingSm,
    textAlign: 'center',
  },
  noticiaContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
    marginTop: 16,
    textAlign: 'justify',
    marginBottom: 16,
  },
  noticiaDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    color: '#6c757d',
    fontSize: 15,
    marginTop: 16,
  },
  noticiaDetailsText: {
    color: '#6c757d',
    fontSize: 15,
    marginBottom: 4,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    padding: 32,
    fontSize: 18,
    color: '#6c757d',
  },
});

export default styles;
