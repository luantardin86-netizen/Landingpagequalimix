import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const leadInput = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ''))
    .pipe(z.string().regex(/^\d{10,13}$/)),
  // Campo invisível para robôs de spam; pessoas reais deixam vazio.
  website: z.string().max(0).optional(),
})

// Integração servidor-a-servidor. O CRM mantém a fila internamente;
// nenhum banco de dados é exigido na landing page.
const CRM_LEADS_WEBHOOK_URL =
  process.env.CRM_LEADS_WEBHOOK_URL ??
  'https://qualimixcrm.lovable.app/api/webhooks/leads'

async function forwardLead(nome: string, numero: string) {
  const response = await fetch(CRM_LEADS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      nome_cliente: nome,
      numero_cliente: numero,
    }),
    signal: AbortSignal.timeout(10000),
  })

  const result = (await response.json().catch(() => null)) as
    | { ok?: boolean; message?: string }
    | null

  if (!response.ok || result?.ok !== true) {
    throw new Error(
      result?.message ??
        `O CRM não confirmou o recebimento do lead (HTTP ${response.status}).`,
    )
  }

  return result
}

export const Route = createFileRoute('/api/leads')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Dados inválidos.' }, { status: 400 })
        }

        const parsed = leadInput.safeParse(body)
        if (!parsed.success) {
          return Response.json(
            { error: 'Informe seu nome e um telefone válido com DDD.' },
            { status: 400 },
          )
        }

        // Sem banco local: só confirma o cadastro depois que o servidor do CRM
        // responder que recebeu os dados para a fila interna do funil.
        try {
          const result = await forwardLead(
            parsed.data.name,
            parsed.data.phone,
          )
          return Response.json(
            {
              ok: true,
              message: 'Cadastro enviado ao CRM com sucesso.',
              crmMessage: result.message,
            },
            { status: 201 },
          )
        } catch (error) {
          console.error('Falha ao encaminhar cadastro ao CRM', error)
          return Response.json(
            {
              error:
                'Não conseguimos entregar seu cadastro ao CRM agora. Tente novamente ou fale direto com a gente pelo WhatsApp.',
            },
            { status: 502 },
          )
        }
      },
    },
  },
})
