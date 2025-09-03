
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PrivateRoute({ isAuthenticated, children }) {
    const navigation = useNavigation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, [isAuthenticated, navigation]);

    if (!isAuthenticated) {
        return <View />;
    }

    return children;
}