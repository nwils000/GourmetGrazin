import { useInView } from './useInView'

export default function Gallery() {
  const [ref, isVisible] = useInView()

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            Portfolio
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            A taste of our <em className="text-gold">work.</em>
          </h2>
        </div>

        <div className={`fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
          {/* Row 1: Two images side by side */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-3 h-[300px] md:h-[400px] overflow-hidden">
              <img
                src="/event-photo.jpg"
                alt="Gourmet Grazin event setup"
                className="w-full h-full object-cover img-hover"
              />
            </div>
            <div className="md:col-span-2 h-[300px] md:h-[400px] overflow-hidden">
              <img
                src="/charcuterie-board.png"
                alt="Artisan charcuterie board with meats, cheeses, and fruits"
                className="w-full h-full object-cover img-hover"
              />
            </div>
          </div>

          {/* Row 2: Three images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="h-[280px] md:h-[320px] overflow-hidden">
              <img
                src="/cart-closeup.jpg"
                alt="Close-up of charcuterie cart spread"
                className="w-full h-full object-cover img-hover"
              />
            </div>
            <div className="h-[280px] md:h-[320px] overflow-hidden">
              <img
                src="/cart-outdoor.png"
                alt="Outdoor event setup with mobile cart"
                className="w-full h-full object-cover img-hover"
              />
            </div>
            <div className="h-[280px] md:h-[320px] overflow-hidden">
              <img
                src="/cart-setup.jpg"
                alt="Mobile charcuterie cart panoramic view"
                className="w-full h-full object-cover object-center img-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
