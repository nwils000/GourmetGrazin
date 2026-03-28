import { useInView } from '../components/useInView'
import HoneyBookForm from '../components/HoneyBookForm'
import useSEO from '../hooks/useSEO'

const grazingItems = [
  {
    title: "Gourmet Grazin'",
    badge: 'MOST POPULAR',
    description:
      "Our signature mobile charcuterie cart — and the experience that started it all. Stocked with an artisan selection of imported cheeses, premium cured meats, seasonal fruits, gourmet crackers, and house-paired accompaniments, our cart is served tableside by our team for a refined, interactive grazing experience your guests won't forget.",
    startingPrice: '$400',
  },
  {
    title: 'Personalized Favor Bar',
    description:
      "Let your guests curate their own take-home creation. From artisan candy and gourmet cookies to mini charcuterie boards, our favor bar transforms party favors into an experience — beautifully styled and fully customizable to your event's aesthetic.",
    startingPrice: '$400',
  },
  {
    title: 'Sweet & Savory Social',
    description:
      'The best of both worlds on one cart. Indulge in a thoughtfully curated mix of artisan cheeses, cured meats, premium chocolates, candied nuts, and seasonal sweets — a balanced spread that satisfies every craving with effortless sophistication.',
    startingPrice: '$400',
  },
]

const beverageItems = [
  {
    title: 'The Mocktail Bar',
    description:
      "Handcrafted, non-alcoholic cocktails served fresh from our cart. From baby showers and church gatherings to corporate receptions, our mocktail bar brings a sophisticated sipping experience — beautifully garnished and entirely customizable to your event's palette.",
    startingPrice: '$250',
  },
  {
    title: 'The Lemonade Atelier',
    description:
      'Fresh-pressed lemonade elevated to an art form. Choose from signature infusions like lavender, strawberry basil, and peach mint — each crafted with premium ingredients and served with the elegance your event deserves.',
    startingPrice: '$250',
  },
  {
    title: 'The Cocoa & Cider Bar',
    description:
      'A warm, seasonal indulgence for fall and winter gatherings. Rich hot cocoa and spiced apple cider served from our cart with artisan toppings — marshmallows, whipped cream, cinnamon sticks, and caramel drizzle.',
    startingPrice: '$350',
  },
  {
    title: 'The Floral & Fizz Bar',
    description:
      'Where mixology meets floral artistry. Our sparkling mocktails are topped with edible flowers and fresh botanical garnishes for a picture-perfect sipping moment that doubles as a stunning visual centerpiece.',
    startingPrice: '$350',
  },
]

const brunchItems = [
  {
    title: 'The Morning Soirée',
    description:
      'A curated brunch experience served from our cart. Think mini quiches, artisan pastries, fresh fruit, yogurt parfaits, and gourmet spreads — all beautifully arranged and perfect for morning celebrations, bridal brunches, or weekend gatherings.',
    startingPrice: '$400',
  },
  {
    title: 'The Build-Your-Own Bowl Bar',
    description:
      'Interactive and Instagram-worthy. Guests build their own acai bowls, yogurt parfaits, or savory brunch bowls with a stunning spread of premium toppings — from fresh berries and granola to avocado and microgreens.',
    startingPrice: '$400',
  },
]

const dessertItems = [
  {
    title: 'The Confectionery Cart',
    description:
      "A sweet lover's dream on wheels. Our dessert cart arrives with an indulgent selection of gourmet treats — from chocolate truffles and macarons to mini tarts and seasonal confections, all styled to perfection.",
    startingPrice: '$400',
  },
  {
    title: 'The Parisian Pastry Cart',
    description:
      "Transport your guests to a Parisian patisserie. Mini croissants, delicate macarons, fruit tarts, and éclairs — each piece a work of art, served with the charm and elegance of a French bakery.",
    startingPrice: '$400',
  },
  {
    title: 'The Chocolate Fondue Bar',
    description:
      'An interactive, indulgent experience. Rich, melted chocolate paired with fresh strawberries, marshmallows, pretzels, and more — your guests dip, drizzle, and delight in a truly memorable dessert moment.',
    startingPrice: '$400',
  },
]

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Luxury Cart Experiences',
  description: 'White-glove mobile charcuterie cart service for weddings, corporate events, and celebrations in Kentucky. Grazing carts, beverage bars, brunch spreads, and dessert displays starting at $250.',
  provider: {
    '@type': 'CateringService',
    name: "Gourmet Grazin'",
    url: 'https://www.gourmetgrazinky.com',
  },
  areaServed: { '@type': 'State', name: 'Kentucky' },
  serviceType: 'Mobile Charcuterie Cart Catering',
  offers: [
    { '@type': 'Offer', name: "Gourmet Grazin' Cart", price: '400', priceCurrency: 'USD', description: 'Signature mobile charcuterie cart with artisan cheeses, cured meats, fruits, and accompaniments' },
    { '@type': 'Offer', name: 'Personalized Favor Bar', price: '400', priceCurrency: 'USD', description: 'Custom favor bar for take-home creations' },
    { '@type': 'Offer', name: 'The Mocktail Bar', price: '250', priceCurrency: 'USD', description: 'Handcrafted non-alcoholic cocktails served from cart' },
    { '@type': 'Offer', name: 'The Morning Soirée', price: '400', priceCurrency: 'USD', description: 'Curated brunch experience with pastries, fruit, and spreads' },
    { '@type': 'Offer', name: 'The Confectionery Cart', price: '400', priceCurrency: 'USD', description: 'Indulgent dessert cart with truffles, macarons, and tarts' },
  ],
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4" aria-hidden="true">
      <div className="h-px w-16 bg-gold/30" />
      <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
      <div className="h-px w-16 bg-gold/30" />
    </div>
  )
}

function MenuCard({ item, index, isVisible }) {
  return (
    <article
      className={`bg-cream border border-taupe/40 p-8 md:p-10 relative group hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}
    >
      {item.badge && (
        <span className="absolute top-6 right-6 bg-gold text-cream text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans">
          {item.badge}
        </span>
      )}
      <h3 className="font-serif text-xl md:text-2xl mb-4 group-hover:text-gold transition-colors duration-300">
        {item.title}
      </h3>
      <p className="text-charcoal-light font-light text-sm leading-relaxed">
        {item.description}
      </p>
      {item.startingPrice && (
        <p className="text-gold font-serif text-sm mt-4">
          Starting at {item.startingPrice}
        </p>
      )}
      <button
        onClick={() => document.getElementById('book-cart')?.scrollIntoView({ behavior: 'smooth' })}
        className="inline-block mt-4 text-xs tracking-[0.15em] uppercase border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-cream transition-colors duration-300 cursor-pointer"
      >
        Inquire
      </button>
    </article>
  )
}

function MenuSection({ label, title, titleAccent, items, bgClass = 'bg-cream' }) {
  const [ref, isVisible] = useInView()

  return (
    <section className={`py-20 lg:py-28 ${bgClass}`} aria-label={label}>
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-14 max-w-2xl">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}
          >
            {label}
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}
          >
            {title}{' '}
            {titleAccent && <em className="text-gold">{titleAccent}</em>}
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <MenuCard
              key={item.title}
              item={item}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LuxuryCartPage() {
  const [heroRef, heroVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  useSEO({
    title: 'Mobile Charcuterie Cart Catering',
    description: 'Book our luxury mobile charcuterie cart for Kentucky events. Grazing, beverage, brunch & dessert carts from $250. White-glove service included.',
    path: '/luxury-cart-experiences',
    jsonLd: SERVICE_SCHEMA,
  })

  return (
    <article>
      {/* Hero Section */}
      <section className="relative bg-cream pt-24 pb-20 lg:pt-32 lg:pb-28" aria-label="Luxury Cart Experiences overview">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <header>
              <p
                className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}
              >
                White-Glove Mobile Cart Service
              </p>
              <h1
                className={`font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
              >
                Luxury Cart
                <br />
                <em className="text-gold">Experiences</em>
              </h1>
              <p
                className={`text-charcoal-light text-lg md:text-xl leading-relaxed font-light max-w-lg mb-8 fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
              >
                From signature grazing carts to handcrafted beverage bars,
                brunch spreads, and indulgent dessert displays — every cart
                is styled, stocked, and served with intention.
              </p>
              <button
                onClick={() => document.getElementById('book-cart')?.scrollIntoView({ behavior: 'smooth' })}
                className={`inline-block bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 cursor-pointer fade-in-up fade-in-up-delay-3 ${heroVisible ? 'visible' : ''}`}
              >
                Book Your Cart
              </button>
            </header>

            <figure
              className={`overflow-hidden fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
            >
              <img
                src="/cart-outdoor.png"
                alt="Gourmet Grazin' luxury mobile charcuterie cart styled for an outdoor Kentucky event with artisan cheeses and cured meats"
                className="w-full h-[400px] lg:h-[550px] object-cover"
                width="600"
                height="550"
                fetchpriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <SectionDivider />

      <MenuSection
        label="Grazing"
        title="Curated spreads,"
        titleAccent="elevated."
        items={grazingItems}
        bgClass="bg-taupe-light"
      />

      <SectionDivider />

      <MenuSection
        label="Beverages"
        title="Sip in"
        titleAccent="style."
        items={beverageItems}
        bgClass="bg-cream"
      />

      <SectionDivider />

      <MenuSection
        label="Brunch"
        title="Morning affairs,"
        titleAccent="beautifully served."
        items={brunchItems}
        bgClass="bg-taupe-light"
      />

      <SectionDivider />

      <MenuSection
        label="Desserts"
        title="Sweet indulgences,"
        titleAccent="styled to perfection."
        items={dessertItems}
        bgClass="bg-cream"
      />

      <SectionDivider />

      {/* Booking Form Section */}
      <section id="book-cart" className="py-24 lg:py-32 bg-charcoal text-cream" aria-label="Book your cart">
        <div ref={ctaRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p
              className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${ctaVisible ? 'visible' : ''}`}
            >
              Book Your Cart
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-6 text-cream fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}
            >
              Ready to elevate
              <br />
              your <em className="text-gold">event?</em>
            </h2>
          </header>
          <div
            className={`fade-in-up fade-in-up-delay-2 ${ctaVisible ? 'visible' : ''}`}
          >
            <HoneyBookForm formId="7" />
          </div>
        </div>
      </section>
    </article>
  )
}
