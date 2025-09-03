
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import Button from '../../components/buttons/Button';
import familiaresService from '../../src/services/familiares.service';
import styles from './EspacioReservaModal.styles';

export default function ConfirmacionReservaModal({
    visible,
    onClose,
    onConfirm,
    espacio,
    unidadSeleccionada,
    fecha,
    horarios,
    costeTotal,
    nota,
    setNota,
    familiares,
    setFamiliares,
    invitados,
    setInvitados,
}) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [listaFamiliares, setListaFamiliares] = useState([]);
    const [showModalFormulario, setShowModalFormulario] = useState(false);
    const [dataInvitadoNuevo, setDataInvitadoNuevo] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        documento_identidad: '',
    });

    useEffect(() => {
        if (!visible) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const familiaresList = await familiaresService.getBeneficiariosBySocioId(user.id_usuario);
                setListaFamiliares(familiaresList);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [visible, user?.id_usuario]);

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatearHorarios = (horarios) => {
        if (!horarios || horarios.length === 0) return [];
        const sortedHorarios = [...horarios].sort((a, b) => a - b);
        const result = [];
        let startHour = parseInt(sortedHorarios[0]);
        let endHour = parseInt(sortedHorarios[0]);
        for (let i = 0; i < sortedHorarios.length; i++) {
            const currentHour = parseInt(sortedHorarios[i]);
            const nextHour = parseInt(sortedHorarios[i + 1]);
            if (currentHour + 1 === nextHour) {
                endHour = nextHour;
            } else {
                let formattedStart = `${startHour.toString().padStart(2, '0')}:00`;
                let formattedEnd = `${(endHour + 1).toString().padStart(2, '0')}:00`;
                if (endHour === 23) {
                    formattedEnd = '00:00';
                }
                result.push(`${formattedStart} - ${formattedEnd}`);
                if (nextHour !== undefined) {
                    startHour = nextHour;
                    endHour = nextHour;
                }
            }
        }
        return result;
    };

    const handleToggleFamiliar = (familiarReservacion, id_rol) => {
        const familiar = { id_familiar: familiarReservacion.id_familiar, id_rol, nombre: familiarReservacion.nombre, apellido: familiarReservacion.apellido, tipo: 'familiar' };
        if (!familiares.some(f => f.id_familiar === familiar.id_familiar)) {
            setFamiliares([...familiares, familiar]);
        } else {
            setFamiliares(familiares.filter(f => f.id_familiar !== familiar.id_familiar));
        }
    };

    const handleAnadirInvitado = (invitado) => {
        const invitadoUnidad = {
            key: invitados.length + 1,
            nombre: invitado.nombre,
            apellido: invitado.apellido,
            correo: invitado.correo,
            documento_identidad: invitado.documento_identidad,
        };
        setInvitados([...invitados, invitadoUnidad]);
    };

    const familiarYaAgregado = (familiar) => familiares.some(f => f.id_familiar === familiar.id_familiar);
    const invitadoYaAgregado = (documento_identidad) => invitados.some(inv => inv.documento_identidad === documento_identidad);

    const handleToggleModalFormulario = () => {
        setShowModalFormulario(!showModalFormulario);
        setDataInvitadoNuevo({ nombre: '', apellido: '', correo: '', documento_identidad: '' });
    };

    const handleCrearInvitado = async (formData) => {
        handleAnadirInvitado(formData);
        handleToggleModalFormulario();
    };

    const removeInvitado = (documento_identidad) => {
        setInvitados(invitados.filter(inv => inv.documento_identidad !== documento_identidad));
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '90%', maxWidth: 400 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>Confirmar Reserva</Text>
                        <View style={styles.modalContentBlock}>
                            <View style={{ marginBottom: 8 }}>
                                <Text><Text style={{ fontWeight: 'bold' }}>Espacio:</Text> {espacio?.nombre_espacio_reservable}</Text>
                                {unidadSeleccionada && (
                                    <Text><Text style={{ fontWeight: 'bold' }}>Unidad:</Text> {unidadSeleccionada.nombre_unidad}</Text>
                                )}
                            </View>
                            <View style={{ marginBottom: 8 }}>
                                <Text><Text style={{ fontWeight: 'bold' }}>Fecha:</Text> {formatearFecha(fecha)}</Text>
                                <Text style={{ fontWeight: 'bold' }}>Horarios:</Text>
                                {formatearHorarios(horarios).map((horario, index) => (
                                    <Text key={index} style={{ marginLeft: 8 }}>{horario}</Text>
                                ))}
                            </View>
                            <View style={{ marginBottom: 8 }}>
                                <Text><Text style={{ fontWeight: 'bold' }}>Coste Total:</Text> ${costeTotal}</Text>
                            </View>
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ fontWeight: 'bold' }}>Añadir una nota (opcional)</Text>
                                <TextInput
                                    value={nota}
                                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, minHeight: 60, marginTop: 4 }}
                                    onChangeText={setNota}
                                    placeholder="Instrucciones especiales, etc."
                                    multiline
                                />
                            </View>
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ fontWeight: 'bold' }}>Invitar Beneficiarios (opcional)</Text>
                                <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 4 }}>
                                    {listaFamiliares.length > 0 && listaFamiliares.map((familiar) => (
                                        <TouchableOpacity
                                            key={familiar.id_familiar}
                                            style={[{ padding: 8, borderRadius: 8, borderWidth: 1, marginRight: 8 }, familiarYaAgregado(familiar) && styles.seleccionado]}
                                            onPress={() => handleToggleFamiliar(familiar, 3)}
                                        >
                                            <Text style={familiarYaAgregado(familiar) ? styles.seleccionadoText : {}}>
                                                {familiar.nombre} {familiar.apellido}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={{ marginBottom: 8 }}>
                                {invitados.length > 0 && (
                                    <Text style={{ fontWeight: 'bold' }}>Invitados (opcional)</Text>
                                )}
                                <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 4 }}>
                                    {invitados.length > 0 && invitados.map((invitadoUnico, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[{ padding: 8, borderRadius: 8, borderWidth: 1, marginRight: 8 }, invitadoYaAgregado(invitadoUnico.documento_identidad) && styles.seleccionado]}
                                            onPress={() => removeInvitado(invitadoUnico.documento_identidad)}
                                        >
                                            <Text style={invitadoYaAgregado(invitadoUnico.documento_identidad) ? styles.seleccionadoText : {}}>
                                                {invitadoUnico.nombre} {invitadoUnico.apellido}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <Button
                                    style={{ marginTop: 8, alignSelf: 'flex-start' }}
                                    onPress={handleToggleModalFormulario}
                                >
                                    Añadir Invitado
                                </Button>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                            <Button
                                style={{ flex: 1, marginRight: 8 }}
                                onPress={onConfirm}
                                disabled={loading}
                            >
                                {loading ? 'Procesando...' : 'Confirmar'}
                            </Button>
                            <Button
                                style={{ flex: 1 }}
                                onPress={onClose}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                        </View>
                        {/* Modal para crear invitado */}
                        {showModalFormulario && (
                            <Modal visible={showModalFormulario} transparent animationType="slide">
                                <View style={styles.modalOverlay}>
                                    <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '90%', maxWidth: 400 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Crear Invitado</Text>
                                        <TextInput
                                            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
                                            value={dataInvitadoNuevo.nombre}
                                            onChangeText={text => setDataInvitadoNuevo({ ...dataInvitadoNuevo, nombre: text })}
                                            placeholder="Nombre"
                                        />
                                        <TextInput
                                            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
                                            value={dataInvitadoNuevo.apellido}
                                            onChangeText={text => setDataInvitadoNuevo({ ...dataInvitadoNuevo, apellido: text })}
                                            placeholder="Apellido"
                                        />
                                        <TextInput
                                            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
                                            value={dataInvitadoNuevo.documento_identidad}
                                            onChangeText={text => setDataInvitadoNuevo({ ...dataInvitadoNuevo, documento_identidad: text })}
                                            placeholder="Cédula de Identidad"
                                            keyboardType="numeric"
                                        />
                                        <TextInput
                                            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
                                            value={dataInvitadoNuevo.correo}
                                            onChangeText={text => setDataInvitadoNuevo({ ...dataInvitadoNuevo, correo: text })}
                                            placeholder="Correo"
                                            keyboardType="email-address"
                                        />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                                            <Button
                                                style={{ flex: 1, marginRight: 8 }}
                                                onPress={() => handleCrearInvitado(dataInvitadoNuevo)}
                                            >
                                                Guardar
                                            </Button>
                                            <Button
                                                style={{ flex: 1 }}
                                                onPress={handleToggleModalFormulario}
                                            >
                                                Cancelar
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

