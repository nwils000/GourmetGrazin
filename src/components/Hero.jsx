import { Link } from 'react-router-dom'
import { useInView } from './useInView'

export default function Hero({ onInquire }) {
  const [ref, isVisible] = useInView()

  return (
    <section className="relative min-h-screen flex items-center bg-cream pt-32" aria-label="Welcome to Gourmet Grazin'">
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
              Handcrafted charcuterie boards, mobile carts, and grazing tables
              for the event you're planning, or the spread you're craving tonight.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
              <button
                onClick={onInquire}
                className="bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Inquire Now
              </button>
              <Link
                to="/menu"
                className="border border-charcoal text-charcoal px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300 inline-block text-center"
              >
                See the Menu
              </Link>
            </div>
            <a
              href="#services"
              className={`inline-block mt-6 text-xs tracking-[0.2em] uppercase text-charcoal-light hover:text-gold transition-colors duration-300 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}
            >
              Or view our services &rarr;
            </a>
          </header>

          {/* Right side - Image */}
          <figure className={`fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            <div className="relative">
              <picture>
                <source srcSet="/charcuterie-board-hero.webp" type="image/webp" />
                <img
                  src="/charcuterie-board-hero.jpg"
                  alt="Handcrafted Gourmet Grazin' charcuterie board with salami rose, brie, aged cheddar, kiwi, grapes, and rosemary"
                  className="w-full h-[500px] lg:h-[600px] object-cover shadow-lg"
                  width="1265"
                  height="1244"
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
