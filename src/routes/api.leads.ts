import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { db } from '../../db'
import { leads } from '../../db/schema'

const leadInput = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ''))
    .pipe(z.string().regex(/^\d{10,13}$/)),
  // Campo invisível para robôs de spam; pessoas reais deixam vazio.
  website: z.string().max(0).optional(),
})

// Destino externo que recebe cada cadastro (nome e número do cliente).
const LEAD_WEBHOOK_URL =
  process.env.LEAD_WEBHOOK_URL ?? 'https://qualimixcrm.lovable.app/funil'

async function forwardLead(nome: string, numero: string) {
  try {
    const response = await fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome_cliente: nome, numero_cliente: numero }),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) {
      console.error(
        `Envio do cadastro ao destino externo falhou: HTTP ${response.status}`,
      )
    }
  } catch (error) {
    console.error('Falha ao enviar cadastro ao destino externo', error)
  }
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

        try {
          const [lead] = await db
            .insert(leads)
            .values({ name: parsed.data.name, phone: parsed.data.phone })
            .returning({ id: leads.id })
          // O cadastro já está salvo; uma falha no envio externo não bloqueia o cliente.
          await forwardLead(parsed.data.name, parsed.data.phone)
          return Response.json({ ok: true, id: lead.id }, { status: 201 })
        } catch (error) {
          console.error('Falha ao salvar cadastro de cliente', error)
          return Response.json(
            { error: 'Não foi possível concluir seu cadastro agora.' },
            { status: 500 },
          )
        }
      },
    },
  },
})
