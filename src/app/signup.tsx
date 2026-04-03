import {View, ScrollView, Text, Image, StyleSheet, KeyboardAvoidingView, Platform} from "react-native"
import { Link } from "expo-router"
import { Input } from "@/components/input"
import { Button } from "@/components/button"

export default function SignUp(){
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
                        <Input placeholder="Nome"/>
                        <Input placeholder="E-mail" keyboardType="email-address"/>
                        <Input placeholder="Senha" secureTextEntry/>
                        <Input placeholder="Confirmar Senha" secureTextEntry/>
                        <Button label="Cadastrar"/>
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