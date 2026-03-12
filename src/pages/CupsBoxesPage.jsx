import { useEffect } from 'react'
import { useInView } from '../components/useInView'

const cups = [
  {
    title: 'Le Doux et Salé',
    description: 'A mix of cheeses, crackers, chocolate-covered pretzels, and fresh fruit.',
  },
  {
    title: 'Le Sucré',
    description: 'Mini cookies, brownie bites, Rice Krispy treats, chocolate-covered strawberries, and berries.',
  },
  {
    title: 'Le Salé',
    description: 'Cheeses, cured meats, crackers, olives, nuts, and fruit.',
  },
  {
    title: 'Le Petit Déjeuner',
    description: 'Yogurt, granola, berries, and a drizzle of honey.',
  },
  {
    title: 'Custom/Seasonal Cup',
    description: 'Themed flavors or seasonal ingredients tailored to your event.',
  },
]

const boxes = [
  {
    title: 'Le Classique',
    description: 'A balanced selection of sweet and savory items for 2–4 people.',
  },
  {
    title: 'Le Gourmand',
    description: 'Loaded with cookies, brownies, chocolate-covered treats, and fruit for 2–6 people.',
  },
  {
    title: 'Le Salé Élégant',
    description: 'Cheese, meats, nuts, crackers, and fruit, perfect for small gatherings.',
  },
  {
    title: 'Le Petit Déjeuner Deluxe',
    description: 'Bagels, mini muffins, yogurt, fruit, and spreads for morning events.',
  },
  {
    title: 'Le Luxe',
    description: 'Upgraded items like chocolate truffles, gourmet cheeses, artisan crackers, and berries, customizable by theme.',
  },
  {
    title: 'La Création',
    description: 'Tailored to dietary needs, color schemes, or event themes.',
  },
]

export default function CupsBoxesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [heroRef, heroVisible] = useInView()
  const [cupsRef, cupsVisible] = useInView()
  const [cupsImgRef, cupsImgVisible] = useInView()
  const [boxesRef, boxesVisible] = useInView()
  const [boxesImgRef, boxesImgVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}>
            Curated Bites
          </p>
          <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}>
            Cups, Boxes <em className="text-gold">&amp; More</em>
          </h1>
          <p className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
            Budget-friendly options that still give an elevated, luxurious look — perfect for any occasion.
          </p>
        </div>
      </section>

      {/* Cups Section */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={cupsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${cupsVisible ? 'visible' : ''}`}>
              Charcuterie Cups
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${cupsVisible ? 'visible' : ''}`}>
              Grab-and-go <em className="text-gold">elegance.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${cupsVisible ? 'visible' : ''}`}>
              Individual charcuterie cups — perfect for grab-and-go elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cups.map((cup, i) => (
              <div
                key={cup.title}
                className={`bg-cream p-8 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${cupsVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-xl md:text-2xl mb-3 text-charcoal">
                  {cup.title}
                </h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {cup.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cups Feature Image */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={cupsImgRef} className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className={`overflow-hidden fade-in-up ${cupsImgVisible ? 'visible' : ''}`}>
            <img
              src="/cups-boxes/cups.jpeg"
              alt="Beautifully arranged charcuterie cups"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Boxes Section */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={boxesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${boxesVisible ? 'visible' : ''}`}>
              Charcuterie Boxes
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${boxesVisible ? 'visible' : ''}`}>
              Shareable <em className="text-gold">indulgence.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${boxesVisible ? 'visible' : ''}`}>
              Curated for 1–6 people — the perfect shareable indulgence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {boxes.map((box, i) => (
              <div
                key={box.title}
                className={`bg-cream p-8 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${boxesVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-xl md:text-2xl mb-3 text-charcoal">
                  {box.title}
                </h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {box.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boxes Feature Image */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={boxesImgRef} className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className={`overflow-hidden fade-in-up ${boxesImgVisible ? 'visible' : ''}`}>
            <img
              src="/cups-boxes/boxes.jpeg"
              alt="Curated charcuterie boxes for sharing"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={ctaRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up ${ctaVisible ? 'visible' : ''}`}>
            Ready to <em className="text-gold">order?</em>
          </h2>
          <p className={`text-charcoal-light leading-relaxed font-light max-w-lg mx-auto mb-10 fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}>
            Whether it's cups for a corporate event or boxes for a celebration, we'd love to hear from you.
          </p>
          <a
            href="https://elevatedeventrentals.hbportal.co/public/gourmet-grazin"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 fade-in-up fade-in-up-delay-2 ${ctaVisible ? 'visible' : ''}`}
          >
            Inquire Now
          </a>
        </div>
      </section>
    </main>
  )
}
