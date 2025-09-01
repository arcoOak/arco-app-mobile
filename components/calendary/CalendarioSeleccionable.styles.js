import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

export default StyleSheet.create({
  container: {
    maxWidth: 600,
    marginVertical: 20,
    marginHorizontal: 'auto',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: light.borderRadiusMd,
    backgroundColor: light.colorWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontFamily: 'Arial',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    color: '#333',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendar: {
    width: '100%',
    borderWidth: 0,
    borderRadius: light.borderRadiusMd,
    backgroundColor: light.colorWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
    flexDirection: 'column',
    gap: 12,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  weekday: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  day: {
    fontSize: 14,
    color: '#333',
  },
  availableDay: {
    backgroundColor: '#e0ffe0',
    color: '#28a745',
    borderRadius: light.borderRadiusSm,
    fontWeight: 'bold',
  },
  availableDayHover: {
    backgroundColor: '#c9ffc9',
  },
  notAvailableDay: {
    backgroundColor: '#ffe0e0',
    color: '#a72828',
    borderRadius: light.borderRadiusSm,
    fontWeight: 'bold',
  },
  notAvailableDayHover: {
    backgroundColor: '#ffc9c9',
  },
  activeDay: {
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: light.borderRadiusSm,
  },
  today: {
    backgroundColor: '#f0f8ff',
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
