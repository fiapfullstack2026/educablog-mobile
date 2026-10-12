import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/store/hooks';
import { selectToken } from '@/store/authSlice';
import { PublicStack } from './PublicStack';
import { AppStack } from './AppStack';

/**
 * RootNavigator — decide qual stack exibir com base no token no Redux store.
 * O PersistGate garante que o estado já foi reidratado antes de chegar aqui.
 */
export function RootNavigator() {
  const token = useAppSelector(selectToken);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <PublicStack />}
    </NavigationContainer>
  );
}
