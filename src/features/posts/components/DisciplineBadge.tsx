import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import { getDiscipline, type DisciplineKey } from "../constants/disciplines";

interface DisciplineBadgeProps {
  /** texto livre vindo de `post.discipline` */
  discipline?: string | null;
}

// bg + border + text da mesma disciplina sempre juntos
const Container = styled.View<{ disciplineKey: DisciplineKey }>`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding: ${({ theme }) => `${theme.spacing.xs}px 10px`};
  border-radius: ${({ theme }) => theme.radius.full}px;
  border-width: 1px;
  background-color: ${({ theme, disciplineKey }) =>
    theme.colors.discipline[disciplineKey].bg};
  border-color: ${({ theme, disciplineKey }) =>
    theme.colors.discipline[disciplineKey].border};
`;

const Label = styled.Text<{ disciplineKey: DisciplineKey }>`
  margin-left: 6px;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, disciplineKey }) =>
    theme.colors.discipline[disciplineKey].text};
`;

export function DisciplineBadge({ discipline }: DisciplineBadgeProps) {
  const theme = useTheme();
  const d = getDiscipline(discipline);

  return (
    <Container disciplineKey={d.key}>
      <MaterialCommunityIcons
        name={d.icon}
        size={14}
        color={theme.colors.discipline[d.key].text}
      />
      <Label disciplineKey={d.key}>{d.label}</Label>
    </Container>
  );
}
