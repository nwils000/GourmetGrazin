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
      name: 'How far in advance should I book?',
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
      acceptedAnswer: { '@type': 'Answer', text: 'Our classes include all supplies, ingredients, a personal cutting board to take home, step-by-step instruction, and tastings. Perfect for groups of 6-20 people.' },
    },
    {
      '@type': 'Question',
      name: 'Do you provide setup and breakdown?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! We handle everything — arrival, full setup, styling, and cleanup. We typically arrive 30-60 minutes before your event.' },
    },
  ],
}

export default function FAQPage() {
  useSEO({
    title: 'Charcuterie Catering FAQ',
    description: "Answers about our Kentucky charcuterie services — booking, service areas, dietary options, cart capacity, classes, pricing & what's included.",
    path: '/faq',
    jsonLd: FAQ_SCHEMA,
  })

  return <FAQ />
}
