import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Clock,
  HardHat,
  Layers,
  Menu,
  MessageCircle,
  PhoneCall,
  Quote,
  Ruler,
  ShieldCheck,
  Star,
  Truck,
  X,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import {
  WHATSAPP_DISPLAY,
  faqs,
  imageUrl,
  navLinks,
  services,
  testimonials,
  whatsappLink,
} from '@/lib/qualimix'
import { Logo, SectionHeading, WhatsAppButton, WhatsAppIcon } from './brand'

export function SiteHeader({ onChat }: { onChat: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        solid ? 'bg-white/90 shadow-md backdrop-blur-lg' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-18 max-w-content items-center justify-between px-5">
        <a href="#topo" aria-label="Qualimix — início" className="text-xl">
          <Logo inverted={!solid} />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-semibold transition-colors hover:text-primary',
                scrolled ? 'text-foreground' : 'text-white/90',
              )}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onChat}
            className={cn(
              'text-sm font-semibold transition-colors hover:text-primary',
              scrolled ? 'text-foreground' : 'text-white/90',
            )}
          >
            Suporte
          </button>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-gradient hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/30 transition hover:-translate-y-0.5 sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" /> Orçamento
          </a>
          <button
            className={cn(
              'rounded-lg p-2 md:hidden',
              solid ? 'text-foreground' : 'text-white',
            )}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t bg-white px-5 pb-5 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b py-3 font-semibold"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              onChat()
            }}
            className="block w-full border-b py-3 text-left font-semibold"
          >
            Suporte
          </button>
          <WhatsAppButton className="mt-4 w-full" />
        </nav>
      )}
    </header>
  )
}

export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate overflow-hidden bg-secondary text-white"
    >
      <img
        src={imageUrl('hero-truck.png', 1800)}
        srcSet={`${imageUrl('hero-truck.png', 800)} 800w, ${imageUrl('hero-truck.png', 1400)} 1400w, ${imageUrl('hero-truck.png', 2000)} 2000w`}
        sizes="100vw"
        alt="Caminhão betoneira lançando concreto em obra"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/20" />
      <div className="bg-red-gradient absolute -bottom-24 -left-20 -z-10 h-48 w-[140%] -rotate-[4deg] opacity-95" />
      <div className="absolute -bottom-28 -left-10 -z-10 h-48 w-[140%] -rotate-[4deg] bg-secondary" />
      <div className="mx-auto grid min-h-[92vh] max-w-content items-center px-5 pt-28 pb-36">
        <div className="max-w-2xl">
          <span className="animate-float-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase backdrop-blur">
            <BadgeCheck className="size-4 text-primary" /> Qualidade em concreto
          </span>
          <h1
            className="animate-float-in mt-6 font-display text-4xl leading-[1.05] font-black tracking-tight md:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            Concreto forte para{' '}
            <span className="text-primary">obras que duram</span>.
          </h1>
          <p
            className="animate-float-in mt-6 max-w-xl text-lg text-white/80 md:text-xl"
            style={{ animationDelay: '160ms' }}
          >
            Concreto usinado, piso polido e piso sarrafeado com controle de
            qualidade, entrega pontual e atendimento próximo do início ao fim da
            sua obra.
          </p>
          <div
            className="animate-float-in mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <WhatsAppButton>Solicite seu orçamento</WhatsAppButton>
            <a
              href="#cadastro"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/40 px-6 py-3.5 font-display text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 motion-reduce:transition-none"
            >
              <PhoneCall className="size-5" /> Quero ser chamado
            </a>
          </div>
          <div
            className="animate-float-in mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75"
            style={{ animationDelay: '320ms' }}
          >
            <span className="flex items-center gap-2">
              <span className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              Clientes satisfeitos
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-primary" /> Resposta rápida no
              WhatsApp
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

const highlights = [
  {
    icon: Truck,
    title: 'Concreto usinado',
    text: 'Direto da central para sua obra',
  },
  { icon: Layers, title: 'Piso polido', text: 'Liso, bonito e resistente' },
  { icon: Ruler, title: 'Piso sarrafeado', text: 'Nivelamento preciso' },
  {
    icon: ShieldCheck,
    title: 'Qualidade e resistência',
    text: 'Traço controlado',
  },
]

export function Highlights() {
  return (
    <section className="relative z-10 -mt-16 px-5">
      <div className="mx-auto grid max-w-content gap-4 rounded-3xl bg-card p-4 shadow-2xl shadow-black/10 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-accent"
          >
            <div className="bg-red-gradient grid size-14 shrink-0 place-items-center rounded-full text-white shadow-lg shadow-primary/30 ring-4 ring-primary/10">
              <Icon className="size-6" />
            </div>
            <div>
              <p className="font-display font-bold">{title}</p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section id="servicos" className="bg-concrete scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow="Nossos serviços"
          title={
            <>
              Tudo o que sua obra precisa{' '}
              <span className="text-primary">em concreto</span>
            </>
          }
          subtitle="Da fundação ao acabamento do piso, você conta com uma equipe que entende de obra e entrega no prazo."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={imageUrl(service.image, 720)}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                <h3 className="absolute bottom-4 left-5 font-display text-2xl font-extrabold text-white">
                  {service.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-muted-foreground">
                  {service.description}
                </p>
                <a
                  href={whatsappLink(service.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-primary uppercase"
                >
                  Pedir orçamento
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    icon: MessageCircle,
    title: 'Chame no WhatsApp',
    text: 'Conte o que você precisa: tipo de serviço, metragem e endereço da obra.',
  },
  {
    icon: ClipboardList,
    title: 'Receba o orçamento',
    text: 'Calculamos o volume ideal e enviamos uma proposta clara e sem surpresas.',
  },
  {
    icon: Truck,
    title: 'Entrega na obra',
    text: 'Agendamos o dia e chegamos no horário, com concreto no traço certo.',
  },
  {
    icon: HardHat,
    title: 'Obra concluída',
    text: 'Resultado resistente e duradouro, com acompanhamento da nossa equipe.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative scroll-mt-20 overflow-hidden bg-secondary px-5 py-24 text-white"
    >
      <div className="bg-red-gradient absolute -top-32 -right-32 size-96 rounded-full opacity-20 blur-3xl" />
      <div className="relative mx-auto max-w-content">
        <SectionHeading
          light
          eyebrow="Como funciona"
          title={
            <>
              Do orçamento à entrega em{' '}
              <span className="text-primary">4 passos</span>
            </>
          }
          subtitle="Simples, rápido e transparente — do jeito que sua obra merece."
        />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:border-primary/60 hover:bg-white/10"
            >
              <span className="absolute top-5 right-6 font-display text-5xl font-black text-white/10">
                0{index + 1}
              </span>
              <div className="bg-red-gradient grid size-12 place-items-center rounded-2xl shadow-lg shadow-primary/40">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <WhatsAppButton>Começar agora</WhatsAppButton>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-concrete scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow="Depoimentos"
          title={
            <>
              Quem constrói com a Qualimix{' '}
              <span className="text-primary">recomenda</span>
            </>
          }
          subtitle="A satisfação dos nossos clientes é o que dá base para tudo o que fazemos."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              className={cn(
                'relative flex flex-col rounded-3xl bg-card p-8 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl',
                index === 1 && 'md:-translate-y-4 md:hover:-translate-y-5',
              )}
            >
              <Quote className="absolute top-6 right-6 size-10 text-primary/15" />
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 leading-relaxed text-foreground/85">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t pt-5">
                <div className="bg-red-gradient grid size-12 place-items-center rounded-full font-display text-lg font-bold text-white">
                  {item.name[0]}
                </div>
                <div>
                  <p className="font-display font-bold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
                <BadgeCheck className="ml-auto size-5 text-primary" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq({ onChat }: { onChat: () => void }) {
  return (
    <section id="duvidas" className="scroll-mt-20 bg-card px-5 py-24">
      <div className="mx-auto grid max-w-content gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary uppercase">
            <span className="size-1.5 rounded-full bg-primary" /> Dúvidas
            frequentes
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            Ficou com <span className="text-primary">alguma dúvida?</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nossa assistente virtual responde na hora sobre concreto, pisos e
            como preparar sua obra. Para orçamento, a equipe atende pelo
            WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <button
              onClick={onChat}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-secondary px-6 py-3.5 font-display text-sm font-bold tracking-wide text-white uppercase transition hover:-translate-y-0.5"
            >
              <MessageCircle className="size-5" /> Falar com a assistente
            </button>
            <WhatsAppButton>WhatsApp</WhatsAppButton>
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="rounded-3xl border bg-background p-2 md:p-4"
        >
          {faqs.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`item-${index}`}
              className="px-4"
            >
              <AccordionTrigger className="font-display text-base font-bold hover:text-primary hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="px-5 pb-24">
      <div className="bg-red-gradient relative mx-auto max-w-content overflow-hidden rounded-[2rem] px-8 py-16 text-center text-white shadow-2xl shadow-primary/30 md:px-16">
        <div className="absolute -top-20 -left-20 size-72 rounded-full bg-white/10" />
        <div className="absolute -right-16 -bottom-24 size-80 rounded-full bg-black/15" />
        <div className="relative">
          <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl">
            Sua obra merece concreto de verdade.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Fale agora com a Qualimix e receba seu orçamento sem compromisso.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton variant="white">{WHATSAPP_DISPLAY}</WhatsAppButton>
            <a
              href="#cadastro"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/40 px-6 py-3.5 font-display text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 motion-reduce:transition-none"
            >
              <PhoneCall className="size-5" /> Quero ser chamado
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary px-5 pt-16 pb-28 text-white">
      <div className="bg-red-gradient absolute inset-x-0 top-0 h-1.5" />
      <div className="mx-auto grid max-w-content gap-10 md:grid-cols-3">
        <div className="text-2xl">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Concreto usinado, piso polido e piso sarrafeado com qualidade,
            resistência e compromisso com a sua obra.
          </p>
        </div>
        <div>
          <p className="font-display font-bold">Serviços</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            {services.map((service) => (
              <li key={service.title}>
                <a href="#servicos" className="hover:text-white">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display font-bold">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white"
              >
                <WhatsAppIcon className="size-4 text-[#25D366]" />{' '}
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href="#cadastro"
                className="flex items-center gap-2 text-white/80 hover:text-white"
              >
                <PhoneCall className="size-4 text-primary" /> Quero ser chamado
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-content border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} Qualimix — Qualidade em Concreto. Todos os
        direitos reservados.
      </div>
    </footer>
  )
}
