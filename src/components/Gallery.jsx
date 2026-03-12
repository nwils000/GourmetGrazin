import { Link } from 'react-router-dom'
import { useInView } from './useInView'

const galleryImages = [
  { src: '/gallery/gallery1.jpg', alt: 'Gourmet Grazin cart at outdoor event' },
  { src: '/gallery/gallery2.jpg', alt: 'Cart being served to guests' },
  { src: '/gallery/gallery3.jpg', alt: 'Close-up cart spread with accompaniments' },
  { src: '/gallery/gallery4.jpg', alt: 'Gourmet Grazin branded cart' },
  { src: '/gallery/gallery5.jpeg', alt: 'Cart food detail shot' },
  { src: '/gallery/gallery6.jpeg', alt: 'Cart serving experience' },
  { src: '/gallery/gallery7.jpg', alt: 'Gourmet Grazin at formal event' },
  { src: '/gallery/gourmet-cart-1.jpeg', alt: 'Mobile cart setup' },
  { src: '/gallery/gourmet-cart-2.jpeg', alt: 'Cart with full spread' },
  { src: '/event-photo.jpg', alt: 'Event photo' },
  { src: '/cart-closeup.jpg', alt: 'Close-up of cart' },
  { src: '/cart-setup.jpg', alt: 'Cart outdoor setup' },
]

export default function Gallery() {
  const [ref, isVisible] = useInView()
  const doubled = [...galleryImages, ...galleryImages]

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            Portfolio
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            A taste of our <em className="text-gold">work.</em>
          </h2>
        </div>
      </div>

      {/* Rotating Carousel */}
      <div className={`fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
        <div className="overflow-hidden group">
          <div
            className="flex animate-marquee hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {doubled.map((img, i) => (
              <div key={i} className="flex-shrink-0 w-[320px] sm:w-[400px] lg:w-[450px] px-2">
                <div className="h-[240px] sm:h-[280px] lg:h-[320px] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to="/gallery"
          className="inline-block border border-charcoal text-charcoal px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  )
}
