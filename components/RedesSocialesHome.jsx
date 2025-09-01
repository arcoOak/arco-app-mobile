
import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './RedesSocialesHome.styles';
import { useAuth } from '../src/context/AuthContext';

const RedesSocialesHome = () => {
    const { clubInfo } = useAuth();
    if (!clubInfo || (!clubInfo.facebook && !clubInfo.instagram && !clubInfo.tiktok)) {
        return null;
    }

    const openUrl = (url) => {
        if (url) Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redes Sociales</Text>
            <View style={styles.list}>
                {clubInfo.facebook && (
                    <TouchableOpacity style={styles.iconItem} onPress={() => openUrl(clubInfo.facebook)} activeOpacity={0.8}>
                        <View style={styles.link}>
                            <Icon name="facebook" style={[styles.icon, styles.facebook]} />
                            <Text>Facebook</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {clubInfo.instagram && (
                    <TouchableOpacity style={styles.iconItem} onPress={() => openUrl(clubInfo.instagram)} activeOpacity={0.8}>
                        <View style={styles.link}>
                            <Icon name="instagram" style={[styles.icon, styles.instagram]} />
                            <Text>Instagram</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {clubInfo.tiktok && (
                    <TouchableOpacity style={styles.iconItem} onPress={() => openUrl(clubInfo.tiktok)} activeOpacity={0.8}>
                        <View style={styles.link}>
                            <Icon name="tiktok" style={styles.icon} />
                            <Text>TikTok</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default RedesSocialesHome;