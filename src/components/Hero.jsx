import { useInView } from './useInView'

export default function Hero({ onInquire }) {
  const [ref, isVisible] = useInView()

  return (
    <section className="relative min-h-screen flex items-center bg-cream pt-20" aria-label="Welcome to Gourmet Grazin'">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <header>
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${isVisible ? 'visible' : ''}`}>
              Elevated Charcuterie & Custom Mobile Carts
            </p>
            <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
              Elevated charcuterie
              <br />
              <em className="text-gold-heading">for every celebration.</em>
            </h1>
            <p className={`text-charcoal-light text-lg md:text-xl max-w-xl mb-10 font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
              Handcrafted charcuterie boards, stunning grazing tables, and our signature mobile cart —
              bringing elevated bites to weddings, showers, parties, and more across Kentucky.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
              <button
                onClick={onInquire}
                className="bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Inquire Now
              </button>
              <a
                href="#services"
                className="border border-charcoal text-charcoal px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300 inline-block text-center"
              >
                View Services
              </a>
            </div>
          </header>

          {/* Right side - Image */}
          <figure className={`fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            <div className="relative">
              <picture>
                <source srcSet="/gallery/new/disperse5.webp" type="image/webp" />
                <img
                  src="/gallery/new/disperse5.jpeg"
                  alt="Beautifully arranged artisan charcuterie board with imported cheeses, cured meats, and fresh fruits by Gourmet Grazin'"
                  className="w-full h-[500px] lg:h-[600px] object-cover shadow-lg"
                  width="768"
                  height="1055"
                  fetchpriority="high"
                />
              </picture>
              <div className="absolute inset-0 ring-1 ring-gold/20 ring-inset" aria-hidden="true" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
