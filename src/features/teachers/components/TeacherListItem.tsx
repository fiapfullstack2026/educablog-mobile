import React from "react";
import { ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";

import type { Teacher } from "../schemas/teacher.type";

interface TeacherListItemProps {
  teacher: Teacher;
  isCurrentUser?: boolean;
  deleting?: boolean;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
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

const SelfBadge = styled.Text`
  padding: 2px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radius.full}px;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.secondaryLight};
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
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
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

export function TeacherListItem({
  teacher,
  isCurrentUser = false,
  deleting = false,
  onEdit,
  onDelete,
}: TeacherListItemProps) {
  const theme = useTheme();
  const since = teacher.createdAt
    ? new Date(teacher.createdAt).toLocaleDateString("pt-BR")
    : "—";

  return (
    <Container>
      <Row>
        <Avatar>
          <MaterialCommunityIcons
            name="account-tie"
            size={24}
            color={theme.colors.primary}
          />
        </Avatar>

        <Info>
          <Name numberOfLines={1}>{teacher.username}</Name>
          <Meta>Cadastrado em {since}</Meta>
        </Info>

        {isCurrentUser && <SelfBadge>Você</SelfBadge>}
      </Row>

      <Actions>
        <ActionButton
          disabled={deleting}
          onPress={() => onEdit(teacher)}
          accessibilityRole="button"
          accessibilityLabel={`Editar professor ${teacher.username}`}
        >
          <EditLabel>Editar</EditLabel>
        </ActionButton>

        {/* Excluir a própria conta invalidaria a sessão atual */}
        {!isCurrentUser && (
          <ActionButton
            disabled={deleting}
            onPress={() => onDelete(teacher)}
            accessibilityRole="button"
            accessibilityLabel={`Excluir professor ${teacher.username}`}
          >
            {deleting ? (
              <ActivityIndicator size="small" color={theme.colors.danger} />
            ) : (
              <DeleteLabel>Excluir</DeleteLabel>
            )}
          </ActionButton>
        )}
      </Actions>
    </Container>
  );
}
