
import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileForm from '../../components/ProfileForm';
import { useAuth } from '../../src/context/AuthContext';
import LoadingModal from '../../components/modals/LoadingModal';
import ExitosoModal from '../../components/modals/ExitosoModal';
import Button from '../../components/buttons/Button';
import userImagePlaceholder from '../../assets/images/user_placeholder.svg';
import ButtonVolver from '../../components/buttons/ButtonVolver';
import EditarPerfilStyles from './EditarPerfil.styles';

const EditarPerfil = () => {
    const { user, editarUsuario, loading } = useAuth();
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const navigation = useNavigation();
    const [profileData, setProfileData] = useState(user);

    const handleSaveProfile = async (updatedData) => {
        const success = await editarUsuario(updatedData);
        if (success) {
            setShowExitosoModal(true);
            setTimeout(() => {
                setShowExitosoModal(false);
                navigation.navigate('Perfil');
            }, 2000);
        }
    };

    const handleCancel = () => {
        navigation.navigate('Perfil');
    };

    const handleChangePhoto = () => {
        alert('Funcionalidad para cambiar foto en desarrollo.');
    };

    return (
        <ScrollView>
            <ExitosoModal visible={showExitosoModal} message="Perfil actualizado exitosamente" />
            <LoadingModal visible={loading} />
            <ButtonVolver to="Perfil" style={{ marginBottom: 16 }} />
            <View style={EditarPerfilStyles.container}>
                <View style={EditarPerfilStyles.header}>
                    <Text style={EditarPerfilStyles.headerTitle}>Editar Perfil</Text>
                </View>
                <View style={EditarPerfilStyles.photoSection}>
                    <Image
                        source={profileData.avatar ? { uri: profileData.avatar } : userImagePlaceholder}
                        style={EditarPerfilStyles.currentPhoto}
                    />
                    <Button style={EditarPerfilStyles.changePhotoButton} onPress={handleChangePhoto}>
                        {/* Aquí puedes agregar un icono si tienes vector-icons */}
                        Cambiar Foto
                    </Button>
                </View>
                <View style={{ width: '100%' }}>
                    <ProfileForm initialData={profileData} onSave={handleSaveProfile} onCancel={handleCancel} />
                </View>
            </View>
        </ScrollView>
    );
};

export default EditarPerfil;