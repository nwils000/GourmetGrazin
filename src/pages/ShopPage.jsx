import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useInView } from '../components/useInView'
import { useCart } from '../context/CartContext'
import shopifyClient from '../lib/shopify'

function ProductCard({ product, index, isVisible }) {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)

  const image = product.images?.[0]?.src
  const price = parseFloat(product.variants?.[0]?.price?.amount || 0).toFixed(2)
  const variantId = product.variants?.[0]?.id
  const available = product.variants?.[0]?.available !== false

  const handleAdd = async () => {
    if (!variantId || adding) return
    setAdding(true)
    await addToCart(variantId)
    setAdding(false)
  }

  return (
    <div
      className={`group fade-in-up fade-in-up-delay-${Math.min(index + 1, 4)} ${isVisible ? 'visible' : ''}`}
    >
      {/* Image */}
      <div className="overflow-hidden mb-5 bg-taupe-light aspect-square flex items-center justify-center border border-taupe/20">
        {image ? (
          <img
            src={image}
            alt={product.title}
            className="w-full h-full object-cover img-hover"
          />
        ) : (
          <div className="text-center px-6">
            <ShoppingBag size={40} className="text-gold/40 mx-auto mb-3" />
            <p className="text-charcoal-light/40 text-xs tracking-wider uppercase">
              Image coming soon
            </p>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="px-1">
        <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-gold transition-colors duration-300">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-charcoal-light font-light text-sm leading-relaxed mb-3">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between gap-4 mt-4">
          <span className="font-serif text-2xl text-gold">${price}</span>
          <button
            onClick={handleAdd}
            disabled={!available || adding}
            className={`px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
              available
                ? 'bg-charcoal text-cream hover:bg-gold'
                : 'bg-taupe text-charcoal-light cursor-not-allowed'
            }`}
          >
            {!available ? 'Sold Out' : adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [heroRef, heroVisible] = useInView()
  const [productsRef, productsVisible] = useInView()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    shopifyClient.product.fetchAll().then((fetched) => {
      setProducts(fetched)
      setLoading(false)
    })
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-cream pt-24 pb-16 lg:pb-24">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}
          >
            Shop
          </p>
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
          >
            Handcrafted
            <br />
            <em className="text-gold">to order.</em>
          </h1>
          <p
            className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            Premium charcuterie boards crafted with artisan ingredients and
            delivered with care. Perfect for gifting, hosting, or treating yourself.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={productsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                <p className="text-charcoal-light text-sm tracking-wider uppercase">
                  Loading products...
                </p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="text-taupe mx-auto mb-4" />
              <p className="font-serif text-2xl mb-2">Coming soon</p>
              <p className="text-charcoal-light font-light">
                Our shop is being curated. Check back soon!
              </p>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                products.length >= 3 ? 'lg:grid-cols-3' : ''
              } gap-8 lg:gap-12`}
            >
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  isVisible={productsVisible}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
