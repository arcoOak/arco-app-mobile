
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import styles from './CalendarioSeleccionable.styles';

const CalendarioSeleccionable = ({ canchaId, titulo, selectedDate, setSelectedDate }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentViewDate, setCurrentViewDate] = useState(moment().format('YYYY-MM-DD'));

  // Simula la obtención de disponibilidad desde una API
  const fetchAvailability = async (idCancha, dateForMonth) => {
    setLoading(true);
    setError(null);
    try {
      const response = await new Promise(resolve => setTimeout(() => {
        const today = moment(dateForMonth);
        const dates = [];
        dates.push(today.date(5).format('YYYY-MM-DD'));
        dates.push(today.date(12).format('YYYY-MM-DD'));
        dates.push(today.date(20).format('YYYY-MM-DD'));
        const nextMonth = moment(dateForMonth).add(1, 'month');
        dates.push(nextMonth.date(3).format('YYYY-MM-DD'));
        const prevMonth = moment(dateForMonth).subtract(1, 'month');
        dates.push(prevMonth.date(25).format('YYYY-MM-DD'));
        resolve({ data: dates });
      }, 1000));
      setAvailableDates(response.data);
      setLoading(false);
    } catch (err) {
      setError('No se pudo cargar la disponibilidad. Intente de nuevo.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canchaId) {
      fetchAvailability(canchaId, currentViewDate);
    }
  }, [canchaId, currentViewDate]);

  // Marcar días disponibles
  const markedDates = availableDates.reduce((acc, date) => {
    acc[date] = {
      selected: selectedDate && moment(selectedDate).format('YYYY-MM-DD') === date,
      selectedColor: '#28a745',
      customStyles: {
        container: styles.availableDay,
        text: { color: '#28a745', fontWeight: 'bold' },
      },
    };
    return acc;
  }, {});
  if (selectedDate) {
    markedDates[moment(selectedDate).format('YYYY-MM-DD')] = {
      selected: true,
      selectedColor: '#28a745',
      customStyles: {
        container: styles.activeDay,
        text: { color: '#fff', fontWeight: 'bold' },
      },
    };
  }

  const handleDayPress = (day) => {
    const isAvailable = availableDates.includes(day.dateString);
    if (isAvailable) {
      setSelectedDate(day.dateString);
    } else {
      setSelectedDate(null);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#28a745" style={{ margin: 20 }} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      <Calendar
        current={currentViewDate}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        minDate={moment().format('YYYY-MM-DD')}
        maxDate={moment().add(1, 'month').format('YYYY-MM-DD')}
        theme={{
          todayTextColor: '#28a745',
          arrowColor: '#28a745',
        }}
        onMonthChange={month => setCurrentViewDate(month.dateString)}
        disableAllTouchEventsForDisabledDays={true}
      />
      {selectedDate && (
        <Text style={styles.selectedText}>
          Día seleccionado: <Text style={{ fontWeight: 'bold' }}>{moment(selectedDate).format('DD/MM/YYYY')}</Text>
        </Text>
      )}
    </ScrollView>
  );
};

export default CalendarioSeleccionable;