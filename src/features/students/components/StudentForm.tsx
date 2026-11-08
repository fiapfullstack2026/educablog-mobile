import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import styled from "styled-components/native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Feedback } from "@/components/Feedback";

interface EditStudentFormData {
  username: string;
}

interface StudentFormProps {
  control: Control<EditStudentFormData>;
  errors: FieldErrors<EditStudentFormData>;
  error: string | null;
  loading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const FeedbackWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Actions = styled.View`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export function StudentForm({
  control,
  errors,
  error,
  loading,
  onSubmit,
  onCancel,
  onDelete,
}: StudentFormProps) {
  return (
    <Card>
      {error ? (
        <FeedbackWrapper>
          <Feedback type="error" message={error} />
        </FeedbackWrapper>
      ) : null}

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nome de usuário"
            placeholder="Digite o nome de usuário"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.username?.message}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
        )}
      />

      <Actions>
        <Button
          label="Salvar alterações"
          fullWidth
          loading={loading}
          disabled={loading}
          onPress={onSubmit}
        />

        <Button
          label="Excluir aluno"
          variant="secondary"
          fullWidth
          disabled={loading}
          onPress={onDelete}
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
