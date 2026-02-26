import { useInView } from './useInView'

export default function About() {
  const [ref, isVisible] = useInView()

  return (
    <section id="about" className="py-24 lg:py-32 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className={`overflow-hidden fade-in-up ${isVisible ? 'visible' : ''}`}>
            <img
              src="/cart-outdoor.png"
              alt="Gourmet Grazin' mobile charcuterie cart at an outdoor event"
              className="w-full h-[500px] lg:h-[600px] object-cover img-hover"
            />
          </div>

          {/* Content */}
          <div>
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
              Meet the Cart
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
              More than catering.
              <br />
              It's an <em className="text-gold">experience.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed mb-6 font-light fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
              Gourmet Grazin' brings a one-of-a-kind charcuterie experience to your event with our
              custom-built mobile cart. Stocked with artisan cheeses, cured meats, fresh fruits,
              gourmet crackers, and all the fixings — beautifully arranged and served right where
              your guests are.
            </p>
            <p className={`text-charcoal-light leading-relaxed mb-8 font-light fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
              Whether it's a wedding cocktail hour, a corporate reception, or an intimate
              gathering, our cart adds an elevated touch that your guests will remember.
              Based in Kentucky, we bring the graze to you.
            </p>
            <a
              href="#services"
              className={`text-charcoal text-xs tracking-[0.2em] uppercase border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors duration-300 fade-in-up fade-in-up-delay-4 ${isVisible ? 'visible' : ''}`}
            >
              Explore Our Services &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
