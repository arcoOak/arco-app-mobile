
import React from 'react';
import { View, Text } from 'react-native';

const TransactionItem = ({ icon, title, time, amount, type }) => {
    const amountColor = type === 'credit' ? '#43a047' : '#e53935';
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
            <View style={{ marginRight: 12 }}>
                <Text style={{ fontSize: 22 }}>{icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{title}</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>{time}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', minWidth: 80 }}>
                <Text style={{ color: amountColor, fontWeight: 'bold', fontSize: 16 }}>{amount}</Text>
            </View>
        </View>
    );
};

export default TransactionItem;