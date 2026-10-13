import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { store, persistor } from '@/store';
import { RootNavigator } from '@/navigation/RootNavigator';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { theme } from '@/styles/theme';

export default function App() {
  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar style="light" backgroundColor="#1A5C38" />
            <RootNavigator />
          </SafeAreaProvider>
      </PersistGate>
        </ThemeProvider>
    </Provider>
  );
}
