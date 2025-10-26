import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TransactionEntry, { Entry } from './TransactionEntry';

interface TransactionListProps {
    entries: Entry[];
    onDelete: (entry: Entry) => void;
}

export default function TransactionList({ entries, onDelete }: TransactionListProps) {
    const { totalIncome, totalExpense, netTotal } = useMemo(() => {
        let income = 0;
        let expense = 0;

        for (const entry of entries) {
            if (entry.amount >= 0) income += entry.amount;
            else expense += entry.amount;
        }

        return {
            totalIncome: income,
            totalExpense: Math.abs(expense),
            netTotal: income + expense,
        };
    }, [entries]);

    if (!entries.length) {
        return (
            <Text style={styles.empty}>No transactions available for this period.</Text>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Transactions</Text>

            {/* Header */}
            <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 2 }]}>Description</Text>
                <Text style={[styles.headerCell, { flex: 1, textAlign: 'right' }]}>Amount</Text>
            </View>

            <FlatList
                data={entries}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {

                    return (
                        <View
                            style={[
                                styles.row,
                                index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                            ]}
                        >
                            <TransactionEntry
                                entry={item}
                                onDelete={onDelete}
                            />
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            />

            {/* Summary */}
            <View style={styles.summary}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Income:</Text>
                    <Text style={[styles.summaryValue, styles.income]}>
                        £{totalIncome.toFixed(2)}
                    </Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Expense:</Text>
                    <Text style={[styles.summaryValue, styles.expense]}>
                        £{totalExpense.toFixed(2)}
                    </Text>
                </View>

                <View style={[styles.summaryRow, styles.netRow]}>
                    <Text style={styles.summaryLabel}>Net Total:</Text>
                    <Text
                        style={[
                            styles.summaryValue,
                            netTotal >= 0 ? styles.income : styles.expense,
                        ]}
                    >
                        £{netTotal.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 30,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    heading: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4B0082',
        marginBottom: 12,
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 6,
        marginBottom: 4,
    },
    headerCell: {
        fontWeight: '700',
        color: '#4B0082',
        fontSize: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    rowEven: {
        backgroundColor: '#FAFAFA',
    },
    rowOdd: {
        backgroundColor: '#FFF',
    },
    summary: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginTop: 14,
        paddingTop: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    summaryLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4B0082',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '700',
    },
    income: {
        color: '#16A34A',
    },
    expense: {
        color: '#DC2626',
    },
    netRow: {
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 8,
    },
    empty: {
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
        fontStyle: 'italic',
        marginTop: 20,
    },
});
