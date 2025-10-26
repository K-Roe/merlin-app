import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { categoryColors } from "../../lib/utils/categoryColors";

interface Props {
    title: string;
    categories: string[];
    values: number[];
    colorMap?: Record<string, string>;
}

const screenWidth = Dimensions.get("window").width;

export default function AssessmentPieChart({
                                               title,
                                               categories,
                                               values,
                                               colorMap = categoryColors,
                                           }: Props) {
    // 🔹 Prepare data for the chart
    const chartData = useMemo(() => {
        if (!categories.length || !values.length) return [];
        return categories.map((cat, i) => ({
            name: cat,
            population: values[i],
            color: colorMap[cat] || "#666",
            legendFontColor: "#fff",
            legendFontSize: 13,
        }));
    }, [categories, values, colorMap]);

    const total = useMemo(
        () => values.reduce((acc, val) => acc + val, 0),
        [values]
    );

    if (!categories.length) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No {title.toLowerCase()} entries</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <PieChart
                data={chartData}
                width={screenWidth * 0.8}
                height={180}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                chartConfig={{
                    color: () => `rgba(255,255,255,0.9)`,
                    labelColor: () => "#fff",
                    propsForLabels: { fontSize: 12 },
                }}
                absolute
                hasLegend={true}
            />

            {/* Optional total display */}
            <Text style={styles.totalText}>Total: £{total.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 8,
    },
    title: {
        fontWeight: "700",
        color: "#c7d2fe",
        fontSize: 16,
        marginBottom: 6,
    },
    totalText: {
        color: "#e0e0e0",
        marginTop: 4,
        fontSize: 13,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 140,
    },
    emptyText: {
        color: "rgba(255,255,255,0.6)",
        fontStyle: "italic",
    },
});
