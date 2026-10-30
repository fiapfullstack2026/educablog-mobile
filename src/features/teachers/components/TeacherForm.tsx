import React, { useRef } from "react";
import type { TextInput } from "react-native";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import styled from "styled-components/native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Feedback } from "@/components/Feedback";
import { FormField } from "@/components/FormField";
import type { EditTeacherFormData } from "../schemas/teacherSchema";

const FeedbackWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Roles = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const RoleOption = styled.Pressable<{ selected: boolean }>`
  flex: 1;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm + 4}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1.5px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.gray[300]};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primaryLight : theme.colors.white};
`;

const RoleLabel = styled.Text<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: ${({ theme, selected }) =>
    selected ? theme.fontWeight.semibold : theme.fontWeight.regular};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.gray[600]};
`;

const Hint = styled.Text`
  margin-top: -${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Actions = styled.View`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const ROLES = [
  { value: true, label: "Professor" },
  { value: false, label: "Aluno" },
] as const;

interface TeacherFormProps {
  control: Control<EditTeacherFormData>;
  errors: FieldErrors<EditTeacherFormData>;
  error: string | null;
  loading: boolean;
  submitLabel: string;
  /** Oculta a troca de perfil (ex.: quando o professor edita a si mesmo) */
  hideRole?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/** Campos do professor: usuário, nova senha e perfil de acesso */
export function TeacherForm({
  control,
  errors,
  error,
  loading,
  submitLabel,
  hideRole = false,
  onSubmit,
  onCancel,
}: TeacherFormProps) {
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

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
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Usuário"
            placeholder="Nome de usuário"
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
            label="Nova senha"
            placeholder="••••••"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmRef.current?.focus()}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />
      <Hint>Deixe em branco para manter a senha atual.</Hint>

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            ref={confirmRef}
            label="Confirmar nova senha"
            placeholder="••••••"
            secureTextEntry
            returnKeyType="done"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      {!hideRole && (
        <Controller
          control={control}
          name="isTeacher"
          render={({ field: { value, onChange } }) => (
            <FormField label="Perfil de acesso" error={errors.isTeacher?.message}>
              <Roles accessibilityRole="radiogroup">
                {ROLES.map((role) => {
                  const selected = value === role.value;
                  return (
                    <RoleOption
                      key={role.label}
                      selected={selected}
                      disabled={loading}
                      onPress={() => onChange(role.value)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      accessibilityLabel={role.label}
                    >
                      <RoleLabel selected={selected}>{role.label}</RoleLabel>
                    </RoleOption>
                  );
                })}
              </Roles>
            </FormField>
          )}
        />
      )}

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
