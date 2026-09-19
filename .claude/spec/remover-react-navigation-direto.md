# Remover uso direto de @react-navigation após migração para Expo SDK 57

## Objetivo

Corrigir o erro em runtime causado pela migração para o Expo SDK 57:

```
ERROR  As of SDK 56, expo-router is no longer compatible with react-navigation.
```

## Problema

Ao rodar o app após a migração para SDK 57 ([.claude/spec/migracao-expo-57.md](.claude/spec/migracao-expo-57.md)), o `expo-router` detecta um import de `@react-navigation/native` no bundle e lança erro, pois a partir do expo-router da SDK 56+ o uso direto de `react-navigation` deixou de ser suportado.

## Causa

`src/features/home/hooks/useHomeScreen.ts` importa `useFocusEffect` de `@react-navigation/native`:

```ts
import { useFocusEffect } from "@react-navigation/native";
```

Esse é o único ponto do código-fonte (`src/`) que importa algo de `@react-navigation/*`.

Verificado no `node_modules`: o `expo-router@57` não lista mais `@react-navigation/native`, `@react-navigation/bottom-tabs` nem `@react-navigation/elements` em `peerDependencies` ou `dependencies` (ele substituiu a navegação interna por `standard-navigation`). Ou seja, esses três pacotes em `package.json` não são mais necessários por nenhuma dependência do projeto nem usados em outro lugar do código.

## Solução

1. Trocar o import em `src/features/home/hooks/useHomeScreen.ts` para usar `useFocusEffect` reexportado pelo próprio `expo-router` (substituição direta, mesma assinatura), em vez de `@react-navigation/native`.
2. Remover as dependências não utilizadas do `package.json`: `@react-navigation/bottom-tabs`, `@react-navigation/elements`, `@react-navigation/native`.
3. Rodar `pnpm install` para atualizar o lockfile após a remoção.

Nenhuma outra lógica ou arquitetura será alterada — apenas a troca da fonte do import e a remoção das dependências órfãs.

Arquivos a alterar:
- `src/features/home/hooks/useHomeScreen.ts`
- `package.json`
- `pnpm-lock.yaml` (gerado automaticamente)

## Subtarefas

- [ ] Trocar import de `useFocusEffect` de `@react-navigation/native` para `expo-router`
- [ ] Remover `@react-navigation/bottom-tabs`, `@react-navigation/elements` e `@react-navigation/native` do `package.json`
- [ ] Rodar `pnpm install` para atualizar o lockfile
- [ ] Revisar e validar as alterações
