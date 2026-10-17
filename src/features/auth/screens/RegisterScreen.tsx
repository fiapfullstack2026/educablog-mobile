import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Feedback } from "@/components/Feedback";
import { register } from "../services/authService";

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

const Brand = styled.View`
  flex-direction: row;
`;

const BrandText = styled.Text`
  font-size: 26px;
  font-weight: 500;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #68756e;
  margin-top: 4px;
  text-align: center;
`;

const Fields = styled.View`
  gap: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #273a30;
  margin-bottom: 12px;
`;

const UserTypes = styled.View`
  gap: 14px;
  margin-top: 4px;
`;

const Option = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const RadioOuter = styled.View<{ selected: boolean }>`
  width: 19px;
  height: 19px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${({ selected }) => (selected ? "#21845b" : "#a9b7af")};
  align-items: center;
  justify-content: center;
`;

const RadioInner = styled.View`
  width: 9px;
  height: 9px;
  border-radius: 5px;
  background-color: #21845b;
`;

const OptionText = styled.Text`
  font-size: 14px;
  color: #68756e;
`;

const ErrorBox = styled.View`
  margin-bottom: 16px;
`;

const Footer = styled.Text`
  text-align: center;
  font-size: 12px;
  color: #8b9690;
  margin-top: 16px;
`;

const LoginArea = styled.View`
  align-items: center;
  margin-top: 20px;
  gap: 5px;
`;

const LoginText = styled.Text`
  font-size: 14px;
  color: #68756e;
`;

const LoginLink = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #2876c7;
`;

export function RegisterScreen() {
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (loading) return;

    if (!username.trim() || !password || !confirmPassword) {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não são iguais");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await register({
        username: username.trim(),
        password,
        isTeacher,
      });

      navigation.goBack();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? "Não foi possível criar o usuário";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Safe edges={["top", "bottom"]}>
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

                <Brand>
                  <BrandText style={{ color: "#21845b" }}>Educa</BrandText>
                  <BrandText style={{ color: "#2876c7" }}>Blog</BrandText>
                </Brand>

                <Subtitle>Crie sua conta para começar</Subtitle>
              </Header>

              <SectionTitle>Criar acesso</SectionTitle>

              {error ? (
                <ErrorBox>
                  <Feedback type="error" message={error} />
                </ErrorBox>
              ) : null}

              <Fields>
                <Input
                  label="Usuário"
                  placeholder="Digite seu usuário"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={username}
                  onChangeText={setUsername}
                  editable={!loading}
                />

                <Input
                  label="Senha"
                  placeholder="Digite sua senha"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                />

                <Input
                  label="Confirmar senha"
                  placeholder="Digite a senha novamente"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!loading}
                />

                <UserTypes>
                  <Option
                    onPress={() => setIsTeacher(false)}
                    disabled={loading}
                  >
                    <RadioOuter selected={!isTeacher}>
                      {!isTeacher ? <RadioInner /> : null}
                    </RadioOuter>
                    <OptionText>Sou aluno</OptionText>
                  </Option>

                  <Option onPress={() => setIsTeacher(true)} disabled={loading}>
                    <RadioOuter selected={isTeacher}>
                      {isTeacher ? <RadioInner /> : null}
                    </RadioOuter>
                    <OptionText>Sou professor</OptionText>
                  </Option>
                </UserTypes>

                <Button
                  label="Criar acesso"
                  fullWidth
                  loading={loading}
                  onPress={handleRegister}
                />
              </Fields>

              <LoginArea>
                <LoginText>Já possui uma conta?</LoginText>

                <Pressable
                  onPress={() => navigation.goBack()}
                  disabled={loading}
                  hitSlop={8}
                >
                  <LoginLink>Fazer login</LoginLink>
                </Pressable>
              </LoginArea>
            </Card>

            <Footer>EducaBlog • Plataforma educacional FIAP</Footer>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Safe>
  );
}
