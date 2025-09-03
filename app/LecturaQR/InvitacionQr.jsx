
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import familiaresService from '../../src/services/familiares.service';
import Button from '../../components/buttons/Button';
import styles from './InvitacionQr.styles';

const FORM_MODES = {
    BENEFICIARIOS: 'beneficiarios',
    NUEVO_INVITADO: 'nuevo-invitado',
};

export default function InvitacionQR({ visible, onConfirm, onClose }) {
    if (!visible) return null;
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [listaFamiliares, setListaFamiliares] = useState([]);
    const [formMode, setFormMode] = useState(FORM_MODES.BENEFICIARIOS);
    const [familiarSeleccionado, setFamiliarSeleccionado] = useState(null);
    const [nuevoInvitadoData, setNuevoInvitadoData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        documento_identidad: '',
    });

    useEffect(() => {
        if (!visible || !user?.id_usuario) return;
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true);
            try {
                const familiaresList = await familiaresService.getBeneficiariosBySocioId(user.id_usuario);
                if (isMounted) setListaFamiliares(familiaresList);
            } catch (error) {
                if (isMounted) console.error('Error fetching data:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [visible, user?.id_usuario]);

    const esCorreoValido = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
        return regex.test(correo);
    };

    const handleCloseAndReset = () => {
        setFamiliarSeleccionado(null);
        setFormMode(FORM_MODES.BENEFICIARIOS);
        setNuevoInvitadoData({
            nombre: '',
            apellido: '',
            correo: '',
            documento_identidad: '',
        });
        onClose();
    };

    const handleChangeNuevoInvitado = (name, value) => {
        setNuevoInvitadoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isNuevoInvitadoFormValid =
        nuevoInvitadoData.nombre.trim() !== '' &&
        nuevoInvitadoData.apellido.trim() !== '' &&
        nuevoInvitadoData.documento_identidad.trim() !== '' &&
        nuevoInvitadoData.correo.trim() !== '' &&
        esCorreoValido(nuevoInvitadoData.correo);

    const handleConfirm = () => {
        if (formMode === FORM_MODES.NUEVO_INVITADO) {
            if (!isNuevoInvitadoFormValid) return;
            onConfirm({
                type: FORM_MODES.NUEVO_INVITADO,
                data: nuevoInvitadoData,
            });
        } else if (formMode === FORM_MODES.BENEFICIARIOS && familiarSeleccionado) {
            onConfirm({
                type: FORM_MODES.BENEFICIARIOS,
                data: familiarSeleccionado,
            });
        }
        handleCloseAndReset();
    };

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.invitacionQrTitle}>Enviar Invitación</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.buttonFormMode, formMode === FORM_MODES.BENEFICIARIOS && styles.buttonFormModeActive]}
                        onPress={() => setFormMode(FORM_MODES.BENEFICIARIOS)}
                    >
                        <Text style={{ fontWeight: 'bold', color: formMode === FORM_MODES.BENEFICIARIOS ? '#fff' : undefined }}>Beneficiarios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonFormMode, formMode === FORM_MODES.NUEVO_INVITADO && styles.buttonFormModeActive]}
                        onPress={() => setFormMode(FORM_MODES.NUEVO_INVITADO)}
                    >
                        <Text style={{ fontWeight: 'bold', color: formMode === FORM_MODES.NUEVO_INVITADO ? '#fff' : undefined }}>Invitado</Text>
                    </TouchableOpacity>
                </View>
                {formMode === FORM_MODES.BENEFICIARIOS ? (
                    <BeneficiariosSelector
                        familiares={listaFamiliares}
                        selectedId={familiarSeleccionado?.id_familiar}
                        onSelect={setFamiliarSeleccionado}
                    />
                ) : (
                    <NuevoInvitadoForm
                        data={nuevoInvitadoData}
                        onChange={handleChangeNuevoInvitado}
                    />
                )}
                <View style={styles.actions}>
                    <Button
                        onPress={handleConfirm}
                        style={{ flex: 1 }}
                        disabled={
                            loading ||
                            (formMode === FORM_MODES.BENEFICIARIOS && !familiarSeleccionado) ||
                            (formMode === FORM_MODES.NUEVO_INVITADO && !isNuevoInvitadoFormValid)
                        }
                    >
                        {loading ? 'Procesando...' : 'Enviar'}
                    </Button>
                    <Button onPress={handleCloseAndReset} style={{ flex: 1 }} disabled={loading}>
                        Cancelar
                    </Button>
                </View>
            </View>
        </View>
    );
}

function BeneficiariosSelector({ familiares, selectedId, onSelect }) {
    const handleSelect = (familiar) => {
        if (selectedId === familiar.id_familiar) {
            onSelect(null);
        } else {
            onSelect(familiar);
        }
    };
    return (
        <View style={styles.formGroup}>
            <Text style={styles.formGroupTitle}>Beneficiarios</Text>
            <ScrollView style={styles.beneficiariosList}>
                {familiares.length > 0 ? (
                    familiares.map((familiar) => (
                        <TouchableOpacity
                            key={familiar.id_familiar}
                            style={[styles.beneficiarioBtn, selectedId === familiar.id_familiar && styles.beneficiarioBtnSelected]}
                            onPress={() => handleSelect(familiar)}
                        >
                            <Text style={{ fontWeight: selectedId === familiar.id_familiar ? 'bold' : 'normal' }}>
                                {familiar.nombre} {familiar.apellido}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>No se encontraron beneficiarios.</Text>
                )}
            </ScrollView>
        </View>
    );
}

function NuevoInvitadoForm({ data, onChange }) {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.formGroupTitle}>Datos del Invitado</Text>
            <TextInput
                style={styles.input}
                value={data.nombre}
                onChangeText={(text) => onChange('nombre', text)}
                placeholder="Nombre"
                autoCapitalize="words"
                required
            />
            <TextInput
                style={styles.input}
                value={data.apellido}
                onChangeText={(text) => onChange('apellido', text)}
                placeholder="Apellido"
                autoCapitalize="words"
                required
            />
            <TextInput
                style={styles.input}
                value={data.documento_identidad}
                onChangeText={(text) => onChange('documento_identidad', text)}
                placeholder="Cédula de Identidad"
                keyboardType="numeric"
                required
            />
            <TextInput
                style={styles.input}
                value={data.correo}
                onChangeText={(text) => onChange('correo', text)}
                placeholder="Correo"
                keyboardType="email-address"
                autoCapitalize="none"
                required
            />
        </View>

    );
}

