import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AssessmentPieChart from "./AssessmentPieChart";
import AssessmentAdvice from "./AssessmentAdvice";

export interface AssessmentDetails {
    title?: string;
    income: { categories: string[]; values: number[] };
    expenses: { categories: string[]; values: number[] };
}

interface Props {
    visible: boolean;
    details?: AssessmentDetails;
    onClose: () => void;
}

export default function AssessmentDetailsModal({
                                                   visible,
                                                   details,
                                                   onClose,
                                               }: Props) {
    if (!details) return null;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.backdrop} />

                <View style={styles.modal}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 30 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>{details.title ?? "Assessment Overview"}</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.closeText}>✖</Text>
                            </TouchableOpacity>
                        </View>

                        {/* charts stacked vertically */}
                        <LinearGradient
                            colors={["#1e3a8a", "#3730a3"]}
                            style={[styles.chartCard, { marginBottom: 10 }]}
                        >
                            <Text style={[styles.chartHeading, { color: "#c7d2fe" }]}>📈 Income</Text>
                            <AssessmentPieChart
                                title="Income"
                                categories={details.income.categories}
                                values={details.income.values}
                            />
                        </LinearGradient>

                        <LinearGradient
                            colors={["#7f1d1d", "#991b1b"]}
                            style={[styles.chartCard, { marginTop: 10 }]}
                        >
                            <Text style={[styles.chartHeading, { color: "#fecaca" }]}>💸 Expenses</Text>
                            <AssessmentPieChart
                                title="Expenses"
                                categories={details.expenses.categories}
                                values={details.expenses.values}
                            />
                        </LinearGradient>

                        {/* advice */}
                        <LinearGradient
                            colors={["#4f46e5", "#312e81"]}
                            style={styles.adviceCard}
                        >
                            <Text style={styles.adviceHeading}>💡 AI Advice</Text>
                            <AssessmentAdvice assessment={details} />
                        </LinearGradient>

                        {/* footer */}
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
        backgroundColor: "#0f172a", // slate-900 style background
        borderRadius: 20,
        padding: 18,
        width: "92%",
        maxHeight: "90%",
        borderWidth: 1,
        borderColor: "rgba(79,70,229,0.3)",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#c7d2fe",
    },
    closeText: {
        fontSize: 20,
        color: "#a5b4fc",
    },
    chartCard: {
        borderRadius: 16,
        padding: 14,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    chartHeading: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
    },
    adviceCard: {
        borderRadius: 16,
        padding: 14,
        marginTop: 14,
    },
    adviceHeading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#e0e7ff",
        marginBottom: 8,
    },
    closeButton: {
        backgroundColor: "#1f58ea", // same blue as your dashboard buttons
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 22,
        shadowColor: "#1f58ea",
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 4,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});
