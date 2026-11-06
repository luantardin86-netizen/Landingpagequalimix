import { createFileRoute } from '@tanstack/react-router'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { WHATSAPP_DISPLAY } from '@/lib/qualimix'

const chatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(2000),
      }),
    )
    .min(1)
    .max(30),
})

const SYSTEM_PROMPT = `Você é a Mix, assistente virtual da Qualimix — empresa de concreto usinado, piso polido e piso sarrafeado ("Qualidade em concreto").
Responda sempre em português do Brasil, de forma simpática, clara e objetiva (no máximo 3 parágrafos curtos).
Você ajuda com dúvidas sobre:
- Concreto usinado: dosado em central, entregue em caminhão betoneira, fck de 15 a 40 MPa. Lajes residenciais normalmente usam fck 25 a 30 MPa; fundações e pisos variam conforme o projeto.
- Piso polido: acabamento mecânico liso, resistente e fácil de limpar, ideal para galpões, garagens, comércios e indústrias.
- Piso sarrafeado: nivelamento do concreto fresco com régua, base para revestimentos, contrapisos e áreas externas.
- Cálculo de volume: comprimento × largura × espessura (em metros) = m³. Sugira acrescentar cerca de 5% de margem.
- Preparação da obra: acesso para o caminhão betoneira, formas e armaduras prontas, equipe para o lançamento.
Nunca invente preços, prazos ou disponibilidade. Para orçamento, preços e agendamento, oriente o cliente a falar com a equipe pelo WhatsApp ${WHATSAPP_DISPLAY} ou a usar o formulário "Quero ser chamado" no site, para que um consultor o chame no WhatsApp.
Se a pergunta não tiver relação com concreto, pisos ou obras, responda educadamente que só pode ajudar com esses assuntos.
Sempre lembre que o projeto estrutural deve ser validado por um engenheiro responsável quando for o caso.`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = chatInput.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid messages' }, { status: 400 })
        }

        // A conversa precisa começar com o cliente.
        const messages = parsed.data.messages
        const firstUser = messages.findIndex((m) => m.role === 'user')
        if (firstUser === -1) {
          return Response.json({ error: 'Invalid messages' }, { status: 400 })
        }

        try {
          const anthropic = new Anthropic()
          const response = await anthropic.messages.create({
            model: 'claude-haiku-5-5',
            max_tokens: 600,
            system: SYSTEM_PROMPT,
            messages: messages.slice(firstUser),
          })
          const reply = response.content
            .flatMap((block) => (block.type === 'text' ? [block.text] : []))
            .join('\n')
            .trim()
          if (!reply) throw new Error('Empty reply')
          return Response.json({ reply })
        } catch (error) {
          console.error('Falha no chat de suporte', error)
          return Response.json(
            { error: 'Assistant unavailable' },
            { status: 502 },
          )
        }
      },
    },
  },
})
