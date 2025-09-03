
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import TermsStyles from './TermsOfUse.styles';

const TermsOfUse = () => {
    return (
        <ScrollView style={TermsStyles.termsContainer} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={TermsStyles.termsContent}>
                <Text style={TermsStyles.termsTitle}>Términos de Uso</Text>
                <Text style={TermsStyles.termsContentP}>
                    Al usar nuestra aplicación, aceptas los siguientes términos y condiciones. Lee cuidadosamente antes de continuar.
                </Text>
                <Text style={TermsStyles.termsContentH2}>1. Aceptación de los términos</Text>
                <Text style={TermsStyles.termsContentP}>
                    Al acceder y utilizar nuestra aplicación, estás aceptando cumplir con estos términos. Si no estás de acuerdo, no deberías usar la app.
                </Text>
                <Text style={TermsStyles.termsContentH2}>2. Uso adecuado</Text>
                <Text style={TermsStyles.termsContentP}>
                    No debes usar la aplicación para fines ilegales, distribuir contenido no autorizado o violar los derechos de otros usuarios.
                </Text>
                <Text style={TermsStyles.termsContentH2}>3. Propiedad intelectual</Text>
                <Text style={TermsStyles.termsContentP}>
                    Todos los contenidos, logos y recursos de la aplicación están protegidos por derechos de autor. No está permitido copiarlos sin autorización.
                </Text>
                <Text style={TermsStyles.termsContentH2}>4. Cambios en los términos</Text>
                <Text style={TermsStyles.termsContentP}>
                    Podemos actualizar estos términos en cualquier momento. Te notificaremos de los cambios importantes dentro de la app o por correo.
                </Text>
                <Text style={TermsStyles.termsContentH2}>5. Cancelación de cuenta</Text>
                <Text style={TermsStyles.termsContentP}>
                    Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos sin previo aviso.
                </Text>
                <Text style={TermsStyles.termsFooter}>
                    Última actualización: 15 de julio de 2025
                </Text>
            </View>
        </ScrollView>
    );
};

export default TermsOfUse;
