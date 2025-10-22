import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, ScrollView, StyleSheet } from 'react-native';
import api from '@/app/lib/axios';
import AssessmentCard from '../Dashboard/AssessmentCard';

interface Assessment {
    id: number;
    name: string;
}

export default function AssessmentList() {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAssessments = async () => {
        try {
            const res = await api.get('/mobile/financialAssessment');
            setAssessments(res.data.data || res.data);
        } catch (err: any) {
            console.log('❌ Error loading assessments:', err.response?.data || err.message);
            Alert.alert('Error', 'Unable to fetch assessments.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAssessments();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4B0082" />
            </View>
        );
    }

    return (
        <View style={styles.outerCard}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {assessments.map((assessment) => (
                    <View key={assessment.id} style={styles.cardWrapper}>
                        <AssessmentCard
                            assessment={assessment}
                            onDeleted={() => loadAssessments()}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scroll: {
        paddingBottom: 20,
    },
    outerCard: {
        width: '100%', // fill the parent card, not the whole screen
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
    cardWrapper: {
        marginBottom: 12,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
