import { Link } from 'react-router-dom'
import { useInView } from './useInView'

export default function TwoPaths({ onInquire }) {
  const [ref, isVisible] = useInView()

  return (
    <section id="two-paths" className="py-20 lg:py-28 bg-cream" aria-label="Two ways to grazin'">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-14 lg:mb-16 max-w-2xl mx-auto">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            Two Ways to Grazin'
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            Plan an event, or <em className="text-gold-heading">shop tonight.</em>
          </h2>
          <p className={`text-charcoal-light leading-relaxed font-light fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            Bring our mobile cart and team to your celebration, or order handcrafted boards, cups, bundles, and engraved keepsakes direct from our shop.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Plan an Event */}
          <article className={`group bg-warm-white border border-taupe/30 overflow-hidden flex flex-col fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            <figure className="overflow-hidden">
              <img
                src="/cart-umbrella.jpg"
                alt="Gourmet Grazin' mobile charcuterie cart at an event"
                className="w-full h-64 md:h-72 lg:h-80 object-cover img-hover"
                loading="lazy"
                width="600"
                height="400"
              />
            </figure>
            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <p className="text-gold-accessible text-xs tracking-[0.3em] uppercase mb-3">For Your Event</p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:text-gold transition-colors duration-300">
                Plan an <em className="text-gold-heading">event.</em>
              </h3>
              <p className="text-charcoal-light leading-relaxed font-light mb-8 flex-1">
                Mobile carts, grazing tables, weddings, showers, corporate gatherings, fully styled and staffed by our team.
              </p>
              <button
                onClick={onInquire}
                className="self-start bg-charcoal text-cream px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Inquire Now &rarr;
              </button>
            </div>
          </article>

          {/* Shop Online */}
          <article className={`group bg-warm-white border border-taupe/30 overflow-hidden flex flex-col fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
            <figure className="overflow-hidden">
              <img
                src="/charcuterie-collection.jpg"
                alt="Fresh fruit and veggie charcuterie boards from the Gourmet Grazin' online collection"
                className="w-full h-64 md:h-72 lg:h-80 object-cover img-hover"
                loading="lazy"
                width="600"
                height="400"
              />
            </figure>
            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <p className="text-gold-accessible text-xs tracking-[0.3em] uppercase mb-3">Order Online</p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:text-gold transition-colors duration-300">
                Browse the <em className="text-gold-heading">menu.</em>
              </h3>
              <p className="text-charcoal-light leading-relaxed font-light mb-8 flex-1">
                Handcrafted boards, cups, boxes, bundles, and engraved keepsakes, shipped across Kentucky.
              </p>
              <Link
                to="/menu"
                className="self-start bg-charcoal text-cream px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
              >
                See the Menu &rarr;
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
