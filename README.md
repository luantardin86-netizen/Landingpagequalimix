# Qualimix — Qualidade em concreto

Site institucional da Qualimix (concreto usinado, piso polido e piso sarrafeado), com:

- Página única com hero, destaques, serviços, "Como funciona", depoimentos, dúvidas frequentes e chamada final.
- **Cadastro de cliente ("Quero ser chamado")**: o cliente informa nome e telefone, clica em **Solicitar contato** e recebe a confirmação "Um de nossos consultores irá lhe chamar em breve no WhatsApp". Os cadastros ficam salvos no banco de dados do site.
- **Contato imediato pelo WhatsApp** (61) 99112-4510: botões em todo o site, botão flutuante verde e atalho dentro do cadastro.
- **Mix**, assistente virtual que responde dúvidas sobre concreto e pisos (Netlify AI Gateway).

## Tecnologias

TanStack Start (React 19), Tailwind CSS 4, componentes shadcn/ui, Netlify Database (Postgres + Drizzle ORM), Netlify AI Gateway (Anthropic SDK) e Netlify Image CDN.

## Rodando localmente

```bash
pnpm install
netlify dev   # emula banco de dados, AI Gateway e Image CDN
```

## Onde ficam os cadastros

Tabela `leads` (nome, telefone só com dígitos, status, data). Consulte pelo painel da Netlify (Database) ou:

```bash
netlify db connect --query "SELECT * FROM leads ORDER BY created_at DESC LIMIT 50"
```

## Próximos passos sugeridos

- Painel interno com login para os consultores verem e marcarem cadastros como atendidos.
- Aviso automático (e-mail/WhatsApp) para a equipe a cada novo cadastro.
