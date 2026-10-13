# EducaBlog Mobile — Tarefas por Semana

> Fase 4 · Prazo final: **16/11/2026** · Reuniões toda segunda-feira às 12h

---

## Semana 1 — Setup e base (12–18/out) ✅

- [x] Inicializar projeto com Expo SDK 52 + React Native 0.76.9
- [x] Configurar NativeWind v4 (`metro.config.js` + `src/styles/global.css`)
- [x] Configurar `babel.config.js` com alias `@/` via `babel-plugin-module-resolver`
- [x] Fixar Metro 0.81.0 via `overrides` no `package.json` (compatibilidade Node 22.13)
- [x] Criar estrutura de pastas feature-based (`auth/`, `posts/`, `teachers/`, `students/`)
- [x] Configurar Redux Toolkit + redux-persist com AsyncStorage
- [x] Criar `authSlice` (signIn, signOut, selectors)
- [x] Configurar Axios com interceptor JWT (`expo-secure-store`)
- [x] Criar navegação: `RootNavigator`, `PublicStack`, `AppStack` com todas as rotas
- [x] Tipar rotas com `PublicStackParamList` e `AppStackParamList`
- [x] Criar componentes base: `Button`, `Input`, `Card`, `Feedback`, `LoadingSpinner`
- [x] Criar tela `LoginScreen` (layout base)
- [x] Criar screens placeholder para posts, teachers e students
- [x] Configurar `tailwind.config.js` com tokens de cor da Fase 3
- [x] Criar assets placeholder (icon, splash, adaptive-icon, favicon)
- [x] Atualizar `README.md` com stack, pré-requisitos e decisões arquiteturais

---

## Semana 2 — Auth + lista de posts (19–25/out) 🔜

- [ ] Integrar `LoginScreen` com `POST /user/signin`
- [ ] Implementar `useLogin` hook com validação via Zod
- [ ] Salvar token JWT no `expo-secure-store` após login
- [ ] Despachar `signIn` no Redux e persistir via redux-persist
- [ ] Proteger rotas: redirecionar para Login se token ausente ou expirado
- [ ] Implementar logout (limpar SecureStore + Redux + resetar navegação)
- [ ] Criar `postService.ts` com `GET /posts` e `GET /posts?search=`
- [ ] Criar `HomeScreen` com lista de posts (FlatList)
- [ ] Aplicar estilização NativeWind na `HomeScreen` (tokens de cor, tipografia)
- [ ] Aplicar estilização NativeWind na `LoginScreen`
- [ ] Implementar busca por título na `HomeScreen`
- [ ] Criar componente `PostCard` reutilizável com badge de disciplina

---

## Semana 3 — Posts completos e admin (26/out–01/nov) 🔜

- [ ] Criar `PostDetailScreen` com conteúdo completo do post
- [ ] Criar `postSlice` no Redux (lista, post selecionado, loading, error)
- [ ] Criar `CreatePostScreen` (formulário com react-hook-form + Zod)
- [ ] Criar `EditPostScreen` com dados pré-preenchidos
- [ ] Criar `AdminPostsScreen` — listagem dos posts do professor autenticado
- [ ] Integrar `POST /posts`, `PUT /posts/:id`, `DELETE /posts/:id`
- [ ] Restringir acesso a Create/Edit/Admin por perfil (`isTeacher`)
- [ ] Exibir/ocultar ações de edição conforme perfil do usuário
- [ ] Aplicar estilização NativeWind em todas as telas de posts

---

## Semana 4 — CRUD professores e alunos (02–08/nov) 🔜

- [ ] Criar `TeacherListScreen` com listagem de professores
- [ ] Criar `CreateTeacherScreen` (formulário)
- [ ] Criar `EditTeacherScreen` com dados pré-preenchidos
- [ ] Integrar `GET /teachers`, `POST /teachers`, `PUT /teachers/:id`, `DELETE /teachers/:id`
- [ ] Criar `StudentListScreen` com listagem de alunos
- [ ] Criar `CreateStudentScreen` (formulário)
- [ ] Criar `EditStudentScreen` com dados pré-preenchidos
- [ ] Integrar `GET /students`, `POST /students`, `PUT /students/:id`, `DELETE /students/:id`
- [ ] Restringir CRUD de professores e alunos ao perfil admin/professor
- [ ] Aplicar estilização NativeWind em todas as telas de teachers e students

---

## Semana 5 — Qualidade e entrega (09–15/nov) 🔜

- [ ] Revisar e corrigir tipagem TypeScript em todo o projeto (`tsc --noEmit` sem erros)
- [ ] Revisar ESLint (`npm run lint` sem warnings)
- [ ] Testar fluxo completo de autenticação (login, persistência, logout, 401)
- [ ] Testar CRUD de posts, professores e alunos no dispositivo físico ou emulador
- [ ] Garantir feedback visual de loading e erro em todas as telas
- [ ] Revisar acessibilidade básica (labels, contraste de cores)
- [ ] Atualizar `README.md` com instruções finais de execução
- [ ] Atualizar `TASKS.md` com status final
- [ ] Gravar vídeo de demonstração (se exigido pela entrega da Fase 4)
- [ ] Subir código final no repositório do grupo

---

## Entrega — 16/nov 🎯

- [ ] Repositório público com código completo
- [ ] README atualizado
- [ ] Aplicativo funcional no Expo Go (QR code)
