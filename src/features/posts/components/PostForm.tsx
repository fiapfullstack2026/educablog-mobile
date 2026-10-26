import React, { useRef } from "react";
import type { TextInput } from "react-native";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import styled from "styled-components/native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Feedback } from "@/components/Feedback";
import { FormField } from "@/components/FormField";
import { DISCIPLINE_LIST } from "../constants/disciplines";
import type { PostFormData } from "../schemas/postSchema";
import { DisciplineBadge } from "./DisciplineBadge";

const FeedbackWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
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

interface PostFormProps {
  control: Control<PostFormData>;
  errors: FieldErrors<PostFormData>;
  error: string | null;
  loading: boolean;
  submitLabel: string;
  onSubmit: () => void;
  onCancel: () => void;
}

/** Campos do post compartilhados entre criação e edição */
export function PostForm({
  control,
  errors,
  error,
  loading,
  submitLabel,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const teacherRef = useRef<TextInput>(null);
  const contentRef = useRef<TextInput>(null);

  return (
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
          <FormField label="Disciplina" error={errors.discipline?.message}>
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
          </FormField>
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
          label={submitLabel}
          fullWidth
          loading={loading}
          onPress={onSubmit}
        />
        <Button
          label="Cancelar"
          variant="ghost"
          fullWidth
          disabled={loading}
          onPress={onCancel}
        />
      </Actions>
    </Card>
  );
}
