import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";

import { getStudents, type Student } from "../services/studentsService";
import type { AppStackParamList } from "@/navigation/types";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StudentCard = styled.TouchableOpacity`
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  background-color: #f2f5f3;
`;

const StudentName = styled.Text`
  font-size: 16px;
  color: #1a5c38;
  font-weight: bold;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: #666666;
  margin-top: 5px;
`;

const Message = styled.Text`
  color: #555555;
  font-size: 15px;
  text-align: center;
  margin-top: 20px;
`;

const RetryButton = styled.TouchableOpacity`
  padding: 12px;
  align-items: center;
`;

const RetryText = styled.Text`
  color: #1a5c38;
  font-weight: bold;
`;

export function StudentListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getStudents();
      setStudents(result.filter((student) => !student.isTeacher));
    } catch {
      setError("Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadStudents();
    }, [loadStudents]),
  );

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#1A5C38" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Message>{error}</Message>
        <RetryButton onPress={() => void loadStudents()}>
          <RetryText>Tentar novamente</RetryText>
        </RetryButton>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={students}
        keyExtractor={(student) => student._id}
        renderItem={({ item }) => (
          <StudentCard
            onPress={() =>
              navigation.navigate("EditStudent", {
                studentId: item._id,
              })
            }
            accessibilityRole="button"
            accessibilityLabel={`Editar aluno ${item.username}`}
          >
            <StudentName>{item.username}</StudentName>
            <Subtitle>Toque para editar os dados</Subtitle>
          </StudentCard>
        )}
        ListEmptyComponent={<Message>Nenhum aluno encontrado.</Message>}
      />
    </Container>
  );
}
