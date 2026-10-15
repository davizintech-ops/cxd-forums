# CXD Fórum

Fórum leve, responsivo e mobile-first feito com HTML, CSS e JavaScript, usando Supabase para autenticação e dados.

## Experiência

A interface foi reorganizada para priorizar leitura em telas pequenas: navegação inferior fixa, cards de toque confortável, hierarquia tipográfica clara, feedback de carregamento e animações suaves que respeitam `prefers-reduced-motion`.

## Executar localmente

Como o projeto é estático, rode qualquer servidor HTTP na pasta raiz. Por exemplo:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Integração

A conexão existente com Supabase permanece em `supabase.js`. O schema esperado continua usando as tabelas `posts` e `usuarios`.
