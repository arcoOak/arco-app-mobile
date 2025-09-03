import { StyleSheet } from 'react-native';
import { light } from '../../src/css/VariablesBase.styles';

const Variable = light;

export default StyleSheet.create({
  section: {
    backgroundColor: Variable.colorSurfacePrimary,
    borderWidth: 1,
    borderColor: Variable.borderColor,
    borderRadius: Variable.borderRadiusLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 4,
    width: '90%',
    marginTop: 16,
    marginHorizontal: '5%',
  },
  container: {
    width: '100%',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    position: 'relative',
    width: 100,
    height: 100,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -12 }],
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4070f4',
    textAlign: 'center',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    textAlign: 'left',
    justifyContent: 'center',
  },
  title: {
    color: Variable.colorTextPrimary,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label:{
    color: Variable.colorTextPrimary,
    marginBottom: 5,
    fontSize: Variable.fontSizeMd,
  },
  description: {
    color: Variable.colorTextSecondary,
    fontSize: Variable.fontSizeSm,
  },
  progressButton: {
    backgroundColor: '#4070f4',
    marginTop: 8,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: Variable.borderRadiusMd,
    alignSelf: 'flex-start',
  },
});
