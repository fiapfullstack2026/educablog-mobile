import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { isAxiosError } from "axios";

import { Button } from "@/components/Button";
import type { PostDetailScreenProps } from "@/navigation/types";
import type { ApiError } from "@/types/api.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { setSelectedPost, setPostsLoading, setPostsError } from "../postSlice";
import { getPostById } from "../services/postsService";
import { htmlToPlainText } from "../utils/htmlToPlainText";
import { DisciplineBadge } from "../components/DisciplineBadge";

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const Content = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Meta = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Divider = styled.View`
  height: 1px;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const Body = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const StatusContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

const StatusText = styled.Text`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme }) => theme.colors.gray[600]};
  text-align: center;
`;

function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiError>(error)) {
    if (error.code === "ECONNABORTED") {
      return "O servidor demorou para responder. Tente novamente.";
    }

    if (!error.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }

    if (error.response.status === 404) {
      return "Este post não foi encontrado.";
    }

    return error.response.data?.message ?? "Erro ao carregar o post.";
  }

  return "Ocorreu um erro inesperado ao carregar o post.";
}

export function PostDetailScreen({ route }: PostDetailScreenProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { postId } = route.params;

  const post = useAppSelector((state) => state.posts.selectedPost);
  const loading = useAppSelector((state) => state.posts.loading);
  const error = useAppSelector((state) => state.posts.error);

  const loadPost = useCallback(
    async (isActive: () => boolean = () => true) => {
      if (isActive()) {
        dispatch(setPostsLoading(true));
        dispatch(setPostsError(null));
        dispatch(setSelectedPost(null));
      }

      try {
        const result = await getPostById(postId);

        if (isActive()) {
          dispatch(setSelectedPost(result));
        }
      } catch (err) {
        if (isActive()) {
          dispatch(setSelectedPost(null));
          dispatch(setPostsError(getErrorMessage(err)));
        }
      } finally {
        if (isActive()) {
          dispatch(setPostsLoading(false));
        }
      }
    },
    [dispatch, postId],
  );

  useEffect(() => {
    let active = true;

    void loadPost(() => active);

    return () => {
      active = false;
    };
  }, [loadPost]);

  if (loading) {
    return (
      <StatusContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <StatusText>Carregando conteúdo do post...</StatusText>
      </StatusContainer>
    );
  }

  if (error || !post) {
    return (
      <StatusContainer>
        <StatusText>{error ?? "Post não encontrado."}</StatusText>
        <Button
          label="Tentar novamente"
          onPress={() => void loadPost()}
          variant="ghost"
        />
      </StatusContainer>
    );
  }

  const content = htmlToPlainText(post.content);
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("pt-BR")
    : "Data não informada";

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      <Content>
        <DisciplineBadge discipline={post.discipline} />

        <Title>{post.title}</Title>

        <Meta>
          Professor(a): {post.teacher || post.author || "Não informado"}
        </Meta>

        <Meta>Publicado em: {date}</Meta>

        {post.updatedAt && post.updatedAt !== post.createdAt && (
          <Meta>
            Atualizado em:{" "}
            {new Date(post.updatedAt).toLocaleDateString("pt-BR")}
          </Meta>
        )}

        <Divider />

        <Body>{content || "Este post não possui conteúdo."}</Body>
      </Content>
    </Container>
  );
}
