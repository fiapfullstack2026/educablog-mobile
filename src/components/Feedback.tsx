import React from 'react';
import styled from 'styled-components/native';

type FeedbackType = 'error' | 'success' | 'info';

interface FeedbackProps {
  type: FeedbackType;
  message: string;
}

const Container = styled.View<{ type: FeedbackType }>`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'error':   return theme.colors.dangerLight;
      case 'success': return theme.colors.primaryLight;
      case 'info':    return theme.colors.secondaryLight;
    }
  }};
  border-color: ${({ theme, type }) => {
    switch (type) {
      case 'error':   return theme.colors.danger;
      case 'success': return theme.colors.primary;
      case 'info':    return theme.colors.secondary;
    }
  }};
`;

const Message = styled.Text<{ type: FeedbackType }>`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme, type }) => {
    switch (type) {
      case 'error':   return theme.colors.danger;
      case 'success': return theme.colors.primary;
      case 'info':    return theme.colors.secondary;
    }
  }};
`;

export function Feedback({ type, message }: FeedbackProps) {
  return (
    <Container type={type}>
      <Message type={type}>{message}</Message>
    </Container>
  );
}
