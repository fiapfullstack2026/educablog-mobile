import React from "react";
import styled from "styled-components/native";

import { TeacherOnly } from "@/navigation/TeacherOnly";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const Placeholder = styled.Text`
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export function EditPostScreen() {
  return (
    <TeacherOnly>
      <Container>
        <Placeholder>Editar post — Semana 3</Placeholder>
      </Container>
    </TeacherOnly>
  );
}
