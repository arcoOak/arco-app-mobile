
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRTokenService from '../../src/services/qrtoken.service';
import InvitacionesQRService from '../../src/services/invitaciones_correo.service';
import { useAuth } from '../../src/context/AuthContext';
import InvitacionQR from './InvitacionQr';
import ExitosoModal from '../../components/modals/ExitosoModal';
import Button from '../../components/buttons/Button';
import styles from './LecturaQr.styles';

import perfilImage from '../../assets/images/perfil.jpg';

function LecturaQr() {
    const { user, isDarkTheme } = useAuth();
    const [qrTokenValue, setQrTokenValue] = useState(null);
    const [qrTokenInvitado, setQrTokenInvitado] = useState('');
    const [showInvitacionQr, setShowInvitacionQr] = useState(false);
    const [showExitosoModal, setShowExitosoModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        let isMounted = true;
        const fetchQrToken = async () => {
            try {
                const newToken = await QRTokenService.generarTokenQr(user.id_usuario, user.id_rol);
                if (isMounted && newToken && newToken.token) {
                    setQrTokenValue(newToken.token);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchQrToken();
        return () => {
            isMounted = false;
        };
    }, [user]);

    const handleShowInvitacionQr = async (invitado) => {
        let response;
        try {
            if (invitado && invitado.type === 'beneficiarios') {
                response = await QRTokenService.generarTokenQrFamiliar(user.id_usuario, 3, invitado.data.id_familiar);
                await InvitacionesQRService.enviarInvitacionQr(user.id_usuario, 3, invitado.data);
            } else if (invitado && invitado.type === 'nuevo-invitado') {
                response = await QRTokenService.generarTokenQrInvitado(user.id_usuario, 4, invitado.data);
                await InvitacionesQRService.enviarInvitacionQr(user.id_usuario, 4, invitado.data);
            }
            setShowExitosoModal(true);
            setTimeout(() => {
                setShowExitosoModal(false);
            }, 2000);
            setQrTokenInvitado(response.token);
        } catch (error) {
            console.error('Error al generar el token QR o enviar la invitación:', error);
            return;
        } finally {
            setShowInvitacionQr(false);
        }
    };

    return (
        <View style={styles.container}>
            <ExitosoModal
                visible={showExitosoModal}
                mensaje={'Invitación enviada exitosamente'}
            />
            <InvitacionQR
                visible={showInvitacionQr}
                onClose={() => setShowInvitacionQr(false)}
                onConfirm={handleShowInvitacionQr}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={styles.qrCodeBox}>
                    <View style={styles.qrCodeInfo}>
                        <Image
                            source={user?.foto_perfil ? { uri: user.foto_perfil } : perfilImage}
                            style={styles.profilePhoto}
                            resizeMode="cover"
                        />
                        <Text style={[styles.pageTitle, isDarkTheme && styles.pageTitleDark]}>Tu Código QR</Text>
                        <Text style={[styles.mb2, styles.pageTitle]}>{user?.nombre + ' ' + user?.apellido || 'Usuario'}</Text>
                        <Text style={styles.qrCodeBoxText}>Escanea este código para ingresar:</Text>
                    </View>
                    {loading ? (
                        <View style={styles.qrLoading}>
                            <ActivityIndicator size="large" color="#666" />
                            <Text style={styles.qrLoadingText}>Cargando...</Text>
                        </View>
                    ) : qrTokenValue ? (
                        <View style={styles.qrCode}>
                            <QRCode value={qrTokenValue} size={256} />
                        </View>
                    ) : (
                        <View style={styles.qrLoading}>
                            <Text style={styles.qrLoadingText}>No se pudo generar el código QR.</Text>
                        </View>
                    )}
                    <Text style={[styles.mt2, styles.textMuted]}>Tú Código QR es privado</Text>
                    <View style={styles.qrCodeActions}>
                        <Button
                            onPress={() => setShowInvitacionQr(true)}
                            style={styles.reservaModalButton}
                        >
                            Enviar Invitación
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default LecturaQr;