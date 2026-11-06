import { useEffect, useRef, useState } from 'react'
import { HardHat, MessageCircle, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/qualimix'
import { WhatsAppIcon } from './brand'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const greeting: ChatMessage = {
  role: 'assistant',
  content:
    'Olá! Eu sou a Mix, assistente da Qualimix 👷‍♀️ Posso tirar dúvidas sobre concreto usinado, piso polido, piso sarrafeado e ajudar a calcular o volume da sua obra. Como posso ajudar?',
}

const suggestions = [
  'Qual concreto usar na laje?',
  'Como calculo os m³?',
  'Diferença entre piso polido e sarrafeado',
]

export function SupportChat({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([greeting])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(text: string) {
    const content = text.trim()
    if (!content || loading) return
    const next: ChatMessage[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== greeting) }),
      })
      const data = (await response.json()) as { reply?: string }
      if (!response.ok || !data.reply) throw new Error('failed')
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply as string },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Ops, tive um probleminha para responder agora. Fale direto com nossa equipe pelo WhatsApp ${WHATSAPP_DISPLAY} que atendemos você rapidinho!`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className={cn(
          'fixed right-4 bottom-24 z-50 flex w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all duration-300 sm:right-6',
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none invisible scale-90 opacity-0',
        )}
        style={{ height: 'min(560px, calc(100vh - 8rem))' }}
        role="dialog"
        aria-label="Chat de suporte Qualimix"
        aria-hidden={!open}
      >
        <div className="bg-red-gradient flex items-center gap-3 px-4 py-3 text-white">
          <div className="grid size-10 place-items-center rounded-full bg-white/15 ring-2 ring-white/30">
            <HardHat className="size-5" />
          </div>
          <div className="flex-1">
            <p className="font-display leading-tight font-bold">
              Mix · Suporte Qualimix
            </p>
            <p className="flex items-center gap-1.5 text-xs text-white/80">
              <span className="size-2 rounded-full bg-emerald-300" /> Online
              agora
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1.5 hover:bg-white/15"
            aria-label="Fechar chat"
          >
            <X className="size-5" />
          </button>
        </div>

        <div
          ref={listRef}
          className="flex-1 space-y-3 overflow-y-auto bg-muted/50 p-4"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm',
                message.role === 'user'
                  ? 'ml-auto rounded-br-sm bg-secondary text-secondary-foreground'
                  : 'rounded-bl-sm bg-card',
              )}
            >
              {message.content}
            </div>
          ))}
          {loading && (
            <div className="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-bl-sm bg-card px-3 py-3 shadow-sm">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="size-1.5 animate-bounce rounded-full bg-primary"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          )}
          {messages.length === 1 && !loading && (
            <div className="flex flex-wrap gap-2 pt-1">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => send(suggestion)}
                  className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t bg-[#25D366]/10 px-4 py-2 text-xs font-semibold text-[#128C4A] hover:bg-[#25D366]/20"
        >
          <WhatsAppIcon className="size-4" /> Prefere falar com uma pessoa?
          Chame no WhatsApp
        </a>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t bg-card p-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite sua dúvida..."
            aria-label="Digite sua dúvida"
            maxLength={2000}
            className="h-10 flex-1 rounded-full border bg-muted/60 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
            aria-label="Enviar"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>

      <button
        onClick={() => onOpenChange(!open)}
        className="bg-red-gradient fixed right-4 bottom-6 z-50 grid size-14 place-items-center rounded-full text-white shadow-xl shadow-primary/30 transition hover:scale-105 sm:right-6"
        aria-label={open ? 'Fechar chat' : 'Abrir chat de suporte'}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </>
  )
}
