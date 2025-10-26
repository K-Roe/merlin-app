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
        <View style={styles.row}>
            {/* Description + category + date */}
            <View style={styles.left}>
                <Text style={styles.name}>
                    {entry.financial_assessment_name || entry.name}
                </Text>
                <Text style={styles.details}>
                    {formatDate(entry.date)} •{' '}
                    <Text style={styles.category}>
                        {entry.categories ? entry.categories.replace(/-/g, ' ') : 'Uncategorized'}
                    </Text>
                </Text>
            </View>

            {/* Amount + delete */}
            <View style={styles.right}>
                <Text
                    style={[
                        styles.amount,
                        isIncome ? styles.income : styles.expense,
                    ]}
                >
                    {isIncome ? '+' : '-'}£{Math.abs(entry.amount).toFixed(2)}
                </Text>

                <TouchableOpacity
                    onPress={() => onDelete(entry)}
                    style={styles.deleteBtn}
                >
                    <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
    },
    left: {
        flex: 2,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    name: {
        fontWeight: '600',
        color: '#111',
        fontSize: 15,
    },
    details: {
        fontSize: 12,
        color: '#555',
    },
    category: {
        fontStyle: 'italic',
        color: '#4B0082',
        textTransform: 'capitalize',
    },
    amount: {
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'right',
        minWidth: 80,
    },
    income: {
        color: '#16A34A', // green
    },
    expense: {
        color: '#DC2626', // red
    },
    deleteBtn: {
        padding: 6,
        marginLeft: 6,
        borderRadius: 8,
    },
    deleteIcon: {
        fontSize: 16,
        color: '#4B0082',
    },
});
