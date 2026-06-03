import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useInView } from './useInView'

const faqs = [
  {
    question: 'What areas do you serve?',
    answer: 'We are based in Kentucky and serve events throughout the state. Travel fees may apply for venues beyond our standard service area. Contact us for specifics!',
  },
  {
    question: 'How far in advance should I book for larger events?',
    answer: 'We recommend booking 1-2 months in advance for most events. For weddings and peak season (spring through fall), we suggest reaching out even earlier, popular dates fill quickly, so the sooner the better!',
  },
  {
    question: 'How many guests can the mobile cart serve?',
    answer: 'Our cart comfortably serves 25-150+ guests depending on the package. For groups smaller than 25, we recommend one of our beautifully crafted charcuterie boards instead. For larger events, we can supplement with additional grazing tables, we\'ll customize to your guest count.',
  },
  {
    question: 'Can you accommodate dietary restrictions?',
    answer: 'Absolutely! We offer options for vegetarian, gluten-free, nut-free, and dairy-free guests. Just let us know during your consultation and we\'ll build a spread everyone can enjoy.',
  },
  {
    question: 'What\'s included in the charcuterie classes?',
    answer: 'Every workshop includes all ingredients and supplies, premium cheeses and accompaniments, step-by-step styling instruction, an individual take-home charcuterie board, and full setup and cleanup. We come to your home or venue. Pricing is per guest based on group size (2-20 guests). Optional add-ons include a curated mocktail bar, premium acacia wood boards, and custom laser-engraved boards.',
  },
  {
    question: 'Do you provide setup and breakdown?',
    answer: 'Yes! We handle everything: arrival, full setup, styling, and cleanup. You and your guests simply enjoy the experience. We typically arrive 30-60 minutes before your event.',
  },
  {
    question: 'When is the latest I can order a board?',
    answer: 'For the best availability, orders should be placed at least 48 hours in advance. If you need a board sooner, please reach out and we\'ll do our best to accommodate your request based on our schedule. Rush fees may apply.',
  },
  {
    question: 'Can I customize my board?',
    answer: 'Yes! We\'re happy to accommodate customization requests whenever possible. Whether you have favorite items you\'d like included, ingredients you\'d prefer to avoid, or a specific theme or color palette in mind, let us know when placing your order and we\'ll do our best to create a board that fits your vision.',
  },
  {
    question: 'How many people does each board serve?',
    answer: (
      <>
        <p className="mb-3">
          Serving sizes may vary depending on the occasion and whether the board is being enjoyed as an appetizer or a meal. As a general guideline for appetizers:
        </p>
        <ul className="mb-3 space-y-1 list-none pl-0">
          <li><strong className="text-charcoal font-medium">Small (14"):</strong> Serves 4-6</li>
          <li><strong className="text-charcoal font-medium">Medium (16"):</strong> Serves 6-10</li>
          <li><strong className="text-charcoal font-medium">Large (17" x 12"):</strong> Serves 10-15</li>
          <li><strong className="text-charcoal font-medium">X-Large (22" x 12"):</strong> Serves 15-20</li>
        </ul>
        <p>
          Need help choosing the right size? Contact us and we&rsquo;d be happy to recommend the best option for your gathering.
        </p>
      </>
    ),
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [ref, isVisible] = useInView()

  return (
    <section id="faq" className="pt-36 pb-24 lg:pt-44 lg:pb-32 bg-taupe-light">
      <div ref={ref} className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            FAQ
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-charcoal-light font-light mt-4 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            Everything you need to know about working with us.
          </p>
        </div>

        <div className={`space-y-0 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-charcoal/15">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-serif text-lg md:text-xl pr-4 group-hover:text-gold transition-colors duration-300">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gold flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${
                openIndex === i ? 'max-h-[40rem] pb-6' : 'max-h-0'
              }`}>
                <div className="text-charcoal-light font-light leading-relaxed text-sm">
                  {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-charcoal/15" />
        </div>
      </div>
    </section>
  )
}
