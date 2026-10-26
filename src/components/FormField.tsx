import React, { type ReactNode } from 'react';
import styled from 'styled-components/native';

interface FormFieldProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

const Wrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: 6px;
`;

const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 4px;
`;

/** Label + controle + mensagem de erro, para qualquer tipo de campo */
export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}
