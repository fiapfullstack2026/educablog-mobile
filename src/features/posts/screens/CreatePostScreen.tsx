import React, { useCallback } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import styled, { useTheme } from "styled-components/native";

import { TeacherOnly } from "@/navigation/TeacherOnly";
import type { CreatePostScreenProps } from "@/navigation/types";
import { PostForm } from "../components/PostForm";
import { useCreatePost } from "../hooks/useCreatePost";

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

export function CreatePostScreen({ navigation }: CreatePostScreenProps) {
  const theme = useTheme();

  // O back-end não devolve o post criado, então voltamos para a lista
  const onSuccess = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.replace("Home");
  }, [navigation]);

  const { control, errors, error, loading, submit, reset } =
    useCreatePost(onSuccess);

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [reset]),
  );

  function cancel() {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate("Home");
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
              <Title>Novo post</Title>
              <Subtitle>Compartilhe um conteúdo com seus alunos.</Subtitle>
            </Header>

            <PostForm
              control={control}
              errors={errors}
              error={error}
              loading={loading}
              submitLabel="Publicar"
              onSubmit={submit}
              onCancel={cancel}
            />
          </ScrollView>
        </KeyboardAvoiding>
      </Safe>
    </TeacherOnly>
  );
}
