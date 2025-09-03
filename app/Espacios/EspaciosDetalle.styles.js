import { StyleSheet, Dimensions } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';
const variables = light;

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  reservaHeader: {
    textAlign: 'center',
    width: '100%',
    minHeight: 250,
    paddingBottom: 50,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#222', // fallback if no image
    // backgroundImage: 'url(../src/img/reservas/bg-2.jpg)', // handled in ImageBackground
    backgroundSize: 'cover',
  },
  reservaHeaderTitle: {
    color: variables.colorTextContrast,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
  },
  espacioDetalleDescription: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 16,
  },
  detalleCostoHora: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 19,
    marginTop: 10,
  },
  botonVolverContainer: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    marginLeft: 8,
  },
  reservaContainer: {
    flex: 1,
    backgroundColor: variables.colorSurfacePrimary,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  bookingMainContent: {
    flex: 1,
    padding: 0,
  },
  reservaUnidadesContainer: {
    marginBottom: 16,
  },
  unidadesList: {
    marginTop: 8,
    marginBottom: 8,
  },
  unidadItem: {
    backgroundColor: variables.colorSurfaceSecondary,
    borderRadius: variables.borderRadiusMd,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  unidadItemActive: {
    borderColor: variables.colorPrimary,
    backgroundColor: variables.colorSurfacePrimary,
  },
  unidadInfo: {
    flexDirection: 'column',
    gap: 2,
  },
  unidadCapacity: {
    color: variables.colorTextSecondary,
    fontSize: 14,
  },
  unidadCosto: {
    color: variables.colorTextPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  dateSection: {
    marginTop: 12,
    marginBottom: 12,
  },
  dateSelectorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dateSelectors: {
    flexDirection: 'row',
    gap: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 32,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  dayOfWeek: {
    width: (width - 32) / 7,
    textAlign: 'center',
    fontWeight: 'bold',
    color: variables.colorTextSecondary,
    marginBottom: 2,
  },
  calendarDay: {
    width: (width - 32) / 7,
    height: 36,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  calendarDaySelected: {
    backgroundColor: variables.colorPrimary,
    color: '#fff',
  },
  calendarDayDisabled: {
    opacity: 0.4,
  },
  timeSection: {
    marginTop: 12,
    marginBottom: 12,
  },
  timeRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: variables.colorTextPrimary,
  },
  timeSeparator: {
    fontSize: 18,
    color: variables.colorTextSecondary,
    marginHorizontal: 4,
  },
  timeSelectorsContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  timeSelectors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  timeSelectorsItem: {
    backgroundColor: variables.colorSurfaceSecondary,
    borderRadius: variables.borderRadiusSm,
    padding: 8,
    margin: 2,
    minWidth: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  timeSelectorsItemActive: {
    backgroundColor: variables.colorPrimary,
    borderColor: variables.colorPrimary,
  },
  timeSelectorsItemDisabled: {
    opacity: 0.4,
  },
  bookingFooter: {
    padding: 16,
    backgroundColor: variables.colorSurfacePrimary,
    borderTopWidth: 1,
    borderTopColor: variables.colorBorderPrimary,
    alignItems: 'center',
  },
  proceedButton: {
    width: '100%',
    padding: 15,
    backgroundColor: variables.colorPrimary,
    color: '#fff',
    borderRadius: variables.borderRadiusMd,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  proceedButtonDisabled: {
    backgroundColor: '#ccc',
  },
});
