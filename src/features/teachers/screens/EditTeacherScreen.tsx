import React, { useCallback } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

import { Button } from "@/components/Button";
import { Feedback } from "@/components/Feedback";
import { TeacherOnly } from "@/navigation/TeacherOnly";
import type { EditTeacherScreenProps } from "@/navigation/types";
import { TeacherForm } from "../components/TeacherForm";
import { useEditTeacher } from "../hooks/useEditTeacher";

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const KeyboardAvoiding = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const StatusContainer = styled.View`
  flex: 1;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export function EditTeacherScreen({ route, navigation }: EditTeacherScreenProps) {
  const theme = useTheme();
  const { teacherId } = route.params;

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate("TeacherList");
  }, [navigation]);

  const {
    control,
    errors,
    isCurrentUser,
    loadingTeacher,
    loadError,
    retry,
    error,
    loading,
    submit,
  } = useEditTeacher(teacherId, goBack);

  if (loadingTeacher) {
    return (
      <TeacherOnly>
        <StatusContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </StatusContainer>
      </TeacherOnly>
    );
  }

  if (loadError) {
    return (
      <TeacherOnly>
        <StatusContainer>
          <Feedback type="error" message={loadError} />
          <Button label="Tentar novamente" variant="ghost" onPress={retry} />
        </StatusContainer>
      </TeacherOnly>
    );
  }

  return (
    <TeacherOnly>
      <Safe edges={["bottom"]}>
        <KeyboardAvoiding
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{ padding: theme.spacing.md }}
            keyboardShouldPersistTaps="handled"
          >
            <Header>
              <Title>Editar professor</Title>
              <Subtitle>
                {isCurrentUser
                  ? "Você está editando a sua própria conta."
                  : "Atualize os dados de acesso do professor."}
              </Subtitle>
            </Header>

            <TeacherForm
              control={control}
              errors={errors}
              error={error}
              loading={loading}
              submitLabel="Salvar alterações"
              hideRole={isCurrentUser}
              onSubmit={submit}
              onCancel={goBack}
            />
          </ScrollView>
        </KeyboardAvoiding>
      </Safe>
    </TeacherOnly>
  );
}
