
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import styles from './HorarioSeleccionable.styles';

const horariosEjemplo = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
];

const horariosNoDisponiblesPrueba = [
  
  '09:00 - 10:00',
  '13:00 - 14:00',
];

const HorarioSeleccionable = ({ fecha }) => {
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const handleSeleccion = (horario) => {
    setHorarioSeleccionado(horario);
  };

  const handleGuardar = () => {
    Alert.alert('Horario guardado', `Horario guardado: ${horarioSeleccionado} para el día ${moment(fecha).format('DD/MM/YYYY')}`);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
        Selecciona un horario para el día {moment(fecha).format('DD/MM/YYYY')}
      </Text>
      <View style={styles.lista}>
        {horariosEjemplo.map((horario, idx) => {
          const noDisponible = horariosNoDisponiblesPrueba.includes(horario);
          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.btn,
                noDisponible && styles.btnNoDisponible,
                horarioSeleccionado === horario && !noDisponible && { borderWidth: 2, borderColor: '#28a745' },
              ]}
              disabled={noDisponible}
              onPress={() => !noDisponible && handleSeleccion(horario)}
              activeOpacity={noDisponible ? 1 : 0.7}
            >
              <Text style={[
                styles.btnText,
                noDisponible && styles.btnNoDisponibleText,
              ]}>
                {horario}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {horarioSeleccionado && (
        <TouchableOpacity
          style={[styles.btn, styles.btnGuardar]}
          onPress={handleGuardar}
        >
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HorarioSeleccionable;