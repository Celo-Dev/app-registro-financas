import React, { useState, useContext } from "react";
import { Platform, ActivityIndicator} from "react-native";
import { AuthContext } from "../../contexts/auth";

import {
  Background,
  Container,
  Logo,
  InputArea,
  Input,
  SubmitButton,
  SubmitText,
} from "../SignIn/styles";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp() {
    signUp(name, email, password);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <InputArea>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </InputArea>

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

        <SubmitButton onPress={handleSignUp}>
          {
            loadingAuth ? (
              <ActivityIndicator size={25} color="#FFF"/>
            ) : (
              <SubmitText>Cadastrar</SubmitText>
            )
          }
          
        </SubmitButton>
      </Container>
    </Background>
  );
}
