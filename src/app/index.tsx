import { useState } from "react"
import {View, ScrollView, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert} from "react-native"
import { Link } from "expo-router"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Index(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSignIn() {
        if (!email.trim() || !password.trim()) {
            return Alert.alert("Erro", "Preencha os campos e e-mail e senha.");
        }

        fetch("http://192.168.15.26:3000/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha: password })
        })
        .then(res => res.json())
        .then(async data => {
        if (data.erro) {
            Alert.alert("Erro", data.erro);
        } else {
            // Login bem-sucedido, salvar token
            try {
            await AsyncStorage.setItem("@token", data.token);
            Alert.alert("Bem-vindo", `Olá ${email}`);
            } catch (e) {
            console.error("Erro ao salvar token:", e);
            Alert.alert("Erro", "Não foi possível salvar o token localmente");
            }
        }
        })
        .catch(err => {
        console.error(err);
        Alert.alert("Erro", "Não foi possível conectar ao servidor");
        });
    }

    return(
        <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior={Platform.select({ios: "padding", android: "height"})}
        >
            <ScrollView 
                contentContainerStyle={{flexGrow: 1}} 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style = {styles.container}>
                    <Image 
                        source={require("@/assets/splash-icon.png")}
                        style={styles.illustration}
                    />
                    <Text style = {styles.title}>Entrar</Text>
                    <Text style = {styles.subtitle}>Acesse sua conta com e-mail e senha</Text>
                    <View style={styles.form}>
                        <Input placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail}/>
                        <Input placeholder="Senha" secureTextEntry onChangeText={setPassword}/>
                        <Button label="Entrar" onPress={handleSignIn}/>
                    </View>

                    <Text style={styles.footerText}>
                        Não tem uma conta? {" "}
                        <Link href="/signup" style={styles.footerLink}>
                            Cadastre-se aqui.
                        </Link>
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#FDFDFD", 
        padding: 32
    },
    illustration: {
        width: "100%",
        height: 330,
        resizeMode: "contain",
        marginTop: 62
    },
    title: {
        fontSize: 32,
        fontWeight: 900
    },
    subtitle: {
        fontSize: 16,
    },
    form: {
        marginTop: 24,
        gap: 16
    },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#585860"
    },
    footerLink: {
        color: "#032AD7",
        fontWeight: 700
    }
})