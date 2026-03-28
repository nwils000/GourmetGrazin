import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from '../components/useInView'
import { useDriveImages } from '../hooks/useDriveImages'
import { FOLDER_IDS } from '../lib/googleDrive'
import useSEO from '../hooks/useSEO'

const defaultGalleryImages = [
  { src: '/gallery/gallery1.jpg', alt: 'Artisan charcuterie board with imported cheeses and cured meats' },
  { src: '/gallery/gallery2.jpg', alt: 'Elegant charcuterie spread styled for a Kentucky wedding' },
  { src: '/gallery/new/disperse1.jpg', alt: 'Easter charcuterie board with salami roses and seasonal garnishes' },
  { src: '/gallery/gallery3.jpg', alt: 'Premium grazing table with fresh fruits and artisan crackers' },
  { src: '/gallery/gallery5.jpeg', alt: 'Beautifully arranged charcuterie display for a corporate event' },
  { src: '/gallery/new/disperse2.jpg', alt: 'Charcuterie board with chocolate eggs and Lindt bunnies for Easter' },
  { src: '/gallery/gallery6.jpeg', alt: 'Handcrafted charcuterie board with brie, grapes, and rosemary' },
  { src: '/gallery/gallery7.jpg', alt: 'Stunning charcuterie presentation for a bridal shower' },
  { src: '/gallery/new/disperse3.jpg', alt: 'Colorful charcuterie board with meat roses and seasonal fruits' },
  { src: '/gallery/gourmet-cart-2.jpeg', alt: 'Gourmet Grazin mobile charcuterie cart setup at an event' },
  { src: '/gallery/new/disperse4.jpg', alt: 'Bunny-shaped brie cheese charcuterie board for spring celebration' },
  { src: '/cart-outdoor.jpg', alt: 'Outdoor charcuterie cart experience at a Kentucky venue' },
  { src: '/cart-closeup.jpg', alt: 'Close-up of artisan cheese and charcuterie cart spread' },
  { src: '/gallery/new/disperse5.jpeg', alt: 'Chocolate and charcuterie board with truffles and berries' },
  { src: '/cart-setup.jpg', alt: 'Mobile charcuterie cart setup with full grazing spread' },
  { src: '/event-photo.jpg', alt: 'Gourmet Grazin charcuterie catering at a live event' },
]

const GALLERY_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: "Gourmet Grazin' Portfolio",
  description: 'Browse our portfolio of stunning charcuterie boards, grazing tables, and mobile cart setups from Kentucky weddings, corporate events, and private celebrations.',
  url: 'https://www.gourmetgrazinky.com/gallery',
  about: {
    '@type': 'CateringService',
    name: "Gourmet Grazin'",
  },
}

function CarouselArrow({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      className="absolute top-1/2 -translate-y-1/2 z-10 bg-charcoal/70 hover:bg-gold text-cream w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors duration-300"
      style={{ [direction === 'left' ? 'left' : 'right']: '0.5rem' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === 'left' ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  )
}

function ManualCarousel({ galleryImages }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  const totalSlides = galleryImages.length

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4000)
  }, [totalSlides])

  useEffect(() => {
    if (!isPaused) {
      startTimer()
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, startTimer])

  const goTo = (index) => {
    setCurrentIndex(index)
    startTimer()
  }

  const goLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    startTimer()
  }

  const goRight = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    startTimer()
  }

  return (
    <div
      className="relative"
      role="region"
      aria-label="Photo carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${totalSlides}`}
            >
              <div className="h-[300px] md:h-[380px] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselArrow direction="left" onClick={goLeft} />
      <CarouselArrow direction="right" onClick={goRight} />

      <div className="flex justify-center gap-2 mt-6" aria-label="Carousel navigation">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentIndex ? 'true' : undefined}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-gold w-6'
                : 'bg-charcoal/25 hover:bg-gold/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function InfiniteMarquee({ galleryImages }) {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className="flex animate-marquee hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {[...galleryImages, ...galleryImages].map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[320px] sm:w-[400px] lg:w-[450px] px-2">
            <div className="h-[240px] sm:h-[280px] lg:h-[320px] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [heroRef, heroVisible] = useInView()
  const [carouselRef, carouselVisible] = useInView()
  const [gridRef, gridVisible] = useInView()
  const { images: galleryImages } = useDriveImages(FOLDER_IDS.gallery, defaultGalleryImages)

  useSEO({
    title: 'Charcuterie & Cart Photo Gallery',
    description: 'Browse stunning charcuterie boards, grazing tables & mobile cart setups from real Kentucky events — weddings, corporate gatherings & celebrations.',
    path: '/gallery',
    jsonLd: GALLERY_SCHEMA,
  })

  return (
    <article>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-cream" aria-label="Gallery overview">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${heroVisible ? 'visible' : ''}`}
          >
            Portfolio
          </p>
          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-4 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
          >
            Gallery
          </h1>
          <p
            className={`text-charcoal-light text-lg md:text-xl font-light max-w-lg mx-auto fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            A taste of our work.
          </p>
        </div>
      </section>

      {/* Infinite Marquee Carousel */}
      <section className="py-12 lg:py-16 bg-taupe-light" aria-label="Featured photos">
        <div ref={carouselRef} className="max-w-[100vw] overflow-hidden">
          <header className="mb-10 max-w-7xl mx-auto px-6 lg:px-8">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${carouselVisible ? 'visible' : ''}`}
            >
              Featured
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${carouselVisible ? 'visible' : ''}`}
            >
              Browse our <em className="text-gold">highlights.</em>
            </h2>
          </header>

          <div className={`fade-in-up fade-in-up-delay-2 ${carouselVisible ? 'visible' : ''}`}>
            <InfiniteMarquee galleryImages={galleryImages} />
          </div>
        </div>
      </section>

      {/* Manual Carousel with Arrows & Dots */}
      <section className="py-16 lg:py-24 bg-cream" aria-label="Photo slideshow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ManualCarousel galleryImages={galleryImages} />
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-4" aria-hidden="true">
        <div className="h-px w-16 bg-gold/30" />
        <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
        <div className="h-px w-16 bg-gold/30" />
      </div>

      {/* Static Grid */}
      <section className="py-16 lg:py-24 bg-taupe-light" aria-label="Full collection">
        <div ref={gridRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${gridVisible ? 'visible' : ''}`}
            >
              Full Collection
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${gridVisible ? 'visible' : ''}`}
            >
              Every detail, <em className="text-gold">beautifully crafted.</em>
            </h2>
          </header>

          <div
            className={`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 fade-in-up fade-in-up-delay-2 ${gridVisible ? 'visible' : ''}`}
          >
            {galleryImages.map((img, i) => (
              <figure key={i} className="break-inside-avoid overflow-hidden group">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{
                    height: i % 3 === 0 ? '380px' : i % 3 === 1 ? '300px' : '340px',
                  }}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
