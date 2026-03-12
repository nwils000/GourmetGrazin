import { useEffect } from 'react'
import { useInView } from '../components/useInView'

export default function PersonalizationsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [heroRef, heroVisible] = useInView()
  const [miniBoardRef, miniBoardVisible] = useInView()
  const [stickerRef, stickerVisible] = useInView()
  const [weddingRef, weddingVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

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
              <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${miniBoardVisible ? 'visible' : ''}`}>
                Send your guests home with something beautiful and delicious. Our personalized mini
                charcuterie boards double as both an elegant party favor and a memorable experience.
                Each board is beautifully personalized with guest names, event dates, or a custom
                message, creating a meaningful takeaway your guests will savor long after the event ends.
              </p>
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
              <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${stickerVisible ? 'visible' : ''}`}>
                Add a custom message on a sticker to put in your charcuterie cup, box, or drink!
                From names and dates to logos and monograms — a small detail that makes a lasting impression.
              </p>
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

      {/* Engraved Wedding Favors */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={weddingRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`overflow-hidden fade-in-up ${weddingVisible ? 'visible' : ''}`}>
              <img
                src="/personalizations/mini-board-favor.png"
                alt="Engraved mini cutting board wedding favor"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            <div>
              <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${weddingVisible ? 'visible' : ''}`}>
                Wedding Keepsakes
              </p>
              <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${weddingVisible ? 'visible' : ''}`}>
                Engraved Wedding <em className="text-gold">Favors</em>
              </h2>
              <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${weddingVisible ? 'visible' : ''}`}>
                Elevate your wedding with engraved mini cutting boards — a keepsake your guests will
                treasure. Each board is personalized with names, dates, or a custom message and paired
                with a curated mini charcuterie selection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div ref={ctaRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up ${ctaVisible ? 'visible' : ''}`}>
            Make it <em className="text-gold">personal.</em>
          </h2>
          <p className={`text-charcoal-light leading-relaxed font-light max-w-lg mx-auto mb-10 fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}>
            Ready to add a custom touch to your next event? Let's create something memorable together.
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
