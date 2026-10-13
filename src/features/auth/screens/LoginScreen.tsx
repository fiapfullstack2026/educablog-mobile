import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Feedback } from '@/components/Feedback';
import { useLogin } from '../hooks/useLogin';

// ─── Styled Components ────────────────────────────────────────────────────────

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 64px;
  padding-bottom: 48px;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
`;

const LogoBox = styled.View`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.xl}px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 4;
`;

const LogoText = styled.Text`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const AppTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxxl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.5px;
`;

const AppSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
`;

const Body = styled.View`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  margin-top: -24px;
`;

const FormCard = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xl}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[100]};
`;

const FormTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: 4px;
`;

const FormSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const FeedbackWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Footer = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

// ─── Screen ──────────────────────────────────────────────────────────────────

export function LoginScreen() {
  const { form, error, loading, submit } = useLogin();

  return (
    <Safe edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Header>
            <LogoBox>
              <LogoText>E</LogoText>
            </LogoBox>
            <AppTitle>EducaBlog</AppTitle>
            <AppSubtitle>Plataforma educacional</AppSubtitle>
          </Header>

          <Body>
            <FormCard>
              <FormTitle>Entrar</FormTitle>
              <FormSubtitle>Preencha usuário e senha.</FormSubtitle>

              {error ? (
                <FeedbackWrapper>
                  <Feedback type="error" message={error} />
                </FeedbackWrapper>
              ) : null}

              <Input
                label="Usuário"
                placeholder="prof.joao"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                value={form.username}
                onChangeText={(v) => form.setUsername(v)}
              />

              <Input
                label="Senha"
                placeholder="••••••••"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={submit}
                value={form.password}
                onChangeText={(v) => form.setPassword(v)}
              />

              <Button
                label="Entrar"
                fullWidth
                loading={loading}
                onPress={submit}
              />
            </FormCard>

            <Footer>EducaBlog • Plataforma educacional FIAP</Footer>
          </Body>
        </ScrollView>
      </KeyboardAvoidingView>
    </Safe>
  );
}
