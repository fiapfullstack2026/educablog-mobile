import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// --- Stack pública (sem autenticação) ---
export type PublicStackParamList = {
  Login: undefined;
};

// --- Stack autenticada ---
export type AppStackParamList = {
  // Posts
  Home: undefined;
  PostDetail: { postId: string };
  CreatePost: undefined;
  EditPost: { postId: string };
  AdminPosts: undefined;

  // Professores
  TeacherList: undefined;
  CreateTeacher: undefined;
  EditTeacher: { teacherId: string };

  // Alunos
  StudentList: undefined;
  CreateStudent: undefined;
  EditStudent: { studentId: string };
};

// Helpers de tipagem por tela
export type LoginScreenProps = NativeStackScreenProps<PublicStackParamList, 'Login'>;

export type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;
export type PostDetailScreenProps = NativeStackScreenProps<AppStackParamList, 'PostDetail'>;
export type CreatePostScreenProps = NativeStackScreenProps<AppStackParamList, 'CreatePost'>;
export type EditPostScreenProps = NativeStackScreenProps<AppStackParamList, 'EditPost'>;
export type AdminPostsScreenProps = NativeStackScreenProps<AppStackParamList, 'AdminPosts'>;

export type TeacherListScreenProps = NativeStackScreenProps<AppStackParamList, 'TeacherList'>;
export type CreateTeacherScreenProps = NativeStackScreenProps<AppStackParamList, 'CreateTeacher'>;
export type EditTeacherScreenProps = NativeStackScreenProps<AppStackParamList, 'EditTeacher'>;

export type StudentListScreenProps = NativeStackScreenProps<AppStackParamList, 'StudentList'>;
export type CreateStudentScreenProps = NativeStackScreenProps<AppStackParamList, 'CreateStudent'>;
export type EditStudentScreenProps = NativeStackScreenProps<AppStackParamList, 'EditStudent'>;
