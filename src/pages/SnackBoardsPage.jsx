import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../components/useInView'
import { useCart } from '../context/CartContext'
import shopifyClient from '../lib/shopify'

/* ── Sizing & pricing (shared by ALL boards) ── */
const sizes = [
  { key: 'small', label: 'Small (2-5 people)', price: 65, variantTitle: 'Small' },
  { key: 'medium', label: 'Medium (5-10 people)', price: 120, variantTitle: 'Medium' },
  { key: 'large', label: 'Large (10-15 people)', price: 175, variantTitle: 'Large' },
  { key: 'xlarge', label: 'X-Large (15-20+ people)', price: 210, variantTitle: 'X-Large' },
]

/* ── Classic boards ── */
const classics = [
  {
    number: '01',
    title: 'The Classic Board',
    description:
      'An elevated selection of artisan cheeses, premium cured meats, seasonal fruit, nuts, olives, and house-paired accompaniments — beautifully styled for effortless entertaining.',
  },
  {
    number: '02',
    title: 'The Sweet-Salty Board',
    description:
      'The perfect balance of indulgence — artisan cheeses and charcuterie paired with chocolates, macarons, and curated sweet accents.',
  },
  {
    number: '03',
    title: 'The Brunch Board',
    description:
      'A charming morning-inspired spread featuring mini pastries, creamy cheeses, fresh berries, honey accents, and delicate brunch pairings.',
  },
  {
    number: '04',
    title: 'The Veggie Board',
    description:
      'A thoughtfully crafted plant-based selection featuring dairy-free cheeses, fresh produce, marinated vegetables, nuts, fruit, and elevated vegan accompaniments.',
  },
  {
    number: '05',
    title: 'The Fruit Board',
    description:
      'A stunning display of seasonal fruit, berries, and citrus — artfully arranged for a refreshing, naturally sweet addition to any celebration.',
  },
]

/* ── Special occasion boards ── */
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
      "Celebrate with style — featuring cheese-cut numbers for the guest of honor's milestone, surrounded by their favorite flavors.",
    image: '/boards/birthday.png',
    personalization: true,
    personalizationPlaceholder: 'e.g. 30',
  },
  {
    title: 'Easter Board',
    description:
      'A spring-inspired spread with bunny-shaped arrangements, pastel accents, and seasonal flavors perfect for Easter brunch.',
    image: '/boards/easter/easter1.jpg',
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
    image: '/boards/easter.png',
  },
  {
    title: 'Custom Message Board',
    description:
      'A classic board personalized with a custom message crafted in cheese or cookie letters — perfect for any celebration.',
    image: '/boards/custom-message.jpeg',
    personalization: true,
    personalizationPlaceholder: 'e.g. Happy Birthday!',
  },
]

/* ── Helper: slugify a title for use in IDs ── */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/* ── Image gallery for modal ── */
function ImageGallery({ images }) {
  const [current, setCurrent] = useState(0)
  if (!images || images.length === 0) return null

  return (
    <div className="relative mb-6">
      <img
        src={images[current].src}
        alt=""
        className="w-full h-56 md:h-72 object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center text-charcoal hover:bg-gold hover:text-cream transition-colors"
          >
            &#8249;
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center text-charcoal hover:bg-gold hover:text-cream transition-colors"
          >
            &#8250;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? 'bg-gold' : 'bg-cream/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── Board configuration modal (shared by classics & specials) ── */
function BoardModal({ board, onClose, shopifyProducts }) {
  const { addToCart, addLocalItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [personalizationText, setPersonalizationText] = useState('')
  const [adding, setAdding] = useState(false)

  const chosen = sizes[selectedSize]

  // Find matching Shopify product by title
  const shopifyProduct = shopifyProducts.find(
    (p) => p.title.toLowerCase() === board.title.toLowerCase()
  )

  const shopifyImages = shopifyProduct?.images || []

  async function handleAddToCart() {
    if (adding) return
    setAdding(true)

    let added = false

    if (shopifyProduct) {
      const variants = shopifyProduct.variants
      let variant

      if (variants.length === 1) {
        variant = variants[0]
      } else {
        variant = variants.find((v) => v.title === chosen.variantTitle)
      }

      if (variant) {
        const customAttributes = []
        if (board.personalization && personalizationText) {
          customAttributes.push({ key: 'Personalization', value: personalizationText })
        }
        await addToCart(variant.id, quantity, customAttributes)
        added = true
      }
    }

    if (!added) {
      addLocalItem({
        id: `board-${slugify(board.title)}-${chosen.key}`,
        title: board.title,
        size: chosen.label,
        price: chosen.price,
        quantity,
        customization: board.personalization ? personalizationText || null : null,
      })
    }

    setAdding(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-cream border border-gold/20 w-full max-w-lg p-8 md:p-10 shadow-xl animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal-light hover:text-gold transition-colors text-2xl leading-none z-10"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Product images from Shopify */}
        <ImageGallery images={shopifyImages} />

        {/* Title & description */}
        <h3 className="font-serif text-2xl md:text-3xl mb-2">{board.title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-8">
          {board.description}
        </p>

        {/* Size selector */}
        <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
          Select a Size
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {sizes.map((s, idx) => (
            <button
              key={s.key}
              onClick={() => setSelectedSize(idx)}
              className={`border py-3 px-4 text-left transition-all duration-200 ${
                selectedSize === idx
                  ? 'border-gold bg-gold/10'
                  : 'border-gold/20 hover:border-gold/40'
              }`}
            >
              <span className="block font-serif text-sm">{s.key === 'xlarge' ? 'X-Large' : s.key.charAt(0).toUpperCase() + s.key.slice(1)}</span>
              <span className="block text-charcoal-light text-xs mt-0.5">
                {s.label.match(/\(.*\)/)?.[0]}
              </span>
              <span className="block text-gold font-serif text-lg mt-1">${s.price}</span>
            </button>
          ))}
        </div>

        {/* Personalization (conditional) */}
        {board.personalization && (
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
              Personalization
            </p>
            <input
              type="text"
              value={personalizationText}
              onChange={(e) => setPersonalizationText(e.target.value)}
              placeholder={board.personalizationPlaceholder || ''}
              className="w-full border border-gold/20 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:border-gold focus:outline-none transition-colors"
            />
          </div>
        )}

        {/* Quantity selector */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
            Quantity
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 border border-gold/20 flex items-center justify-center text-lg hover:border-gold transition-colors"
            >
              &minus;
            </button>
            <span className="font-serif text-xl w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 border border-gold/20 flex items-center justify-center text-lg hover:border-gold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full bg-charcoal text-cream px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50"
        >
          {adding ? 'Adding...' : `Add to Cart \u2014 $${chosen.price * quantity}`}
        </button>
      </div>
    </div>
  )
}

/* ── Main page component ── */
export default function SnackBoardsPage() {
  const [heroRef, heroVisible] = useInView()
  const [classicsRef, classicsVisible] = useInView()
  const [specialRef, specialVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  const [activeBoard, setActiveBoard] = useState(null)
  const [shopifyProducts, setShopifyProducts] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    shopifyClient.product.fetchAll().then(setShopifyProducts)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeBoard) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeBoard])

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
            className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-6 fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            From timeless classics to themed celebrations, each board is handcrafted
            with premium ingredients and artful precision.
          </p>
          <p
            className={`text-gold font-serif text-base md:text-lg fade-in-up fade-in-up-delay-3 ${heroVisible ? 'visible' : ''}`}
          >
            All boards are made fresh to order. Please allow 24–48 hours for preparation.
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
                onClick={() => setActiveBoard(board)}
                className={`group bg-cream p-8 border border-gold/15 hover:border-gold/40 transition-all duration-300 cursor-pointer fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${classicsVisible ? 'visible' : ''}`}
              >
                <span className="font-serif text-3xl text-gold/30 group-hover:text-gold transition-colors duration-300">
                  {board.number}
                </span>
                <h3 className="font-serif text-xl md:text-2xl mt-4 mb-3 group-hover:text-gold transition-colors duration-300">
                  {board.title}
                </h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">
                  {board.description}
                </p>
                <p className="text-gold font-serif text-sm">starting at $65</p>
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
                onClick={() => setActiveBoard(board)}
                className={`group cursor-pointer fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${specialVisible ? 'visible' : ''}`}
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
                <p className="text-charcoal-light font-light text-sm leading-relaxed mb-2">
                  {board.description}
                </p>
                <p className="text-gold font-serif text-sm">starting at $65</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charcuterie Classes CTA */}
      <section className="py-16 lg:py-20 bg-taupe-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
            Learn the Art
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] mb-4">
            Want to build your own board?
          </h2>
          <p className="text-charcoal-light leading-relaxed font-light max-w-lg mx-auto mb-8">
            Join one of our hands-on charcuterie classes and learn to create stunning
            boards for any occasion.
          </p>
          <Link
            to="/charcuterie-classes"
            className="inline-block bg-charcoal text-cream px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
          >
            Book a Class
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={ctaRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${ctaVisible ? 'visible' : ''}`}
          >
            Ready to Order?
          </p>
          <h2
            className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}
          >
            Your perfect board
            <br />
            is just a <em className="text-gold">click away.</em>
          </h2>
          <p
            className={`text-charcoal-light leading-relaxed font-light max-w-lg mx-auto fade-in-up fade-in-up-delay-2 ${ctaVisible ? 'visible' : ''}`}
          >
            Browse our collection above, choose your size, and add to cart — it's that
            simple.
          </p>
        </div>
      </section>

      {/* Board configuration modal */}
      {activeBoard && (
        <BoardModal
          board={activeBoard}
          onClose={() => setActiveBoard(null)}
          shopifyProducts={shopifyProducts}
        />
      )}
    </main>
  )
}
