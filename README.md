# Qualimix — Qualidade em concreto

Site institucional da Qualimix (concreto usinado, piso polido e piso sarrafeado), com:

- Página única com hero, destaques, serviços, "Como funciona", depoimentos, dúvidas frequentes e chamada final.
- **Cadastro de cliente ("Quero ser chamado")**: o cliente informa nome e telefone, clica em **Solicitar contato** e a landing page encaminha os dados diretamente para a fila interna do servidor do Qualimix CRM. A confirmação só aparece depois que o CRM confirma o recebimento. A landing page não exige banco de dados.
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


## Integração de leads com o CRM

O formulário usa a rota server-side POST /api/leads, que encaminha somente nome_cliente e numero_cliente para o webhook interno do CRM. O destino padrão é:

https://qualimixcrm.lovable.app/api/webhooks/leads

Para apontar para outro endereço de CRM, configure CRM_LEADS_WEBHOOK_URL no ambiente de execução da landing page. Não coloque essa variável em VITE_* nem no código do navegador.

O CRM recebe os leads em uma fila em memória no servidor e o navegador do CRM consulta a fila periodicamente; depois da importação, o cadastro é persistido no armazenamento local daquele navegador. **Limitação importante:** como não há banco/KV/disco persistente conectado, a fila do servidor é volátil e pode ser perdida se a instância do servidor reiniciar antes da sincronização pelo CRM.