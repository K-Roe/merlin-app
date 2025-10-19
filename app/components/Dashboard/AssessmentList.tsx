import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, ScrollView, StyleSheet } from 'react-native';
import api from '@/app/lib/axios';
import AssessmentCard from './AssessmentCard';

interface Assessment {
    id: number;
    name: string;
}

export default function AssessmentList() {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAssessments();
    }, []);

    const loadAssessments = async () => {
        try {
            const res = await api.get('/mobile/financialAssessment');
            setAssessments(res.data.data || res.data); // flexible with Laravel structure
        } catch (err: any) {
            console.log('❌ Error loading assessments:', err.response?.data || err.message);
            Alert.alert('Error', 'Unable to fetch assessments.');
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4B0082" />
            </View>
        );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {assessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 60,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
