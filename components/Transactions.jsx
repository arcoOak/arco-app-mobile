
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TransactionItem from './TransactionItem';
import dashboardHomeStyles from '../src/css/DashboardHome.styles';

const transactionsData = [
    { id: 1, icon: 'ΨP', title: 'Restaurant Submarine', time: '01:41 PM, Today', amount: '-$14.5', type: 'debit' },
    { id: 2, icon: 'B', title: "Opera ticket's", time: '11:26 AM', amount: '-$270', type: 'debit' },
    { id: 3, icon: 'D', title: 'Cafe cashback', time: '11:26 AM, Today', amount: '+$0.75', type: 'credit' },
    // Add more transactions here
];

const Transactions = () => {
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={styles.title}>Transactions</Text>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="search" size={20} color="#1976d2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="sliders" size={20} color="#1976d2" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 12 }}>
                {transactionsData.map(transaction => (
                    <TransactionItem
                        key={transaction.id}
                        icon={transaction.icon}
                        title={transaction.title}
                        time={transaction.time}
                        amount={transaction.amount}
                        type={transaction.type}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        ...dashboardHomeStyles.investmentsSection,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginVertical: 12,
        padding: 0,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    header: {
        ...dashboardHomeStyles.investmentsHeader,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 12,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
        padding: 8,
        elevation: 1,
    },
    list: {
        ...dashboardHomeStyles.investmentsList,
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
});

export default Transactions;