import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const { email } = useLocalSearchParams();
    const router = useRouter();

    async function handleLogout() {
        await AsyncStorage.removeItem("@token");
        router.replace("/");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>Você está logado como:</Text>
                <Text style={styles.email}>{email || "Usuário"}</Text>
                
                <View style={styles.buttonContainer}>
                    <Button label="Sair" onPress={handleLogout} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFDFD",
    },
    content: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "900",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: "#585860",
    },
    email: {
        fontSize: 20,
        fontWeight: "700",
        color: "#032AD7",
        marginTop: 8,
        marginBottom: 48,
    },
    buttonContainer: {
        width: "100%",
    }
});
