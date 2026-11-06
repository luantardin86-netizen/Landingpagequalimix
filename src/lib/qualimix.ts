export const WHATSAPP_NUMBER = '5561991124510'
export const WHATSAPP_DISPLAY = '(61) 99112-4510'

export function whatsappLink(
  message = 'Olá, Qualimix! Gostaria de solicitar um orçamento.',
) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function imageUrl(file: string, width: number) {
  return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=78`
}

export const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#cadastro', label: 'Contato' },
  { href: '#duvidas', label: 'Dúvidas' },
]

export const services = [
  {
    title: 'Concreto usinado',
    description:
      'Concreto dosado em central com controle rigoroso de traço, entregue em caminhão betoneira direto na sua obra — do fck 15 ao 40 MPa.',
    image: 'concreto-usinado.png',
    message:
      'Olá, Qualimix! Quero um orçamento de concreto usinado para minha obra.',
  },
  {
    title: 'Piso polido',
    description:
      'Acabamento liso, resistente e de fácil limpeza para galpões, garagens, comércios e áreas industriais.',
    image: 'piso-polido.png',
    message: 'Olá, Qualimix! Tenho interesse em piso polido. Podem me ajudar?',
  },
  {
    title: 'Piso sarrafeado',
    description:
      'Nivelamento preciso do concreto fresco, ideal como base para revestimentos, contrapisos e áreas externas.',
    image: 'piso-sarrafeado.png',
    message: 'Olá, Qualimix! Gostaria de um orçamento de piso sarrafeado.',
  },
]

export const testimonials = [
  {
    name: 'Ricardo',
    role: 'Construtor',
    text: 'Concretei a laje de um sobrado com a Qualimix e foi impecável. O caminhão chegou no horário combinado, a equipe foi super atenciosa e o concreto veio exatamente no traço que eu pedi. Já fechei a próxima obra com eles.',
  },
  {
    name: 'Luiz',
    role: 'Proprietário de galpão',
    text: 'Fizemos o piso polido do nosso galpão e o resultado superou as expectativas. Ficou nivelado, bonito e muito resistente ao tráfego das empilhadeiras. Atendimento rápido pelo WhatsApp do orçamento até a entrega.',
  },
  {
    name: 'Paulo',
    role: 'Mestre de obras',
    text: 'Trabalho há anos com concreto e a Qualimix é hoje minha primeira escolha. Qualidade constante, preço justo e uma equipe que entende de obra. Recomendo de olhos fechados!',
  },
]

export const faqs = [
  {
    q: 'Como solicito um orçamento?',
    a: `É só chamar no WhatsApp ${WHATSAPP_DISPLAY} informando o tipo de serviço, o volume aproximado (em m³ ou m²) e o endereço da obra. Se preferir, deixe seu nome e telefone no formulário "Quero ser chamado" que um consultor chama você.`,
  },
  {
    q: 'Qual a quantidade mínima de concreto usinado?',
    a: 'Atendemos desde pequenas obras até grandes volumes. Fale com a nossa equipe para verificar a disponibilidade para o seu volume e a sua região.',
  },
  {
    q: 'Vocês ajudam a calcular quantos m³ eu preciso?',
    a: 'Sim! Envie as medidas (comprimento × largura × espessura) da laje, piso ou fundação e nosso time calcula o volume ideal, evitando desperdício.',
  },
  {
    q: 'Qual a diferença entre piso polido e sarrafeado?',
    a: 'O sarrafeado nivela o concreto fresco com régua, servindo de base para outros revestimentos. O polido recebe acabamento mecânico, ficando liso e pronto para uso, ideal para galpões e garagens.',
  },
]
