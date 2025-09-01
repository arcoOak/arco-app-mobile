
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './BuscadorTexto.styles';

const BuscadorTexto = ({ searchTerm, setSearchTerm, placeholder }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Icon name="magnifying-glass" style={styles.icon} />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={styles.inputPlaceholder.color}
                value={searchTerm}
                onChangeText={setSearchTerm}
                returnKeyType="search"
                underlineColorAndroid="transparent"
            />
        </View>
    );
};

export default BuscadorTexto;
