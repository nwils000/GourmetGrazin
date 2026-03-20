import { useEffect, useState } from 'react'
import { useInView } from '../components/useInView'
import { useCart } from '../context/CartContext'

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

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function CupCard({ cup, index, isVisible }) {
  const { addLocalItem } = useCart()
  const [qty, setQty] = useState(15)

  const handleAdd = () => {
    addLocalItem({
      id: `cup-${slugify(cup.title)}`,
      title: `Charcuterie Cup - ${cup.title}`,
      price: 8,
      quantity: qty,
    })
  }

  return (
    <div
      className={`bg-cream p-8 fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}
    >
      <h3 className="font-serif text-xl md:text-2xl mb-3 text-charcoal">
        {cup.title}
      </h3>
      <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">
        {cup.description}
      </p>
      <div className="flex items-center gap-3 text-sm mb-4">
        <span className="font-serif text-lg text-gold">$8/cup</span>
        <span className="text-charcoal-light font-light">· 15 minimum</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
        <div className="flex items-center border border-taupe/30">
          <button
            onClick={() => setQty((q) => Math.max(15, q - 1))}
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            &minus;
          </button>
          <span className="px-4 py-2 font-light text-sm min-w-[3rem] text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
      >
        Add to Cart
      </button>
    </div>
  )
}

function BoxCard({ box, index, isVisible }) {
  const { addLocalItem } = useCart()
  const [qty, setQty] = useState(15)

  const handleAdd = () => {
    addLocalItem({
      id: `box-${slugify(box.title)}`,
      title: `Charcuterie Box - ${box.title}`,
      price: 10,
      quantity: qty,
    })
  }

  return (
    <div
      className={`bg-cream p-8 fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}
    >
      <h3 className="font-serif text-xl md:text-2xl mb-3 text-charcoal">
        {box.title}
      </h3>
      <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">
        {box.description}
      </p>
      <div className="flex items-center gap-3 text-sm mb-4">
        <span className="font-serif text-lg text-gold">$10/box</span>
        <span className="text-charcoal-light font-light">· 15 minimum</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
        <div className="flex items-center border border-taupe/30">
          <button
            onClick={() => setQty((q) => Math.max(15, q - 1))}
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            &minus;
          </button>
          <span className="px-4 py-2 font-light text-sm min-w-[3rem] text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default function CupsBoxesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [heroRef, heroVisible] = useInView()
  const [cupsRef, cupsVisible] = useInView()
  const [cupsImgRef, cupsImgVisible] = useInView()
  const [boxesRef, boxesVisible] = useInView()
  const [boxesImgRef, boxesImgVisible] = useInView()
  const [noteRef, noteVisible] = useInView()

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
              <CupCard key={cup.title} cup={cup} index={i} isVisible={cupsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Cups Feature Image */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={cupsImgRef} className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className={`overflow-hidden fade-in-up ${cupsImgVisible ? 'visible' : ''}`}>
            <img
              src="/cups-boxes/cups.png"
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
              <BoxCard key={box.title} box={box} index={i} isVisible={boxesVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Boxes Feature Image */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={boxesImgRef} className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className={`overflow-hidden fade-in-up ${boxesImgVisible ? 'visible' : ''}`}>
            <img
              src="/cups-boxes/boxes.png"
              alt="Curated charcuterie boxes for sharing"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={noteRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-charcoal-light leading-relaxed font-light max-w-lg mx-auto fade-in-up ${noteVisible ? 'visible' : ''}`}>
            Items added to your cart will be submitted through our booking system.
          </p>
        </div>
      </section>
    </main>
  )
}
