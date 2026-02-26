import { useInView } from './useInView'

const steps = [
  {
    number: '01',
    title: 'Inquire',
    description: 'Tell us about your event — the date, guest count, venue, and vision. We\'ll get back to you within 24 hours.',
  },
  {
    number: '02',
    title: 'We Customize',
    description: 'We craft a personalized charcuterie experience tailored to your event style, dietary needs, and guest count.',
  },
  {
    number: '03',
    title: 'You Graze',
    description: 'We arrive, set up our beautiful spread, and your guests enjoy an unforgettable grazing experience.',
  },
]

export default function HowItWorks() {
  const [ref, isVisible] = useInView()

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            How It Works
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            Simple as <em className="text-gold">one, two, graze.</em>
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 gap-12 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <span className="font-serif text-5xl text-gold/30 block mb-4">{step.number}</span>
              <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
              <p className="text-charcoal-light font-light leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
