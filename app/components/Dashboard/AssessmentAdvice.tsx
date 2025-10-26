import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
} from "react-native";
import api from "@/app/lib/axios";

interface Assessment {
    id?: number;
    title?: string;
    [key: string]: any;
}

interface Props {
    assessment: Assessment;
}

export default function AssessmentAdvice({ assessment }: Props) {
    const [advice, setAdvice] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // check if advice already exists
    useEffect(() => {
        checkAdvice();
    }, [assessment]);

    const checkAdvice = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/mobile/assessment/${assessment.title}/advice`);
            if (res.data?.advice) setAdvice(res.data.advice);
        } catch (err: any) {
            console.log("Advice check failed:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAdvice = async () => {
        try {
            setLoading(true);
            // 🔹 Replace this with your OpenAI or backend generation endpoint
            const res = await api.post(`/mobile/assessment/${assessment.id}/generate-advice`);
            setAdvice(res.data?.advice ?? "No advice generated yet.");
        } catch (err: any) {
            console.log("Advice generation failed:", err.message);
            setAdvice("Failed to generate advice. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.heading}>💡 AI Spending Advice</Text>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#c7d2fe" />
                    <Text style={styles.loadingText}>Fetching advice…</Text>
                </View>
            ) : advice ? (
                <View style={styles.adviceBox}>
                    <ScrollView
                        style={styles.adviceScroll}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                    >
                        <Text style={styles.adviceText}>{advice}</Text>
                    </ScrollView>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGenerateAdvice}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get AI Advice</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    heading: {
        fontWeight: "700",
        fontSize: 18,
        color: "#c7d2fe",
        marginBottom: 10,
    },

    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    loadingText: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 15,
    },
    button: {
        marginTop: 10,
        backgroundColor: "#4f46e5",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        alignSelf: "flex-start",
        shadowColor: "#4f46e5",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
    adviceBox: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: 10,
        marginTop: 8,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    adviceScroll: {
        flexGrow: 0,
    },
    adviceText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 15,
        lineHeight: 22,
    },

});
