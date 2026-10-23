import React, { type ReactNode } from "react";
import styled from "styled-components/native";

import { Feedback } from "@/components/Feedback";
import { useAppSelector } from "@/store/hooks";
import { selectIsTeacher } from "@/store/authSlice";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

/** Defesa em profundidade: o AppStack já só registra estas rotas para professores */
export function TeacherOnly({ children }: { children: ReactNode }) {
  const isTeacher = useAppSelector(selectIsTeacher);

  if (!isTeacher) {
    return (
      <Container>
        <Feedback type="error" message="Acesso restrito a professores." />
      </Container>
    );
  }

  return <>{children}</>;
}
