import { useInView } from '../components/useInView'
import HoneyBookForm from '../components/HoneyBookForm'
import useSEO from '../hooks/useSEO'

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4" aria-hidden="true">
      <div className="h-px w-16 bg-gold/30" />
      <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
      <div className="h-px w-16 bg-gold/30" />
    </div>
  )
}

const whatWeProvide = [
  'A lavish selection of cheeses, cured meats, fresh fruits, nuts, crackers, and gourmet sweets',
  'Elegant platters, boards, and decor to match your event theme',
  'Thoughtful presentation with floral accents, greenery, or custom signage',
  'Full setup and breakdown for a stress-free experience',
]

const eventTypes = [
  { title: 'Weddings & Receptions', description: 'Make your big day unforgettable with a stunning grazing display that keeps guests mingling and celebrating.' },
  { title: 'Corporate Events', description: 'Impress clients and colleagues with an elevated catering experience that sparks conversation and connection.' },
  { title: 'Bridal & Baby Showers', description: 'A beautifully curated spread that serves as both a centerpiece and a crowd-pleaser for your celebration.' },
  { title: 'Holiday & Private Parties', description: 'From intimate gatherings to large-scale events, our grazing tables bring warmth and sophistication to any occasion.' },
]

const whyChooseUs = [
  'Each table is curated and styled to be both a feast for the eyes and the palate',
  'Perfect for creating Instagram-worthy moments at your event',
  'Custom options available for dietary restrictions, color schemes, and event themes',
]

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Grazing Tables',
  description: 'Stunning grazing tablescapes for Kentucky events, serving 20-200+ guests. Perfect for weddings, corporate receptions, and large gatherings with artisan cheeses, cured meats, and fresh accompaniments.',
  provider: {
    '@type': 'CateringService',
    name: "Gourmet Grazin'",
    url: 'https://www.gourmetgrazinky.com',
  },
  areaServed: { '@type': 'State', name: 'Kentucky' },
  serviceType: 'Grazing Table Catering',
}

export default function GrazingTablesPage() {
  const [heroRef, heroVisible] = useInView()
  const [provideRef, provideVisible] = useInView()
  const [sizesRef, sizesVisible] = useInView()
  const [whyRef, whyVisible] = useInView()
  const [formRef, formVisible] = useInView()

  useSEO({
    title: 'Grazing Tables for Kentucky Events',
    description: 'Stunning charcuterie grazing tables for 20-200+ guests. Perfect for Kentucky weddings, corporate events & celebrations. Full setup included.',
    path: '/grazing-tables',
    jsonLd: SERVICE_SCHEMA,
  })

  return (
    <article>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-cream pt-24 pb-16 lg:pb-24" aria-label="Grazing Tables overview">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}
          >
            Grazing Tables
          </p>
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
          >
            Stunning spreads,
            <br />
            <em className="text-gold-heading">unforgettable impact.</em>
          </h1>
          <p
            className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            Stunning tablescapes overflowing with carefully curated bites. Perfect for
            larger gatherings where you want a dramatic, Instagram-worthy display that
            keeps guests mingling.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* What We Provide Section */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="What we provide">
        <div ref={provideRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${provideVisible ? 'visible' : ''}`}
            >
              The Experience
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${provideVisible ? 'visible' : ''}`}
            >
              What we <em className="text-gold-heading">provide.</em>
            </h2>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto list-none">
            {whatWeProvide.map((item, i) => (
              <li
                key={i}
                className={`bg-cream border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${provideVisible ? 'visible' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-gold text-lg mt-0.5" aria-hidden="true">&#10047;</span>
                  <p className="text-charcoal-light font-light text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider />

      {/* Events & Serving Section */}
      <section className="py-20 lg:py-28 bg-cream" aria-label="Event types">
        <div ref={sizesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${sizesVisible ? 'visible' : ''}`}
            >
              20–200+ Guests
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${sizesVisible ? 'visible' : ''}`}
            >
              Perfect for every <em className="text-gold-heading">occasion.</em>
            </h2>
            <p
              className={`text-charcoal-light text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mt-6 fade-in-up fade-in-up-delay-2 ${sizesVisible ? 'visible' : ''}`}
            >
              From intimate gatherings of 20 to grand celebrations of 200+, our grazing tables are scaled and styled to fit your event perfectly.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {eventTypes.map((event, i) => (
              <article
                key={event.title}
                className={`bg-taupe-light border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${sizesVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-xl md:text-2xl text-gold mb-3">
                  {event.title}
                </h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {event.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="Why choose us">
        <div ref={whyRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${whyVisible ? 'visible' : ''}`}
            >
              Why Choose Us
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${whyVisible ? 'visible' : ''}`}
            >
              More than a table, <em className="text-gold-heading">an experience.</em>
            </h2>
          </header>
          <ul className="max-w-3xl mx-auto space-y-6 list-none">
            {whyChooseUs.map((item, i) => (
              <li
                key={i}
                className={`bg-cream border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${whyVisible ? 'visible' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-gold text-lg mt-0.5" aria-hidden="true">&#10047;</span>
                  <p className="text-charcoal-light font-light text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider />

      {/* Form Section */}
      <section className="py-24 lg:py-32 bg-charcoal text-cream" aria-label="Book your grazing table">
        <div ref={formRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${formVisible ? 'visible' : ''}`}
            >
              Book Your Table
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 text-cream fade-in-up fade-in-up-delay-1 ${formVisible ? 'visible' : ''}`}
            >
              Let's plan your
              <br />
              perfect <em className="text-gold-heading">graze.</em>
            </h2>
          </header>
          <div
            className={`fade-in-up fade-in-up-delay-2 ${formVisible ? 'visible' : ''}`}
          >
            <HoneyBookForm formId="8" />
          </div>
        </div>
      </section>
    </article>
  )
}
