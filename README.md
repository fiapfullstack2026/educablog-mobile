# EducaBlog Mobile — FIAP PosTech FSDT Fase 4

Aplicativo mobile do EducaBlog desenvolvido com **React Native + Expo**.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React Native 0.76.9 · Expo SDK 52 |
| Navegação | React Navigation 6 (Native Stack) |
| Estado global | Redux Toolkit 2 + redux-persist |
| Armazenamento seguro | expo-secure-store (token JWT) |
| HTTP | Axios 1.7 com interceptor JWT |
| Estilização | Styled-components (CSS) |
| Formulários | react-hook-form + Zod |
| Linguagem | TypeScript strict |

## Pré-requisitos

| Ferramenta | Versão obrigatória | Observação |
|---|---|---|
| Node.js | **22.13.0 LTS** | Metro 0.81 (Expo 52) requer `^22.13.0`; versões superiores (22.23+, 24) quebram o loader CJS do Metro |
| npm | ≥ 10 | Suporte a `overrides` para fixar metro/* em 0.81.0 |
| Expo Go | SDK 52 | App Store / Play Store |

> **Importante:** o `package.json` contém um bloco `overrides` que fixa todos os pacotes `metro/*` em `0.81.0`, impedindo que o npm resolva transitivamente o Metro 0.87 (incompatível com Node < 22.13). Não remova esse bloco.

## Início rápido

```bash
# 1. Instalar dependências
npm install

# 2. Variáveis de ambiente
cp .env.example .env

# 3. Iniciar com cache limpo (recomendado após a primeira instalação)
npx expo start --clear
```

Escaneie o QR code com o Expo Go (Android/iOS) ou pressione `a` para emulador Android ou `i` para iOS.

## Estrutura de pastas

```
src/
├── components/          # Componentes base reutilizáveis (Button, Input, Card, ...)
├── features/
│   ├── auth/            # Login, tipos, hooks de autenticação
│   ├── posts/           # Lista, detalhe, criação, edição e admin de posts
│   ├── teachers/        # CRUD de professores
│   └── students/        # CRUD de alunos
├── lib/
│   └── axios.ts         # Instância Axios com interceptor JWT
├── navigation/          # RootNavigator, PublicStack, AppStack e tipos de rota
├── store/               # Redux store, authSlice e hooks tipados
└── types/               # Tipos compartilhados da API
```

## Fluxo de autenticação

1. `RootNavigator` lê o `token` do Redux store (persistido via AsyncStorage pelo redux-persist).
2. Se `token === null` → exibe `PublicStack` (Login).
3. Se `token` presente → exibe `AppStack` (aplicação completa).
4. O interceptor Axios do `src/lib/axios.ts` lê o token diretamente do `SecureStore` a cada requisição.
5. Em caso de 401 em rota autenticada, o interceptor limpa o `SecureStore`; o Redux detecta a mudança e redireciona para Login.

## Problemas conhecidos

- **Acentos no emulador Android (ç, ã, ó...):** ao digitar pelo teclado físico do computador, o emulador descarta esses caracteres antes de chegarem ao app. Não é um bug do código. Alternativas: colar o texto (a área de transferência é compartilhada), ativar o teclado virtual do emulador e manter pressionada a letra, ou testar em um celular com Expo Go.

## Progresso por semana

| Semana | Período | Status |
|---|---|---|
| 1 — Setup e base | 12 | ✅ Concluído |
| 1 — Auth + lista de posts | 19–25/out | ✅ Concluído |
| 2 — Posts completos e admin | 26/out–01/nov | 🔜 |
| 3 — CRUD professores e alunos | 02–08/nov | 🔜 |
| 4 — Qualidade e entrega | 09–15/nov | 🔜 |
| Entrega | 16/nov | — |

## Decisões arquiteturais

| Decisão | Escolha | Justificativa |
|---|---|---|
| Estilização | Styled-components | Reutiliza os tokens de cor da Fase 3 (web) |
| Integração NativeWind | `withNativeWind` no `metro.config.js` | v4 removeu o plugin Babel `nativewind/babel`; configuração agora é via Metro |
| Token JWT | `expo-secure-store` | Substitui `localStorage` do web; armazenamento criptografado no keychain/keystore do SO |
| Estado global | Redux Toolkit + redux-persist | Mesma biblioteca da Fase 3; persistência via AsyncStorage (substitui localStorage) |
| Estrutura de pastas | Feature-based (`auth/`, `posts/`, `teachers/`, `students/`) | Alinha com a divisão de responsabilidades entre membros do grupo |
| Alias de importação | `@/` → `./src` via `babel-plugin-module-resolver` | Evita caminhos relativos profundos (`../../../`) |
| Navegação | Stack + Bottom Tabs (React Navigation 6) | Padrão da comunidade; compatível com Expo SDK 52 |
| Formulários | Schema Zod + hook por feature (`useLogin`, `useCreatePost`) | A tela só renderiza; validação, envio e erros ficam no hook |

## Links



- Back-end (Fase 2): https://educablog.onrender.com/docs/
- Repositório back-end: https://github.com/fiapfullstack2026/educablog
- Repositório front-end web (Fase 3): https://github.com/fiapfullstack2026/educablog-frontend
