import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padded?: boolean;
}

const Container = styled.View<{ padded: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ padded, theme }) => (padded ? `${theme.spacing.md}px` : '0')};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 3;
`;

export function Card({ children, padded = true, ...rest }: CardProps) {
  return (
    <Container padded={padded} {...rest}>
      {children}
    </Container>
  );
}
