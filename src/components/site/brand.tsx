import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { whatsappLink } from '@/lib/qualimix'

export function Logo({
  className,
  inverted = false,
  tagline = true,
}: {
  className?: string
  inverted?: boolean
  tagline?: boolean
}) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span className="font-display text-[1.75em] font-black italic tracking-tight">
        <span className="text-primary [text-shadow:0_1px_0_oklch(0.35_0.15_25/0.35)]">
          Quali
        </span>
        <span className={inverted ? 'text-white' : 'text-secondary'}>mix</span>
      </span>
      {tagline && (
        <span
          className={cn(
            'mt-1 flex items-center gap-1.5 text-[0.5em] font-semibold tracking-[0.22em] uppercase',
            inverted ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          <span className="h-px w-5 bg-primary" />
          Qualidade em concreto
        </span>
      )}
    </span>
  )
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 9.42 9.43c0 5.2-4.23 9.42-9.43 9.42m8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.75l6.13-1.6a11.3 11.3 0 0 0 5.32 1.36h.01c6.25 0 11.35-5.1 11.35-11.36 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  )
}

export function WhatsAppButton({
  children = 'Solicitar orçamento',
  message,
  className,
  variant = 'red',
}: {
  children?: React.ReactNode
  message?: string
  className?: string
  variant?: 'red' | 'white' | 'outline'
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display text-sm font-bold tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transition-none',
        variant === 'red' &&
          'bg-red-gradient text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40',
        variant === 'white' &&
          'bg-white text-primary shadow-lg hover:shadow-xl',
        variant === 'outline' &&
          'border-2 border-white/40 text-white hover:border-white hover:bg-white/10',
        className,
      )}
    >
      <WhatsAppIcon className="size-5" />
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </a>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary uppercase">
        <span className="size-1.5 rounded-full bg-primary" /> {eyebrow}
      </span>
      <h2
        className={cn(
          'mt-4 font-display text-3xl font-extrabold tracking-tight md:text-5xl',
          light && 'text-white',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg',
            light ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
