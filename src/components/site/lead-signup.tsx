import { useId, useState } from 'react'
import {
  CheckCircle2,
  Clock,
  Loader2,
  PhoneCall,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/qualimix'
import { WhatsAppButton, WhatsAppIcon } from './brand'

/** Formata o telefone enquanto o cliente digita: (61) 99112-4510 */
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  const ddd = digits.slice(0, 2)
  const rest = digits.slice(2)
  if (rest.length <= 4) return `(${ddd}) ${rest}`
  const split = rest.length === 9 ? 5 : 4
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function LeadSignup() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [submittedName, setSubmittedName] = useState('')
  const nameId = useId()
  const phoneId = useId()

  function validate() {
    const next: { name?: string; phone?: string } = {}
    if (name.trim().length < 2) next.name = 'Informe seu nome.'
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11)
      next.phone = 'Informe um telefone válido com DDD.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting' || !validate()) return
    setStatus('submitting')
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone, website }),
      })
      if (!response.ok) throw new Error('failed')
      setSubmittedName(name.trim().split(/\s+/)[0])
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setName('')
    setPhone('')
    setErrors({})
    setStatus('idle')
  }

  const firstName = submittedName

  return (
    <section
      id="cadastro"
      className="relative scroll-mt-20 overflow-hidden bg-secondary px-5 py-24 text-white"
    >
      <div className="bg-red-gradient absolute -bottom-40 -left-32 size-[28rem] rounded-full opacity-20 blur-3xl" />
      <div className="relative mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary uppercase">
            <span className="size-1.5 rounded-full bg-primary" /> Cadastro de
            cliente
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            Deixe seu contato e{' '}
            <span className="text-primary">a gente te chama</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Informe seu nome e telefone. Um de nossos consultores vai chamar
            você no WhatsApp para entender sua obra e montar o orçamento.
          </p>
          <ul className="mt-8 space-y-4 text-white/80">
            <li className="flex items-center gap-3">
              <span className="bg-red-gradient grid size-10 shrink-0 place-items-center rounded-xl">
                <Clock className="size-5" />
              </span>
              Retorno rápido, em horário comercial
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-red-gradient grid size-10 shrink-0 place-items-center rounded-xl">
                <ShieldCheck className="size-5" />
              </span>
              Seus dados são usados apenas para o nosso contato
            </li>
          </ul>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="font-display text-lg font-bold">
              Quer falar agora mesmo?
            </p>
            <p className="mt-1 text-sm text-white/70">
              Sem esperar: chame nossa equipe direto no WhatsApp{' '}
              {WHATSAPP_DISPLAY}.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 font-display text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <WhatsAppIcon className="size-5" /> Falar agora no WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-card p-6 text-card-foreground shadow-2xl shadow-black/30 md:p-10">
          {status === 'success' ? (
            <div className="py-6 text-center" role="status" aria-live="polite">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#25D366]/15 text-[#128C4A]">
                <CheckCircle2 className="size-9" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-extrabold">
                Pronto{firstName ? `, ${firstName}` : ''}!
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-lg text-muted-foreground">
                Um de nossos consultores irá lhe chamar em breve no{' '}
                <strong className="text-foreground">WhatsApp</strong>.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <WhatsAppButton
                  message={`Olá, Qualimix! Sou ${firstName || 'cliente'} e acabei de me cadastrar no site. Gostaria de falar agora sobre minha obra.`}
                >
                  Prefiro falar agora
                </WhatsAppButton>
                <button
                  onClick={reset}
                  className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Cadastrar outro contato
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="font-display text-2xl font-extrabold">
                Solicite nosso contato
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Leva menos de 1 minuto.
              </p>

              <div className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor={nameId} className="font-semibold">
                    Nome
                  </Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={nameId}
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? `${nameId}-error` : undefined
                      }
                      className="h-13 rounded-xl pl-12 text-base"
                    />
                  </div>
                  {errors.name && (
                    <p
                      id={`${nameId}-error`}
                      className="text-sm text-destructive"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={phoneId} className="font-semibold">
                    Telefone / WhatsApp
                  </Label>
                  <div className="relative">
                    <PhoneCall className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      required
                      placeholder="(61) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? `${phoneId}-error` : undefined
                      }
                      className="h-13 rounded-xl pl-12 text-base"
                    />
                  </div>
                  {errors.phone && (
                    <p
                      id={`${phoneId}-error`}
                      className="text-sm text-destructive"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Campo escondido contra robôs de spam */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Site
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              {status === 'error' && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  Não conseguimos enviar seu cadastro agora. Tente novamente ou
                  fale direto com a gente no WhatsApp {WHATSAPP_DISPLAY}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  'bg-red-gradient mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 font-display text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 disabled:translate-y-0 disabled:opacity-70 motion-reduce:transition-none',
                )}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    <PhoneCall className="size-5" /> Solicitar contato
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Ao enviar, você autoriza a Qualimix a entrar em contato pelo
                WhatsApp.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
