import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker'; // install: npm i @react-native-picker/picker
import api from '@/app/lib/axios';
interface DashboardButtonsProps {
    onCreated?: () => void;
}
export default function DashboardButtons({ onCreated }: DashboardButtonsProps) {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const [showModal, setShowModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());


    const years = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);

    const handleGoToProfile = () => {
        navigation.navigate('Profile'); // make sure this screen exists in your stack/drawer
    };

    const handleCreateAssessment = async () => {
        try {
            setLoading(true);
            const name = selectedMonth + ' ' + selectedYear
            // Example API call
            await api.post('/mobile/financialAssessment/', {
                name
            });

            setShowModal(false);
            onCreated?.();
            alert(`Created assessment for ${name}`);
        } catch (err: any) {
            console.error('❌ Error creating assessment:', err.response?.data || err.message);
            alert('Failed to create assessment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.outerCard}>
            {/* 👤 Profile button */}
            <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: '#4B0082' }]}
                onPress={handleGoToProfile}
                disabled={loading}
            >
                <Text style={styles.saveButtonText}>👤 Go to Profile</Text>
            </TouchableOpacity>

            {/* ➕ Create assessment */}
            <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: '#16A34A' }]}
                onPress={() => setShowModal(true)}
                disabled={loading}
            >
                <Text style={styles.saveButtonText}>➕ Create Assessment</Text>
            </TouchableOpacity>

            {/* 🗓 Modal popup */}
            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Select Month & Year</Text>

                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedMonth}
                                onValueChange={(value) => setSelectedMonth(value)}
                                style={styles.picker}
                            >
                                {months.map((m) => (
                                    <Picker.Item label={m} value={m} key={m} />
                                ))}
                            </Picker>


                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(value) => setSelectedYear(value)}
                                style={styles.picker}
                            >
                                {years.map((y) => (
                                    <Picker.Item label={y.toString()} value={y} key={y} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.modalButton, { backgroundColor: '#6b7280' }]}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.modalButton, { backgroundColor: '#16A34A' }]}
                                onPress={handleCreateAssessment}
                            >
                                <Text style={styles.modalButtonText}>Create</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    outerCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    saveButton: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4B0082',
        marginBottom: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    picker: {
        flex: 1,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
});
