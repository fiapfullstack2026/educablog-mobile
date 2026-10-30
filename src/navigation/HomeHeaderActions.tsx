import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { selectIsTeacher } from "@/store/authSlice";

interface HomeHeaderActionsProps {
  onManagePosts: () => void;
  onCreatePost: () => void;
  onManageTeachers: () => void;
}

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

export function HomeHeaderActions({
  onManagePosts,
  onCreatePost,
  onManageTeachers,
}: HomeHeaderActionsProps) {
  const isTeacher = useAppSelector(selectIsTeacher);
  const { signOut } = useAuth();

  return (
    <Row>
      {isTeacher && (
        <>
          <IconButton
            onPress={onManagePosts}
            accessibilityRole="button"
            accessibilityLabel="Gerenciar posts"
          >
            <MaterialCommunityIcons name="view-list" size={24} color="#FFFFFF" />
          </IconButton>

          <IconButton
            onPress={onCreatePost}
            accessibilityRole="button"
            accessibilityLabel="Criar post"
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={24}
              color="#FFFFFF"
            />
          </IconButton>

          <IconButton
            onPress={onManageTeachers}
            accessibilityRole="button"
            accessibilityLabel="Gerenciar professores"
          >
            <MaterialCommunityIcons
              name="account-tie"
              size={24}
              color="#FFFFFF"
            />
          </IconButton>
        </>
      )}

      <IconButton
        onPress={() => void signOut()}
        accessibilityRole="button"
        accessibilityLabel="Sair"
      >
        <MaterialCommunityIcons name="logout" size={24} color="#FFFFFF" />
      </IconButton>
    </Row>
  );
}
