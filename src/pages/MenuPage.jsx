import { Link } from 'react-router-dom'
import { useInView } from '../components/useInView'
import useSEO from '../hooks/useSEO'
import { CATEGORIES, MENU, BOARD_SIZES, boardPrice, menuByCategory } from '../data/menu'

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4" aria-hidden="true">
      <div className="h-px w-16 bg-gold/30" />
      <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
      <div className="h-px w-16 bg-gold/30" />
    </div>
  )
}

const MENU_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: "Gourmet Grazin' Menu",
  url: 'https://www.gourmetgrazinky.com/menu',
  hasMenuSection: CATEGORIES.map((cat) => ({
    '@type': 'MenuSection',
    name: cat.label,
    description: cat.blurb,
    hasMenuItem: menuByCategory(cat.id).map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      description: item.blurb,
      ...(item.from
        ? { offers: { '@type': 'Offer', price: item.from, priceCurrency: 'USD' } }
        : {}),
    })),
  })),
}

function priceLabel(item) {
  if (item.pricing === 'perGuest') return 'Priced per guest'
  if (item.pricing === 'quote') return 'Custom quote'
  if (item.pricing === 'sized') return `From $${item.from}`
  const min = item.minQty ? ` · ${item.minQty} minimum` : ''
  return `$${item.from} per ${item.unitLabel}${min}`
}

function Category({ cat }) {
  const [ref, visible] = useInView()
  const items = menuByCategory(cat.id)
  if (!items.length) return null

  return (
    <section id={cat.id} className="py-16 lg:py-20 scroll-mt-28" aria-label={cat.label}>
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h2 className={`font-serif text-3xl md:text-4xl mb-3 fade-in-up ${visible ? 'visible' : ''}`}>
            {cat.label}
          </h2>
          <p className={`text-charcoal-light font-light max-w-xl mx-auto fade-in-up fade-in-up-delay-1 ${visible ? 'visible' : ''}`}>
            {cat.blurb}
          </p>
        </header>
        <ul className="grid md:grid-cols-2 gap-5 list-none">
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`bg-warm-white border border-taupe/40 p-7 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${visible ? 'visible' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <h3 className="font-serif text-xl text-gold">{item.name}</h3>
                <span className="text-charcoal text-xs whitespace-nowrap">{priceLabel(item)}</span>
              </div>
              <p className="text-charcoal-light font-light text-sm leading-relaxed">{item.blurb}</p>
              {item.pricing === 'sized' && (
                <p className="text-charcoal-light/80 text-xs font-light mt-3">
                  {BOARD_SIZES.map((s) => `${s.label} $${boardPrice(item, s.id)}`).join(' · ')}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function MenuPage() {
  const [heroRef, heroVisible] = useInView()

  useSEO({
    title: 'Menu & Pricing',
    description:
      'Grazing tables, charcuterie boards, sandwich trays, lunch boxes, cups and boxes — with pricing. Serving Lexington, Georgetown, Frankfort and Central Kentucky.',
    path: '/menu',
    jsonLd: MENU_SCHEMA,
  })

  return (
    <article className="bg-cream">
      <section className="pt-36 pb-12 px-6 lg:px-8" aria-label="Menu overview">
        <div ref={heroRef} className="max-w-3xl mx-auto text-center">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-5 fade-in-up ${heroVisible ? 'visible' : ''}`}>
            Menu &amp; Pricing
          </p>
          <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}>
            Everything we make,
            <br />
            <em className="text-gold-heading">and what it costs.</em>
          </h1>
          <p className={`text-charcoal-light text-lg font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
            Every order is made fresh and styled by hand. Prices below are starting
            points — tell us your event and we will build a quote around it.
          </p>
          <div className={`flex flex-wrap justify-center gap-3 mt-8 fade-in-up fade-in-up-delay-3 ${heroVisible ? 'visible' : ''}`}>
            <Link
              to="/inquire"
              className="bg-charcoal text-cream px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-500"
            >
              Get an Instant Quote
            </Link>
            <a
              href="tel:+15027358428"
              className="border border-charcoal/30 text-charcoal px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors duration-500"
            >
              (502) 735-8428
            </a>
          </div>
          <nav aria-label="Menu sections" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 list-none">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="text-charcoal-light text-xs tracking-[0.15em] uppercase hover:text-gold transition-colors">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <SectionDivider />

      {CATEGORIES.map((cat, i) => (
        <div key={cat.id} className={i % 2 === 1 ? 'bg-taupe-light' : ''}>
          <Category cat={cat} />
        </div>
      ))}

      <section className="py-20 bg-taupe-light text-center px-6" aria-label="Request a quote">
        <h2 className="font-serif text-3xl md:text-4xl mb-5">
          Not sure what fits? <em className="text-gold-heading">We will tell you.</em>
        </h2>
        <p className="text-charcoal-light font-light max-w-xl mx-auto mb-8 leading-relaxed">
          Give us your guest count and your date and you will see pricing and
          availability straight away.
        </p>
        <Link
          to="/inquire"
          className="inline-block bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-500"
        >
          Get an Instant Quote
        </Link>
      </section>
    </article>
  )
}
