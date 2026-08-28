import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useInView } from '../components/useInView'
import useSEO from '../hooks/useSEO'
import { getServiceArea } from '../data/serviceAreas'
import { REVIEW_COUNT, REVIEW_RATING } from '../data/reviews'

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4" aria-hidden="true">
      <div className="h-px w-16 bg-gold/30" />
      <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
      <div className="h-px w-16 bg-gold/30" />
    </div>
  )
}

const services = [
  {
    to: '/luxury-cart-experiences',
    title: 'Luxury Cart Experiences',
    description: 'A custom-built cart, fully stocked and served tableside by our team.',
  },
  {
    to: '/grazing-tables',
    title: 'Grazing Tables',
    description: 'Dramatic tablescapes for 20 to 200+ guests, styled on site.',
  },
  {
    to: '/menu',
    title: 'Boards, Cups & Boxes',
    description: 'Handcrafted boards from $65, plus individual cups and curated boxes.',
  },
  {
    to: '/charcuterie-classes',
    title: 'Charcuterie Classes',
    description: 'Hands-on workshops for 2 to 20 guests, boards included to take home.',
  },
]

function buildSchema(area) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Grazing Tables & Charcuterie Catering in ${area.city}, KY`,
      description: area.seoDescription,
      serviceType: ['Grazing Table Catering', 'Charcuterie Catering'],
      provider: {
        '@type': 'CateringService',
        '@id': 'https://www.gourmetgrazinky.com/#business',
        name: "Gourmet Grazin'",
        url: 'https://www.gourmetgrazinky.com',
        telephone: '+1-502-735-8428',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(REVIEW_RATING),
          reviewCount: String(REVIEW_COUNT),
          bestRating: '5',
          worstRating: '1',
        },
      },
      areaServed: {
        '@type': 'City',
        name: area.city,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: `${area.county}, Kentucky`,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: area.geo.lat,
          longitude: area.geo.lng,
        },
      },
      url: `https://www.gourmetgrazinky.com/${area.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: area.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ]
}

export default function ServiceAreaPage({ slug }) {
  const area = getServiceArea(slug)

  const [heroRef, heroVisible] = useInView()
  const [popularRef, popularVisible] = useInView()
  const [areasRef, areasVisible] = useInView()
  const [servicesRef, servicesVisible] = useInView()
  const [faqRef, faqVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  useSEO({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/${area.slug}`,
    jsonLd: buildSchema(area),
  })

  return (
    <article>
      {/* Hero */}
      <section className="relative bg-cream pt-36 pb-16 lg:pb-24" aria-label={`Charcuterie catering in ${area.city}`}>
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}>
              {area.eyebrow}
            </p>
            <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}>
              {area.headlineLead}
              <br />
              <em className="text-gold-heading">{area.headlineEm}</em>
            </h1>
            <p className={`text-charcoal-light text-lg md:text-xl font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
              {area.intro}
            </p>
            <div className={`flex items-center justify-center lg:justify-start gap-3 mt-8 fade-in-up fade-in-up-delay-3 ${heroVisible ? 'visible' : ''}`}>
              <span className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </span>
              <span className="text-charcoal font-serif">{REVIEW_RATING}</span>
              <span className="text-charcoal-light text-sm font-light">
                from {REVIEW_COUNT} Google reviews
              </span>
            </div>
          </div>
          <div className={`fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
            <picture>
              <source srcSet="/cart-outdoor.webp" type="image/webp" />
              <img
                src="/cart-outdoor.jpg"
                alt={`Gourmet Grazin' luxury charcuterie cart styled for an event near ${area.city}, Kentucky`}
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

      {/* What we cater here */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label={`What we cater in ${area.city}`}>
        <div ref={popularRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${popularVisible ? 'visible' : ''}`}>
              What We Cater
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${popularVisible ? 'visible' : ''}`}>
              Most requested in <em className="text-gold-heading">{area.city}.</em>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {area.popular.map((item, i) => (
              <article
                key={item.title}
                className={`bg-cream border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${popularVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-xl md:text-2xl text-gold mb-3">{item.title}</h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Areas served + local note */}
      <section className="py-20 lg:py-28 bg-cream" aria-label={`Areas we serve around ${area.city}`}>
        <div ref={areasRef} className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${areasVisible ? 'visible' : ''}`}>
              {area.county}
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${areasVisible ? 'visible' : ''}`}>
              {area.localNote.title.replace(/\.$/, '')}
            </h2>
          </header>
          <p className={`text-charcoal-light text-base md:text-lg font-light leading-relaxed text-center max-w-3xl mx-auto fade-in-up fade-in-up-delay-2 ${areasVisible ? 'visible' : ''}`}>
            {area.localNote.body}
          </p>
          <div className={`mt-12 fade-in-up fade-in-up-delay-3 ${areasVisible ? 'visible' : ''}`}>
            <h3 className="text-gold-accessible text-xs tracking-[0.3em] uppercase text-center mb-6">
              Neighborhoods &amp; Communities We Serve
            </h3>
            <ul className="flex flex-wrap justify-center gap-3 list-none">
              {area.areas.map((name) => (
                <li
                  key={name}
                  className="border border-taupe/50 bg-taupe-light px-4 py-2 text-charcoal-light text-sm font-light"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Services */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="Our services">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${servicesVisible ? 'visible' : ''}`}>
              Ways to Book
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${servicesVisible ? 'visible' : ''}`}>
              Every service, <em className="text-gold-heading">delivered to you.</em>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {services.map((service, i) => (
              <Link
                key={service.to}
                to={service.to}
                className={`block bg-cream border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${servicesVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-xl md:text-2xl text-gold mb-3">{service.title}</h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-cream" aria-label={`${area.city} charcuterie catering questions`}>
        <div ref={faqRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${faqVisible ? 'visible' : ''}`}>
              Questions
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${faqVisible ? 'visible' : ''}`}>
              Booking in <em className="text-gold-heading">{area.city}.</em>
            </h2>
          </header>
          <dl className="space-y-6">
            {area.faq.map((item, i) => (
              <div
                key={item.q}
                className={`bg-taupe-light border border-taupe/40 p-8 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${faqVisible ? 'visible' : ''}`}
              >
                <dt className="font-serif text-lg md:text-xl text-charcoal mb-3">{item.q}</dt>
                <dd className="text-charcoal-light font-light text-sm leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-taupe-light" aria-label={`Book charcuterie catering in ${area.city}`}>
        <div ref={ctaRef} className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${ctaVisible ? 'visible' : ''}`}>
            Let's Plan It
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}>
            Bring the cart to
            <br />
            <em className="text-gold-heading">{area.city}.</em>
          </h2>
          <p className={`text-charcoal-light text-base md:text-lg font-light leading-relaxed mb-10 fade-in-up fade-in-up-delay-2 ${ctaVisible ? 'visible' : ''}`}>
            Tell us your date, your guest count, and what you are celebrating. We will
            come back with a menu and a quote within 24 hours.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up fade-in-up-delay-3 ${ctaVisible ? 'visible' : ''}`}>
            <Link
              to="/luxury-cart-experiences#book-cart"
              className="bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-500"
            >
              Start Your Inquiry
            </Link>
            <a
              href="tel:+15027358428"
              className="border border-charcoal/30 text-charcoal px-10 py-4 text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors duration-500"
            >
              (502) 735-8428
            </a>
          </div>
        </div>
      </section>
    </article>
  )
}
