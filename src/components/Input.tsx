import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { FormField } from './FormField';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

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

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, ...rest },
  ref,
) {
  const theme = useTheme();

  return (
    <FormField label={label} error={error}>
      <StyledInput
        ref={ref}
        hasError={!!error}
        placeholderTextColor={theme.colors.gray[400]}
        {...rest}
      />
    </FormField>
  );
});
