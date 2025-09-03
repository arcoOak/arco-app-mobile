
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PrivacyStyles from '../src/css/Privacy.styles';

const PrivacyPolicy = () => {
    return (
        <ScrollView style={PrivacyStyles.privacyContainer} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={PrivacyStyles.privacyContent}>
                <Text style={PrivacyStyles.privacyTitle}>Política de Privacidad</Text>
                <Text style={PrivacyStyles.privacyContentP}>
                    En nuestra aplicación, tu privacidad es muy importante. Esta política explica qué datos recopilamos, cómo los usamos y tus derechos al respecto.
                </Text>
                <Text style={PrivacyStyles.privacyContentH2}>1. Información que recopilamos</Text>
                <Text style={PrivacyStyles.privacyContentP}>
                    Recopilamos información básica como tu nombre, correo electrónico y actividad dentro de la aplicación con el fin de mejorar la experiencia del usuario.
                </Text>
                <Text style={PrivacyStyles.privacyContentH2}>2. Uso de la información</Text>
                <Text style={PrivacyStyles.privacyContentP}>
                    Usamos tus datos para personalizar el contenido, mejorar el rendimiento del sistema y ofrecer soporte técnico cuando sea necesario.
                </Text>
                <Text style={PrivacyStyles.privacyContentH2}>3. Compartir datos</Text>
                <Text style={PrivacyStyles.privacyContentP}>
                    No compartimos tu información personal con terceros, excepto cuando sea requerido por la ley o con tu consentimiento explícito.
                </Text>
                <Text style={PrivacyStyles.privacyContentH2}>4. Seguridad</Text>
                <Text style={PrivacyStyles.privacyContentP}>
                    Implementamos medidas de seguridad para proteger tus datos contra accesos no autorizados y pérdidas accidentales.
                </Text>
                <Text style={PrivacyStyles.privacyContentH2}>5. Tus derechos</Text>
                <Text style={PrivacyStyles.privacyContentP}>
                    Puedes acceder, corregir o eliminar tu información personal contactando con nuestro equipo de soporte.
                </Text>
                <Text style={PrivacyStyles.privacyFooter}>
                    Última actualización: 15 de julio de 2025
                </Text>
            </View>
        </ScrollView>
    );
};

export default PrivacyPolicy;
