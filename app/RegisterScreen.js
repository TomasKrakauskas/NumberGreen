import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { theme } from "@/core/theme";
import createUserFirestoreDocs from "@/helpers/createUserDocs";
import { emailValidator } from "@/helpers/emailValidator";
import { passwordValidator } from "@/helpers/passwordValidator";
import { auth } from "@/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    createUserWithEmailAndPassword(auth, email.value, password.value).then(
      (userCredential) => {
        const user = userCredential.user;
        createUserFirestoreDocs(user.uid)
          .then(() => {
            navigation.navigate("(tabs)");
          })
          .catch((error) => {
            console.error("Error creating user documents:", error);
          });
      }
    );
  };

  return (
    <Background>
      <Logo />
      <Header>Create Account</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
