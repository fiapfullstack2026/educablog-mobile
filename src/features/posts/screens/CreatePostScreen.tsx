import React, { useCallback, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import styled, { useTheme } from "styled-components/native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Feedback } from "@/components/Feedback";
import type { CreatePostScreenProps } from "@/navigation/types";
import { DisciplineBadge } from "../components/DisciplineBadge";
import { DISCIPLINE_LIST } from "../constants/disciplines";
import { useCreatePost } from "../hooks/useCreatePost";

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
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

const FeedbackWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

// Mesmo visual de label/erro do Input
const Field = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const FieldLabel = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: 6px;
`;

const FieldError = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 4px;
`;

const Disciplines = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

// Badge não selecionado fica esmaecido
const DisciplineOption = styled.Pressable<{ selected: boolean }>`
  opacity: ${({ selected }) => (selected ? 1 : 0.4)};
`;

const Actions = styled.View`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export function CreatePostScreen({ navigation }: CreatePostScreenProps) {
  const theme = useTheme();
  const teacherRef = useRef<TextInput>(null);
  const contentRef = useRef<TextInput>(null);

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
    <Safe edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
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

          <Card>
            {error ? (
              <FeedbackWrapper>
                <Feedback type="error" message={error} />
              </FeedbackWrapper>
            ) : null}

            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  label="Título"
                  placeholder="Ex.: Introdução à fotossíntese"
                  returnKeyType="next"
                  onSubmitEditing={() => teacherRef.current?.focus()}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.title?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="discipline"
              render={({ field: { value, onChange } }) => (
                <Field>
                  <FieldLabel>Disciplina</FieldLabel>
                  <Disciplines accessibilityRole="radiogroup">
                    {DISCIPLINE_LIST.map((d) => {
                      const selected = value === d.label;
                      return (
                        <DisciplineOption
                          key={d.key}
                          selected={selected}
                          onPress={() => onChange(d.label)}
                          hitSlop={4}
                          accessibilityRole="radio"
                          accessibilityState={{ selected }}
                          accessibilityLabel={d.label}
                        >
                          <DisciplineBadge discipline={d.label} />
                        </DisciplineOption>
                      );
                    })}
                  </Disciplines>
                  {errors.discipline?.message && (
                    <FieldError>{errors.discipline.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="teacher"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  ref={teacherRef}
                  label="Professor"
                  placeholder="Nome do professor"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => contentRef.current?.focus()}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.teacher?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  ref={contentRef}
                  label="Conteúdo"
                  placeholder="Escreva o conteúdo do post..."
                  multiline
                  textAlignVertical="top"
                  style={{ minHeight: 180 }}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.content?.message}
                />
              )}
            />

            <Actions>
              <Button
                label="Publicar"
                fullWidth
                loading={loading}
                onPress={submit}
              />
              <Button
                label="Cancelar"
                variant="ghost"
                fullWidth
                disabled={loading}
                onPress={cancel}
              />
            </Actions>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Safe>
  );
}
