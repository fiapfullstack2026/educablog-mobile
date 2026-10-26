import React from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

import { Button } from "@/components/Button";
import { Feedback } from "@/components/Feedback";
import { TeacherOnly } from "@/navigation/TeacherOnly";
import type { AdminPostsScreenProps } from "@/navigation/types";

import { AdminPostItem } from "../components/AdminPostItem";
import { useDeletePost } from "../hooks/useDeletePost";
import { usePosts } from "../hooks/usePosts";

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: 0;
`;

const Title = styled.Text`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
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
`;

export function AdminPostsScreen({ navigation }: AdminPostsScreenProps) {
  const theme = useTheme();
  const { posts, loading, refreshing, error, refresh } = usePosts();
  const { deletingId, confirmDelete } = useDeletePost();

  return (
    <TeacherOnly>
      <Safe edges={["bottom"]}>
        <Header>
          <Title>Gerenciar Posts</Title>
          <Button
            label="Criar Post"
            onPress={() => navigation.navigate("CreatePost")}
            fullWidth
          />
        </Header>

        {error && (
          <FeedbackWrapper>
            <Feedback type="error" message={error} />
          </FeedbackWrapper>
        )}

        {loading && !refreshing && posts.length === 0 ? (
          <Spinner
            size="large"
            color={theme.colors.primary}
          />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(post) => post._id}
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
              error ? null : <Empty>Nenhum post encontrado.</Empty>
            }
            renderItem={({ item }) => (
              <AdminPostItem
                post={item}
                deleting={deletingId === item._id}
                onEdit={(post) =>
                  navigation.navigate("EditPost", { postId: post._id })
                }
                onDelete={(post) => confirmDelete(post._id)}
              />
            )}
          />
        )}
      </Safe>
    </TeacherOnly>
  );
}
