import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useInView } from '../components/useInView'
import useSEO from '../hooks/useSEO'
import { SERVICE_AREAS } from '../data/serviceAreas'
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

const options = [
  {
    title: 'Corporate Grazing Tables',
    price: 'priced per guest · 20-200+ guests',
    description:
      'The centrepiece for client receptions, office open houses, and holiday parties. A styled grazing table of artisan cheeses, cured meats, seasonal fruit and gourmet accompaniments, built and styled on site and cleared away afterward.',
  },
  {
    title: 'Artisan Lunch Boxes',
    price: 'from $18 per box · 10 minimum',
    description:
      'A freshly made sandwich, a personal charcuterie boat, and crackers or chips, individually packaged. The easiest way to feed a room without a serving line.',
  },
  {
    title: 'Sandwich Trays',
    price: 'from $50 per tray of 12',
    description:
      'Chicken Salad Croissant and Tuscan Turkey Ciabatta, arranged and ready to serve. Order by the tray and scale to any headcount.',
  },
  {
    title: 'Half Sandwich & Salad',
    price: 'from $14 per serving · 10 minimum',
    description:
      'A half sandwich with a fresh side salad. The lighter option for training days, lunch-and-learns, and afternoon sessions.',
  },
  {
    title: 'Breakfast & Brunch Trays',
    price: 'from $55 per tray of 12',
    description:
      'Mini pastries, bagels and spreads, yogurt parfaits, and fresh fruit for early starts and morning meetings.',
  },
  {
    title: 'Charcuterie Cups & Boxes',
    price: 'from $5 per serving',
    description:
      'Individually portioned and labelled. Ideal for conferences, large headcounts, and anywhere guests arrive in waves.',
  },
]

const whyUs = [
  {
    title: 'A grazing table does the work for you',
    body: 'Plated lunches keep people seated. A grazing table gets them up, moving and talking, which is usually the point of a client event or an office open house in the first place.',
  },
  {
    title: 'One invoice, one contact',
    body: 'You deal with Aiyana directly, from the first email to the final delivery. No call centre, no account manager rotation.',
  },
  {
    title: 'Delivered, set up, cleared away',
    body: 'We arrive 30-60 minutes early, set everything up, and take the mess with us. Your team stays in the meeting.',
  },
  {
    title: 'Dietary needs handled',
    body: 'Vegetarian, gluten-free, nut-free, and dairy-free options on every menu. Tell us the constraints and we build around them.',
  },
  {
    title: 'Repeat orders get easier',
    body: 'Once we know your team, reordering is a message. Standing weekly and monthly orders welcome.',
  },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Corporate Catering & Grazing Tables in Lexington, KY',
    serviceType: ['Corporate Catering', 'Grazing Table Catering', 'Office Lunch Catering', 'Charcuterie Catering'],
    description:
      'Corporate catering in Lexington and Central Kentucky: grazing tables for client events and office parties, plus artisan lunch boxes, sandwich trays and breakfast trays for meetings.',
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
    areaServed: SERVICE_AREAS.map((a) => ({
      '@type': 'City',
      name: a.city,
      addressRegion: 'KY',
    })),
    url: 'https://www.gourmetgrazinky.com/corporate-catering',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the minimum order for office catering?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lunch boxes and half-sandwich servings start at 10, cups and boxes at 15 and 6 respectively, and our overall minimum order is $150. For a small team we will suggest the format that gets you there sensibly.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much notice do you need for a corporate lunch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A few days is usually enough for trays and boxes. For grazing tables and larger client events, one to two weeks gives us room to source and style properly. Same-week requests are often possible, so ask.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you deliver to offices in Lexington?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We deliver and set up across Lexington, Georgetown, Frankfort, Versailles, Nicholasville, and Richmond, including downtown offices, Hamburg, and the Nicholasville Road corridor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you do grazing tables for corporate events?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — corporate grazing tables are one of our most requested services. We build and style the table on site for client receptions, office open houses, holiday parties and company milestones, from 20 to 200+ guests, then clear everything away afterward.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a corporate grazing table cost in Lexington?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grazing tables are priced per guest and the rate comes down as the headcount rises. The quickest way to get a number is our inquiry form, which prices your event on the spot and shows the delivery cost for your city before you send anything.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you invoice our company?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We invoice businesses directly and can set up standing orders for recurring team lunches and client meetings.',
        },
      },
    ],
  },
]

export default function CorporateCateringPage() {
  const [heroRef, heroVisible] = useInView()
  const [optRef, optVisible] = useInView()
  const [whyRef, whyVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  useSEO({
    title: 'Corporate Catering & Grazing Tables in Lexington, KY',
    description:
      'Corporate catering in Lexington KY: grazing tables for client events, artisan lunch boxes from $18, sandwich trays and breakfast trays for meetings. Delivered and set up. 5.0 stars.',
    path: '/corporate-catering',
    jsonLd: SCHEMA,
  })

  return (
    <article>
      <section className="relative bg-cream pt-36 pb-16 lg:pb-24" aria-label="Corporate catering overview">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}>
              Corporate &amp; Office Catering
            </p>
            <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}>
              Corporate catering
              <br />
              <em className="text-gold-heading">your team looks forward to.</em>
            </h1>
            <p className={`text-charcoal-light text-lg md:text-xl font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
              Grazing tables for client events and office parties, plus artisan lunch
              boxes, sandwich trays and breakfast spreads for everyday meetings. Serving
              offices across Lexington and Central Kentucky, delivered, set up and cleared
              away, so nobody on your team has to think about it.
            </p>
            <div className={`flex items-center justify-center lg:justify-start gap-3 mt-8 fade-in-up fade-in-up-delay-3 ${heroVisible ? 'visible' : ''}`}>
              <span className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </span>
              <span className="text-charcoal font-serif">{REVIEW_RATING}</span>
              <span className="text-charcoal-light text-sm font-light">from {REVIEW_COUNT} Google reviews</span>
            </div>
          </div>
          <div className={`fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
            <picture>
              <source srcSet="/charcuterie-boards-trio.webp" type="image/webp" />
              <img
                src="/charcuterie-boards-trio.jpg"
                alt="Gourmet Grazin' catering trays and boards arranged for a corporate lunch in Lexington, Kentucky"
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

      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="Corporate catering options">
        <div ref={optRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${optVisible ? 'visible' : ''}`}>
              What Teams Order
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${optVisible ? 'visible' : ''}`}>
              Grazing tables &amp; lunch, <em className="text-gold-heading">built for a working day.</em>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {options.map((o, i) => (
              <article
                key={o.title}
                className={`bg-cream border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${optVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-xl md:text-2xl text-gold mb-1">{o.title}</h3>
                <p className="text-charcoal text-xs tracking-wide mb-3">{o.price}</p>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">{o.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-20 lg:py-28 bg-cream" aria-label="Why book with us">
        <div ref={whyRef} className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-14">
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${whyVisible ? 'visible' : ''}`}>
              Why Teams Rebook
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${whyVisible ? 'visible' : ''}`}>
              One less thing <em className="text-gold-heading">to manage.</em>
            </h2>
          </header>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {whyUs.map((w, i) => (
              <article
                key={w.title}
                className={`bg-taupe-light border border-taupe/40 p-8 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${whyVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-lg text-gold mb-2">{w.title}</h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-20 lg:py-24 bg-taupe-light" aria-label="Book corporate catering">
        <div ref={ctaRef} className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${ctaVisible ? 'visible' : ''}`}>
            Feed the Team
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}>
            Get pricing in <em className="text-gold-heading">under a minute.</em>
          </h2>
          <p className={`text-charcoal-light text-base md:text-lg font-light leading-relaxed mb-10 fade-in-up fade-in-up-delay-2 ${ctaVisible ? 'visible' : ''}`}>
            Tell us your headcount and date and the form prices your grazing table or
            lunch order on the spot. We invoice businesses directly and set up standing
            orders on request.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up fade-in-up-delay-3 ${ctaVisible ? 'visible' : ''}`}>
            <Link
              to="/inquire"
              className="bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-500"
            >
              Get an Instant Quote
            </Link>
            <Link
              to="/menu"
              className="border border-charcoal/30 text-charcoal px-10 py-4 text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors duration-500"
            >
              See the Full Menu
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
