
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../../components/modals/LoadingModal';
import { useAuth } from '../../src/context/AuthContext';
import FormatearFecha from '../../src/utils/FormatearFecha';
import userImagePlaceholder from '../../assets/images/user_placeholder.svg';
import PerfilStyles from './Perfil.styles';

export default function Perfil() {
    const [activeDiv, setActiveDiv] = useState(0);
    const navigation = useNavigation();
    const { user, logout, loading } = useAuth();

    const handleDivClick = (index) => {
        if (index >= 1 && index <= 5) {
            setActiveDiv(activeDiv === index ? 0 : index);
        } else {
            if (index === 6) {
                navigation.navigate('EditarPerfil');
            } else if (index === 7) {
                alert('Funcionalidad de cambiar clave en desarrollo.');
            } else if (index === 8) {
                handleUserLogout();
            } else if (index === 9) {
                navigation.navigate('Beneficiarios');
            }
            setActiveDiv(0);
        }
    };

    const handleUserLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    return (
        <ScrollView>
            <LoadingModal visible={loading} />
            <View style={{ padding: 16 }}>
                <View style={PerfilStyles.perfilHeader}>
                    <View style={PerfilStyles.profilePhotoContainer}>
                        <Image
                            source={user.avatar ? { uri: user.avatar } : userImagePlaceholder}
                            style={PerfilStyles.profilePhoto}
                        />
                    </View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>{user.nombre} {user.apellido}</Text>
                    <Text style={PerfilStyles.profileMail}>Acción: {user.id_usuario}</Text>
                </View>
                <View style={PerfilStyles.profileInfoContainer}>
                    <View style={PerfilStyles.profileInfo}>
                        {/* Nombre y Apellido */}
                        <View style={PerfilStyles.infoItem}>
                            <TouchableOpacity style={PerfilStyles.faqs} onPress={() => handleDivClick(1)}>
                                <View style={PerfilStyles.faqHead}>
                                    <Text style={PerfilStyles.labelInfo}>Nombre y Apellido</Text>
                                    {/* Aquí puedes agregar un icono de flecha si tienes vector-icons */}
                                </View>
                                {activeDiv === 1 && (
                                    <View style={PerfilStyles.faqContent}>
                                        <Text>{user.nombre} {user.apellido}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        {/* Cédula */}
                        <View style={PerfilStyles.infoItem}>
                            <TouchableOpacity style={PerfilStyles.faqs} onPress={() => handleDivClick(2)}>
                                <View style={PerfilStyles.faqHead}>
                                    <Text style={PerfilStyles.labelInfo}>Cédula</Text>
                                </View>
                                {activeDiv === 2 && (
                                    <View style={PerfilStyles.faqContent}>
                                        <Text>V{user.documento_identidad}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        {/* Teléfono */}
                        <View style={PerfilStyles.infoItem}>
                            <TouchableOpacity style={PerfilStyles.faqs} onPress={() => handleDivClick(3)}>
                                <View style={PerfilStyles.faqHead}>
                                    <Text style={PerfilStyles.labelInfo}>Teléfono</Text>
                                </View>
                                {activeDiv === 3 && (
                                    <View style={PerfilStyles.faqContent}>
                                        <Text>{user.telefono}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        {/* Dirección */}
                        <View style={PerfilStyles.infoItem}>
                            <TouchableOpacity style={PerfilStyles.faqs} onPress={() => handleDivClick(4)}>
                                <View style={PerfilStyles.faqHead}>
                                    <Text style={PerfilStyles.labelInfo}>Dirección</Text>
                                </View>
                                {activeDiv === 4 && (
                                    <View style={PerfilStyles.faqContent}>
                                        <Text>{user.direccion}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        {/* Fecha de Nacimiento */}
                        <View style={PerfilStyles.infoItem}>
                            <TouchableOpacity style={PerfilStyles.faqs} onPress={() => handleDivClick(5)}>
                                <View style={PerfilStyles.faqHead}>
                                    <Text style={PerfilStyles.labelInfo}>Fecha de Nacimiento</Text>
                                </View>
                                {activeDiv === 5 && (
                                    <View style={PerfilStyles.faqContent}>
                                        <Text>{FormatearFecha(user.fecha_nacimiento)}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        {/* Beneficiarios */}
                        <TouchableOpacity style={[PerfilStyles.infoItem, { paddingVertical: 16 }]} onPress={() => handleDivClick(9)}>
                            <Text style={[PerfilStyles.labelInfo, PerfilStyles.pass]}>Beneficiarios</Text>
                        </TouchableOpacity>
                        {/* Editar Perfil */}
                        <TouchableOpacity style={[PerfilStyles.infoItem, { paddingVertical: 16 }]} onPress={() => handleDivClick(6)}>
                            <Text style={[PerfilStyles.labelInfo, PerfilStyles.pass]}>Editar Perfil</Text>
                        </TouchableOpacity>
                        {/* Cambiar Clave */}
                        <TouchableOpacity style={[PerfilStyles.infoItem, { paddingVertical: 16 }]} onPress={() => handleDivClick(7)}>
                            <Text style={[PerfilStyles.labelInfo, PerfilStyles.pass]}>Cambiar Clave</Text>
                        </TouchableOpacity>
                        {/* Cerrar Sesión */}
                        <TouchableOpacity style={[PerfilStyles.infoItem, { paddingVertical: 16 }]} onPress={() => handleDivClick(8)}>
                            <Text style={[PerfilStyles.labelInfo, PerfilStyles.exit]}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}