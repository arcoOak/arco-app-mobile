
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

const TrainerCard = ({ sport, name, description, imageUrl, imageAlt, onClick }) => {
    const descriptionText = description.length > 75 ? description.substring(0, 50) + '...' : description;
    return (
        <TouchableOpacity
            style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 }}
            onPress={onClick}
            activeOpacity={0.85}
        >
            <View style={{ width: '100%', height: 180, overflow: 'hidden' }}>
                <Image
                    source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    accessibilityLabel={imageAlt}
                />
            </View>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{name}</Text>
                <Text style={{ fontSize: 14, color: '#1976d2', fontWeight: 'bold', marginBottom: 4 }}>{sport}</Text>
                <Text style={{ fontSize: 14, color: '#444' }}>{descriptionText}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TrainerCard;