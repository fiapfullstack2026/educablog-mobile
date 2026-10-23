import React from "react";
import { ActivityIndicator } from "react-native";
import styled, { useTheme } from "styled-components/native";
import type { Post } from "../types/post.types";
import { DisciplineBadge } from "./DisciplineBadge";

interface AdminPostItemProps {
  post: Post;
  deleting?: boolean;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
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

export function AdminPostItem({
  post,
  deleting = false,
  onEdit,
  onDelete,
}: AdminPostItemProps) {
  const theme = useTheme();
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("pt-BR")
    : "—";

  return (
    <Container>
      <DisciplineBadge discipline={post.discipline} />

      <Title numberOfLines={2}>{post.title}</Title>

      <Meta numberOfLines={1}>
        {post.teacher || post.author || "Não informado"} · {date}
      </Meta>

      <Actions>
        <ActionButton
          disabled={deleting}
          onPress={() => onEdit(post)}
          accessibilityRole="button"
          accessibilityLabel={`Editar post ${post.title}`}
        >
          <EditLabel>Editar</EditLabel>
        </ActionButton>

        <ActionButton
          disabled={deleting}
          onPress={() => onDelete(post)}
          accessibilityRole="button"
          accessibilityLabel={`Excluir post ${post.title}`}
        >
          {deleting ? (
            <ActivityIndicator size="small" color={theme.colors.danger} />
          ) : (
            <DeleteLabel>Excluir</DeleteLabel>
          )}
        </ActionButton>
      </Actions>
    </Container>
  );
}
