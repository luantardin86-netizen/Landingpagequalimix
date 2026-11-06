import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { whatsappLink } from '@/lib/qualimix'
import { WhatsAppIcon } from '@/components/site/brand'
import { LeadSignup } from '@/components/site/lead-signup'
import { SupportChat } from '@/components/site/support-chat'
import {
  Faq,
  FinalCta,
  Hero,
  Highlights,
  HowItWorks,
  Services,
  SiteFooter,
  SiteHeader,
  Testimonials,
} from '@/components/site/sections'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [chatOpen, setChatOpen] = useState(false)
  const openChat = () => setChatOpen(true)

  return (
    <div className="min-h-screen">
      <SiteHeader onChat={openChat} />
      <main>
        <Hero />
        <Highlights />
        <Services />
        <HowItWorks />
        <Testimonials />
        <LeadSignup />
        <Faq onChat={openChat} />
        <FinalCta />
      </main>
      <SiteFooter />
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="animate-wa-pulse fixed bottom-6 left-4 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 sm:left-6"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <SupportChat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  )
}
