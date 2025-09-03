
import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Picker } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import ExitosoModal from '../../components/modals/ExitosoModal';
import EspacioReservaModal from './EspacioReservaModal';
import espacioService from '../../src/services/espacio.service';
import reservasService from '../../src/services/reservas.service';
import { useAuth } from '../../src/context/AuthContext';
import ButtonVolver from '../../components/buttons/ButtonVolver';
import Button from '../../components/buttons/Button';
import { TIPOS_TRANSACCION } from '../../constants/transaccion.constants';
import styles from './EspaciosDetalle.styles';

import espacioImageBackground from '../../assets/images/reservas/bg-2.jpg'

// Función para obtener el número de días en un mes específico
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

    // Función para obtener el primer día de la semana del mes (0=Dom, 1=Lun...)
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

export default function EspaciosDetalle() { // Recibe concesionarios como prop

    const { user, actualizarSaldoBilletera } = useAuth();
    // Obtener id desde props o navigation params según tu stack
    const id = null; // <-- Ajusta según tu navegación
    const [loading, setLoading] = useState(false); // Estado para manejar la carga de datos
    const [showExitosoModal, setShowExitosoModal] = useState(false); // Estado para manejar el modal de éxito
    
    const [espacio, setEspacio] = useState(null); // Estado para manejar los espacios reservables
    const [unidadesEspacio, setUnidadesEspacio] = useState([]); // Estado para manejar las unidades en caso de haber más de una unidad del espacio
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null); // Estado para manejar la unidad seleccionada

    const [horaApertura, setHoraApertura] = useState('');
    const [horaCierre, setHoraCierre] = useState(''); // Estado para manejar el horario de apertura y cierre del espacio
    const [costeReserva, setCosteReserva] = useState(0.00); // Estado para manejar el coste de la reserva

    const [listaHorarios, setListaHorarios] = useState([]); // Estado para manejar la lista de horarios disponibles
    const [listaHorariosSeleccionados, setListaHorariosSeleccionados] = useState([]); // Estado para manejar los horarios seleccionados

    const [listaHorariosYaReservados, setListaHorariosYasReservados] = useState([]); // Estado para manejar los horarios ya reservados

    const [showEspacioReservaModal, setShowEspacioReservaModal] = useState(false); // Estado para manejar la visibilidad del modal de reserva
    const [notaReserva, setNotaReserva] = useState('');
    const [invitadosFamiliares, setInvitadosFamiliares] = useState([]);
    const [invitadosReserva, setInvitadosReserva] = useState([]);


    // const navigation = useNavigation();
    // const backLocation = navigation.canGoBack() ? null : '/espacios';

    // Buscar el espacio por ID



    useEffect(() => {

            const fetchData = async () => {
                setLoading(true)
                try {
    
                    // Obtener el espacio y sus unidades
                    const [espacioConsultado, unidadesData] = await Promise.all([
                        espacioService.getEspacioById(id),
                        espacioService.getEspacioUnidadesById(id)
                    ]);


                    if (!espacioConsultado) {
                        console.error('Comercio no encontrado');
                        setEspacio(null); // Si no se encuentra el comercio, establecemos comercio como null
                        setUnidadesEspacio([]); // Si no se encuentra el comercio, establecemos productos como un array vacío
                    }else{
                        setEspacio(espacioConsultado);
                        setHoraApertura(espacioConsultado.hora_apertura || ''); // Establece un valor por defecto si no hay hora de apertura
                        setHoraCierre(espacioConsultado.hora_cierre || '');
                        setCosteReserva(unidadesData[0]?.costo_reserva);

                        setUnidadesEspacio(unidadesData || []); // Si no hay unidades, se establece un array vacío
                        setUnidadSeleccionada(unidadesData[0]?.id_espacio_reservable_unidad || null);

                        //Se carga por defecto a la fecha de hoy en formato YYYY-MM-DD

                        const fechaActualFormateada = new Date().toISOString().slice(0, 10)

                        // Cargar las reservas ya realizadas para el espacio
                        //console.log(unidadesData[0].id_espacio_reservable_unidad)
                        const reservasDelEspacio = await reservasService.getHorasReservadasPorUnidadFecha(unidadesData[0].id_espacio_reservable_unidad, fechaActualFormateada );
                        //console.log('Reservas del espacio:', reservasDelEspacio);
                        
                        setListaHorariosYasReservados((reservasDelEspacio || []).map(reserva => {
                            return {
                                id_espacio_reservable_unidad: unidadesData[0]?.id_espacio_reservable_unidad,
                                horaReserva: reserva.hora_reserva.slice(0, 2), // Extrae solo la hora en formato HH:mm
                                fecha: fechaActualFormateada
                            };
                        }));

                        
                    }
                    

                } catch (error) {
                    console.error('Error fetching data:', error);
                    setEspacio(null); // Si hay un error, establecemos comercio como null
                    setUnidadesEspacio([]); // Si hay un error, establecemos productos como un array vacío
                } finally {
                    setLoading(false);
                }
                 // Finaliza la carga de datos
            };
            fetchData();
        }, []);

        useEffect(() =>{
            setListaHorarios(()=>{
                const lista = [];
                if (horaApertura && horaCierre) {
                    // Convertir las horas de apertura y cierre a minutos totales desde la medianoche
                    const aperturaHour = parseInt(horaApertura.split(':')[0]);
                    const cierreHour = parseInt(horaCierre.split(':')[0]);
                
                    // Generar los horarios en intervalos de 30 minutos
                    for (let i = aperturaHour; i <= cierreHour; i += 1) {
                        const hora = i < 10 ? `0${i}` : i; // Formatear la hora con dos dígitos
                        const nexHora = (i + 1) < 10 ? `0${i + 1}` : (i + 1); // Formatear la siguiente hora con dos dígitos
                        // Añadir AM/PM según la hora
                        const ampm = (i >= 12 && i < 24) ? 'PM' : 'AM';
                        const ampmNexHora = ((i + 1) >= 12 && (i + 1) < 24 || (i+1) === 24) ? 'PM' : 'AM';
                        
                        lista.push({
                            hora24: `${hora}`, // Hora en formato 24 horas
                            hora: `${hora > 12 ? hora - 12 : hora}:00 `,
                            nexHora : `${nexHora > 12 ? nexHora - 12 : nexHora}:00 `,
                            ampm: ampm,
                            ampmNexHora: ampmNexHora,
                            estado: 'disponible' // Estado inicial de cada horario
                        });
                }                
            }
            return lista;
        })
        }, [horaApertura, horaCierre]);


        const totalReserva = useMemo(() => {
            // Multiplicamos el coste por hora por el número de horas seleccionadas
            const numeroDeHoras = listaHorariosSeleccionados.length;
            return (costeReserva * numeroDeHoras).toFixed(2);
        }, [costeReserva, listaHorariosSeleccionados]);

        const isBotonReservarDisabled = useMemo(() => {
            // El botón se deshabilita si no hay horarios seleccionados.
            // Si la reserva tiene coste, también se deshabilita si el total es 0.
            return listaHorariosSeleccionados.length === 0 || (costeReserva > 0 && totalReserva <= 0);
        }, [listaHorariosSeleccionados, costeReserva, totalReserva]);

    // Obtener la fecha actual
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear();

    // Estados para el mes y año seleccionados
    const [selectedMonth, setSelectedMonth] = useState(currentMonth); 
    const [selectedYear, setSelectedYear] = useState(currentYear);   
    const [selectedDate, setSelectedDate] = useState(currentDay); 

    // Dummy data for calendar days (adjust for actual month logic if needed)
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

    // Generar las fechas del mes actual
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Efecto para ajustar selectedDate si el día actual ya pasó o no existe en el nuevo mes/año
    useEffect(() => {
        // Si el día seleccionado es mayor que los días en el nuevo mes, ajustarlo al último día del mes
        if (selectedDate > daysInMonth) {
            setSelectedDate(daysInMonth);
        }

        // Si el mes o año cambia a uno anterior al actual, ajustar la fecha al día actual si es válido
        const currentMonthAndYear = new Date(currentYear, currentMonth);
        const selectedMonthAndYear = new Date(selectedYear, selectedMonth);

        if (selectedMonthAndYear < currentMonthAndYear) {
            // Si el mes/año seleccionado es anterior al actual, forzar la selección al primer día del mes/año actual
            setSelectedMonth(currentMonth);
            setSelectedYear(currentYear);
            setSelectedDate(currentDay); // O podrías poner 1 si quieres el 1ro del mes
        } else if (selectedMonthAndYear.getTime() === currentMonthAndYear.getTime()) {
            // Si es el mes y año actual, asegúrate de que el día seleccionado no sea anterior al día actual
            if (selectedDate < currentDay) {
                setSelectedDate(currentDay);
            }
        }
    }, [selectedMonth, selectedYear, daysInMonth, selectedDate, currentDay, currentMonth, currentYear]);



    const handleDateClick = (date) => {
        const selectedDateTime = new Date(selectedYear, selectedMonth, date);
        if (selectedDateTime < today.setHours(0, 0, 0, 0)) { // Comparar solo las fechas, ignorar la hora
            // No hacer nada si la fecha ya pasó
            return;
        }
        setSelectedDate(date);

        setListaHorariosSeleccionados([]); // Limpiar la selección de horarios al cambiar la fecha
        
    }

    const handleChangeMonth = (event) => {
        const newMonth = parseInt(event.target.value, 10);
        setSelectedMonth(newMonth);
        setSelectedDate(1); // Reiniciar la fecha seleccionada al primer día del nuevo mes
        setListaHorariosSeleccionados([]); // Limpiar la selección de horarios al cambiar el mes
    };

    const handleChangeYear = (event) => {
        const newYear = parseInt(event.target.value, 10);
        setSelectedYear(newYear);
        setSelectedMonth(0); // Reiniciar el mes seleccionado al primer mes del nuevo año
        setSelectedDate(1); // Reiniciar la fecha seleccionada al primer día del nuevo
        setListaHorariosSeleccionados([]); // Limpiar la selección de horarios al cambiar el año
    };



    // --- MODIFICACIÓN AQUÍ para los meses ---
    const getMonthOptions = () => {
        const months = [];
        const monthNames = [];
        for (let i = 0; i < 12; i++) {
            monthNames.push(new Date(2000, i).toLocaleString('es-ES', { month: 'long' }));
        }

        // Si el año seleccionado es el actual, mostrar solo desde el mes actual en adelante
        if (selectedYear === currentYear) {
            for (let i = currentMonth; i < 12; i++) {
                months.push({ value: i, name: monthNames[i] });
            }
        } else {
            // Si el año es futuro, mostrar todos los meses
            for (let i = 0; i < 12; i++) {
                months.push({ value: i, name: monthNames[i] });
            }
        }
        return months;
    };

    // --- MODIFICACIÓN AQUÍ para los años ---
    const getYearOptions = () => {
        const years = [];
        const startYear = currentYear;
        const endYear = currentYear + 1; // Solo el año actual y el siguiente para ver la funcionalidad si necesitas expandirlo, pero la instrucción es solo el actual.
        // Para solo el año actual, puedes cambiar `endYear` a `currentYear`.
        for (let i = startYear; i <= endYear; i++) { // Loop solo para asegurar que al menos el año actual está
            years.push(i);
        }
        return years;
    };

    const monthOptions = getMonthOptions();
    const yearOptions = getYearOptions();


    // Seleccionar la Unidad

    const handleUnidadSeleccionada = (unidad) => {
        if (unidadSeleccionada != unidad.id_espacio_reservable_unidad) {
            // Si no, la seleccionamos
            setUnidadSeleccionada(unidad.id_espacio_reservable_unidad);
            setCosteReserva(unidad.costo_reserva);
            setListaHorariosSeleccionados([]); // Limpiar la selección de horarios al cambiar de unidad
        }
    }


    const formatearHora = (hora) =>{

        if (!hora || typeof hora !== 'string' || hora.length < 5) {
            return ''; // Evitar errores si la hora no está definida o tiene un formato incorrecto
        }

        const horaInt = parseInt(hora.slice(0, 2), 10);
        const minutoStr = hora.slice(3, 5); // Mantener los minutos como string para el formato '00'

        let horaFormateada = horaInt;
        let ampm = 'am';

        if (horaInt >= 12) {
            ampm = 'pm';
            if (horaInt > 12) {
                horaFormateada = horaInt - 12;
            }
        }
        
        if (horaFormateada === 0) { // Para el caso de las 00:00 (medianoche)
            horaFormateada = 12;
        }

        return `${horaFormateada}:${minutoStr}${ampm}`;
    }

        
    const handleSelectHour = (hora) => {
        setListaHorariosSeleccionados(prev => {
            // Verifica si la hora ya está seleccionada
            if (prev.includes(hora)) {
                // Si ya está seleccionada, la eliminamos
                return prev.filter(h => h !== hora);
            } else {
                // Si no está seleccionada, la añadimos
                return [...prev, hora];
            }
        });
    }

    useEffect(() => {

        const actualizarHorarios = async () => {

            const reservacionesParaLaFecha = await reservasService.getHorasReservadasPorUnidadFecha(unidadSeleccionada, new Date(selectedYear, selectedMonth, selectedDate).toISOString().slice(0, 10));

            setListaHorarios(currentHorarios =>
                currentHorarios.map(horario => {
                    const isReserved = reservacionesParaLaFecha.some(
                        reserva => reserva.hora_reserva.slice(0, 2) === horario.hora24
                    );
                    return {
                        ...horario,
                        estado: isReserved ? 'reservado' : 'disponible'
                    };
                })
            )
        }

        actualizarHorarios();
        
    },[selectedDate, selectedMonth, selectedYear, listaHorariosYaReservados, unidadSeleccionada] )


    const handleConfirmarReserva = async () => {
        setLoading(true);
        try {
            const fechaReserva = new Date(selectedYear, selectedMonth, selectedDate);
            const horariosReserva = listaHorariosSeleccionados.map(hora => {
                const horaInt = parseInt(hora, 10);
                return `${horaInt.toString().padStart(2, '0')}:00`;
            });

            const datosCompletosReserva = {
                reservaData: {
                    id_espacio_reservable : espacio.id_espacio_reservable,
                    id_espacio_reservable_unidad: unidadSeleccionada,
                    fecha_reservacion: fechaReserva.toISOString(),
                    nota: notaReserva,
                    coste_total: totalReserva,
                    id_socio: user?.id_socio || null, // Asegúrate de que el usuario esté autenticado
                },
                transaccionData: {
                    id_billetera: user.id_billetera, 
                    id_tipo_transaccion: TIPOS_TRANSACCION.RESERVACION, 
                    monto: totalReserva
                },
                listaInvitados: invitadosReserva,
                listaFamiliares: invitadosFamiliares,
                listaHoras: horariosReserva,
                id_usuario: user?.id_usuario || null // Asegúrate de que el usuario esté autenticado
            }

            //console.log('Datos completos reserva:', datosCompletosReserva);
            

            // const reservaResponse = await reservasService.createReserva(datosCompletosReserva);

            // if(invitadosFamiliares.length > 0){
            //     await qrTokenService.createTokenQrAFamiliares(user.id_usuario, invitadosFamiliares);
            // }

            // if(invitadosReserva.length > 0){
            //     await qrTokenService.createTokenQrAInvitados(user.id_usuario, invitadosReserva);
            // }


             // Mostrar modal de éxito

            // Crear Transaccion

            const transaccionResponse = await reservasService.createReserva(datosCompletosReserva);

            if(transaccionResponse ) {
                setShowExitosoModal(true);

                actualizarSaldoBilletera();
            }



            setShowEspacioReservaModal(false); // Cerrar el modal de reserva

        }catch (error) {
            console.error('Error al confirmar la reserva:', error);
        }
        finally {
            setLoading(false);
            // Limpiar los estados después de la reserva
            setListaHorariosSeleccionados([]);
            setNotaReserva('');
            setInvitadosReserva([]);
            // Actualizar la lista de horarios reservados
            const fechaReserva = new Date(selectedYear, selectedMonth, selectedDate).toISOString().slice(0, 10);
            const reservacionesParaLaFecha = await reservasService.getHorasReservadasPorUnidadFecha(unidadSeleccionada, fechaReserva);
            setListaHorariosYasReservados((reservacionesParaLaFecha || []).map(reserva => {
                return {
                    id_espacio_reservable_unidad: unidadSeleccionada,
                    horaReserva: reserva.hora_reserva.slice(0, 2), // Extrae solo la hora en formato HH:mm
                    fecha: fechaReserva
                };
            }
            ));

            setInvitadosFamiliares([]); // Limpiar la lista de familiares
            setInvitadosReserva([]); // Limpiar la lista de invitados

            setTimeout(() => {
                setShowExitosoModal(false); // Cerrar modal de éxito después de 2
            }, 2000);

        }
    }

    const handleCloseModal = () => {

        setInvitadosFamiliares([]);
        setInvitadosReserva([]);
        setShowEspacioReservaModal(false); // Cerrar el modal de reserva
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ExitosoModal
                visible={showExitosoModal}
                mensaje="¡Reserva realizada con éxito!"
            />
            <EspacioReservaModal
                visible={showEspacioReservaModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmarReserva}
                espacio={espacio}
                unidadSeleccionada={unidadesEspacio.find(unidad => unidad.id_espacio_reservable_unidad === unidadSeleccionada)}
                fecha={new Date(selectedYear, selectedMonth, selectedDate)}
                horarios={listaHorariosSeleccionados}
                costeTotal={totalReserva}
                nota={notaReserva}
                setNota={setNotaReserva}
                familiares={invitadosFamiliares}
                setFamiliares={setInvitadosFamiliares}
                invitados={invitadosReserva}
                setInvitados={setInvitadosReserva}
            />
            <LoadingModal visible={loading} />
            <ScrollView>
                <ImageBackground
                    source={espacioImageBackground}
                    style={styles.reservaHeader}
                    resizeMode="cover"
                >
                    <View style={styles.botonVolverContainer}>
                        <ButtonVolver /*to={backLocation}*/ style={styles.botonVolverWhite} />
                    </View>
                    <Text style={styles.reservaHeaderTitle}>{espacio?.nombre_espacio_reservable}</Text>
                    <Text style={styles.espacioDetalleDescription}>{espacio?.descripcion_espacio_reservable}</Text>
                    {costeReserva > 0 && (
                        <Text style={styles.detalleCostoHora}>{costeReserva}$/hora</Text>
                    )}
                </ImageBackground>
                <View style={styles.reservaContainer}>
                    <View style={styles.bookingMainContent}>
                        <View style={styles.reservaUnidadesContainer}>
                            {unidadesEspacio.length > 0 && (
                                <View style={styles.unidadesList}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Seleccionables</Text>
                                    {unidadesEspacio.map(unidad => (
                                        <TouchableOpacity
                                            key={unidad.id_espacio_reservable_unidad}
                                            style={[styles.unidadItem, unidadSeleccionada == unidad.id_espacio_reservable_unidad && styles.unidadItemActive]}
                                            onPress={() => handleUnidadSeleccionada(unidad)}
                                        >
                                            <View style={styles.unidadInfo}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{unidad.nombre_unidad}</Text>
                                                <Text style={styles.unidadCapacity}>Capacidad: {unidad.capacidad}</Text>
                                                <Text style={styles.unidadCosto}>{unidad.costo_reserva > 0 ? `${unidad.costo_reserva}$` : 'Sin Coste'}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={styles.dateSection}>
                            <View style={styles.dateSelectorsContainer}>
                                <View style={styles.dateSelectors}>
                                    {/* Puedes usar Picker de @react-native-picker/picker para selects nativos */}
                                    {/* Aquí se muestra un ejemplo básico, puedes mejorar la UI */}
                                    <Picker
                                        selectedValue={selectedMonth}
                                        style={{ width: 140, marginRight: 8 }}
                                        onValueChange={(itemValue) => {
                                            setSelectedMonth(itemValue);
                                            setSelectedDate(1);
                                            setListaHorariosSeleccionados([]);
                                        }}
                                    >
                                        {monthOptions.map(month => (
                                            <Picker.Item key={month.value} label={month.name} value={month.value} />
                                        ))}
                                    </Picker>
                                    <Picker
                                        selectedValue={selectedYear}
                                        style={{ width: 100 }}
                                        enabled={false}
                                    >
                                        <Picker.Item label={currentYear.toString()} value={currentYear} />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.calendarGrid}>
                                {daysOfWeek.map(day => (
                                    <Text key={day} style={styles.dayOfWeek}>{day}</Text>
                                ))}
                                {Array(firstDay).fill(null).map((_, i) => (
                                    <View key={`empty-${i}`} style={styles.calendarDay} />
                                ))}
                                {dates.map(date => {
                                    const dayInCalendar = new Date(selectedYear, selectedMonth, date);
                                    const todayStart = new Date(currentYear, currentMonth, currentDay);
                                    const isPastDate = dayInCalendar < todayStart;
                                    const isSelected = date === selectedDate;
                                    return (
                                        <TouchableOpacity
                                            key={date}
                                            style={[
                                                styles.calendarDay,
                                                isSelected && styles.calendarDaySelected,
                                                isPastDate && styles.calendarDayDisabled,
                                            ]}
                                            disabled={isPastDate}
                                            onPress={() => handleDateClick(date)}
                                        >
                                            <Text style={{ color: isSelected ? '#fff' : '#222', fontWeight: isSelected ? 'bold' : 'normal' }}>{date}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={styles.timeSection}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Horario</Text>
                            <View style={styles.timeRange}>
                                <Text style={styles.timeValue}>{formatearHora(horaApertura)}</Text>
                                <Text style={styles.timeSeparator}>-</Text>
                                <Text style={styles.timeValue}>{formatearHora(horaCierre)}</Text>
                            </View>
                            <View style={styles.timeSelectorsContainer}>
                                <View style={styles.timeSelectors}>
                                    {listaHorarios.map(horario => {
                                        const isActive = listaHorariosSeleccionados.includes(horario.hora24);
                                        const isDisabled = horario.estado !== 'disponible';
                                        return (
                                            <TouchableOpacity
                                                key={horario.hora24}
                                                style={[
                                                    styles.timeSelectorsItem,
                                                    isActive && styles.timeSelectorsItemActive,
                                                    isDisabled && styles.timeSelectorsItemDisabled,
                                                ]}
                                                disabled={isDisabled}
                                                onPress={() => handleSelectHour(horario.hora24)}
                                            >
                                                <Text style={{ color: isActive ? '#fff' : '#222', fontWeight: isActive ? 'bold' : 'normal' }}>
                                                    {horario.ampm === horario.ampmNexHora
                                                        ? `${horario.hora} - ${horario.nexHora} ${horario.ampm}`
                                                        : `${horario.hora}${horario.ampm} - ${horario.nexHora}${horario.ampmNexHora}`}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bookingFooter}>
                        <Button
                            disabled={isBotonReservarDisabled}
                            onPress={() => setShowEspacioReservaModal(true)}
                            style={styles.proceedButton}
                        >
                            {totalReserva > 0 ? `Reservar por $${totalReserva}` : 'Reservar'}
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}