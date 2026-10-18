import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  loading?: boolean;
  placeholder?: string;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledInput = styled.TextInput`
  flex: 1;
  padding: 12px ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Trailing = styled.View`
  width: 20px;
  align-items: center;
`;

export function SearchBar({
  value,
  onChangeText,
  loading = false,
  placeholder = "Buscar posts...",
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <Container>
      <MaterialCommunityIcons
        name="magnify"
        size={20}
        color={theme.colors.gray[400]}
      />

      <StyledInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray[400]}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Buscar posts"
      />

      <Trailing>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : value ? (
          <Pressable
            onPress={() => onChangeText("")}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Limpar busca"
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color={theme.colors.gray[400]}
            />
          </Pressable>
        ) : null}
      </Trailing>
    </Container>
  );
}
