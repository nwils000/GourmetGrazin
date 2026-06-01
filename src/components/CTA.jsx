import { Link } from 'react-router-dom'
import { useInView } from './useInView'

export default function CTA({ onInquire }) {
  const [ref, isVisible] = useInView()

  return (
    <section className="py-24 lg:py-32 bg-cream" aria-label="Ready to book">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
              Ready to Graze?
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
              Let's make it <em className="text-gold-heading">unforgettable.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
              Whether you're planning a wedding, a corporate gathering, or just need a stunning board
              for the weekend &mdash; we'd love to be part of it. Reach out for events, or shop our
              handcrafted collection directly.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
              <button
                onClick={onInquire}
                className="bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Inquire Now
              </button>
              <Link
                to="/shop"
                className="border border-charcoal text-charcoal px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300 inline-block text-center"
              >
                Shop the Collection
              </Link>
            </div>
          </div>

          {/* Image */}
          <figure className={`overflow-hidden fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            <img
              src="/charcuterie-board.jpg"
              alt="Premium charcuterie board by Gourmet Grazin' with artisan cheeses and seasonal fruits"
              className="w-full h-[500px] object-cover"
              loading="lazy"
              width="600"
              height="500"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
