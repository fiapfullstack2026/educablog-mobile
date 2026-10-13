import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export function LoadingSpinner() {
  return (
    <Container>
      <ActivityIndicator size="large" color="#1A5C38" />
    </Container>
  );
}
