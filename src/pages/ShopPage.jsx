import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../components/useInView'
import { useCart } from '../context/CartContext'
import shopifyClient from '../lib/shopify'
import useSEO from '../hooks/useSEO'
import ImagePlaceholder from '../components/ImagePlaceholder'

/* ════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════ */

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4" aria-hidden="true">
      <div className="h-px w-16 bg-gold/30" />
      <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
      <div className="h-px w-16 bg-gold/30" />
    </div>
  )
}

function categorizeProducts(products) {
  const boards = []
  const cups = []
  const boxes = []
  const other = []

  products.forEach(p => {
    const t = p.title.toLowerCase()
    if (t.includes('board')) boards.push(p)
    else if (t.includes('cup')) cups.push(p)
    else if (t.includes('box')) boxes.push(p)
    else other.push(p)
  })

  return { boards, cups, boxes, other }
}

function needsPersonalization(product) {
  const t = product.title.toLowerCase()
  return t.includes('custom') || t.includes('birthday') || t.includes('anniversary')
}

function hasSizeVariants(product) {
  return product.variants.length > 1 && product.variants[0].title !== 'Default Title'
}

function getStartingPrice(product) {
  const prices = product.variants.map(v => parseFloat(v.price?.amount || 0))
  return Math.min(...prices) || 0
}

/* ════════════════════════════════════════════
   COMING SOON PLACEHOLDER
   ════════════════════════════════════════════ */

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px w-16 bg-gold/40" />
        <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
        <div className="h-px w-16 bg-gold/40" />
      </div>
      <p className="font-serif text-2xl text-charcoal/40 italic mb-2">Coming Soon</p>
      <p className="text-charcoal-light/40 text-sm font-light">We're curating this collection. Check back soon!</p>
      <div className="flex items-center gap-2 mt-4">
        <div className="h-px w-16 bg-gold/40" />
        <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
        <div className="h-px w-16 bg-gold/40" />
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   BOARD MODAL (size + qty + personalization)
   ════════════════════════════════════════════ */

function BoardModal({ product, onClose }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [personalizationText, setPersonalizationText] = useState('')
  const [adding, setAdding] = useState(false)
  const [currentImg, setCurrentImg] = useState(0)

  const variants = product.variants
  const chosen = variants[selectedSize]
  const chosenPrice = parseFloat(chosen.price?.amount || 0)
  const images = product.images || []
  const showPersonalization = needsPersonalization(product)

  async function handleAddToCart() {
    if (adding) return
    setAdding(true)
    const customAttributes = []
    if (showPersonalization && personalizationText) {
      customAttributes.push({ key: 'Personalization', value: personalizationText })
    }
    await addToCart(chosen.id, quantity, customAttributes)
    setAdding(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={`Configure ${product.title}`} onClick={onClose}>
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />
      <div className="relative bg-cream border border-gold/20 w-full max-w-lg p-8 md:p-10 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-charcoal-light hover:text-gold transition-colors text-2xl leading-none z-10" aria-label="Close">&times;</button>

        {images.length > 0 && (
          <div className="relative mb-6">
            <img src={images[currentImg].src} alt="" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
            {images.length > 1 && (
              <>
                <button onClick={() => setCurrentImg((c) => (c - 1 + images.length) % images.length)} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center text-charcoal hover:bg-gold hover:text-cream transition-colors">&#8249;</button>
                <button onClick={() => setCurrentImg((c) => (c + 1) % images.length)} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center text-charcoal hover:bg-gold hover:text-cream transition-colors">&#8250;</button>
              </>
            )}
          </div>
        )}

        <h3 className="font-serif text-2xl md:text-3xl mb-2">{product.title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-8">{product.description}</p>

        {/* Size selector (only if multiple variants) */}
        {variants.length > 1 && variants[0].title !== 'Default Title' ? (
          <>
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">Select a Size</p>
            <div className="grid grid-cols-2 gap-3 mb-8" role="radiogroup" aria-label="Board size">
              {variants.map((v, idx) => (
                <button key={v.id} onClick={() => setSelectedSize(idx)} role="radio" aria-checked={selectedSize === idx}
                  className={`border py-3 px-4 text-left transition-all duration-200 ${selectedSize === idx ? 'border-gold bg-gold/10' : 'border-gold/20 hover:border-gold/40'}`}>
                  <span className="block font-serif text-sm">{v.title}</span>
                  <span className="block text-gold font-serif text-lg mt-1">${parseFloat(v.price?.amount || 0)}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gold font-serif text-xl mb-8">${chosenPrice}</p>
        )}

        {showPersonalization && (
          <div className="mb-8">
            <label htmlFor="board-personalization" className="text-xs tracking-[0.2em] uppercase text-gold mb-3 block">Personalization</label>
            <input id="board-personalization" type="text" value={personalizationText} onChange={(e) => setPersonalizationText(e.target.value)}
              placeholder="e.g. Happy Birthday!" className="w-full border border-gold/20 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:border-gold focus:outline-none transition-colors" />
          </div>
        )}

        {/* Quantity */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">Quantity</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-10 h-10 border border-gold/20 flex items-center justify-center text-lg hover:border-gold transition-colors">&minus;</button>
            <span className="font-serif text-xl w-8 text-center" aria-live="polite">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity" className="w-10 h-10 border border-gold/20 flex items-center justify-center text-lg hover:border-gold transition-colors">+</button>
          </div>
        </div>

        <button onClick={handleAddToCart} disabled={adding}
          className="w-full bg-charcoal text-cream px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50">
          {adding ? 'Adding...' : `Add to Cart — $${chosenPrice * quantity}`}
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   BOARD CARD (click to open modal)
   ════════════════════════════════════════════ */

function BoardCard({ product, onSelect, index, isVisible }) {
  const imgSrc = product.images?.[0]?.src || null
  const startPrice = getStartingPrice(product)

  return (
    <article onClick={() => onSelect(product)}
      className={`group bg-cream border border-gold/15 hover:border-gold/40 transition-all duration-300 cursor-pointer overflow-hidden fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}>
      <figure className="overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={`${product.title} - handcrafted charcuterie board`} className="w-full h-48 object-cover img-hover" loading="lazy" />
        ) : (
          <ImagePlaceholder />
        )}
      </figure>
      <div className="p-6">
        <h3 className="font-serif text-lg md:text-xl mb-2 group-hover:text-gold transition-colors duration-300">{product.title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-3 line-clamp-3">{product.description}</p>
        <p className="text-gold font-serif text-sm">
          {hasSizeVariants(product) ? `starting at $${startPrice}` : `$${startPrice}`}
        </p>
      </div>
    </article>
  )
}

/* ════════════════════════════════════════════
   ITEM CARD (inline qty — cups, boxes, etc.)
   ════════════════════════════════════════════ */

function ItemCard({ product, index, isVisible, minQty = 1, unitLabel = 'each' }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(minQty)
  const [customText, setCustomText] = useState('')
  const [adding, setAdding] = useState(false)

  const imgSrc = product.images?.[0]?.src || null
  const variant = product.variants[0]
  const unitPrice = parseFloat(variant.price?.amount || 0)
  const showPersonalization = needsPersonalization(product)

  const handleAdd = async () => {
    if (adding) return
    setAdding(true)
    const customAttributes = []
    if (showPersonalization && customText) {
      customAttributes.push({ key: 'Custom Message', value: customText })
    }
    await addToCart(variant.id, qty, customAttributes)
    setAdding(false)
  }

  return (
    <article className={`bg-cream overflow-hidden fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}>
      <figure className="overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={product.title} className="w-full h-48 object-cover" loading="lazy" />
        ) : (
          <ImagePlaceholder />
        )}
      </figure>
      <div className="p-6">
        <h3 className="font-serif text-lg md:text-xl mb-2 text-charcoal">{product.title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">{product.description}</p>

        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="font-serif text-lg text-gold">${unitPrice}/{unitLabel}</span>
          {minQty > 1 && <span className="text-charcoal-light font-light">&middot; {minQty} minimum</span>}
        </div>

        {showPersonalization && (
          <div className="mb-4">
            <label htmlFor={`custom-${index}`} className="block text-xs tracking-[0.15em] uppercase text-charcoal-light mb-2">Custom Message</label>
            <input id={`custom-${index}`} type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. Happy Birthday!" className="w-full border border-taupe/30 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold transition-colors" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
          <div className="flex items-center border border-taupe/30">
            <button onClick={() => setQty((q) => Math.max(minQty, q - 1))} aria-label="Decrease quantity" className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors">&minus;</button>
            <span className="px-4 py-2 font-light text-sm min-w-[3rem] text-center" aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors">+</button>
          </div>
        </div>

        <button onClick={handleAdd} disabled={adding}
          className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50">
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}

/* ════════════════════════════════════════════
   MAIN SHOP PAGE
   ════════════════════════════════════════════ */

export default function ShopPage() {
  const [shopifyProducts, setShopifyProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeBoard, setActiveBoard] = useState(null)

  const [heroRef, heroVisible] = useInView()
  const [boardsRef, boardsVisible] = useInView()
  const [cupsRef, cupsVisible] = useInView()
  const [boxesRef, boxesVisible] = useInView()
  const [persRef, persVisible] = useInView()

  useSEO({
    title: 'Shop Charcuterie Boards Online',
    description: 'Order handcrafted charcuterie boards, cups, boxes & personalized favors online. Fresh artisan ingredients, delivered across Kentucky. Shop now!',
    path: '/shop',
    ogType: 'product',
  })

  useEffect(() => {
    shopifyClient.product.fetchAll().then((products) => {
      setShopifyProducts(products)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (activeBoard) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeBoard])

  const { boards, cups, boxes } = categorizeProducts(shopifyProducts)

  return (
    <article>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-cream pt-24 pb-16 lg:pb-20" aria-label="Shop overview">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}>Shop</p>
          <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}>
            Handcrafted <em className="text-gold">to order.</em>
          </h1>
          <p className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10 fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
            Premium charcuterie boards, cups, boxes, and personalized favors — all crafted with artisan ingredients. Select your items below and checkout through our shop.
          </p>
          <nav className={`flex flex-wrap justify-center gap-3 fade-in-up fade-in-up-delay-3 ${heroVisible ? 'visible' : ''}`} aria-label="Shop sections">
            <a href="#boards" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Boards</a>
            <a href="#cups" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Cups</a>
            <a href="#boxes" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Boxes</a>
            <a href="#personalizations" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Personalizations</a>
          </nav>
        </div>
      </section>

      <SectionDivider />

      {/* ── BOARDS ── */}
      <section id="boards" className="py-20 lg:py-28 bg-taupe-light scroll-mt-24" aria-label="Charcuterie boards">
        <div ref={boardsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${boardsVisible ? 'visible' : ''}`}>Our Collection</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${boardsVisible ? 'visible' : ''}`}>Charcuterie <em className="text-gold">Boards.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${boardsVisible ? 'visible' : ''}`}>
              Signature boards crafted with care — select your size and quantity, then add to cart.
            </p>
          </header>
          {loading ? (
            <div className="flex items-center justify-center py-12" role="status">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : boards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {boards.map((product, i) => (
                <BoardCard key={product.id} product={product} onSelect={setActiveBoard} index={i} isVisible={boardsVisible} />
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </section>

      <SectionDivider />

      {/* ── CUPS ── */}
      <section id="cups" className="py-20 lg:py-28 bg-cream scroll-mt-24" aria-label="Charcuterie cups">
        <div ref={cupsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${cupsVisible ? 'visible' : ''}`}>Charcuterie Cups</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${cupsVisible ? 'visible' : ''}`}>Grab-and-go <em className="text-gold">elegance.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${cupsVisible ? 'visible' : ''}`}>
              Individual charcuterie cups — perfect for events of any size. Minimum order of 15.
            </p>
          </header>
          {loading ? (
            <div className="flex items-center justify-center py-12" role="status">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : cups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {cups.map((product, i) => (
                <ItemCard key={product.id} product={product} index={i} isVisible={cupsVisible} minQty={15} unitLabel="cup" />
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </section>

      <SectionDivider />

      {/* ── BOXES ── */}
      <section id="boxes" className="py-20 lg:py-28 bg-taupe-light scroll-mt-24" aria-label="Charcuterie boxes">
        <div ref={boxesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${boxesVisible ? 'visible' : ''}`}>Charcuterie Boxes</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${boxesVisible ? 'visible' : ''}`}>Shareable <em className="text-gold">indulgence.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${boxesVisible ? 'visible' : ''}`}>
              Curated charcuterie boxes — perfect for sharing. Minimum order of 6.
            </p>
          </header>
          {loading ? (
            <div className="flex items-center justify-center py-12" role="status">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : boxes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {boxes.map((product, i) => (
                <ItemCard key={product.id} product={product} index={i} isVisible={boxesVisible} minQty={6} unitLabel="box" />
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </section>

      <SectionDivider />

      {/* ── PERSONALIZATIONS ── */}
      <section id="personalizations" className="py-20 lg:py-28 bg-cream scroll-mt-24" aria-label="Personalizations">
        <div ref={persRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${persVisible ? 'visible' : ''}`}>The Details Matter</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${persVisible ? 'visible' : ''}`}><em className="text-gold">Personalizations.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${persVisible ? 'visible' : ''}`}>
              Add a meaningful, personal touch to your event with custom details your guests will treasure.
            </p>
          </header>
          <ComingSoon />
        </div>
      </section>

      <SectionDivider />

      {/* ── CLASSES CTA ── */}
      <section className="py-16 lg:py-20 bg-taupe-light" aria-label="Charcuterie classes">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Learn the Art</p>
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] mb-4">Want to build your own board?</h2>
          <p className="text-charcoal-light leading-relaxed font-light max-w-lg mx-auto mb-8">
            Join one of our hands-on charcuterie classes and learn to create stunning boards for any occasion.
          </p>
          <Link to="/charcuterie-classes" className="inline-block bg-charcoal text-cream px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300">
            Book a Class
          </Link>
        </div>
      </section>

      {/* Board configuration modal */}
      {activeBoard && (
        <BoardModal product={activeBoard} onClose={() => setActiveBoard(null)} />
      )}
    </article>
  )
}
