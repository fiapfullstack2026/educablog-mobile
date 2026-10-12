import React, { forwardRef } from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, ...rest },
  ref,
) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
      )}
      <TextInput
        ref={ref}
        className={`
          border rounded-xl px-4 py-3 text-base text-gray-900 bg-white
          ${error ? 'border-danger' : 'border-gray-300'}
        `}
        placeholderTextColor="#9CA3AF"
        {...rest}
      />
      {error && (
        <Text className="text-danger text-xs mt-1">{error}</Text>
      )}
    </View>
  );
});
