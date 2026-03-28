import { Link } from 'react-router-dom'
import { useInView } from './useInView'
import { useDriveImages } from '../hooks/useDriveImages'
import { FOLDER_IDS } from '../lib/googleDrive'

const defaultGalleryImages = [
  { src: '/gallery/gallery3.jpg', alt: 'Premium grazing table with fresh fruits and artisan crackers' },
  { src: '/gallery/new/disperse1.jpg', alt: 'Easter charcuterie board with salami roses and seasonal garnishes' },
  { src: '/gallery/gallery4.jpg', alt: 'Beautifully arranged charcuterie display for a corporate event' },
  { src: '/gallery/new/disperse3.jpg', alt: 'Colorful charcuterie board with meat roses and seasonal fruits' },
  { src: '/cart-closeup.jpg', alt: 'Close-up of artisan cheese and charcuterie cart spread' },
  { src: '/gallery/new/disperse4.jpg', alt: 'Bunny-shaped brie cheese charcuterie board for spring celebration' },
  { src: '/cart-setup.jpg', alt: 'Mobile charcuterie cart setup with full grazing spread' },
  { src: '/gallery/new/disperse2.jpg', alt: 'Charcuterie board with chocolate eggs and Lindt bunnies for Easter' },
]

export default function Gallery() {
  const [ref, isVisible] = useInView()
  const { images: galleryImages } = useDriveImages(FOLDER_IDS.gallery, defaultGalleryImages)
  const doubled = [...galleryImages, ...galleryImages]

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream overflow-hidden" aria-label="Portfolio preview">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-16">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            Portfolio
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            A taste of our <em className="text-gold">work.</em>
          </h2>
        </header>
      </div>

      {/* Rotating Carousel */}
      <div className={`fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`} aria-hidden="true">
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
                    loading="lazy"
                    width="450"
                    height="320"
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
