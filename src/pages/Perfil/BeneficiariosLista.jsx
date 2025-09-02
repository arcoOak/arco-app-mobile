/////////////////
/*
NOTAS


Se ha de agregar el limitador de beneficiarios por socio
Esto va de la mano con la tabla data_configuracion_club



*/ 


// src/components/FamilyMembersListScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import LoadingModal from '../../../components/modals/LoadingModal';
import ExitosoModal from '../../../components/modals/ExitosoModal';
import ModalFormulario from '../../../components/modals/ModalFormulario'; // NOTA: migrar a nativo si es necesario
import ConfirmarModal from '../../../components/modals/ConfirmarModal';
import Button from '../../../components/buttons/Button';
import FormatearFecha from '../../utils/FormatearFecha';
import dataService from '../../services/data_db.service';
import familiaresService from '../../services/familiares.service';
import { useAuth } from '../../context/AuthContext';
import ButtonVolver from '../../../components/buttons/ButtonVolver';
import BeneficiariosListaStyles from './BeneficiariosLista.styles';



export default function BeneficiariosLista() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [parentescos, setParentescos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const [showConfirmarModal, setShowConfirmarModal] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [dataBeneficiarioNuevo, setDataBeneficiarioNuevo] = useState({
        id_familiar: '',
        id_usuario: user.id_usuario,
        nombre: '',
        apellido: '',
        documento_identidad: '',
        fecha_nacimiento: '',
        id_genero: '',
        telefono: '',
        direccion: '',
        id_parentesco: ''
    });
    const [familiarIdToDelete, setFamiliarIdToDelete] = useState(null);
    const [showFormularioModal, setShowFormularioModal] = useState(false);
    const API_HOST = process.env.EXPO_PUBLIC_API_HOST || process.env.API_HOST;

    useEffect(() => {
        setLoading(true);
        if (!user) return;
        const fetchInitialData = async () => {
            try {
                const [beneficiariesData, generosData, parentescosData] = await Promise.all([
                    familiaresService.getBeneficiariosBySocioId(user.id_usuario),
                    dataService.getGeneros(),
                    dataService.getParentescos()
                ]);
                setBeneficiaries(beneficiariesData);
                setGeneros(generosData);
                setParentescos(parentescosData);
            } catch (err) {
                console.error('Error al cargar datos iniciales:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (showExitosoModal) {
            const timer = setTimeout(() => {
                setShowExitosoModal(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showExitosoModal]);

    const handleCloseModal = () => {
        setShowFormularioModal(false);
    };

    const handleAddMemberClick = () => {
        setDataBeneficiarioNuevo({
            id_familiar: '',
            id_usuario: user.id_usuario,
            nombre: '',
            apellido: '',
            documento_identidad: '',
            fecha_nacimiento: '',
            id_genero: '',
            telefono: '',
            direccion: '',
            id_parentesco: ''
        });
        setModalMode('add');
        setShowFormularioModal(true);
    };

    const handleEditMember = (familiar_id) => {
        const beneficiarioEditable = beneficiaries.find(b => b.id_familiar === familiar_id);
        if (beneficiarioEditable) {
            setDataBeneficiarioNuevo({ ...beneficiarioEditable, id_familiar: familiar_id });
        }
        setModalMode('edit');
        setShowFormularioModal(true);
    };

    const handleChange = (name, value) => {
        setDataBeneficiarioNuevo(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDeleteMember = (familiar_id) => {
        setShowConfirmarModal(true);
        setFamiliarIdToDelete(familiar_id);
    };

    const handleConfirmacion = (confirmar) => {
        setShowConfirmarModal(false);
        if (confirmar) {
            EliminarBeneficiario(familiarIdToDelete);
        }
    };

    const EliminarBeneficiario = async (familiar_id) => {
        try {
            const response = await fetch(`${API_HOST}/api/familiares/${familiar_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el beneficiario. Código: ' + response.status);
            }
            setBeneficiaries(prev => prev.filter(b => b.id_familiar !== familiar_id));
            setShowExitosoModal(true);
        } catch (error) {
            console.error('Error al eliminar beneficiario:', error);
            // Puedes mostrar un Toast aquí si lo deseas
        }
    };

    const AnadirBeneficiario = async (data) => {
        try {
            const response = await fetch(`${API_HOST}/api/familiares`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el beneficiario. Código: ' + response.status);
            }
            const newBeneficiary = await response.json();
            setBeneficiaries(prev => [...prev, newBeneficiary]);
            setShowExitosoModal(true);
        } catch (error) {
            console.error('Error al agregar beneficiario:', error);
        }
        handleCloseModal();
    };

    const EditarBeneficiario = async (data) => {
        const { id_familiar, nombre, apellido, documento_identidad, fecha_nacimiento, id_genero, telefono, direccion, id_parentesco } = data;
        const dataRequerida = { nombre, apellido, documento_identidad, fecha_nacimiento, id_genero, telefono, direccion, id_parentesco };
        try {
            const response = await fetch(`${API_HOST}/api/familiares/${id_familiar}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataRequerida),
            });
            if (!response.ok) {
                throw new Error('Error al editar el beneficiario. Código: ' + response.status);
            }
            const updatedBeneficiary = await response.json();
            setBeneficiaries(prev => prev.map(b => b.id_familiar === updatedBeneficiary.id_familiar ? updatedBeneficiary : b));
            setShowExitosoModal(true);
        } catch (error) {
            console.error('Error al editar beneficiario:', error);
        }
        handleCloseModal();
    };

    return (
        <ScrollView>
            <LoadingModal visible={loading}>Cargando...</LoadingModal>
            <ConfirmarModal onConfirm={() => handleConfirmacion(true)} onCancel={() => handleConfirmacion(false)} visible={showConfirmarModal} />
            <ExitosoModal visible={showExitosoModal} />
            <ButtonVolver to="Perfil" style={{ marginBottom: 16 }} />
            <View style={BeneficiariosListaStyles.container}>
                <View style={BeneficiariosListaStyles.header}>
                    <Text style={BeneficiariosListaStyles.headerTitle}>Mis Beneficiarios</Text>
                </View>
                <View style={BeneficiariosListaStyles.membersGrid}>
                    {beneficiaries.map((member) => (
                        <View key={member.id_familiar} style={BeneficiariosListaStyles.memberCard}>
                            <Image
                                source={member.photo ? { uri: member.photo } : require('../../assets/user_placeholder.png')}
                                style={BeneficiariosListaStyles.memberPhoto}
                            />
                            <View style={BeneficiariosListaStyles.memberDetails}>
                                <Text style={BeneficiariosListaStyles.memberDetailsH3}>{member.nombre} {member.apellido}</Text>
                                <Text style={BeneficiariosListaStyles.memberDetailsP}>C.I.: {member.documento_identidad}</Text>
                                <Text style={BeneficiariosListaStyles.memberDetailsP}>Año Nac.: {FormatearFecha(member.fecha_nacimiento)}</Text>
                                <Text style={BeneficiariosListaStyles.memberDetailsP}>Parentesco: {member.nombre_parentesco}</Text>
                            </View>
                            {/* QR code: requiere integración con react-native-qrcode-svg o similar */}
                            {/* member.qrCodeData && (
                                <View style={BeneficiariosListaStyles.qrCodeContainer}>
                                    <QRCode value={member.qrCodeData} size={70} />
                                </View>
                            ) */}
                            <View style={BeneficiariosListaStyles.memberActions}>
                                <TouchableOpacity onPress={() => handleEditMember(member.id_familiar)}>
                                    <Text style={{ color: '#6c63ff', fontSize: 20 }}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteMember(member.id_familiar)}>
                                    <Text style={{ color: '#f44336', fontSize: 20 }}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={BeneficiariosListaStyles.addMemberButtonContainer}>
                    <Button
                        onPress={handleAddMemberClick}
                        style={BeneficiariosListaStyles.addMemberButton}
                    >
                        Agregar Nuevo
                    </Button>
                </View>
            </View>
            {/* ModalFormulario y lógica de formulario deben migrarse a componentes nativos si es necesario */}
            {/*
            <ModalFormulario
                onClose={handleCloseModal}
                onSubmit={() =>
                    modalMode === 'add'
                        ? AnadirBeneficiario(dataBeneficiarioNuevo)
                        : EditarBeneficiario(dataBeneficiarioNuevo)
                }
                visible={showFormularioModal}
                titulo={modalMode === 'add' ? 'Agregar Beneficiario' : 'Editar Beneficiario'}
                data={dataBeneficiarioNuevo}
            >
                ...inputs nativos aquí...
            </ModalFormulario>
            */}
        </ScrollView>
    );
}