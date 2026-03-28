import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../components/useInView'
import { useCart } from '../context/CartContext'
import shopifyClient from '../lib/shopify'
import useSEO from '../hooks/useSEO'

const cups = [
  {
    title: 'The Classic Cup',
    description: 'A mix of cheddar cheese, pepperoni, salami, crostini crackers, chocolate-covered pretzels, and fresh fruit.',
  },
  {
    title: 'The Sweet Tooth Cup',
    description: 'Mini cookies, brownie bites, Rice Krispy treats, chocolate-covered strawberries, and berries.',
  },
  {
    title: 'Yogurt Cups',
    description: 'Yogurt, granola, berries, and a drizzle of honey.',
  },
  {
    title: 'Custom/Seasonal Cup',
    description: 'Themed flavors or seasonal ingredients tailored to your event.',
  },
]

const boxes = [
  {
    title: 'The Classic Box',
    description: 'A balanced selection of sweet and savory premium items. Contains cured salami, pepperoni, brie, manchego, berries, and chocolate covered pretzels with rosemary accents.',
  },
  {
    title: 'The Sweet Tooth Box',
    description: 'Loaded with cookies, brownies, chocolate-covered treats, and fruit.',
  },
  {
    title: 'The Brunch Box',
    description: 'Bagels, mini muffins, yogurt, fruit, and spreads for morning events.',
  },
  {
    title: 'Custom Message Charcuterie Box',
    description: 'The Classic Box with a custom message of your choice! A balance of sweet and savory with cured meats, brie, manchego, berries, and chocolate covered pretzels.',
    personalization: true,
    personalizationPlaceholder: 'e.g. Happy Birthday!',
  },
]

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Charcuterie Cups & Boxes',
  description: 'Elegant individual charcuterie cups starting at $8 and curated boxes starting at $10 for grab-and-go elegance at Kentucky events.',
  url: 'https://www.gourmetgrazinky.com/cups-boxes',
  itemListElement: [
    ...cups.map((cup, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `Charcuterie ${cup.title}`,
        description: cup.description,
        offers: { '@type': 'Offer', price: '8', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      },
    })),
    ...boxes.map((box, i) => ({
      '@type': 'ListItem',
      position: cups.length + i + 1,
      item: {
        '@type': 'Product',
        name: `Charcuterie ${box.title}`,
        description: box.description,
        offers: { '@type': 'Offer', price: '10', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      },
    })),
  ],
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function CupCard({ cup, index, isVisible, shopifyProducts }) {
  const { addToCart, addLocalItem } = useCart()
  const [qty, setQty] = useState(15)
  const [adding, setAdding] = useState(false)

  const shopifyProduct = shopifyProducts.find(
    (p) => p.title.toLowerCase() === cup.title.toLowerCase()
  )

  const imgSrc = shopifyProduct?.images?.[0]?.src
  const unitPrice = shopifyProduct?.variants?.[0]?.price?.amount
    ? parseFloat(shopifyProduct.variants[0].price.amount)
    : 8

  const handleAdd = async () => {
    if (adding) return
    setAdding(true)

    const variant = shopifyProduct?.variants?.[0]

    if (variant) {
      await addToCart(variant.id, qty)
    } else {
      addLocalItem({
        id: `cup-${slugify(cup.title)}`,
        title: `Charcuterie Cup - ${cup.title}`,
        price: unitPrice,
        quantity: qty,
      })
    }

    setAdding(false)
  }

  return (
    <article
      className={`bg-cream overflow-hidden fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}
    >
      {imgSrc && (
        <figure className="overflow-hidden">
          <img src={imgSrc} alt={`${cup.title} - individual charcuterie cup`} className="w-full h-48 object-cover" loading="lazy" />
        </figure>
      )}
      <div className="p-8">
      <h3 className="font-serif text-xl md:text-2xl mb-3 text-charcoal">
        {cup.title}
      </h3>
      <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">
        {cup.description}
      </p>
      <div className="flex items-center gap-3 text-sm mb-4">
        <span className="font-serif text-lg text-gold">${unitPrice}/cup</span>
        <span className="text-charcoal-light font-light">&middot; 15 minimum</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <label htmlFor={`cup-qty-${index}`} className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
        <div className="flex items-center border border-taupe/30">
          <button
            onClick={() => setQty((q) => Math.max(15, q - 1))}
            aria-label="Decrease quantity"
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            &minus;
          </button>
          <span id={`cup-qty-${index}`} className="px-4 py-2 font-light text-sm min-w-[3rem] text-center" aria-live="polite">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAdd}
        disabled={adding}
        className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50"
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
      </div>
    </article>
  )
}

function BoxCard({ box, index, isVisible, shopifyProducts }) {
  const { addToCart, addLocalItem } = useCart()
  const [qty, setQty] = useState(6)
  const [customText, setCustomText] = useState('')
  const [adding, setAdding] = useState(false)

  const shopifyProduct = shopifyProducts.find(
    (p) => p.title.toLowerCase() === box.title.toLowerCase()
  )

  const imgSrc = shopifyProduct?.images?.[0]?.src
  const unitPrice = shopifyProduct?.variants?.[0]?.price?.amount
    ? parseFloat(shopifyProduct.variants[0].price.amount)
    : 10

  const handleAdd = async () => {
    if (adding) return
    setAdding(true)

    const variant = shopifyProduct?.variants?.[0]

    if (variant) {
      const customAttributes = []
      if (box.personalization && customText) {
        customAttributes.push({ key: 'Custom Message', value: customText })
      }
      await addToCart(variant.id, qty, customAttributes)
    } else {
      addLocalItem({
        id: `box-${slugify(box.title)}`,
        title: `Charcuterie Box - ${box.title}`,
        price: unitPrice,
        quantity: qty,
        customization: box.personalization ? customText || null : null,
      })
    }

    setAdding(false)
  }

  return (
    <article
      className={`bg-cream overflow-hidden fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}
    >
      {imgSrc && (
        <figure className="overflow-hidden">
          <img src={imgSrc} alt={`${box.title} - curated charcuterie box`} className="w-full h-48 object-cover" loading="lazy" />
        </figure>
      )}
      <div className="p-8">
      <h3 className="font-serif text-xl md:text-2xl mb-3 text-charcoal">
        {box.title}
      </h3>
      <p className="text-charcoal-light font-light text-sm leading-relaxed mb-4">
        {box.description}
      </p>
      <div className="flex items-center gap-3 text-sm mb-4">
        <span className="font-serif text-lg text-gold">${unitPrice}/box</span>
        <span className="text-charcoal-light font-light">&middot; 6 minimum</span>
      </div>

      {box.personalization && (
        <div className="mb-4">
          <label htmlFor={`box-msg-${index}`} className="block text-xs tracking-[0.15em] uppercase text-charcoal-light mb-2">
            Custom Message
          </label>
          <input
            id={`box-msg-${index}`}
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={box.personalizationPlaceholder || ''}
            className="w-full border border-taupe/30 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <label htmlFor={`box-qty-${index}`} className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
        <div className="flex items-center border border-taupe/30">
          <button
            onClick={() => setQty((q) => Math.max(6, q - 1))}
            aria-label="Decrease quantity"
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            &minus;
          </button>
          <span id={`box-qty-${index}`} className="px-4 py-2 font-light text-sm min-w-[3rem] text-center" aria-live="polite">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAdd}
        disabled={adding}
        className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50"
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
      </div>
    </article>
  )
}

export default function CupsBoxesPage() {
  useSEO({
    title: 'Charcuterie Cups & Boxes',
    description: 'Individual charcuterie cups from $8 and curated boxes from $10 — budget-friendly grab-and-go elegance for Kentucky weddings, showers & events.',
    path: '/cups-boxes',
    jsonLd: PRODUCT_SCHEMA,
  })

  useEffect(() => {
    shopifyClient.product.fetchAll().then(setShopifyProducts)
  }, [])

  const [shopifyProducts, setShopifyProducts] = useState([])
  const [heroRef, heroVisible] = useInView()
  const [cupsRef, cupsVisible] = useInView()
  const [cupsImgRef, cupsImgVisible] = useInView()
  const [boxesRef, boxesVisible] = useInView()
  const [boxesImgRef, boxesImgVisible] = useInView()
  const [noteRef, noteVisible] = useInView()

  return (
    <article className="pt-24">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-cream" aria-label="Cups & Boxes overview">
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
      <section className="py-24 lg:py-32 bg-taupe-light" aria-label="Charcuterie cups">
        <div ref={cupsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-16 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${cupsVisible ? 'visible' : ''}`}>
              Charcuterie Cups
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${cupsVisible ? 'visible' : ''}`}>
              Grab-and-go <em className="text-gold">elegance.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${cupsVisible ? 'visible' : ''}`}>
              Individual charcuterie cups — perfect for grab-and-go elegance.
            </p>
            <p className={`text-gold font-serif text-base mt-4 fade-in-up fade-in-up-delay-3 ${cupsVisible ? 'visible' : ''}`}>
              Minimum order of 15 required.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cups.map((cup, i) => (
              <CupCard key={cup.title} cup={cup} index={i} isVisible={cupsVisible} shopifyProducts={shopifyProducts} />
            ))}
          </div>
        </div>
      </section>

      {/* Cups Feature Image */}
      <section className="py-24 lg:py-32 bg-cream" aria-label="Cups showcase">
        <div ref={cupsImgRef} className="max-w-5xl mx-auto px-6 lg:px-8">
          <figure className={`overflow-hidden fade-in-up ${cupsImgVisible ? 'visible' : ''}`}>
            <img
              src="/cups-boxes/cups.png"
              alt="Beautifully arranged charcuterie cups with artisan cheeses, meats, crackers, and fresh fruit"
              className="w-full h-[400px] md:h-[500px] object-cover"
              loading="lazy"
              width="1000"
              height="500"
            />
          </figure>
        </div>
      </section>

      {/* Boxes Section */}
      <section className="py-24 lg:py-32 bg-taupe-light" aria-label="Charcuterie boxes">
        <div ref={boxesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="mb-16 max-w-2xl">
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${boxesVisible ? 'visible' : ''}`}>
              Charcuterie Boxes
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${boxesVisible ? 'visible' : ''}`}>
              Shareable <em className="text-gold">indulgence.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${boxesVisible ? 'visible' : ''}`}>
              Starting at $10/person with a minimum of 6 — the perfect shareable indulgence.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {boxes.map((box, i) => (
              <BoxCard key={box.title} box={box} index={i} isVisible={boxesVisible} shopifyProducts={shopifyProducts} />
            ))}
          </div>
        </div>
      </section>

      {/* Boxes Feature Image */}
      <section className="py-24 lg:py-32 bg-cream" aria-label="Boxes showcase">
        <div ref={boxesImgRef} className="max-w-5xl mx-auto px-6 lg:px-8">
          <figure className={`overflow-hidden fade-in-up ${boxesImgVisible ? 'visible' : ''}`}>
            <img
              src="/cups-boxes/boxes.png"
              alt="Curated charcuterie boxes with cured meats, brie, manchego, berries, and chocolate covered pretzels"
              className="w-full h-[400px] md:h-[500px] object-cover"
              loading="lazy"
              width="1000"
              height="500"
            />
          </figure>
        </div>
      </section>

      {/* Charcuterie Classes CTA */}
      <section className="py-16 lg:py-20 bg-taupe-light" aria-label="Learn the art of charcuterie">
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

      {/* Note Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={noteRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-charcoal-light leading-relaxed font-light max-w-lg mx-auto fade-in-up ${noteVisible ? 'visible' : ''}`}>
            Items added to your cart will be submitted through our booking system.
          </p>
        </div>
      </section>
    </article>
  )
}
