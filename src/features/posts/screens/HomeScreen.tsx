import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, type ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Feedback } from "@/components/Feedback";
import { Button } from "@/components/Button";
import { useDebounce } from "@/hooks/useDebounce";
import type { HomeScreenProps } from "@/navigation/types";
import { PostCard } from "../components/PostCard";
import { SearchBar } from "../components/SearchBar";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post.types";

// O header do AppStack já cobre a borda superior
const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const SearchWrapper = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const FeedbackWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Separator = styled.View`
  height: ${({ theme }) => theme.spacing.md}px;
`;

const Empty = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.white};
`;

const EmptyText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: center;
`;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { posts, loading, searching, refreshing, error, refresh } =
    usePosts(debouncedSearch);
  const term = debouncedSearch.trim();

  const openPost = useCallback(
    (post: Post) => navigation.navigate("PostDetail", { postId: post._id }),
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Post>>(
    ({ item }) => <PostCard post={item} onPress={openPost} />,
    [openPost],
  );

  if (loading) return <LoadingSpinner />;

  return (
    <Safe edges={["bottom"]}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ padding: theme.spacing.md }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListHeaderComponent={
          <Header>
            <Title>Seja bem-vindo(a)!</Title>
            <Subtitle>Confira os últimos conteúdos publicados.</Subtitle>
            <SearchWrapper>
              <SearchBar
                value={search}
                onChangeText={setSearch}
                loading={search !== debouncedSearch || searching}
                placeholder="Buscar por título..."
              />
            </SearchWrapper>
          </Header>
        }
        ListEmptyComponent={
          error ? (
            <FeedbackWrapper>
              <Feedback type="error" message={error} />
              <Separator />
              <Button label="Tentar novamente" variant="ghost" onPress={refresh} />
            </FeedbackWrapper>
          ) : (
            <Empty>
              <MaterialCommunityIcons
                name="text-box-search-outline"
                size={40}
                color={theme.colors.gray[400]}
              />
              <EmptyText>
                {term
                  ? `Nenhum post encontrado para "${term}".`
                  : "Nenhum post publicado ainda."}
              </EmptyText>
            </Empty>
          )
        }
      />
    </Safe>
  );
}
