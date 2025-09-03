import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './Notifications.styles';

export default function Notifications() {
    return (
        <View style={styles.notificationContainer}>
            <View>
                <View style={styles.notificationHeader}>
                    <Text style={[styles.notificationHeaderTitle, { fontSize: 22, fontWeight: 'bold' }]}>Enterate sobre asuntos importantes</Text>
                    <Text style={{ fontSize: 16, color: '#666' }}>Te notificaremos cuando</Text>
                </View>
                <View style={styles.notificationContain}>
                    <View style={styles.notificationItem}>
                        <Icon name="calendar-day" size={20} color="#6c63ff" style={styles.notificationItemIcon} />
                        <Text>Tu pago esté próximo a vencer</Text>
                    </View>
                    <View style={styles.notificationItem}>
                        <Icon name="credit-card" size={20} color="#6c63ff" style={styles.notificationItemIcon} />
                        <Text>Hagas una compra</Text>
                    </View>
                    <View style={styles.notificationItem}>
                        <Icon name="gift" size={20} color="#6c63ff" style={styles.notificationItemIcon} />
                        <Text>Tengas recompensas</Text>
                    </View>
                    <View style={styles.notificationItem}>
                        <Icon name="user" size={20} color="#6c63ff" style={styles.notificationItemIcon} />
                        <Text>Acceda cualquier miembro</Text>
                    </View>
                    <View style={styles.notificationItem}>
                        <Icon name="bacon" size={20} color="#6c63ff" style={styles.notificationItemIcon} />
                        <Text>Una Orden de comida esté lista</Text>
                    </View>
                </View>
            </View>
            <View style={styles.notificationSettings}>
                <Text style={{ marginBottom: 12 }}>Puedes ajustar esta configuración en otro momento</Text>
                <View style={styles.notificationSettingsRow}>
                    <TouchableOpacity style={[styles.notificationSettingsButton, styles.notificationSettingsButtonGray]}>
                        <Text style={{ color: '#fff', textAlign: 'center', padding: 10 }}>Luego</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.notificationSettingsButton, styles.notificationSettingsButtonBlue]}>
                        <Text style={{ color: '#fff', textAlign: 'center', padding: 10 }}>Permitir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}