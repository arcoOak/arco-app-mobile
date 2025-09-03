
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Preloader from '../components/Preloader';
import { useAuth } from '../src/context/AuthContext';
import LoadingModal from '../components/modals/LoadingModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Login.styles';

import loginImage from '../assets/images/bg-pool3.jpg'; 

import { useRouter } from 'expo-router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, isAuthenticated, loading, logo } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            // Aquí podrías navegar a la pantalla principal usando el router de Expo
            // Por ejemplo: router.replace('/(tabs)');
            router.replace('/');
        }
    }, [isAuthenticated, router]);

    const handleLogin = async () => {
        setError('');
        if (username && password) {
            const success = await login(username, password);
            console.log('Login success:', success);
            if (!success) {
                setError('Usuario o contraseña incorrectos.');
            }else{
                router.replace('/');
            }
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.appLogoHeader}>
                    {logo && (
                        <Image source={typeof logo === 'string' ? { uri: logo } : logo} style={styles.appLogoHeaderImg} />
                    )}
                </View>
                <View style={styles.loginContainer}>
                    <Image source={loginImage} style={styles.loginImage} />
                    <View style={styles.loginFormArea}>
                        <Text style={styles.loginFormTitle}>Iniciar Sesión</Text>
                        <View style={styles.inputGroup}>
                            <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Usuario"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                textContentType="username"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="done"
                                textContentType="password"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={18} color="#888" />
                            </TouchableOpacity>
                        </View>
                        {error ? <Text style={styles.error}>{error}</Text> : null}
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>Entrar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <LoadingModal visible={loading} mensaje="Validando..." />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


