# Plano de reformulação — CXD Fórum

## Objetivo
Refazer a experiência do fórum com foco mobile-first, mantendo as páginas HTML existentes e a integração Supabase. A interface deve ser mais clara, rápida e agradável em telas pequenas, com animações sutis de entrada e deslocamento que não prejudiquem desempenho.

## Abordagem de implementação
- Preservar a arquitetura estática em HTML/CSS/JS e os nomes de funções já usados pelo Supabase.
- Criar uma casca visual consistente: topo compacto, marca CXD, navegação inferior no celular e navegação lateral/inline em telas maiores.
- Melhorar cards, estados de carregamento, formulários, autenticação, perfil, tópico e moderação.
- Corrigir bugs funcionais identificados em `forum.js` e adicionar fallback local para tema.
- Escapar conteúdo renderizado pelo usuário e manter links clicáveis de forma segura.
- Adicionar `public/manus-routes.json` equivalente no root como `manus-routes.json` para declarar as rotas estáticas.

## Estrutura
- `*.html`: páginas do fórum e telas de autenticação.
- `style.css`: tokens visuais, responsividade, componentes e animações.
- `forum.js`: criação, listagem, tópico, respostas e utilitários de conteúdo.
- `auth.js`: sessão e perfis.
- `main.js`: estado inicial e microinterações da home.
- `admin.js`: moderação de usuários.
- `manus-routes.json`: manifesto das páginas.

## Design
### Movimentos considerados
- **Noite editorial tecnológica** (0,62): escuro, azul elétrico e cards com sensação de produto premium.
- **Aurora comunitária** (0,24): gradientes suaves, brilho e transições de deslizamento.
- **Minimalismo documental** (0,14): superfícies neutras, foco no conteúdo e hierarquia tipográfica.

### Escolha
**Noite editorial tecnológica**, com acentos de aurora em azul-ciano e violeta.

- **Movimento:** uma mistura de dashboard moderno e fórum editorial, com superfícies profundas e brilho controlado.
- **Princípios:** conteúdo em primeiro lugar; uma ação principal por tela; contraste alto; feedback imediato.
- **Cores:** fundo quase preto azulado para reduzir fadiga; ciano como assinatura de descoberta; violeta para estados de destaque.
- **Layout:** fluxo vertical de leitura, cards com bordas suaves e rail de ações; no celular a navegação vira barra fixa inferior.
- **Assinaturas:** marca CXD em cápsula, pontos de status e gradiente aurora discreto.
- **Interação:** links e cards respondem com movimento curto; áreas clicáveis grandes para toque; foco visível.
- **Animação:** entrada `slide-up` de 420ms, hover com deslocamento mínimo, blobs lentos no fundo; tudo desativado para `prefers-reduced-motion`.
- **Tipografia:** `Inter` para leitura e `Space Grotesk` para títulos, com fallback de sistema e sem depender de fonte para funcionar.
- **Essência:** um espaço rápido para perguntar, compartilhar e encontrar respostas sem ruído. Personalidade: direto, acolhedor, afiado.
- **Voz:** títulos objetivos e CTAs com energia. Exemplos: “O que você quer destravar hoje?” e “Publicar para a comunidade”.
- **Marca:** wordmark CXD em cápsula com pequeno ponto orbital, aplicado no topo e na navegação móvel.
- **Cor proprietária:** ciano `#5ee7f7`, usado com parcimônia para ações e estados ativos.

## Restrições
- Não adicionar framework ou bundle pesado.
- Continuar suportando navegação direta por arquivo/servidor estático.
- Não alterar o schema do banco Supabase.
