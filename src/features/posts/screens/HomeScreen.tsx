import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingSpinner } from '@/components/LoadingSpinner';

/** Semana 2: lista de posts + busca */
export function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400">Lista de posts — Semana 2</Text>
      </View>
    </SafeAreaView>
  );
}
