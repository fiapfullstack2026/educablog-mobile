import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled, { useTheme } from "styled-components/native";

import { Feedback } from "@/components/Feedback";
import { TeacherOnly } from "@/navigation/TeacherOnly";
import type { AppStackParamList } from "@/navigation/types";

import {
  getStudents,
  deleteStudent,
  type Student,
} from "../services/studentsService";
import { StudentListItem } from "../components/StudentListItem";

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: 0;
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

export function StudentListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const theme = useTheme();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadStudents = useCallback(async (refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else setLoading(true);

      setError("");

      const result = await getStudents();
      setStudents(result.filter((student) => !student.isTeacher));
    } catch {
      setError("Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadStudents();
    }, [loadStudents]),
  );

  function handleDelete(student: Student) {
    Alert.alert(
      "Excluir aluno",
      `Tem certeza de que deseja excluir ${student.username}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setDeletingId(student._id);
              setError("");

              await deleteStudent(student._id);

              setStudents((current) =>
                current.filter((item) => item._id !== student._id),
              );
            } catch {
              setError("Não foi possível excluir o aluno.");
            } finally {
              setDeletingId(null);
            }
          },
        },
      ],
    );
  }

  return (
    <TeacherOnly>
      <Safe edges={["bottom"]}>
        <Header>
          <Subtitle>
            {loading
              ? "Carregando..."
              : `${students.length} ${
                  students.length === 1
                    ? "aluno cadastrado"
                    : "alunos cadastrados"
                }`}
          </Subtitle>
        </Header>

        {error ? (
          <FeedbackWrapper>
            <Feedback type="error" message={error} />
          </FeedbackWrapper>
        ) : null}

        {loading ? (
          <Spinner size="large" color={theme.colors.primary} />
        ) : (
          <FlatList
            data={students}
            keyExtractor={(student) => student._id}
            contentContainerStyle={{ padding: theme.spacing.md }}
            ItemSeparatorComponent={Separator}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => void loadStudents(true)}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
              />
            }
            ListEmptyComponent={
              error ? null : <Empty>Nenhum aluno encontrado.</Empty>
            }
            renderItem={({ item }) => (
              <StudentListItem
                student={item}
                onEdit={(student) =>
                  navigation.navigate("EditStudent", {
                    studentId: student._id,
                  })
                }
                onDelete={handleDelete}
              />
            )}
          />
        )}
      </Safe>
    </TeacherOnly>
  );
}
