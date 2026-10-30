import React from 'react';
import styled from 'styled-components/native';

import { Feedback } from './Feedback';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

/** Tela provisória para funcionalidades ainda não implementadas */
export function ScreenPlaceholder({ message }: { message: string }) {
  return (
    <Container>
      <Feedback type="info" message={message} />
    </Container>
  );
}
