import { useState } from "react";
import {View, ScrollView, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert} from "react-native"
import { Link } from "expo-router"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

export default function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSignUp() {
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            return Alert.alert("Erro", "Preencha todos os campos.");
        }

        if (password !== confirmPassword) {
            return Alert.alert("Erro", "As senhas não coincidem.");
        }

        fetch("http://192.168.15.26:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: name, email, senha: password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                Alert.alert("Erro", data.erro);
            } else {
                Alert.alert("Sucesso", data.mensagem || "Usuário criado com sucesso!");
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
                        source={require("@/assets/adaptive-icon.png")}
                        style={styles.illustration}
                    />
                    <Text style = {styles.title}>Cadastrar</Text>
                    <Text style = {styles.subtitle}>Crie sua conta</Text>
                    <View style={styles.form}>
                        <Input placeholder="Nome" onChangeText={setName}/>
                        <Input placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail}/>
                        <Input placeholder="Senha" secureTextEntry onChangeText={setPassword}/>
                        <Input placeholder="Confirmar Senha" secureTextEntry onChangeText={setConfirmPassword}/>
                        <Button label="Cadastrar" onPress={handleSignUp}/>
                    </View>

                    <Text style={styles.footerText}>
                        Já tem uma conta? {" "}
                        <Link href="/" style={styles.footerLink}>
                            Entre aqui.
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