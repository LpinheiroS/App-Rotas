import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Address = {
    id: string;
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
};

export default function NewRoute() {
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);

    // Form state
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");

    const handleCepChange = (text: string) => {
        // Only keep numbers
        let onlyNumbers = text.replace(/\D/g, "");

        // Limit to 8 digits max
        if (onlyNumbers.length > 8) {
            onlyNumbers = onlyNumbers.substring(0, 8);
        }

        // Format with hyphen after 5th digit
        let formatted = onlyNumbers;
        if (onlyNumbers.length > 5) {
            formatted = onlyNumbers.substring(0, 5) + "-" + onlyNumbers.substring(5, 8);
        }

        setCep(formatted);
    };

    const isCepValid = cep.replace(/\D/g, "").length === 8;
    const isFormValid = isCepValid && rua.trim().length > 0 && numero.trim().length > 0;

    const addAddress = () => {
        if (!isFormValid) return;

        const newAddress: Address = {
            id: Date.now().toString(),
            cep,
            rua,
            numero,
            complemento: complemento.trim() || undefined,
        };

        setAddresses([...addresses, newAddress]);

        // Clear form
        setCep("");
        setRua("");
        setNumero("");
        setComplemento("");
    };

    const removeAddress = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="#032AD7" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Nova Rota</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                <Text className="text-base text-gray-500 mb-6 font-medium">
                    {addresses.length === 0
                        ? "Adicione o primeiro destino para iniciar a rota."
                        : "Adicione mais destinos à sua rota."}
                </Text>

                {/* Form */}
                <View className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8">
                    <Text className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">
                        Novo Endereço
                    </Text>

                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-700 mb-1.5">CEP</Text>
                        <TextInput
                            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 text-base text-gray-900 shadow-sm"
                            placeholder="00000-000"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            maxLength={9}
                            value={cep}
                            onChangeText={handleCepChange}
                        />
                        {cep.length > 0 && !isCepValid && (
                            <Text className="text-xs text-red-500 mt-1 ml-1">O CEP deve conter 8 dígitos.</Text>
                        )}
                    </View>

                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-700 mb-1.5">Rua</Text>
                        <TextInput
                            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 text-base text-gray-900 shadow-sm"
                            placeholder="Nome da rua, avenida..."
                            placeholderTextColor="#9CA3AF"
                            value={rua}
                            onChangeText={setRua}
                        />
                    </View>

                    <View className="flex-row mb-6">
                        <View className="flex-1 mr-3">
                            <Text className="text-sm font-semibold text-gray-700 mb-1.5">Número</Text>
                            <TextInput
                                className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 text-base text-gray-900 shadow-sm"
                                placeholder="123"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                                value={numero}
                                onChangeText={setNumero}
                            />
                        </View>

                        <View className="flex-[2]">
                            <Text className="text-sm font-semibold text-gray-700 mb-1.5">Complemento</Text>
                            <TextInput
                                className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 text-base text-gray-900 shadow-sm"
                                placeholder="Apto, Bloco..."
                                placeholderTextColor="#9CA3AF"
                                value={complemento}
                                onChangeText={setComplemento}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={addAddress}
                        className={`w-full py-4 rounded-xl flex-row justify-center items-center ${isFormValid ? 'bg-primary' : 'bg-blue-300'
                            }`}
                        disabled={!isFormValid}
                    >
                        <Ionicons name="add-circle-outline" size={20} color="white" className="mr-2" />
                        <Text className="text-white font-bold text-base ml-2">Adicionar à Rota</Text>
                    </TouchableOpacity>
                </View>

                {/* List of addresses */}
                {addresses.length > 0 && (
                    <View className="mb-8">
                        <Text className="text-lg font-bold text-gray-900 mb-4">
                            Destinos ({addresses.length})
                        </Text>

                        {addresses.map((item, index) => (
                            <View
                                key={item.id}
                                className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100 mb-3 shadow-sm"
                            >
                                <View className="w-8 h-8 rounded-full bg-blue-100 justify-center items-center mr-4">
                                    <Text className="text-primary font-bold">{index + 1}</Text>
                                </View>

                                <View className="flex-1">
                                    <Text className="text-base font-bold text-gray-900 mb-0.5">
                                        {item.rua}, {item.numero}
                                    </Text>
                                    {(item.complemento || item.cep) && (
                                        <Text className="text-sm text-gray-500">
                                            {item.complemento ? `${item.complemento} - ` : ''}CEP: {item.cep}
                                        </Text>
                                    )}
                                </View>

                                <TouchableOpacity
                                    onPress={() => removeAddress(item.id)}
                                    className="p-2"
                                >
                                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity
                            className="w-full py-4 rounded-xl flex-row justify-center items-center bg-green-500 mt-4 shadow-sm"
                        >
                            <Ionicons name="map-outline" size={20} color="white" />
                            <Text className="text-white font-bold text-base ml-2">Calcular Rota</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}
