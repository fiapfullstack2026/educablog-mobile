import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from '@/store';
import { RootNavigator } from '@/navigation/RootNavigator';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar style="light" backgroundColor="#1A5C38" />
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
