import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PublicStackParamList } from './types';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export function PublicStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
