import { StyleSheet } from 'react-native';
import variables from '../../css/VariablesBase.styles';

const PerfilStyles = StyleSheet.create({
  perfilHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: variables.spacingSm,
    marginBottom: 16,
  },
  profilePhotoContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 8,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    borderWidth: 5,
    borderColor: '#fff',
    // shadow props for React Native
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  profileMail: {
    backgroundColor: variables.colorSurfaceTertiary,
    borderWidth: 1,
    borderColor: variables.colorBorderTertiary,
    paddingVertical: variables.spacingSm,
    paddingHorizontal: variables.spacingMd,
    borderRadius: 999,
    color: variables.colorTextTertiary,
    fontWeight: 'bold',
    fontSize: 13,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  profileInfoContainer: {
    flexDirection: 'column',
    gap: variables.spacingMd,
    padding: variables.spacingMd,
  },
  profileInfo: {
    width: '100%',
    backgroundColor: variables.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: variables.colorBorderPrimary,
    // shadow props for React Native
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: variables.borderRadiusMd,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoItemLast: {
    borderBottomWidth: 0,
  },
  labelInfo: {
    fontWeight: 'bold',
    fontSize: 14,
    color: variables.colorTextPrimary,
  },
  pass: {
    color: variables.colorTextSecondary,
    fontSize: 16,
  },
  exit: {
    color: '#c31313',
    fontSize: 16,
  },
  faqs: {
    width: '100%',
  },
  faq: {
    width: '100%',
    marginBottom: 4,
  },
  faqHead: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqContent: {
    overflow: 'hidden',
    color: variables.colorTextPrimary,
  },
  activeFaq: {
    // For rotation or expanded state
  },
});

export default PerfilStyles;
