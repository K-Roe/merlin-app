import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import api from '@/app/lib/axios';
import { useNavigation } from '@react-navigation/native';
import AssessmentDetailsModal from "../Dashboard/AssessmentDetailsModal";

interface Props {
    assessment: {
        id: number;
        name: string;
    };
    onDeleted?: () => void;
}

export default function AssessmentCard({ assessment, onDeleted }: Props) {
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState<any | null>(null);

    const navigation = useNavigation();


    const handleOpen = async (assessment: { id: number; name: string }) => {
        navigation.getParent()?.navigate('Assessment', { id: assessment.id, name: assessment.name });
    };

    const handleDetails = async () => {
        try {
            setLoading(true);
            // fetch raw entries
            const res = await api.get(`/mobile/assessment/${assessment.id}/entries`);
            const entries = res.data.map((e: any) => ({
                ...e,
                amount: parseFloat(e.amount),
            }));

            // group by category for income and expenses
            const incomeTotals: Record<string, number> = {};
            const expenseTotals: Record<string, number> = {};

            entries.forEach((e: { categories: string; amount: number; }) => {
                const cat = e.categories || "Uncategorized";
                if (e.amount >= 0) {
                    incomeTotals[cat] = (incomeTotals[cat] || 0) + e.amount;
                } else {
                    expenseTotals[cat] = (expenseTotals[cat] || 0) + Math.abs(e.amount);
                }
            });

            // build arrays for chart data
            const income = {
                categories: Object.keys(incomeTotals),
                values: Object.values(incomeTotals),
            };

            const expenses = {
                categories: Object.keys(expenseTotals),
                values: Object.values(expenseTotals),
            };

            // feed into modal
            setDetails({
                title: assessment.name,
                income,
                expenses,
            });

            setShowModal(true);
        } catch (err: any) {
            console.log("❌ Details fetch error:", err.response?.data || err.message);
            Alert.alert("Error", "Could not load assessment details.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert('Confirm', `Delete ${assessment.name}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.delete(`/mobile/financialAssessment/${assessment.id}`);
                        Alert.alert('Deleted', `${assessment.name} has been removed.`);
                        if (onDeleted) onDeleted(); // 👈 trigger parent refresh
                    } catch (err: any) {
                        console.log('❌ Delete error:', err.response?.data || err.message);
                        Alert.alert('Error', 'Failed to delete assessment.');
                    }
                },
            },
        ]);
    };

    const handleAdvice = async () => {
        setLoading(true);
        try {
            const res = await api.post('/mobile/assessment/selectedAssessmentsAdvice', {
                selected_ids: [assessment.id],
            });
            setAdvice(res.data.advice ?? 'No advice available.');
        } catch (err: any) {
            console.log('❌ AI advice error:', err.response?.data || err.message);
            Alert.alert('Error', 'Could not get AI advice.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Checkbox
                    value={selected}
                    onValueChange={setSelected}
                    color="#4B0082"
                />
                <Text style={styles.title}>{assessment.name}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.button, styles.openBtn]}
                    onPress={() => handleOpen(assessment)}
                >
                    <Text style={styles.btnText}>📈 Open</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.detailsBtn]}
                    onPress={handleDetails}
                >
                    <Text style={styles.btnText}>📊 Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteBtn]}
                    onPress={handleDelete}
                >
                    <Text style={styles.btnText}>🗑️ Delete</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.adviceBtn, loading && { opacity: 0.7 }]}
                onPress={handleAdvice}
                disabled={loading}
            >
                <Text style={styles.adviceBtnText}>
                    {loading ? 'Fetching advice…' : '💡 Get AI Advice'}
                </Text>
            </TouchableOpacity>

            {advice && (
                <View style={styles.adviceBox}>
                    <Text style={styles.adviceTitle}>AI Advice</Text>
                    <Text style={styles.adviceText}>{advice}</Text>
                </View>
            )}

            {showModal && (
                <AssessmentDetailsModal
                    visible={showModal}
                    details={details}
                    onClose={() => setShowModal(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        marginLeft: 8,
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        alignItems: 'center',
    },
    openBtn: { backgroundColor: '#16a34a' },
    detailsBtn: { backgroundColor: '#4f46e5' },
    deleteBtn: { backgroundColor: '#dc2626' },
    btnText: { color: '#fff', fontWeight: '700' },
    adviceBtn: {
        backgroundColor: '#4f46e5',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    adviceBtnText: { color: '#fff', fontWeight: '700' },
    adviceBox: {
        backgroundColor: '#f3f0ff',
        borderRadius: 10,
        padding: 10,
        marginTop: 8,
    },
    adviceTitle: { fontWeight: '700', color: '#4B0082', marginBottom: 4 },
    adviceText: { color: '#111827' },
});
