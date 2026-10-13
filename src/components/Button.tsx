import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

const Container = styled.TouchableOpacity<{
  variant: Variant;
  fullWidth: boolean;
  disabled: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':   return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'danger':    return theme.colors.danger;
      case 'ghost':     return 'transparent';
    }
  }};
  border-width: ${({ variant }) => (variant === 'ghost' ? '1.5px' : '0')};
  border-color: ${({ theme }) => theme.colors.primary};
`;

const Label = styled.Text<{ variant: Variant }>`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme, variant }) =>
    variant === 'ghost' ? theme.colors.primary : theme.colors.white};
`;

export function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Container
      variant={variant}
      fullWidth={fullWidth}
      disabled={!!isDisabled}
      activeOpacity={0.75}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'ghost' ? theme.colors.primary : theme.colors.white}
          size="small"
        />
      ) : (
        <Label variant={variant}>{label}</Label>
      )}
    </Container>
  );
}
