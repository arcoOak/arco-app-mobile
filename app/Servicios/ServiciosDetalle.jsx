
import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from './ServiciosDetalle.styles';



import LoadingModal from '../../components/modals/LoadingModal.jsx';
import ExitosoModal from '../../components/modals/ExitosoModal.jsx';
import ServicioReservaModal from './ServicioReservaModal'; // Asegúrate de que la ruta sea correcta

import serviciosService from '../../src/services/servicios.service';

import reservaServicioService from '../../src/services/reservasServicio.service';

import {useAuth } from '../../src/context/AuthContext'; // Importa el contexto de autenticación

import ButtonVolver from '../../components/buttons/ButtonVolver.jsx'; // Importa el botón de volver

import {TIPOS_TRANSACCION} from '../../constants/transaccion.constants.js'; 

// Función para obtener el número de días en un mes específico
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

    // Función para obtener el primer día de la semana del mes (0=Dom, 1=Lun...)
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

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

export default function ServiciosDetalle() {

    const { user, actualizarSaldoBilletera } = useAuth(); // Obtiene el usuario autenticado desde el contexto
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params || {};
    const [loading, setLoading] = useState(true); // Iniciar en true para la carga inicial
    const [showExitosoModal, setShowExitosoModal] = useState(false); // Estado para manejar el modal de éxito
    
    const [servicio, setServicio] = useState(null); // Estado para manejar el servicio consulado
    const [empresasReservadoras, setEmpresasReservadoras] = useState([]); // Estado para manejar las empresas reservadoras del servicio
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null); // Estado para manejar la unidad seleccionada

    const [horaApertura, setHoraApertura] = useState('');
    const [horaCierre, setHoraCierre] = useState(''); // Estado para manejar el horario de apertura y cierre del servicio
    const [costeReserva, setCosteReserva] = useState(0.00); // Estado para manejar el coste de la reserva

    const [listaHorarios, setListaHorarios] = useState([]); // Estado para manejar la lista de horarios disponibles
    const [listaHorariosSeleccionados, setListaHorariosSeleccionados] = useState([]); // Estado para manejar los horarios seleccionados

    const [listaHorariosYaReservados, setListaHorariosYasReservados] = useState([]); // Estado para manejar los horarios ya reservados
    const [listaHorariosYaReservadosPorEmpresa, setListaHorariosYaReservadosPorEmpresa] = useState([]); // Estado para manejar los horarios ya reservados por empresa

    const [showServicioReservaModal, setShowServicioReservaModal] = useState(false); // Estado para manejar la visibilidad del modal de reserva
    const [notaReserva, setNotaReserva] = useState('');


    // For back navigation, just use navigation.goBack or navigation.navigate('Servicios')


    useEffect(() => {

            const fetchData = async () => {
                setLoading(true)
                try {
    
                    // Obtener el espacio y sus unidades
                    const [servicioConsultado, unidadesData] = await Promise.all([
                        serviciosService.getServicioPorId(id),
                        serviciosService.getEmpresasReservadorasPorServicio(id)
                    ]);


                    if (!servicioConsultado) {
                        console.error('Comercio no encontrado');
                        setServicio(null); // Si no se encuentra el comercio, establecemos comercio como null
                        setEmpresasReservadoras([]); // Si no se encuentra el comercio, establecemos productos como un array vacío
                    }else{

                        setServicio(servicioConsultado);
                        setHoraApertura(unidadesData[0]?.hora_apertura_servicio || servicioConsultado.hora_apertura_servicio || ''); // Establece un valor por defecto si no hay hora de apertura
                        setHoraCierre(unidadesData[0]?.hora_cierre_servicio || servicioConsultado.hora_cierre_servicio || '');

                        setCosteReserva(unidadesData[0]?.costo_servicio || servicioConsultado.costo_servicio || 0.00); // Establece un valor por defecto si no hay coste de reserva

                        setEmpresasReservadoras(unidadesData || []); // Si no hay unidades, se establece un array vacío
                        setUnidadSeleccionada(unidadesData[0]?.id_servicio_reservable_empresa || null);


                        //console.log('Empresas Reservadoras:', unidadesData);
                        //Se carga por defecto a la fecha de hoy en formato YYYY-MM-DD

                        const fechaActualFormateada = new Date().toISOString().slice(0, 10)

                        // Cargar las reservas ya realizadas para el espacio
                        //console.log(unidadesData[0].id_espacio_reservable_unidad)
                        const reservasDelEspacio = await reservaServicioService.getHorasReservadasPorServicioPorFecha( id, fechaActualFormateada, user.id_club );
                        
                        setListaHorariosYasReservados((reservasDelEspacio || []).map(reserva => {
                            return {
                                id_servicio_reservable_empresa: reserva.id_servicio_reservable_empresa,
                                horaReserva: reserva.hora_reserva.slice(0, 2), // Extrae solo la hora en formato HH:mm
                                fecha: fechaActualFormateada
                            };
                        }));                        
                    }
                    

                } catch (error) {
                    console.error('Error fetching data:', error);
                    setServicio(null); // Si hay un error, establecemos comercio como null
                    setEmpresasReservadoras([]); // Si hay un error, establecemos productos como un array vacío
                } finally {
                    setLoading(false);
                }
                 // Finaliza la carga de datos
            };
            fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (unidadSeleccionada != unidad.id_servicio_reservable_empresa) {
            // Si no, la seleccionamos
            setUnidadSeleccionada(unidad.id_servicio_reservable_empresa);
            setCosteReserva(unidad.costo_servicio);
            setListaHorariosSeleccionados([]); // Limpiar la selección de horarios al cambiar de unidad

            setHoraApertura(unidad.hora_apertura_servicio)
            setHoraCierre(unidad.hora_cierre_servicio);

            setListaHorariosYaReservadosPorEmpresa((listaHorariosYaReservados || []).filter(reserva => reserva.id_servicio_reservable_empresa === unidad.id_servicio_reservable_empresa));
        }
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
            const reservacionesParaLaFecha = await reservaServicioService.getHorasReservadasPorServicioPorFecha(
                id, 
                new Date(selectedYear, selectedMonth, selectedDate).toISOString().slice(0, 10), 
                user.id_club
            );

            const empresaSeleccionada = empresasReservadoras.find(e => e.id_servicio_reservable_empresa === unidadSeleccionada);
            const cantidadTrabajadores = empresaSeleccionada?.cantidad_trabajadores || 1;

            // console.log('Reservaciones para la fecha:', reservacionesParaLaFecha);
            // console.log('Cantidad de trabajadores:', cantidadTrabajadores);
            // console.log('Empresa seleccionada:', empresaSeleccionada);

            setListaHorarios(currentHorarios =>
                currentHorarios.map(horario => {
                    const reservasEnEstaHora = reservacionesParaLaFecha.filter(
                        reserva =>
                            reserva.hora_reserva.slice(0, 2) === horario.hora24 &&
                            reserva.id_servicio_reservable_empresa === unidadSeleccionada
                    ).length;

                    const isReserved = reservasEnEstaHora >= cantidadTrabajadores;

                    return {
                        ...horario,
                        estado: isReserved ? 'reservado' : 'disponible'
                    };
                })
            )
        }

        actualizarHorarios();
        
    },[selectedDate, selectedMonth, selectedYear, listaHorariosYaReservados, listaHorariosYaReservadosPorEmpresa, unidadSeleccionada] )


    const handleConfirmarReserva = async () => {
        setLoading(true);
        try {
            const fechaReserva = new Date(selectedYear, selectedMonth, selectedDate);
            const horariosReserva = listaHorariosSeleccionados.map(hora => {
                const horaInt = parseInt(hora, 10);
                return `${horaInt.toString().padStart(2, '0')}:00`;
            });

            const datosCompletosReserva = {
                id_usuario: user.id_usuario,
                reservaServicioData: {
                    id_servicio_reservable : servicio.id_servicio_reservable,
                    id_servicio_reservable_empresa: unidadSeleccionada,
                    fecha_reservacion: fechaReserva.toISOString(),
                    nota: notaReserva,
                    coste_total: totalReserva,
                    id_socio: user?.id_socio || null, // Asegúrate de que el usuario esté autenticado
                },
                transaccionData: {
                    id_billetera: user.id_billetera, 
                    id_tipo_transaccion: TIPOS_TRANSACCION.SERVICIO, 
                    monto: totalReserva
                },
                listaHoras: horariosReserva
            }
            
            //console.log('Datos de reserva:', datosCompletosReserva);



            const response = await reservaServicioService.createReservaServicio(datosCompletosReserva);
            console.log('Respuesta de la reserva:', response);

            if(response){
                actualizarSaldoBilletera();

                setShowExitosoModal(true); // Mostrar modal de éxito
                setShowServicioReservaModal(false); // Cerrar el modal de reserva
            }

        }catch (error) {
            console.error('Error al confirmar la reserva:', error);
        }
        finally {
            setLoading(false);
            // Limpiar los estados después de la reserva
            setListaHorariosSeleccionados([]);
            setNotaReserva('');

            // Actualizar la lista de horarios reservados
            const fechaReserva = new Date(selectedYear, selectedMonth, selectedDate).toISOString().slice(0, 10);
            
            const reservacionesServicioFecha = await reservaServicioService.getHorasReservadasPorServicioPorFecha(id, fechaReserva, user.id_club);
            setListaHorariosYasReservados((reservacionesServicioFecha || []).map(reserva => {
                return {
                    id_servicio_reservable_empresa: reserva.id_servicio_reservable_empresa,
                    horaReserva: reserva.hora_reserva.slice(0, 2), // Extrae solo la hora en formato HH:mm
                    fecha: fechaReserva
                };
            }));



            setTimeout(() => {
                setShowExitosoModal(false); // Cerrar modal de éxito después de 2
            }, 2000);

        }
    }

    const handleCloseModal = () => {

        setShowServicioReservaModal(false); // Cerrar el modal de reserva
    }


        return (
            <View style={styles.container}>
                <ExitosoModal
                    visible={showExitosoModal}
                    mensaje="¡Reserva realizada con éxito!"
                />
                <ServicioReservaModal
                    visible={showServicioReservaModal}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmarReserva}
                    servicio={servicio}
                    empresaSeleccionada={empresasReservadoras.find(e => e.id_servicio_reservable_empresa === unidadSeleccionada)}
                    fecha={new Date(selectedYear, selectedMonth, selectedDate)}
                    horarios={listaHorariosSeleccionados}
                    costeTotal={totalReserva}
                    nota={notaReserva}
                    setNota={setNotaReserva}
                />
                <LoadingModal visible={loading} />
                <View style={styles.header}>
                    <ButtonVolver onPress={() => navigation.goBack()} style={styles.botonVolver} />
                    <Text style={styles.headerTitle}>{servicio ? servicio.nombre_servicio_reservable : ''}</Text>
                    <Text style={styles.headerDescription}>{servicio?.descripcion}</Text>
                    {costeReserva > 0 && (
                        <Text style={styles.costText}>{costeReserva}$/hora</Text>
                    )}
                </View>
                <ScrollView style={styles.mainContent}>
                    <SelectorDeEmpresaReservadora
                        empresasReservadoras={empresasReservadoras}
                        unidadSeleccionada={unidadSeleccionada}
                        handleUnidadSeleccionada={handleUnidadSeleccionada}
                    />
                    <View style={styles.section}>
                        <View style={styles.dateSelectors}>
                            {/* Month Picker */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {monthOptions.map(month => (
                                    <TouchableOpacity
                                        key={month.value}
                                        style={[styles.calendarDay, selectedMonth === month.value && styles.calendarDaySelected]}
                                        onPress={() => {
                                            setSelectedMonth(month.value);
                                            setSelectedDate(1);
                                            setListaHorariosSeleccionados([]);
                                        }}
                                    >
                                        <Text>{month.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            {/* Year Picker (disabled, only current year) */}
                            <View style={[styles.calendarDay, { opacity: 0.5 }]}> 
                                <Text>{currentYear}</Text>
                            </View>
                        </View>
                        <View style={styles.calendarGrid}>
                            {daysOfWeek.map(day => (
                                <View key={day} style={styles.calendarDay}><Text>{day}</Text></View>
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
                                        onPress={() => !isPastDate && handleDateClick(date)}
                                        disabled={isPastDate}
                                    >
                                        <Text>{date}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Horario</Text>
                        <View style={styles.timeRange}>
                            <Text style={styles.timeValue}>{formatearHora(horaApertura)}</Text>
                            <Text style={styles.timeSeparator}>-</Text>
                            <Text style={styles.timeValue}>{formatearHora(horaCierre)}</Text>
                        </View>
                        <SelectorHorario
                            listaHorarios={listaHorarios}
                            listaHorariosSeleccionados={listaHorariosSeleccionados}
                            handleSelectHour={handleSelectHour}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.proceedButton, isBotonReservarDisabled && styles.proceedButtonDisabled]}
                    disabled={isBotonReservarDisabled}
                    onPress={() => setShowServicioReservaModal(true)}
                >
                    <Text style={styles.proceedButtonText}>
                        {totalReserva > 0 ? `Reservar por $${totalReserva}` : 'Reservar'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
}

const SelectorDeEmpresaReservadora = ({ empresasReservadoras, unidadSeleccionada, handleUnidadSeleccionada }) => {
    if (!empresasReservadoras.length) return null;
    return (
        <View style={styles.unidadesList}>
            <Text style={styles.sectionTitle}>Seleccionables</Text>
            {empresasReservadoras.map(unidad => (
                <TouchableOpacity
                    key={unidad.id_servicio_reservable_empresa}
                    style={[styles.unidadItem, unidadSeleccionada == unidad.id_servicio_reservable_empresa && styles.unidadItemActive]}
                    onPress={() => handleUnidadSeleccionada(unidad)}
                >
                    <View style={styles.unidadInfo}>
                        <View>
                            <Text style={styles.unidadTitle}>{unidad.nombre_comercio}</Text>
                            <Text style={styles.unidadCapacity}>Capacidad: {unidad.capacidad}</Text>
                        </View>
                        <Text style={styles.unidadCost}>{unidad.costo_servicio > 0 ? `${unidad.costo_servicio}$` : 'Sin Coste'}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const SelectorHorario = ({ listaHorarios, listaHorariosSeleccionados, handleSelectHour }) => {
    return (
        <View style={styles.timeSelectors}>
            {listaHorarios.map(horario => {
                const isActive = listaHorariosSeleccionados.includes(horario.hora24);
                const isReserved = horario.estado === 'reservado';
                return (
                    <TouchableOpacity
                        key={horario.hora24}
                        style={[
                            styles.timeSelectorsItem,
                            isActive && styles.timeSelectorsItemActive,
                            isReserved && styles.timeSelectorsItemReserved,
                        ]}
                        onPress={() => {
                            if (!isReserved) handleSelectHour(horario.hora24);
                        }}
                        disabled={isReserved}
                    >
                        <Text style={[styles.timeSelectorsText, isActive && styles.timeSelectorsTextActive]}>
                            {horario.ampm === horario.ampmNexHora
                                ? `${horario.hora} - ${horario.nexHora} ${horario.ampm}`
                                : `${horario.hora}${horario.ampm} - ${horario.nexHora}${horario.ampmNexHora}`}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};