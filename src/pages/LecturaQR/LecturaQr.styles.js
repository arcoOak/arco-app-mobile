import { StyleSheet } from 'react-native';
import variables from '../../constants/VariablesBase.styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variables.colorSurfacePrimary,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  qrCodeBox: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: variables.colorSurfacePrimary,
    borderColor: variables.colorBorderPrimary,
    borderWidth: 1,
    borderRadius: variables.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: variables.spacingLg,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: variables.spacingMd,
    marginTop: 125,
  },
  qrCode: {
    padding: variables.spacingMd,
    backgroundColor: variables.colorSurfaceSecondary,
    borderRadius: variables.borderRadiusMd,
  },
  profilePhoto: {
    marginTop: -150,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  qrCodeBoxText: {
    color: variables.colorTextSecondary,
  },
  imgQr: {
    width: 290,
    height: 290,
  },
  p0: {
    padding: 0,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrLoading: {
    fontSize: 19,
    marginTop: 20,
    height: 256,
    width: 256,
    borderWidth: 2,
    borderColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  qrLoadingText: {
    margin: 0,
    textAlign: 'center',
    width: '100%',
    color: '#666',
    fontWeight: 'bold',
  },
  reservaModalButton: {
    width: '100%',
    marginTop: 10,
    padding: 12,
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: variables.borderRadiusSm,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  qrCodeInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: variables.colorTextPrimary,
  },
  pageTitleDark: {
    color: variables.colorTextInverse,
  },
  mb2: {
    marginBottom: 8,
  },
  mt2: {
    marginTop: 8,
  },
  textMuted: {
    color: variables.colorTextSecondary,
    fontSize: 14,
  },
  qrCodeActions: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
});
