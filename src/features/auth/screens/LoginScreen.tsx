import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Feedback } from '@/components/Feedback';
import { useLogin } from '../hooks/useLogin';

/**
 * LoginScreen — Semana 2 implementará a lógica completa.
 * Por ora exibe o layout e chama o hook stub.
 */
export function LoginScreen() {
  const { form, error, loading, submit } = useLogin();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo / Cabeçalho */}
          <View className="items-center mb-10">
            <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">E</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">
              Educa<Text className="text-secondary">Blog</Text>
            </Text>
            <Text className="text-gray-500 text-sm mt-1">Entre na sua conta para continuar</Text>
          </View>

          {/* Formulário */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {error && <Feedback type="error" message={error} />}

            <Input
              label="Usuário"
              placeholder="prof.joao"
              autoCapitalize="none"
              autoCorrect={false}
              value={form.username}
              onChangeText={(v) => form.setUsername(v)}
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              secureTextEntry
              value={form.password}
              onChangeText={(v) => form.setPassword(v)}
            />

            <Button
              label="Entrar"
              fullWidth
              loading={loading}
              onPress={submit}
              className="mt-2"
            />
          </View>

          <Text className="text-center text-gray-400 text-xs mt-8">
            EducaBlog • Plataforma educacional
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
