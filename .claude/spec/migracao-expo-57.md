# Migração para Expo SDK 57

## Objetivo

Atualizar o projeto do Expo SDK 54 (`~54.0.35`) para o Expo SDK 57 (`^57.0.24`), atualizando todas as dependências relacionadas para as versões compatíveis com a nova SDK.

## Problema

Não há um bug. É uma atualização de versão: o projeto está desatualizado (SDK 54) e precisa acompanhar a versão mais recente do Expo (SDK 57).

## Causa

Não aplicável — não é uma correção de defeito, é uma atualização de dependências.

## Solução

Usar o fluxo padrão de upgrade do Expo, que já resolve automaticamente as versões compatíveis de todas as dependências (`expo`, pacotes `expo-*`, `react`, `react-native`, `react-native-*` etc.):

1. Atualizar o pacote `expo` para a versão `^57.0.0`:
   `npx expo install expo@^57.0.0`
2. Rodar `npx expo install --fix` para alinhar automaticamente todas as demais dependências (`expo-*`, `react-native-*`, `react`, `react-native`, etc.) às versões esperadas pela SDK 57.
3. Rodar `npx expo-doctor` para validar se restou alguma inconsistência de dependências ou configuração.
4. Revisar o `package.json` gerado para confirmar que não sobraram versões desalinhadas.
5. Revisar rapidamente o `app.json` e `babel.config.js` (se existir) caso a SDK 57 exija alguma mudança de configuração (ex.: `babel-preset-expo`), ajustando apenas o que for exigido pelo upgrade.

Não serão feitas mudanças de código da aplicação, refatorações ou ajustes de funcionalidades — apenas a atualização de dependências e, se necessário, de configuração mínima exigida pela nova SDK.

Arquivos que devem ser alterados:
- `package.json` (e `package-lock.json`/lockfile equivalente)
- Possivelmente `app.json` e `babel.config.js`, apenas se a SDK exigir

Observação: já existe uma alteração não commitada em `package.json` (`"dev": "expo start"` → `"dev": "expo start --tunnel"`), não relacionada a esta tarefa. Ela será preservada e não revertida.

## Subtarefas

- [ ] Atualizar `expo` para `^57.0.0` via `npx expo install expo@^57.0.0`
- [ ] Rodar `npx expo install --fix` para alinhar as demais dependências
- [ ] Rodar `npx expo-doctor` e ajustar o mínimo necessário caso aponte incompatibilidades
- [ ] Revisar e validar as alterações
