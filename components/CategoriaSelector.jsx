
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from './CategoriaSelector.styles';

const CategoriaSelector = ({ displayCategorias, activeCategory, handleSeleccionarCategoria, id, nombre }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categorias}
        >
            {displayCategorias.map((cat) => {
                const isActive = activeCategory === cat[`${id}`];
                return (
                    <TouchableOpacity
                        key={cat[`${id}`]}
                        style={[
                            styles.spanCategoria,
                            isActive && styles.spanCategoriaActive,
                        ]}
                        onPress={() => handleSeleccionarCategoria(cat[`${id}`])}
                        activeOpacity={0.8}
                    >
                        {cat.icon_fa && (
                            <Icon name={cat.icon_fa.replace('fa-', '')} style={styles.icon} />
                        )}
                        <Text style={isActive ? { color: '#fff' } : {}}>{cat[`${nombre}`]}</Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export default CategoriaSelector;