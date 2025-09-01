
import React from 'react';
import { View, Text } from 'react-native';
import styles from './HorarioHome.styles';

const formatearHoraAmPm = (hora) => {
    const [horas, minutos] = hora.split(':');
    let horaFormateada = parseInt(horas, 10);
    const amPm = horaFormateada >= 12 ? 'PM' : 'AM';
    horaFormateada = horaFormateada % 12 || 12;
    return `${horaFormateada}:${minutos} ${amPm}`;
};

const HorarioHome = ({ clubInfo }) => {
    const esActivo = clubInfo?.activo;
    const statusText = esActivo
        ? `${formatearHoraAmPm(clubInfo.hora_apertura)} - ${formatearHoraAmPm(clubInfo.hora_cierre)}`
        : 'Cerrado';
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Horario del Club</Text>
            <Text style={[
                styles.text,
                esActivo ? styles.abierto : styles.cerrado,
            ]}>
                {statusText}
            </Text>
        </View>
    );
};

export default HorarioHome;