import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary rounded-xl py-3 px-6 items-center justify-center',
    text: 'text-white font-semibold text-base',
  },
  secondary: {
    container: 'bg-secondary rounded-xl py-3 px-6 items-center justify-center',
    text: 'text-white font-semibold text-base',
  },
  danger: {
    container: 'bg-danger rounded-xl py-3 px-6 items-center justify-center',
    text: 'text-white font-semibold text-base',
  },
  ghost: {
    container: 'border border-primary rounded-xl py-3 px-6 items-center justify-center bg-transparent',
    text: 'text-primary font-semibold text-base',
  },
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  ...rest
}: ButtonProps) {
  const styles = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`${styles.container} ${fullWidth ? 'w-full' : ''} ${isDisabled ? 'opacity-50' : ''}`}
      disabled={isDisabled}
      activeOpacity={0.75}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text className={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
