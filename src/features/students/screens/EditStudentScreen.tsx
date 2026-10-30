import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Feedback } from "@/components/Feedback";
import type { EditStudentScreenProps } from "@/navigation/types";
import {
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../services/studentsService";

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 24,
  },
  keyboardShouldPersistTaps: "handled" as const,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: 24px;
`;

const ButtonArea = styled.View`
  margin-top: 12px;
  gap: 12px;
`;

export function EditStudentScreen({
  route,
  navigation,
}: EditStudentScreenProps) {
  const { studentId } = route.params;

  const [username, setUsername] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStudent() {
      try {
        setLoadingStudent(true);
        setError("");

        const student = await getStudentById(studentId);

        if (!active) return;

        if (student.isTeacher) {
          setError("Este usuário não é um aluno.");
          return;
        }

        setUsername(student.username);
      } catch {
        if (active) {
          setError("Não foi possível carregar os dados do aluno.");
        }
      } finally {
        if (active) {
          setLoadingStudent(false);
        }
      }
    }

    loadStudent();

    return () => {
      active = false;
    };
  }, [studentId]);

  async function handleSave() {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Informe o nome de usuário.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateStudent(studentId, {
        username: trimmedUsername,
      });

      navigation.goBack();
    } catch {
      setError(
        "Não foi possível atualizar o aluno. Verifique os dados e suas permissões.",
      );
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    Alert.alert(
      "Excluir aluno",
      "Tem certeza de que deseja excluir este aluno? Essa ação não poderá ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setSaving(true);
              setError("");

              await deleteStudent(studentId);

              navigation.goBack();
            } catch {
              setError("Não foi possível excluir o aluno.");
            } finally {
              setSaving(false);
            }
          },
        },
      ],
    );
  }

  if (loadingStudent) {
    return (
      <Container>
        <Description>Carregando dados do aluno...</Description>
      </Container>
    );
  }

  if (error && !username) {
    return (
      <Container>
        <Title>Editar aluno</Title>

        <Feedback type="error" message={error} />

        <ButtonArea>
          <Button
            label="Voltar"
            variant="secondary"
            fullWidth
            onPress={() => navigation.goBack()}
          />
        </ButtonArea>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Editar aluno</Title>

      <Description>Atualize os dados do aluno abaixo.</Description>

      {error ? <Feedback type="error" message={error} /> : null}

      {success ? <Feedback type="success" message={success} /> : null}

      <Input
        label="Nome de usuário"
        placeholder="Digite o nome de usuário"
        value={username}
        onChangeText={(value) => {
          setUsername(value);
          setError("");
          setSuccess("");
        }}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!saving}
      />

      <ButtonArea>
        <Button
          label="Salvar alterações"
          fullWidth
          loading={saving}
          disabled={saving}
          onPress={handleSave}
        />

        <Button
          label="Excluir aluno"
          variant="secondary"
          fullWidth
          disabled={saving}
          onPress={handleDelete}
        />
      </ButtonArea>
    </Container>
  );
}
