import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";

import type { Student } from "../services/studentsService";

interface StudentListItemProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.View`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full}px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
`;

const Info = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const Name = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Meta = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray[100]};
`;

const ActionButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.xs}px
    ${({ theme }) => theme.spacing.sm}px;
`;

const EditLabel = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

const DeleteLabel = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.danger};
`;

export function StudentListItem({
  student,
  onEdit,
  onDelete,
}: StudentListItemProps) {
  const theme = useTheme();
  const createdAt =
    student.createdAt && !Number.isNaN(Date.parse(student.createdAt))
      ? new Date(student.createdAt).toLocaleDateString("pt-BR")
      : null;

  return (
    <Container>
      <Row>
        <Avatar>
          <MaterialCommunityIcons
            name="school"
            size={24}
            color={theme.colors.primary}
          />
        </Avatar>

        <Info>
          <Name numberOfLines={1}>{student.username}</Name>
          <Meta>
            {createdAt
              ? `Cadastrado em ${createdAt}`
              : "Data de cadastro não disponível"}
          </Meta>
        </Info>
      </Row>

      <Actions>
        <ActionButton
          onPress={() => onEdit(student)}
          accessibilityRole="button"
          accessibilityLabel={`Editar aluno ${student.username}`}
        >
          <EditLabel>Editar</EditLabel>
        </ActionButton>

        <ActionButton
          onPress={() => onDelete(student)}
          accessibilityRole="button"
          accessibilityLabel={`Excluir aluno ${student.username}`}
        >
          <DeleteLabel>Excluir</DeleteLabel>
        </ActionButton>
      </Actions>
    </Container>
  );
}
