import React, { useState, useEffect, useCallback  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '@/app/lib/axios';
import Input from '@/app/components/Input';
import Select from '@/app/components/Select';
import DateTimePicker from '@react-native-community/datetimepicker';
import TransactionList from '@/app/components/Assessment/TransactionList';
import { Entry } from '@/app/components/Assessment/TransactionEntry';

const { width } = Dimensions.get('window');

export default function AssessmentScreen() {
    const route = useRoute();
    const { id } = route.params as { id: number };
    const { name } = route.params as { name: string };

    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [entries, setEntries] = useState<Entry[]>([]);

    const loadEntries = useCallback(async () => {
        try {
            const res = await api.get(`/mobile/assessment/${id}/entries`);
            setEntries(res.data);
        } catch (err) {
            console.error('Error loading entries:', err);
        }
    }, [id]);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/mobile/assessment/${id}/entries`);
                setEntries(res.data);
            } catch (err) {
                console.error('Error loading entries:', err);
            }
        })();
    }, [id]);

    const handleSubmit = async (type: '+' | '-') => {
        if (!description || !amount || !category) {
            Alert.alert('Missing Fields', 'Please fill in all fields before submitting.');
            return;
        }

        try {
            setLoading(true);

            await api.post('/mobile/assessment/', {
                name: description,
                amount: type === '-' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
                date: date.toISOString().split('T')[0],
                category: category,
                type,
                assessment_id: id
            });

            await loadEntries();
            Alert.alert('Success', `${type === '+' ? 'Income' : 'Expense'} added successfully!`);

            setDescription('');
            setAmount('');
            setCategory('');
            setDate(new Date());
        } catch (err: any) {
            console.error('❌ Error submitting entry:', err.response?.data || err.message);
            Alert.alert('Error', 'Something went wrong while submitting your entry.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEntry = async (entry: Entry) => {
        try {
            await api.delete(`/mobile/assessment/entries/${entry.financial_assessment_id}`);
            setEntries(prev => prev.filter(e => e.financial_assessment_id !== entry.financial_assessment_id));
            Alert.alert('Deleted', `${entry.name} removed successfully.`);
        } catch (err: any) {
            console.error('❌ Error deleting entry:', err.response?.data || err.message);
            Alert.alert('Error', 'Failed to delete entry.');
        }
    };

    return (
        <LinearGradient colors={['#f8f5ff', '#ffffff']} style={styles.background}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Image
                                source={require('../../../assets/MerlinForAllLogo.jpg')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>Financial Assessment</Text>
                            <Text style={styles.subtitle}>{name}</Text>

                            <Input
                                label="Description"
                                placeholder="Enter Description"
                                value={description}
                                onChangeText={setDescription}
                                autoCapitalize="none"
                            />

                            <Select label="Category" value={category} onChange={setCategory} />

                            <Input
                                label="Amount"
                                placeholder="Enter Amount"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />

                            <TouchableOpacity onPress={() => setShowPicker(true)}>
                                <Input label="Date Paid" value={date.toDateString()} editable={false} />
                            </TouchableOpacity>

                            {showPicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowPicker(false);
                                        if (selectedDate) setDate(selectedDate);
                                    }}
                                />
                            )}

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: '#16A34A' }]}
                                    disabled={loading}
                                    onPress={() => handleSubmit('+')}
                                >
                                    <Text style={styles.actionButtonText}>➕ Add Income</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: '#DC2626' }]}
                                    disabled={loading}
                                    onPress={() => handleSubmit('-')}
                                >
                                    <Text style={styles.actionButtonText}>➖ Add Expense</Text>
                                </TouchableOpacity>
                            </View>

                            {/* 👇 Now placed inside the ScrollView, after the buttons */}
                            <TransactionList
                                entries={entries}
                                onDelete={handleDeleteEntry}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    scroll: { flexGrow: 1, justifyContent: 'center' },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 600,
        borderRadius: 28,
        paddingVertical: 36,
        paddingHorizontal: 28,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        elevation: 8,
        alignItems: 'center',
    },
    logo: {
        height: 100,
        width: width * 0.6,
        marginBottom: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#4B0082',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2865ec',
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        gap: 10,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
