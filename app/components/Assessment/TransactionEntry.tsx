import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface Entry {
    amount: number;
    categories: string;
    date: string;
    financial_assessment_id: number;
    financial_assessment_name: string;
    name: string;
    type: '+' | '-';
}

interface TransactionEntryProps {
    entry: Entry;
    onDelete: (entry: Entry) => void;
}

export default function TransactionEntry({ entry, onDelete }: TransactionEntryProps) {
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
    };

    const isIncome = entry.type === '+';

    return (
        <View style={styles.item}>
            {/* Left side — details */}
            <View style={styles.left}>
                <Text style={styles.name}>{entry.financial_assessment_name || entry.name}</Text>
                <Text style={styles.details}>
                    {formatDate(entry.date)} •{' '}
                    <Text style={styles.category}>
                        {entry.categories ? entry.categories.replace(/-/g, ' ') : 'Uncategorized'}
                    </Text>
                </Text>
            </View>

            {/* Right side — amount & delete */}
            <View style={styles.right}>
                <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
                    {isIncome ? '+' : '-'}£{Math.abs(entry.amount).toFixed(2)}
                </Text>

                <TouchableOpacity onPress={() => onDelete(entry)} style={styles.deleteBtn}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    left: {
        marginBottom: 6,
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontWeight: '600',
        color: '#070b07',
        fontSize: 16,
    },
    details: {
        color: 'rgb(7,11,7)',
        fontSize: 13,
    },
    category: {
        fontStyle: 'italic',
        color: 'rgb(7,11,7)',
        textTransform: 'capitalize',
    },
    amount: {
        fontWeight: '700',
        fontSize: 16,
    },
    income: {
        color: '#22c55e', // green
    },
    expense: {
        color: '#ef4444', // red
    },
    deleteBtn: {
        padding: 6,
        marginLeft: 8,
        borderRadius: 20,
    },
    deleteIcon: {
        fontSize: 18,
        color: 'rgb(7,11,7)',
    },
});
