import React from "react";
import styled from "styled-components/native";
import type { Post } from "../types/post.types";
import { getDiscipline, type DisciplineKey } from "../constants/disciplines";
import { htmlToPlainText } from "../utils/htmlToPlainText";
import { DisciplineBadge } from "./DisciplineBadge";

const SUMMARY_LENGTH = 120;

interface PostCardProps {
  post: Post;
  onPress?: (post: Post) => void;
}

const Container = styled.TouchableOpacity<{ disciplineKey: DisciplineKey }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  border-width: 1px;
  border-top-width: 3px;
  border-color: ${({ theme, disciplineKey }) =>
    theme.colors.discipline[disciplineKey].border};
  border-top-color: ${({ theme, disciplineKey }) =>
    theme.colors.discipline[disciplineKey].text};
  padding: ${({ theme }) => theme.spacing.md}px;
  shadow-color: ${({ theme }) => theme.shadow.sm.shadowColor};
  shadow-offset: 0px 1px;
  shadow-opacity: ${({ theme }) => theme.shadow.sm.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadow.sm.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadow.sm.elevation};
`;

const Title = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Summary = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const Teacher = styled.Text<{ disciplineKey: DisciplineKey }>`
  flex-shrink: 1;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, disciplineKey }) =>
    theme.colors.discipline[disciplineKey].text};
`;

const DateText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

function getSummary(content: string): string {
  const text = htmlToPlainText(content);
  if (!text) return "Sem descrição disponível.";
  return text.length > SUMMARY_LENGTH
    ? `${text.slice(0, SUMMARY_LENGTH)}...`
    : text;
}

export function PostCard({ post, onPress }: PostCardProps) {
  const { key } = getDiscipline(post.discipline);

  return (
    <Container
      disciplineKey={key}
      activeOpacity={0.75}
      disabled={!onPress}
      onPress={() => onPress?.(post)}
      accessibilityRole="button"
      accessibilityLabel={`Post: ${post.title}`}
    >
      <DisciplineBadge discipline={post.discipline} />

      <Title numberOfLines={2}>{post.title}</Title>

      <Summary numberOfLines={3}>{getSummary(post.content)}</Summary>

      <Footer>
        <Teacher disciplineKey={key} numberOfLines={1}>
          {post.teacher || post.author || "Não informado"}
        </Teacher>
        <DateText>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("pt-BR")
            : ""}
        </DateText>
      </Footer>
    </Container>
  );
}
