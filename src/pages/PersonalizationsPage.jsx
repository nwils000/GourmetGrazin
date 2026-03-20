import { useEffect, useState } from 'react'
import { useInView } from '../components/useInView'
import { useCart } from '../context/CartContext'

export default function PersonalizationsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { addLocalItem } = useCart()

  const [heroRef, heroVisible] = useInView()
  const [miniBoardRef, miniBoardVisible] = useInView()
  const [stickerRef, stickerVisible] = useInView()

  // Mini Board Favors state
  const [boardQty, setBoardQty] = useState(10)
  const [boardCustomText, setBoardCustomText] = useState('')
  const [ribbonChecked, setRibbonChecked] = useState(false)

  // Custom Stickers state
  const [stickerQty, setStickerQty] = useState(1)
  const [stickerCustomText, setStickerCustomText] = useState('')

  const handleAddBoard = () => {
    const price = ribbonChecked ? 10.50 : 10
    addLocalItem({
      id: 'personalization-mini-board-favor',
      title: 'Personalized Mini Board Favor',
      price,
      quantity: boardQty,
      customization: boardCustomText,
      ribbon: ribbonChecked,
    })
  }

  const handleAddSticker = () => {
    addLocalItem({
      id: 'personalization-custom-sticker',
      title: 'Custom Sticker',
      price: 0.25,
      quantity: stickerQty,
      customization: stickerCustomText,
    })
  }

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}>
            The Details Matter
          </p>
          <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}>
            <em className="text-gold">Personalizations</em>
          </h1>
          <p className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}>
            Add a meaningful, personal touch to your event with custom details that your guests will treasure.
          </p>
        </div>
      </section>

      {/* Personalized Mini Charcuterie Board Favors */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={miniBoardRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`overflow-hidden fade-in-up ${miniBoardVisible ? 'visible' : ''}`}>
              <img
                src="/personalizations/mini-board-favor.png"
                alt="Personalized mini charcuterie board favor"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            <div>
              <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${miniBoardVisible ? 'visible' : ''}`}>
                Party Favors
              </p>
              <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${miniBoardVisible ? 'visible' : ''}`}>
                Personalized Mini
                <br />
                Charcuterie Board <em className="text-gold">Favors</em>
              </h2>
              <p className={`text-charcoal-light leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-2 ${miniBoardVisible ? 'visible' : ''}`}>
                Send your guests home with something beautiful and delicious. Our personalized mini
                charcuterie boards double as both an elegant party favor and a memorable experience.
                Each board is beautifully personalized with guest names, event dates, or a custom
                message, creating a meaningful takeaway your guests will savor long after the event ends.
              </p>

              {/* Price & Minimum */}
              <div className={`flex items-center gap-3 text-sm mb-6 fade-in-up fade-in-up-delay-2 ${miniBoardVisible ? 'visible' : ''}`}>
                <span className="font-serif text-lg text-gold">
                  ${ribbonChecked ? '10.50' : '10.00'}/board
                </span>
                <span className="text-charcoal-light font-light">· 10 minimum</span>
              </div>

              {/* Quantity Selector */}
              <div className={`flex items-center gap-3 mb-5 fade-in-up fade-in-up-delay-2 ${miniBoardVisible ? 'visible' : ''}`}>
                <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
                <div className="flex items-center border border-taupe/30">
                  <button
                    onClick={() => setBoardQty((q) => Math.max(10, q - 1))}
                    className="px-3 py-2 text-charcoal hover:bg-cream transition-colors"
                  >
                    &minus;
                  </button>
                  <span className="px-4 py-2 font-light text-sm min-w-[3rem] text-center">{boardQty}</span>
                  <button
                    onClick={() => setBoardQty((q) => q + 1)}
                    className="px-3 py-2 text-charcoal hover:bg-cream transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customization Text */}
              <div className={`mb-5 fade-in-up fade-in-up-delay-2 ${miniBoardVisible ? 'visible' : ''}`}>
                <label className="block text-xs tracking-[0.15em] uppercase text-charcoal-light mb-2">
                  Customization
                </label>
                <input
                  type="text"
                  value={boardCustomText}
                  onChange={(e) => setBoardCustomText(e.target.value)}
                  placeholder="e.g. The Rishers 01/01/2025"
                  className="w-full border border-taupe/30 bg-cream px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {/* Ribbon Upgrade */}
              <label className={`flex items-center gap-3 mb-6 cursor-pointer fade-in-up fade-in-up-delay-2 ${miniBoardVisible ? 'visible' : ''}`}>
                <input
                  type="checkbox"
                  checked={ribbonChecked}
                  onChange={(e) => setRibbonChecked(e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-sm font-light text-charcoal-light">
                  Add ribbon packaging upgrade (+$0.50/board)
                </span>
              </label>

              {/* Add to Cart */}
              <button
                onClick={handleAddBoard}
                className={`bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 fade-in-up fade-in-up-delay-2 ${miniBoardVisible ? 'visible' : ''}`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Stickers */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={stickerRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${stickerVisible ? 'visible' : ''}`}>
                Custom Branding
              </p>
              <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${stickerVisible ? 'visible' : ''}`}>
                Custom <em className="text-gold">Stickers</em>
              </h2>
              <p className={`text-charcoal-light leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-2 ${stickerVisible ? 'visible' : ''}`}>
                Add a custom message on a sticker to put in your charcuterie cup, box, or drink!
                From names and dates to logos and monograms — a small detail that makes a lasting impression.
              </p>

              {/* Price */}
              <div className={`flex items-center gap-3 text-sm mb-6 fade-in-up fade-in-up-delay-2 ${stickerVisible ? 'visible' : ''}`}>
                <span className="font-serif text-lg text-gold">$0.25/sticker</span>
              </div>

              {/* Quantity Selector */}
              <div className={`flex items-center gap-3 mb-5 fade-in-up fade-in-up-delay-2 ${stickerVisible ? 'visible' : ''}`}>
                <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light">Qty</label>
                <div className="flex items-center border border-taupe/30">
                  <button
                    onClick={() => setStickerQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
                  >
                    &minus;
                  </button>
                  <span className="px-4 py-2 font-light text-sm min-w-[3rem] text-center">{stickerQty}</span>
                  <button
                    onClick={() => setStickerQty((q) => q + 1)}
                    className="px-3 py-2 text-charcoal hover:bg-taupe-light transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customization Text */}
              <div className={`mb-6 fade-in-up fade-in-up-delay-2 ${stickerVisible ? 'visible' : ''}`}>
                <label className="block text-xs tracking-[0.15em] uppercase text-charcoal-light mb-2">
                  Customization
                </label>
                <input
                  type="text"
                  value={stickerCustomText}
                  onChange={(e) => setStickerCustomText(e.target.value)}
                  placeholder="e.g. The Rishers 01/01/2025"
                  className="w-full border border-taupe/30 bg-white px-4 py-3 text-sm font-light text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddSticker}
                className={`bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 fade-in-up fade-in-up-delay-2 ${stickerVisible ? 'visible' : ''}`}
              >
                Add to Cart
              </button>
            </div>
            <div className={`order-1 lg:order-2 overflow-hidden fade-in-up ${stickerVisible ? 'visible' : ''}`}>
              <img
                src="/personalizations/custom-sticker.png"
                alt="Custom sticker on a charcuterie cup"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
