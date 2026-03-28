import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../components/useInView'
import { useCart } from '../context/CartContext'
import shopifyClient from '../lib/shopify'
import useSEO from '../hooks/useSEO'
import ImagePlaceholder from '../components/ImagePlaceholder'

/* ════════════════════════════════════════════
   PRODUCT DATA
   ════════════════════════════════════════════ */

const boardSizes = [
  { key: 'small', label: 'Small (2-5 people)', price: 65, variantTitle: 'Small' },
  { key: 'medium', label: 'Medium (5-10 people)', price: 120, variantTitle: 'Medium' },
  { key: 'large', label: 'Large (10-15 people)', price: 175, variantTitle: 'Large' },
  { key: 'xlarge', label: 'X-Large (15-20+ people)', price: 210, variantTitle: 'X-Large' },
]

const classicBoards = [
  { number: '01', title: 'The Classic Board', description: 'An elevated selection of artisan cheeses, premium cured meats, seasonal fruit, nuts, olives, and house-paired accompaniments — beautifully styled for effortless entertaining.' },
  { number: '02', title: 'The Sweet-Salty Board', description: 'The perfect balance of indulgence — artisan cheeses and charcuterie paired with chocolates, macarons, and curated sweet accents.' },
  { number: '03', title: 'The Brunch Board', description: 'A charming morning-inspired spread featuring mini pastries, creamy cheeses, fresh berries, honey accents, and delicate brunch pairings.' },
  { number: '04', title: 'The Veggie Board', description: 'A thoughtfully crafted plant-based selection featuring dairy-free cheeses, fresh produce, marinated vegetables, nuts, fruit, and elevated vegan accompaniments.' },
  { number: '05', title: 'The Fruit Board', description: 'A stunning display of seasonal fruit, berries, and citrus — artfully arranged for a refreshing, naturally sweet addition to any celebration.' },
]

const specialBoards = [
  { title: 'Game Day Board', description: 'Football-shaped salami and all the fixings — a show-stopping spread for tailgates, Super Bowl parties, and watch parties.', image: '/boards/gameday.png' },
  { title: 'Birthday & Anniversary Board', description: "Celebrate with style — featuring cheese-cut numbers for the guest of honor's milestone, surrounded by their favorite flavors.", image: '/boards/birthday.png', personalization: true, personalizationPlaceholder: 'e.g. 30' },
  { title: 'Easter Board', description: 'A spring-inspired spread with bunny-shaped arrangements, pastel accents, and seasonal flavors perfect for Easter brunch.', image: '/boards/easter/easter1.jpg' },
  { title: 'Thanksgiving Board', description: 'A turkey-shaped charcuterie masterpiece featuring autumn flavors, warm spices, and seasonal accompaniments.', image: '/boards/thanksgiving.png' },
  { title: 'Christmas Board', description: 'A festive Christmas tree arrangement with cranberries, rosemary, artisan cheeses, and holiday-inspired flavors.', image: '/boards/christmas.png' },
  { title: 'Halloween Board', description: 'Spooky, creative, and delicious — themed boards with playful Halloween-inspired designs and seasonal flavors.', image: '/boards/easter.png' },
  { title: 'Custom Message Board', description: 'A classic board personalized with a custom message crafted in cheese or cookie letters — perfect for any celebration.', image: '/boards/custom-message.jpeg', personalization: true, personalizationPlaceholder: 'e.g. Happy Birthday!' },
]

const cups = [
  { title: 'The Classic Cup', description: 'A mix of cheddar cheese, pepperoni, salami, crostini crackers, chocolate-covered pretzels, and fresh fruit.' },
  { title: 'The Sweet Tooth Cup', description: 'Mini cookies, brownie bites, Rice Krispy treats, chocolate-covered strawberries, and berries.' },
  { title: 'Yogurt Cups', description: 'Yogurt, granola, berries, and a drizzle of honey.' },
  { title: 'Custom/Seasonal Cup', description: 'Themed flavors or seasonal ingredients tailored to your event.' },
]

const boxes = [
  { title: 'The Classic Box', description: 'A balanced selection of sweet and savory premium items. Contains cured salami, pepperoni, brie, manchego, berries, and chocolate covered pretzels with rosemary accents.' },
  { title: 'The Sweet Tooth Box', description: 'Loaded with cookies, brownies, chocolate-covered treats, and fruit.' },
  { title: 'The Brunch Box', description: 'Bagels, mini muffins, yogurt, fruit, and spreads for morning events.' },
  { title: 'Custom Message Charcuterie Box', description: 'The Classic Box with a custom message of your choice! A balance of sweet and savory with cured meats, brie, manchego, berries, and chocolate covered pretzels.', personalization: true, personalizationPlaceholder: 'e.g. Happy Birthday!' },
]

/* ════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════ */

function getProductImage(shopifyProduct) {
  return shopifyProduct?.images?.[0]?.src || null
}

function getStartingPrice(shopifyProduct, fallback) {
  if (!shopifyProduct?.variants?.length) return fallback
  const prices = shopifyProduct.variants.map(v => parseFloat(v.price?.amount || 0))
  return Math.min(...prices) || fallback
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

/* ════════════════════════════════════════════
   BOARD MODAL (size + qty + personalization)
   ════════════════════════════════════════════ */

function BoardModal({ board, onClose, shopifyProducts }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [personalizationText, setPersonalizationText] = useState('')
  const [adding, setAdding] = useState(false)

  const chosen = boardSizes[selectedSize]
  const shopifyProduct = shopifyProducts.find(
    (p) => p.title.toLowerCase() === board.title.toLowerCase()
  )
  const shopifyImages = shopifyProduct?.images || []
  const [currentImg, setCurrentImg] = useState(0)

  function getVariantPrice(sizeObj) {
    if (!shopifyProduct?.variants) return sizeObj.price
    const variant = shopifyProduct.variants.find(v => v.title === sizeObj.variantTitle)
    return variant ? parseFloat(variant.price?.amount || sizeObj.price) : sizeObj.price
  }

  const chosenPrice = getVariantPrice(chosen)

  function getSelectedVariant() {
    if (!shopifyProduct?.variants) return null
    const variants = shopifyProduct.variants
    if (variants.length === 1) return variants[0]
    return variants.find((v) => v.title === chosen.variantTitle) || null
  }

  const selectedVariant = getSelectedVariant()

  async function handleAddToCart() {
    if (adding || !selectedVariant) return
    setAdding(true)
    const customAttributes = []
    if (board.personalization && personalizationText) {
      customAttributes.push({ key: 'Personalization', value: personalizationText })
    }
    await addToCart(selectedVariant.id, quantity, customAttributes)
    setAdding(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={`Configure ${board.title}`} onClick={onClose}>
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />
      <div className="relative bg-cream border border-gold/20 w-full max-w-lg p-8 md:p-10 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-charcoal-light hover:text-gold transition-colors text-2xl leading-none z-10" aria-label="Close">&times;</button>

        {/* Image gallery */}
        {shopifyImages.length > 0 && (
          <div className="relative mb-6">
            <img src={shopifyImages[currentImg].src} alt="" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
            {shopifyImages.length > 1 && (
              <>
                <button onClick={() => setCurrentImg((c) => (c - 1 + shopifyImages.length) % shopifyImages.length)} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center text-charcoal hover:bg-gold hover:text-cream transition-colors">&#8249;</button>
                <button onClick={() => setCurrentImg((c) => (c + 1) % shopifyImages.length)} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center text-charcoal hover:bg-gold hover:text-cream transition-colors">&#8250;</button>
              </>
            )}
          </div>
        )}

        <h3 className="font-serif text-2xl md:text-3xl mb-2">{board.title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-8">{board.description}</p>

        {/* Size selector */}
        <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">Select a Size</p>
        <div className="grid grid-cols-2 gap-3 mb-8" role="radiogroup" aria-label="Board size">
          {boardSizes.map((s, idx) => (
            <button key={s.key} onClick={() => setSelectedSize(idx)} role="radio" aria-checked={selectedSize === idx}
              className={`border py-3 px-4 text-left transition-all duration-200 ${selectedSize === idx ? 'border-gold bg-gold/10' : 'border-gold/20 hover:border-gold/40'}`}>
              <span className="block font-serif text-sm">{s.key === 'xlarge' ? 'X-Large' : s.key.charAt(0).toUpperCase() + s.key.slice(1)}</span>
              <span className="block text-charcoal-light text-xs mt-0.5">{s.label.match(/\(.*\)/)?.[0]}</span>
              <span className="block text-gold font-serif text-lg mt-1">${getVariantPrice(s)}</span>
            </button>
          ))}
        </div>

        {/* Personalization */}
        {board.personalization && (
          <div className="mb-8">
            <label htmlFor="board-personalization" className="text-xs tracking-[0.2em] uppercase text-gold mb-3 block">Personalization</label>
            <input id="board-personalization" type="text" value={personalizationText} onChange={(e) => setPersonalizationText(e.target.value)}
              placeholder={board.personalizationPlaceholder || ''} className="w-full border border-gold/20 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:border-gold focus:outline-none transition-colors" />
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

        <button onClick={handleAddToCart} disabled={adding || !selectedVariant}
          className="w-full bg-charcoal text-cream px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {!selectedVariant ? 'Unavailable' : adding ? 'Adding...' : `Add to Cart — $${chosenPrice * quantity}`}
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   BOARD CARD
   ════════════════════════════════════════════ */

function BoardCard({ board, shopifyProducts, onSelect, index, isVisible }) {
  const matched = shopifyProducts.find(p => p.title.toLowerCase() === board.title.toLowerCase())
  const imgSrc = getProductImage(matched) || board.image || null
  const startPrice = getStartingPrice(matched, 65)

  return (
    <article onClick={() => onSelect(board)}
      className={`group bg-cream border border-gold/15 hover:border-gold/40 transition-all duration-300 cursor-pointer overflow-hidden fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}>
      <figure className="overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={`${board.title} - handcrafted charcuterie board`} className="w-full h-48 object-cover img-hover" loading="lazy" />
        ) : (
          <ImagePlaceholder />
        )}
      </figure>
      <div className="p-6">
        {board.number && <span className="font-serif text-2xl text-gold/30 group-hover:text-gold transition-colors duration-300" aria-hidden="true">{board.number}</span>}
        <h3 className="font-serif text-lg md:text-xl mt-2 mb-2 group-hover:text-gold transition-colors duration-300">{board.title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-3">{board.description}</p>
        <p className="text-gold font-serif text-sm">starting at ${startPrice}</p>
      </div>
    </article>
  )
}

/* ════════════════════════════════════════════
   CUP / BOX CARD (inline qty)
   ════════════════════════════════════════════ */

function ItemCard({ item, shopifyProducts, index, isVisible, minQty = 1, unitLabel = 'each', showPersonalization = false }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(minQty)
  const [customText, setCustomText] = useState('')
  const [adding, setAdding] = useState(false)

  const shopifyProduct = shopifyProducts.find(p => p.title.toLowerCase() === item.title.toLowerCase())
  const imgSrc = shopifyProduct?.images?.[0]?.src || null
  const variant = shopifyProduct?.variants?.[0]
  const unitPrice = variant?.price?.amount ? parseFloat(variant.price.amount) : null

  const handleAdd = async () => {
    if (adding || !variant) return
    setAdding(true)
    const customAttributes = []
    if (showPersonalization && item.personalization && customText) {
      customAttributes.push({ key: 'Custom Message', value: customText })
    }
    await addToCart(variant.id, qty, customAttributes)
    setAdding(false)
  }

  return (
    <article className={`bg-cream overflow-hidden fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}>
      <figure className="overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={`${item.title}`} className="w-full h-48 object-cover" loading="lazy" />
        ) : (
          <ImagePlaceholder />
        )}
      </figure>
      <div className="p-6">
        <h3 className="font-serif text-lg md:text-xl mb-2 text-charcoal">{item.title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">{item.description}</p>

        {unitPrice && (
          <div className="flex items-center gap-3 text-sm mb-4">
            <span className="font-serif text-lg text-gold">${unitPrice}/{unitLabel}</span>
            {minQty > 1 && <span className="text-charcoal-light font-light">&middot; {minQty} minimum</span>}
          </div>
        )}

        {showPersonalization && item.personalization && (
          <div className="mb-4">
            <label htmlFor={`custom-${index}`} className="block text-xs tracking-[0.15em] uppercase text-charcoal-light mb-2">Custom Message</label>
            <input id={`custom-${index}`} type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}
              placeholder={item.personalizationPlaceholder || ''} className="w-full border border-taupe/30 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold transition-colors" />
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

        <button onClick={handleAdd} disabled={adding || !variant}
          className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {!variant ? 'Unavailable' : adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}

/* ════════════════════════════════════════════
   PERSONALIZATION CARD (custom layout)
   ════════════════════════════════════════════ */

function PersonalizationCard({ shopifyProducts, matchFn, title, subtitle, description, imgFallback, minQty, unitLabel, index, isVisible, showRibbon = false }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(minQty)
  const [customText, setCustomText] = useState('')
  const [ribbonChecked, setRibbonChecked] = useState(false)
  const [adding, setAdding] = useState(false)

  const shopifyProduct = shopifyProducts.find(matchFn)
  const imgSrc = shopifyProduct?.images?.[0]?.src || imgFallback
  const variant = shopifyProduct?.variants?.[0]
  const unitPrice = variant?.price?.amount ? parseFloat(variant.price.amount) : null

  const handleAdd = async () => {
    if (adding || !variant) return
    setAdding(true)
    const customAttributes = []
    if (customText) customAttributes.push({ key: 'Personalization', value: customText })
    if (showRibbon && ribbonChecked) customAttributes.push({ key: 'Ribbon Packaging', value: 'Yes' })
    await addToCart(variant.id, qty, customAttributes)
    setAdding(false)
  }

  return (
    <article className={`bg-cream overflow-hidden fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}>
      <figure className="overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-64 object-cover" loading="lazy" />
        ) : (
          <ImagePlaceholder className="h-64" />
        )}
      </figure>
      <div className="p-6">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{subtitle}</p>
        <h3 className="font-serif text-lg md:text-xl mb-2">{title}</h3>
        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">{description}</p>

        {unitPrice && (
          <div className="flex items-center gap-3 text-sm mb-4">
            <span className="font-serif text-lg text-gold">${unitPrice}/{unitLabel}</span>
            {minQty > 1 && <span className="text-charcoal-light font-light">&middot; {minQty} minimum</span>}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor={`pers-${index}`} className="block text-xs tracking-[0.15em] uppercase text-charcoal-light mb-2">Customization</label>
          <input id={`pers-${index}`} type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}
            placeholder="e.g. The Rishers 01/01/2025" className="w-full border border-taupe/30 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold transition-colors" />
        </div>

        {showRibbon && (
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input type="checkbox" checked={ribbonChecked} onChange={(e) => setRibbonChecked(e.target.checked)} className="w-4 h-4 accent-gold" />
            <span className="text-sm font-light text-charcoal-light">Add ribbon packaging upgrade (+$0.50/board)</span>
          </label>
        )}

        <div className="flex items-center gap-3 mb-4">
          <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
          <div className="flex items-center border border-taupe/30">
            <button onClick={() => setQty((q) => Math.max(minQty, q - 1))} aria-label="Decrease quantity" className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors">&minus;</button>
            <span className="px-4 py-2 font-light text-sm min-w-[3rem] text-center" aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors">+</button>
          </div>
        </div>

        <button onClick={handleAdd} disabled={adding || !variant}
          className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {!variant ? 'Unavailable' : adding ? 'Adding...' : 'Add to Cart'}
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
  const [activeBoard, setActiveBoard] = useState(null)

  const [heroRef, heroVisible] = useInView()
  const [classicsRef, classicsVisible] = useInView()
  const [specialRef, specialVisible] = useInView()
  const [cupsRef, cupsVisible] = useInView()
  const [boxesRef, boxesVisible] = useInView()
  const [persRef, persVisible] = useInView()

  useSEO({
    title: 'Shop Charcuterie Boards Online',
    description: 'Order handcrafted charcuterie boards, cups, boxes & custom favors online — delivered fresh across Kentucky. All Shopify checkout.',
    path: '/shop',
    ogType: 'product',
  })

  useEffect(() => {
    shopifyClient.product.fetchAll().then(setShopifyProducts)
  }, [])

  useEffect(() => {
    if (activeBoard) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeBoard])

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
          {/* Quick navigation */}
          <nav className={`flex flex-wrap justify-center gap-3 fade-in-up fade-in-up-delay-3 ${heroVisible ? 'visible' : ''}`} aria-label="Shop sections">
            <a href="#boards" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Boards</a>
            <a href="#special-boards" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Themed Boards</a>
            <a href="#cups" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Cups</a>
            <a href="#boxes" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Boxes</a>
            <a href="#personalizations" className="border border-charcoal text-charcoal px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300">Personalizations</a>
          </nav>
        </div>
      </section>

      <SectionDivider />

      {/* ── CLASSIC BOARDS ── */}
      <section id="boards" className="py-20 lg:py-28 bg-taupe-light scroll-mt-24" aria-label="Classic charcuterie boards">
        <div ref={classicsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${classicsVisible ? 'visible' : ''}`}>Our Collection</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${classicsVisible ? 'visible' : ''}`}>The <em className="text-gold">Classics.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${classicsVisible ? 'visible' : ''}`}>
              Signature boards crafted with care — select your size and quantity, then add to cart.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {classicBoards.map((board, i) => (
              <BoardCard key={board.number} board={board} shopifyProducts={shopifyProducts} onSelect={setActiveBoard} index={i} isVisible={classicsVisible} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── SPECIAL OCCASION BOARDS ── */}
      <section id="special-boards" className="py-20 lg:py-28 bg-cream scroll-mt-24" aria-label="Special occasion boards">
        <div ref={specialRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${specialVisible ? 'visible' : ''}`}>Celebrations</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${specialVisible ? 'visible' : ''}`}>Special Occasion <em className="text-gold">Boards.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${specialVisible ? 'visible' : ''}`}>
              Themed boards designed to make your celebrations even more memorable.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {specialBoards.map((board, i) => (
              <BoardCard key={board.title} board={board} shopifyProducts={shopifyProducts} onSelect={setActiveBoard} index={i} isVisible={specialVisible} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── CUPS ── */}
      <section id="cups" className="py-20 lg:py-28 bg-taupe-light scroll-mt-24" aria-label="Charcuterie cups">
        <div ref={cupsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${cupsVisible ? 'visible' : ''}`}>Charcuterie Cups</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${cupsVisible ? 'visible' : ''}`}>Grab-and-go <em className="text-gold">elegance.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${cupsVisible ? 'visible' : ''}`}>
              Individual charcuterie cups — perfect for events of any size. Minimum order of 15.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cups.map((cup, i) => (
              <ItemCard key={cup.title} item={cup} shopifyProducts={shopifyProducts} index={i} isVisible={cupsVisible} minQty={15} unitLabel="cup" />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── BOXES ── */}
      <section id="boxes" className="py-20 lg:py-28 bg-cream scroll-mt-24" aria-label="Charcuterie boxes">
        <div ref={boxesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${boxesVisible ? 'visible' : ''}`}>Charcuterie Boxes</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${boxesVisible ? 'visible' : ''}`}>Shareable <em className="text-gold">indulgence.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${boxesVisible ? 'visible' : ''}`}>
              Curated charcuterie boxes — perfect for sharing. Minimum order of 6.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {boxes.map((box, i) => (
              <ItemCard key={box.title} item={box} shopifyProducts={shopifyProducts} index={i} isVisible={boxesVisible} minQty={6} unitLabel="box" showPersonalization />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── PERSONALIZATIONS ── */}
      <section id="personalizations" className="py-20 lg:py-28 bg-taupe-light scroll-mt-24" aria-label="Personalizations">
        <div ref={persRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${persVisible ? 'visible' : ''}`}>The Details Matter</p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-4 fade-in-up fade-in-up-delay-1 ${persVisible ? 'visible' : ''}`}><em className="text-gold">Personalizations.</em></h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${persVisible ? 'visible' : ''}`}>
              Add a meaningful, personal touch to your event with custom details your guests will treasure.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <PersonalizationCard
              shopifyProducts={shopifyProducts}
              matchFn={p => p.title.toLowerCase().includes('mini') && p.title.toLowerCase().includes('board')}
              title="Mini Charcuterie Board Favors"
              subtitle="Party Favors"
              description="Send your guests home with something beautiful and delicious. Each board is personalized with guest names, event dates, or a custom message."
              imgFallback="/personalizations/mini-board-favor.png"
              minQty={10}
              unitLabel="board"
              index={0}
              isVisible={persVisible}
              showRibbon
            />
            <PersonalizationCard
              shopifyProducts={shopifyProducts}
              matchFn={p => p.title.toLowerCase().includes('sticker')}
              title="Custom Stickers"
              subtitle="Custom Branding"
              description="Add a custom message sticker to your charcuterie cup, box, or drink. Names, dates, logos, and monograms available."
              imgFallback="/personalizations/custom-sticker.png"
              minQty={1}
              unitLabel="sticker"
              index={1}
              isVisible={persVisible}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── CLASSES CTA ── */}
      <section className="py-16 lg:py-20 bg-cream" aria-label="Charcuterie classes">
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
        <BoardModal board={activeBoard} onClose={() => setActiveBoard(null)} shopifyProducts={shopifyProducts} />
      )}
    </article>
  )
}
