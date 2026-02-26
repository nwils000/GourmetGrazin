import { useInView } from './useInView'

export default function Hero({ onInquire }) {
  const [ref, isVisible] = useInView()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cream pt-20">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${isVisible ? 'visible' : ''}`}>
          Elevated Charcuterie & Custom Mobile Carts
        </p>
        <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
          Your event deserves
          <br />
          <em className="text-gold">to be savored.</em>
        </h1>
        <p className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
          Handcrafted charcuterie boards, stunning grazing tables, and our signature mobile cart —
          bringing elevated bites to weddings, showers, parties, and more across Kentucky.
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
          <button
            onClick={onInquire}
            className="bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
          >
            Inquire Now
          </button>
          <a
            href="#services"
            className="border border-charcoal text-charcoal px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300 inline-block"
          >
            View Services
          </a>
        </div>

        {/* Scroll indicator */}
        <div className={`mt-16 fade-in-up fade-in-up-delay-4 ${isVisible ? 'visible' : ''}`}>
          <p className="text-charcoal-light text-xs tracking-[0.2em] uppercase mb-2">Scroll</p>
          <div className="w-px h-12 bg-gold/40 mx-auto" />
        </div>
      </div>
    </section>
  )
}
