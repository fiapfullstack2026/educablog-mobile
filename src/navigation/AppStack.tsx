import React from "react";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { AppStackParamList } from "./types";

import { useAppSelector } from "@/store/hooks";
import { selectIsTeacher } from "@/store/authSlice";
import { HomeHeaderActions } from "./HomeHeaderActions";

// Posts
import { HomeScreen } from "@/features/posts/screens/HomeScreen";
import { PostDetailScreen } from "@/features/posts/screens/PostDetailScreen";
import { CreatePostScreen } from "@/features/posts/screens/CreatePostScreen";
import { EditPostScreen } from "@/features/posts/screens/EditPostScreen";
import { AdminPostsScreen } from "@/features/posts/screens/AdminPostsScreen";

// Professores
import { TeacherListScreen } from "@/features/teachers/screens/TeacherListScreen";
import { CreateTeacherScreen } from "@/features/teachers/screens/CreateTeacherScreen";
import { EditTeacherScreen } from "@/features/teachers/screens/EditTeacherScreen";

// Alunos
import { StudentListScreen } from "@/features/students/screens/StudentListScreen";
import { CreateStudentScreen } from "@/features/students/screens/CreateStudentScreen";
import { EditStudentScreen } from "@/features/students/screens/EditStudentScreen";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const isTeacher = useAppSelector(selectIsTeacher);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1A5C38" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Telas disponíveis para alunos e professores */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "EducaBlog",
          headerRight: isTeacher
            ? () => (
            <HomeHeaderActions
              onManagePosts={() => navigation.navigate("AdminPosts")}
              onCreatePost={() => navigation.navigate("CreatePost")}
            />
          ),
        })}
      />

      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: "Post" }}
      />

      {/* Telas exclusivas para professores */}
      {isTeacher && (
        <>
          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ title: "Novo Post" }}
          />

          <Stack.Screen
            name="EditPost"
            component={EditPostScreen}
            options={{ title: "Editar Post" }}
          />

          <Stack.Screen
            name="AdminPosts"
            component={AdminPostsScreen}
            options={{ title: "Gerenciar Posts" }}
          />

          <Stack.Screen
            name="TeacherList"
            component={TeacherListScreen}
            options={{ title: "Professores" }}
          />

          <Stack.Screen
            name="CreateTeacher"
            component={CreateTeacherScreen}
            options={{ title: "Novo Professor" }}
          />

          <Stack.Screen
            name="EditTeacher"
            component={EditTeacherScreen}
            options={{ title: "Editar Professor" }}
          />

          <Stack.Screen
            name="StudentList"
            component={StudentListScreen}
            options={{ title: "Alunos" }}
          />

          <Stack.Screen
            name="CreateStudent"
            component={CreateStudentScreen}
            options={{ title: "Novo Aluno" }}
          />

          <Stack.Screen
            name="EditStudent"
            component={EditStudentScreen}
            options={{ title: "Editar Aluno" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
