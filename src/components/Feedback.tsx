import React from 'react';
import { View, Text } from 'react-native';

type FeedbackType = 'success' | 'error' | 'info' | 'warning';

interface FeedbackProps {
  type: FeedbackType;
  message: string;
}

const typeStyles: Record<FeedbackType, { container: string; text: string }> = {
  success: {
    container: 'bg-primary-light border border-primary rounded-xl p-3',
    text: 'text-primary-dark text-sm font-medium',
  },
  error: {
    container: 'bg-red-50 border border-danger rounded-xl p-3',
    text: 'text-danger text-sm font-medium',
  },
  info: {
    container: 'bg-secondary-light border border-secondary rounded-xl p-3',
    text: 'text-secondary text-sm font-medium',
  },
  warning: {
    container: 'bg-matematica-bg border border-matematica-border rounded-xl p-3',
    text: 'text-matematica-text text-sm font-medium',
  },
};

export function Feedback({ type, message }: FeedbackProps) {
  const styles = typeStyles[type];
  return (
    <View className={styles.container}>
      <Text className={styles.text}>{message}</Text>
    </View>
  );
}
