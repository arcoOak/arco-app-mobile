// Adaptación de ReservaUnidad.css a React Native StyleSheet
import { StyleSheet } from 'react-native';
import { light, dark } from '../css/VariablesBase.styles';

const VARS = light;

const styles = StyleSheet.create({
  reservaUnidad: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f7f7f7',
  },
  reservaUnidadContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 480,
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 24,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: VARS.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    textAlign: 'center',
  },
  reservaUnidadContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 480,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: VARS.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    textAlign: 'center',
    color: '#333',
    gap: 20,
  },
  reservaUnidadImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    backgroundColor: '#eee',
    borderRadius: VARS.borderRadiusMd,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  reservaUnidadH2: {
    marginBottom: 18,
    color: '#333',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reservaUnidadP: {
    marginVertical: 10,
    color: '#444',
    fontSize: 17,
    textAlign: 'center',
  },
  reservaUnidadB: {
    color: '#222',
    fontWeight: 'bold',
  },
  reservaUnidadIcons: {
    width: '50%',
  },
});

export default styles;
