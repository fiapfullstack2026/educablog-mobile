import React from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

import { Button } from "@/components/Button";
import { Feedback } from "@/components/Feedback";
import { TeacherOnly } from "@/navigation/TeacherOnly";
import type { TeacherListScreenProps } from "@/navigation/types";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/authSlice";

import { TeacherListItem } from "../components/TeacherListItem";
import { useDeleteTeacher } from "../hooks/useDeleteTeacher";
import { useTeachers } from "../hooks/useTeachers";

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: 0;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Separator = styled.View`
  height: ${({ theme }) => theme.spacing.md}px;
`;

const Empty = styled.Text`
  padding: ${({ theme }) => theme.spacing.xl}px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: center;
`;

const Spinner = styled(ActivityIndicator)`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;

const FeedbackWrapper = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: 0;
`;

export function TeacherListScreen({ navigation }: TeacherListScreenProps) {
  const theme = useTheme();
  const currentUser = useAppSelector(selectUser);
  const { teachers, loading, refreshing, error, refresh, removeTeacher } =
    useTeachers();
  const { deletingId, confirmDelete } = useDeleteTeacher(removeTeacher);

  const count = teachers.length;

  return (
    <TeacherOnly>
      <Safe edges={["bottom"]}>
        <Header>
          <Title>Professores</Title>
          <Subtitle>
            {loading
              ? "Carregando..."
              : `${count} ${count === 1 ? "professor cadastrado" : "professores cadastrados"}`}
          </Subtitle>
        </Header>

        {error && (
          <FeedbackWrapper>
            <Feedback type="error" message={error} />
          </FeedbackWrapper>
        )}

        {loading ? (
          <Spinner size="large" color={theme.colors.primary} />
        ) : (
          <FlatList
            data={teachers}
            keyExtractor={(teacher) => teacher._id}
            contentContainerStyle={{ padding: theme.spacing.md }}
            ItemSeparatorComponent={Separator}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => void refresh()}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
              />
            }
            ListEmptyComponent={
              error ? null : <Empty>Nenhum professor encontrado.</Empty>
            }
            renderItem={({ item }) => (
              <TeacherListItem
                teacher={item}
                isCurrentUser={item.username === currentUser?.username}
                deleting={deletingId === item._id}
                onEdit={(teacher) =>
                  navigation.navigate("EditTeacher", { teacherId: teacher._id })
                }
                onDelete={confirmDelete}
              />
            )}
          />
        )}
      </Safe>
    </TeacherOnly>
  );
}
