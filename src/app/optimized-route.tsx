import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Address = {
    id: string;
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    isStart?: boolean;
    isEnd?: boolean;
};

function getStepStyle(stepIndex: number, total: number) {
    if (stepIndex === 0)           return { icon: "navigate" as const, color: "#16a34a", bg: "#dcfce7", label: "Partida" };
    if (stepIndex === total - 1)   return { icon: "flag"     as const, color: "#dc2626", bg: "#fee2e2", label: "Chegada" };
    return                                { icon: "location" as const, color: "#032AD7", bg: "#dbeafe", label: null };
}

export default function OptimizedRoute() {
    const router = useRouter();
    const params = useLocalSearchParams<{ addresses: string; order: string }>();

    const addresses: Address[] = JSON.parse(params.addresses ?? "[]");
    const order: number[]      = JSON.parse(params.order    ?? "[]");

    // Reordena os endereços conforme a sequência otimizada
    const sortedAddresses = order.map((idx) => addresses.find((_, i) => i === idx)!);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="#032AD7" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Rota Otimizada</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                <Text className="text-base text-gray-500 mb-6 font-medium">
                    Siga a sequência abaixo para o percurso mais eficiente.
                </Text>

                {sortedAddresses.map((item, stepIndex) => {
                    const style  = getStepStyle(stepIndex, sortedAddresses.length);
                    const isLast = stepIndex === sortedAddresses.length - 1;

                    return (
                        <View key={stepIndex} className="flex-row">
                            {/* Timeline */}
                            <View className="items-center mr-4">
                                <View
                                    className="w-10 h-10 rounded-full justify-center items-center"
                                    style={{ backgroundColor: style.bg }}
                                >
                                    <Ionicons name={style.icon} size={20} color={style.color} />
                                </View>
                                {!isLast && (
                                    <View className="w-0.5 flex-1 bg-gray-200 mt-1 mb-1" style={{ minHeight: 24 }} />
                                )}
                            </View>

                            {/* Card */}
                            <View className="flex-1 bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                                <View className="flex-row items-center mb-1">
                                    <Text className="text-xs font-bold uppercase tracking-wider mr-2"
                                        style={{ color: style.color }}>
                                        {stepIndex + 1}º parada
                                    </Text>
                                    {style.label && (
                                        <View className="px-2 py-0.5 rounded" style={{ backgroundColor: style.bg }}>
                                            <Text className="text-xs font-bold" style={{ color: style.color }}>
                                                {style.label}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <Text className="text-base font-bold text-gray-900">
                                    {item.rua}, {item.numero}
                                </Text>
                                <Text className="text-sm text-gray-500 mt-0.5">
                                    {item.complemento ? `${item.complemento} — ` : ""}CEP: {item.cep}
                                </Text>
                            </View>
                        </View>
                    );
                })}

                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}
