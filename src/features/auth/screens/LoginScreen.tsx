import React, { useCallback, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Feedback } from "@/components/Feedback";
import { useLogin } from "../hooks/useLogin";

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: #eaf7f0;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.View`
  width: 100%;
  max-width: 400px;
  align-self: center;
  background-color: #ffffff;
  border-radius: 20px;
  border-width: 1px;
  border-color: #d5eadf;
  padding: 24px;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

const LogoBox = styled.View`
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border-width: 1px;
  border-color: #d5eadf;
  background-color: #eaf7f0;
`;

const LogoText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: #21845b;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: 500;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #68756e;
  margin-top: 4px;
  text-align: center;
`;

const RegisterArea = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const RegisterText = styled.Text`
  font-size: 14px;
  color: #68756e;
`;

const RegisterLink = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 600;
  color: #2876c7;
`;

const Footer = styled.Text`
  text-align: center;
  font-size: 12px;
  color: #8b9690;
  margin-top: 16px;
`;

const FeedbackWrapper = styled.View`
  margin-bottom: 16px;
`;

export function LoginScreen() {
  const navigation = useNavigation<any>();

  const { control, errors, error, loading, submit, reset } = useLogin();

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [reset]),
  );

  const passwordRef = useRef<TextInput>(null);

  function goToRegister() {
    navigation.navigate("Register");
  }

  return (
    <Safe edges={["bottom", "top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Content>
            <Card>
              <Header>
                <LogoBox>
                  <LogoText>E</LogoText>
                </LogoBox>

                <Title>
                  <Title style={{ color: "#21845b" }}>Educa</Title>
                  <Title style={{ color: "#2876c7" }}>Blog</Title>
                </Title>

                <Subtitle>Entre na sua conta para continuar</Subtitle>
              </Header>

              {error ? (
                <FeedbackWrapper>
                  <Feedback type="error" message={error} />
                </FeedbackWrapper>
              ) : null}

              <Controller
                control={control}
                name="username"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    label="Usuário"
                    placeholder="Digite seu usuário"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.username?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    ref={passwordRef}
                    label="Senha"
                    placeholder="Digite sua senha"
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={submit}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                  />
                )}
              />

              <Button
                label="Entrar"
                fullWidth
                loading={loading}
                onPress={submit}
              />

              <RegisterArea>
                <RegisterText>Ainda não possui uma conta?</RegisterText>

                <Pressable onPress={goToRegister} hitSlop={8}>
                  <RegisterLink>Cadastrar usuário</RegisterLink>
                </Pressable>
              </RegisterArea>
            </Card>

            <Footer>EducaBlog • Plataforma educacional</Footer>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Safe>
  );
}
