// Adaptación de Notifications.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from './VariablesBase.styles';

// Puedes cambiar light por dark para modo oscuro
const VARS = light;

const styles = StyleSheet.create({
  notificationContainer: {
    width: '100%',
    height: '85%', // vh no existe, usar porcentaje relativo
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  notificationHeader: {
    width: '90%',
    textAlign: 'left',
    marginTop: VARS.spacingXxl,
    marginBottom: VARS.spacingSm,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  notificationHeaderTitle: {
    marginBottom: VARS.spacingMd,
  },
  notificationContain: {
    width: '90%',
    paddingVertical: VARS.spacingSm,
    paddingHorizontal: VARS.spacingXl,
    backgroundColor: VARS.colorWhite,
    borderRadius: VARS.borderRadiusLg,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: VARS.spacingSm,
  },
  notificationItemIcon: {
    marginRight: VARS.spacingMd,
  },
  notificationSettings: {
    width: '100%',
    textAlign: 'left',
    padding: VARS.spacingXl,
  },
  notificationSettingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  notificationSettingsButton: {
    width: '47%',
    flexDirection: 'column',
  },
  notificationSettingsButtonGray: {
    backgroundColor: '#9e9e9e',
  },
  notificationSettingsButtonBlue: {
    backgroundColor: VARS.colorBrandPrimary,
  },
});

export default styles;
