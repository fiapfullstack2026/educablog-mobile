import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";

import { TeacherOnly } from "@/navigation/TeacherOnly";
import { TeacherListScreen } from "@/features/teachers/screens/TeacherListScreen";
import { StudentListScreen } from "@/features/students/screens/StudentListScreen";

type Tab = "teachers" | "students";

const TABS = [
  { key: "teachers", label: "Professores", icon: "account-tie" },
  { key: "students", label: "Alunos", icon: "school-outline" },
] as const;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const TabBar = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: 0;
  padding: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const TabButton = styled.Pressable<{ active: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.white : "transparent"};
`;

const TabLabel = styled.Text<{ active: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: ${({ theme, active }) =>
    active ? theme.fontWeight.semibold : theme.fontWeight.medium};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.gray[600]};
`;

/** Menu único de usuários: alterna entre as listas de professores e alunos */
export function UsersScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>("teachers");

  return (
    <TeacherOnly>
      <Container>
        <TabBar accessibilityRole="tablist">
          {TABS.map((item) => {
            const active = tab === item.key;
            return (
              <TabButton
                key={item.key}
                active={active}
                onPress={() => setTab(item.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                accessibilityLabel={item.label}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={18}
                  color={active ? theme.colors.primary : theme.colors.gray[600]}
                />
                <TabLabel active={active}>{item.label}</TabLabel>
              </TabButton>
            );
          })}
        </TabBar>

        {tab === "teachers" ? <TeacherListScreen /> : <StudentListScreen />}
      </Container>
    </TeacherOnly>
  );
}
