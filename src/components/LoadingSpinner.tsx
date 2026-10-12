import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ message, fullScreen = true }: LoadingSpinnerProps) {
  return (
    <View
      className={`items-center justify-center ${fullScreen ? 'flex-1 bg-white' : 'py-8'}`}
    >
      <ActivityIndicator size="large" color="#1A5C38" />
      {message && (
        <Text className="text-gray-500 mt-3 text-sm">{message}</Text>
      )}
    </View>
  );
}
