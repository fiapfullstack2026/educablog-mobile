import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
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

const StyledInput = styled.TextInput<{ hasError: boolean }>`
  border-width: 1.5px;
  border-color: ${({ theme, hasError }) =>
    hasError ? theme.colors.danger : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme }) => theme.colors.gray[900]};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 4px;
`;

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, ...rest },
  ref,
) {
  const theme = useTheme();

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput
        ref={ref}
        hasError={!!error}
        placeholderTextColor={theme.colors.gray[400]}
        {...rest}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
});
