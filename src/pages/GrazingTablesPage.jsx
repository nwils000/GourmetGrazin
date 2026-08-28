import { useInView } from '../components/useInView'
import HoneyBookForm from '../components/HoneyBookForm'
import useSEO from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import { SERVICE_AREAS } from '../data/serviceAreas'

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
  { title: 'Corporate & Client Events', description: 'A grazing table gets people out of their chairs and talking. The easiest way to make an office open house, client reception, or holiday party feel considered rather than catered.' },
  { title: 'Weddings & Receptions', description: 'Make your big day unforgettable with a stunning grazing display that keeps guests mingling and celebrating.' },
  { title: 'Bridal & Baby Showers', description: 'A beautifully curated spread that serves as both a centerpiece and a crowd-pleaser for your celebration.' },
  { title: 'Holiday & Private Parties', description: 'From intimate gatherings to large-scale events, our grazing tables bring warmth and sophistication to any occasion.' },
]

const whyChooseUs = [
  'Each grazing table is curated and styled to be both a feast for the eyes and the palate',
  'Corporate grazing tables scale from a 20-person client reception to a 200-guest company party',
  'Perfect for creating Instagram-worthy moments at your event',
  'Custom options available for dietary restrictions, color schemes, and event themes',
  'We invoice businesses directly, and standing orders for recurring events are welcome',
]

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Grazing Tables',
  description: 'Stunning grazing tablescapes for Kentucky events, serving 20-200+ guests. Perfect for weddings, corporate receptions, and large gatherings with artisan cheeses, cured meats, and fresh accompaniments.',
  provider: {
    '@type': 'CateringService',
    '@id': 'https://www.gourmetgrazinky.com/#business',
    name: "Gourmet Grazin'",
    url: 'https://www.gourmetgrazinky.com',
    telephone: '+1-502-735-8428',
  },
  // City-level areaServed so this page competes for "grazing table {city}"
  areaServed: [
    { '@type': 'State', name: 'Kentucky' },
    ...SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area.city,
      addressRegion: 'KY',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${area.county}, Kentucky`,
      },
    })),
  ],
  serviceType: 'Grazing Table Catering',
}

export default function GrazingTablesPage() {
  const [heroRef, heroVisible] = useInView()
  const [provideRef, provideVisible] = useInView()
  const [sizesRef, sizesVisible] = useInView()
  const [whyRef, whyVisible] = useInView()
  const [areasRef, areasVisible] = useInView()
  const [formRef, formVisible] = useInView()

  useSEO({
    title: 'Grazing Tables in Lexington & Central Kentucky',
    description: 'Grazing tables for 20-200+ guests in Lexington, Georgetown, Frankfort, Versailles, Nicholasville & Richmond KY. Weddings, corporate events & celebrations. Full setup included.',
    path: '/grazing-tables',
    jsonLd: SERVICE_SCHEMA,
  })

  return (
    <article>
      {/* Hero Section */}
      <section className="relative bg-cream pt-36 pb-16 lg:pb-24" aria-label="Grazing Tables overview">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}
            >
              Grazing Tables
            </p>
            <h1
              className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
            >
              Grazing tables
              <br />
              <em className="text-gold-heading">that stop the room.</em>
            </h1>
            <p
              className={`text-charcoal-light text-lg md:text-xl font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
            >
              Stunning tablescapes overflowing with carefully curated bites. Perfect for
              larger gatherings where you want a dramatic, Instagram-worthy display that
              keeps guests mingling.
            </p>
          </div>
          <div className={`fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
            <picture>
              <source srcSet="/grazing-table.webp?v=2" type="image/webp" />
              <img
                src="/grazing-table.jpg?v=2"
                alt="A lavish Gourmet Grazin' grazing table with cheeses, cured meats, fresh fruit, and seasonal accompaniments"
                width="1200"
                height="1600"
                fetchPriority="high"
                className="w-full h-auto max-h-[600px] object-cover shadow-lg"
              />
            </picture>
          </div>
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
              What's on a <em className="text-gold-heading">grazing table.</em>
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
              20-200+ Guests
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${sizesVisible ? 'visible' : ''}`}
            >
              Grazing tables for every <em className="text-gold-heading">occasion.</em>
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
              Why hosts choose <em className="text-gold-heading">our grazing tables.</em>
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

      {/* Where We Set Up */}
      <section className="py-20 lg:py-28 bg-cream" aria-label="Where we set up grazing tables">
        <div ref={areasRef} className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${areasVisible ? 'visible' : ''}`}
            >
              Where We Set Up
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${areasVisible ? 'visible' : ''}`}
            >
              Grazing tables across <em className="text-gold-heading">Central Kentucky.</em>
            </h2>
            <p
              className={`text-charcoal-light text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mt-6 fade-in-up fade-in-up-delay-2 ${areasVisible ? 'visible' : ''}`}
            >
              We deliver, build, and style the table on site, then clear it all away afterward.
              Choose your city to see what we cater there most.
            </p>
          </header>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
            {SERVICE_AREAS.map((area, i) => (
              <li key={area.slug}>
                <Link
                  to={`/${area.slug}`}
                  className={`block bg-taupe-light border border-taupe/40 px-6 py-5 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${areasVisible ? 'visible' : ''}`}
                >
                  <span className="font-serif text-lg text-gold">Grazing Tables in {area.city}</span>
                  <span className="block text-charcoal-light text-xs font-light mt-1">
                    {area.county}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider />

      {/* Form Section */}
      <section className="py-20 lg:py-24 bg-cream" aria-label="Book your grazing table">
        <div ref={formRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${formVisible ? 'visible' : ''}`}
            >
              Book Your Table
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${formVisible ? 'visible' : ''}`}
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
