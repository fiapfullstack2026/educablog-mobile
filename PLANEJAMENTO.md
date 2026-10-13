# EducaBlog Mobile — Planejamento Fase 4

> Prazo final: **16/11/2026 (domingo)** · Reuniões toda segunda-feira às 12h

---

## Semana 1 · 12–18/out — Setup e base

### Decidir na reunião de hoje

- [ ] Confirmar o uso de Expo ou React Native CLI
- [ ] Confirmar gerenciamento de estado: Context API ou Redux
- [ ] Confirmar biblioteca de navegação (React Navigation)
- [ ] Definir o dono de cada feature (posts, professores/alunos, auth)

### Tarefas

- [ ] Setup do projeto React Native (Expo ou bare workflow)
- [ ] Configurar React Navigation com estrutura de stacks (pública e autenticada)
- [ ] Configurar Axios com interceptor JWT
- [ ] Criar estrutura de pastas por feature: `auth/`, `posts/`, `teachers/`, `students/`
- [ ] Criar componentes base reutilizáveis: Button, Input, Card, Loading

---

## Semana 2 · 19–25/out — Autenticação e tela de posts

### Tarefas

- [ ] Tela de login com validação e integração com `POST /user/signin`
- [ ] Armazenamento do token (AsyncStorage ou SecureStore)
- [ ] Context/Redux de autenticação com controle de perfil (professor/aluno)
- [ ] Proteção de rotas por perfil
- [ ] Tela principal: lista de posts com título, autor e descrição
- [ ] Campo de busca integrado com `GET /posts/search?q=`

---

## Semana 3 · 26/out–01/nov — Posts completos e admin de posts

### Tarefas

- [ ] Tela de leitura de post completo (`GET /posts/:id`)
- [ ] Tela de criação de post (`POST /posts` — somente professor)
- [ ] Tela de edição de post (`PUT /posts/:id` — somente professor)
- [ ] Página administrativa de posts: listagem com botões de editar e excluir
- [ ] `DELETE /posts/:id` com confirmação

---

## Semana 4 · 02–08/nov — CRUD de professores e alunos

### Tarefas

- [ ] Tela de listagem paginada de professores com editar/excluir
- [ ] Tela de criação de professor
- [ ] Tela de edição de professor
- [ ] Tela de listagem paginada de alunos com editar/excluir
- [ ] Tela de criação de aluno
- [ ] Tela de edição de aluno

> ⚠️ **Esta é a semana mais densa.** Se a semana 3 atrasar, trazer parte dessa semana para a reunião do dia 02/11 e redistribuir.

---

## Semana 5 · 09–15/nov — Qualidade e entrega

### Tarefas

- [ ] Testes manuais do fluxo completo (professor e aluno)
- [ ] Ajustes de UX: feedback visual, estados de loading e erro
- [ ] README com setup, arquitetura e guia de uso
- [ ] Dockerfile ou instruções de execução local
- [ ] Gravação do vídeo de demonstração (máximo 15 min)
- [ ] Documento de arquitetura, uso e relato de experiências

---

## Entrega · 16/nov (domingo)

- [ ] Repositório GitHub com o código
- [ ] Vídeo gravado e publicado
- [ ] Documento entregue

---

## Distribuição sugerida por integrante

Com 3 pessoas e a estrutura por feature, a divisão mais limpa é:

| Integrante | Feature | Responsabilidades |
|---|---|---|
| **Dev 1** | `posts/` | Lista, leitura, criação, edição e página administrativa de posts |
| **Dev 2** | `teachers/` e `students/` | CRUD completo de professores e alunos (6 telas) |
| **Dev 3** | `auth/` | Login, token, Context/Redux, proteção de rotas, navegação base e componentes compartilhados |

> **Nota:** o Dev 3 tende a terminar a base mais cedo e pode absorver overflow das semanas 3 e 4. Definam o dono de cada feature ainda hoje na reunião.
