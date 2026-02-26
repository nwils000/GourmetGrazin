import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useInView } from './useInView'

const faqs = [
  {
    question: 'What areas do you serve?',
    answer: 'We are based in Kentucky and serve events throughout the state. Travel fees may apply for venues beyond our standard service area. Contact us for specifics!',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2-4 weeks in advance, especially during peak wedding and event season (spring through fall). Popular dates fill quickly, so the earlier the better!',
  },
  {
    question: 'How many guests can the mobile cart serve?',
    answer: 'Our mobile cart comfortably serves 50-150+ guests depending on the package. For larger events, we can supplement with additional grazing tables. We\'ll customize to your guest count.',
  },
  {
    question: 'Can you accommodate dietary restrictions?',
    answer: 'Absolutely! We offer options for vegetarian, gluten-free, nut-free, and dairy-free guests. Just let us know during your consultation and we\'ll build a spread everyone can enjoy.',
  },
  {
    question: 'What\'s included in the charcuterie classes?',
    answer: 'Our classes include all supplies, ingredients, a personal cutting board to take home, step-by-step instruction, and of course — tastings! Perfect for groups of 6-20 people.',
  },
  {
    question: 'Do you provide setup and breakdown?',
    answer: 'Yes! We handle everything — arrival, full setup, styling, and cleanup. You and your guests simply enjoy the experience. We typically arrive 30-60 minutes before your event.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [ref, isVisible] = useInView()

  return (
    <section id="faq" className="py-24 lg:py-32 bg-taupe-light">
      <div ref={ref} className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
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
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'max-h-48 pb-6' : 'max-h-0'
              }`}>
                <p className="text-charcoal-light font-light leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-charcoal/15" />
        </div>
      </div>
    </section>
  )
}
