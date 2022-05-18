import React, { useState, useContext } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

import {
  Background,
  Container,
  Logo,
  InputArea,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from "./styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loadingAuth } = useContext(AuthContext);

  const navigation = useNavigation();

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <Logo source={require("../../assets/Logo.png")} />

        <InputArea>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </InputArea>

        <InputArea>
          <Input
            placeholder="Senha"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </InputArea>

        <SubmitButton onPress={handleLogin}>
          {
            loadingAuth ? (
              <ActivityIndicator size={25} color='#FFF' />
            ) : (
              <SubmitText>Acessar</SubmitText>
            )
          }
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Não possui uma conta ? Cadastre-se.</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
