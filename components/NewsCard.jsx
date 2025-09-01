
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styles from './NewsCard.styles';

const NewsCard = ({ categoria, titulo, autor, imageUrl, imageAlt, onClick }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onClick} activeOpacity={0.85}>
            <View style={styles.imageContainer}>
                <Image
                    source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                    style={styles.image}
                    accessibilityLabel={imageAlt}
                />
            </View>
            <Text style={styles.category}>{categoria}</Text>
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.author}>{autor}</Text>
        </TouchableOpacity>
    );
};

export default NewsCard;