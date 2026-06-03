import FAQ from '../components/FAQ'
import useSEO from '../hooks/useSEO'

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas do you serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'We are based in Kentucky and serve events throughout the state. Travel fees may apply for venues beyond our standard service area.' },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book for larger events?',
      acceptedAnswer: { '@type': 'Answer', text: 'We recommend booking 1-2 months in advance for most events. For weddings and peak season (spring through fall), we suggest reaching out even earlier.' },
    },
    {
      '@type': 'Question',
      name: 'How many guests can the mobile cart serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'Our cart comfortably serves 25-150+ guests depending on the package. For groups smaller than 25, we recommend one of our charcuterie boards instead.' },
    },
    {
      '@type': 'Question',
      name: 'Can you accommodate dietary restrictions?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! We offer options for vegetarian, gluten-free, nut-free, and dairy-free guests.' },
    },
    {
      '@type': 'Question',
      name: "What's included in the charcuterie classes?",
      acceptedAnswer: { '@type': 'Answer', text: 'Every workshop includes all ingredients and supplies, premium cheeses and accompaniments, step-by-step styling instruction, an individual take-home charcuterie board, and full setup and cleanup. Pricing is per guest based on group size (2-20 guests). Optional add-ons include a curated mocktail bar, premium acacia wood boards, and custom laser-engraved boards.' },
    },
    {
      '@type': 'Question',
      name: 'Do you provide setup and breakdown?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! We handle everything: arrival, full setup, styling, and cleanup. We typically arrive 30-60 minutes before your event.' },
    },
    {
      '@type': 'Question',
      name: 'When is the latest I can order a board?',
      acceptedAnswer: { '@type': 'Answer', text: 'For the best availability, orders should be placed at least 48 hours in advance. If you need a board sooner, please reach out and we\'ll do our best to accommodate your request based on our schedule. Rush fees may apply.' },
    },
    {
      '@type': 'Question',
      name: 'Can I customize my board?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! We\'re happy to accommodate customization requests whenever possible. Whether you have favorite items you\'d like included, ingredients you\'d prefer to avoid, or a specific theme or color palette in mind, let us know when placing your order and we\'ll do our best to create a board that fits your vision.' },
    },
  ],
}

export default function FAQPage() {
  useSEO({
    title: 'Charcuterie Catering FAQ',
    description: "Answers about our Kentucky charcuterie services: booking, service areas, dietary options, cart capacity, classes, pricing & what's included.",
    path: '/faq',
    jsonLd: FAQ_SCHEMA,
  })

  return <FAQ />
}
