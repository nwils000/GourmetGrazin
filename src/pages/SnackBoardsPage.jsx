import { useEffect } from 'react'
import { useInView } from '../components/useInView'

const classics = [
  {
    number: '01',
    title: 'Le Classique Gourmet',
    description:
      'An elevated selection of artisan cheeses, premium cured meats, seasonal fruit, nuts, olives, and house-paired accompaniments — beautifully styled for effortless entertaining.',
  },
  {
    number: '02',
    title: 'Le Sucré-Salé',
    description:
      'The perfect balance of indulgence — artisan cheeses and charcuterie paired with chocolates, macarons, and curated sweet accents.',
  },
  {
    number: '03',
    title: 'Le Brunch Élégant',
    description:
      'A charming morning-inspired spread featuring mini pastries, creamy cheeses, fresh berries, honey accents, and delicate brunch pairings.',
  },
  {
    number: '04',
    title: 'Le Jardin Végétal',
    description:
      'A thoughtfully crafted plant-based selection featuring dairy-free cheeses, fresh produce, marinated vegetables, nuts, fruit, and elevated vegan accompaniments.',
  },
  {
    number: '05',
    title: 'Le Panier Fruité',
    description:
      'A stunning display of seasonal fruit, berries, and citrus — artfully arranged for a refreshing, naturally sweet addition to any celebration.',
  },
  {
    number: '06',
    title: 'Le Festin Végane',
    description:
      'A crisp and colorful display of fresh, seasonal vegetables paired with house-made dips, whipped spreads, and artisan breads — vibrant, refreshing, and beautifully arranged.',
  },
]

const specialOccasionBoards = [
  {
    title: 'Game Day Board',
    description:
      'Football-shaped salami and all the fixings — a show-stopping spread for tailgates, Super Bowl parties, and watch parties.',
    image: '/boards/gameday.png',
  },
  {
    title: 'Birthday & Anniversary Board',
    description:
      'Celebrate with style — featuring cheese-cut numbers for the guest of honor\'s milestone, surrounded by their favorite flavors.',
    image: '/boards/birthday.jpeg',
  },
  {
    title: 'Easter Board',
    description:
      'A spring-inspired spread with bunny-shaped arrangements, pastel accents, and seasonal flavors perfect for Easter brunch.',
    image: '/boards/easter.jpeg',
  },
  {
    title: 'Thanksgiving Board',
    description:
      'A turkey-shaped charcuterie masterpiece featuring autumn flavors, warm spices, and seasonal accompaniments.',
    image: '/boards/thanksgiving.png',
  },
  {
    title: 'Christmas Board',
    description:
      'A festive Christmas tree arrangement with cranberries, rosemary, artisan cheeses, and holiday-inspired flavors.',
    image: '/boards/christmas.png',
  },
  {
    title: 'Halloween Board',
    description:
      'Spooky, creative, and delicious — themed boards with playful Halloween-inspired designs and seasonal flavors.',
    image: '/boards/halloween.jpg',
  },
  {
    title: 'Custom Message Board',
    description:
      'A classic board personalized with a custom message crafted in cheese or cookie letters — perfect for any celebration.',
    image: '/boards/custom-message.jpeg',
  },
]

export default function SnackBoardsPage() {
  const [heroRef, heroVisible] = useInView()
  const [classicsRef, classicsVisible] = useInView()
  const [specialRef, specialVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-cream pt-24 pb-16 lg:pb-24">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}
          >
            Snack Boards
          </p>
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
          >
            Boards for every
            <br />
            <em className="text-gold">occasion.</em>
          </h1>
          <p
            className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            From timeless classics to themed celebrations, each board is handcrafted
            with premium ingredients and artful precision.
          </p>
        </div>
      </section>

      {/* Classics Section */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={classicsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 max-w-2xl">
            <p
              className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${classicsVisible ? 'visible' : ''}`}
            >
              Our Collection
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${classicsVisible ? 'visible' : ''}`}
            >
              The <em className="text-gold">Classics.</em>
            </h2>
            <p
              className={`text-charcoal-light leading-relaxed font-light max-w-md fade-in-up fade-in-up-delay-2 ${classicsVisible ? 'visible' : ''}`}
            >
              Signature boards crafted with care — each one a curated experience
              designed to delight your guests.
            </p>
          </div>

          {/* Classics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {classics.map((board, i) => (
              <div
                key={board.number}
                className={`group bg-cream p-8 border border-gold/15 hover:border-gold/40 transition-all duration-300 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${classicsVisible ? 'visible' : ''}`}
              >
                <span className="font-serif text-3xl text-gold/30 group-hover:text-gold transition-colors duration-300">
                  {board.number}
                </span>
                <h3 className="font-serif text-xl md:text-2xl mt-4 mb-3 group-hover:text-gold transition-colors duration-300">
                  {board.title}
                </h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {board.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Occasion Boards Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={specialRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 max-w-2xl">
            <p
              className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${specialVisible ? 'visible' : ''}`}
            >
              Celebrations
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${specialVisible ? 'visible' : ''}`}
            >
              Special Occasion{' '}
              <em className="text-gold">Boards.</em>
            </h2>
            <p
              className={`text-charcoal-light leading-relaxed font-light max-w-md fade-in-up fade-in-up-delay-2 ${specialVisible ? 'visible' : ''}`}
            >
              Themed boards designed to make your celebrations even more memorable —
              each one crafted with seasonal flair and creative detail.
            </p>
          </div>

          {/* Special Occasion Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {specialOccasionBoards.map((board, i) => (
              <div
                key={board.title}
                className={`group fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${specialVisible ? 'visible' : ''}`}
              >
                <div className="overflow-hidden mb-4">
                  <img
                    src={board.image}
                    alt={board.title}
                    className="w-full h-56 md:h-64 object-cover img-hover"
                  />
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-gold transition-colors duration-300">
                  {board.title}
                </h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {board.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={ctaRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${ctaVisible ? 'visible' : ''}`}
          >
            Ready to Order?
          </p>
          <h2
            className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}
          >
            Let's craft your
            <br />
            perfect <em className="text-gold">board.</em>
          </h2>
          <p
            className={`text-charcoal-light leading-relaxed font-light max-w-lg mx-auto mb-10 fade-in-up fade-in-up-delay-2 ${ctaVisible ? 'visible' : ''}`}
          >
            Whether it's a classic spread or a custom celebration board, we'd love to
            create something special for your next event.
          </p>
          <a
            href="https://elevatedeventrentals.hbportal.co/public/gourmet-grazin"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 fade-in-up fade-in-up-delay-3 ${ctaVisible ? 'visible' : ''}`}
          >
            Inquire Now
          </a>
        </div>
      </section>
    </main>
  )
}
