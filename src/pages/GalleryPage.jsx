import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from '../components/useInView'
import { useDriveImages } from '../hooks/useDriveImages'
import { FOLDER_IDS } from '../lib/googleDrive'

const defaultGalleryImages = [
  { src: '/gallery/gallery1.jpg', alt: 'Gallery image 1' },
  { src: '/gallery/gallery2.jpg', alt: 'Gallery image 2' },
  { src: '/gallery/new/disperse1.jpg', alt: 'Easter charcuterie board with salami roses' },
  { src: '/gallery/gallery3.jpg', alt: 'Gallery image 3' },
  { src: '/gallery/gallery5.jpeg', alt: 'Gallery image 5' },
  { src: '/gallery/new/disperse2.jpg', alt: 'Charcuterie board with peeps and Lindt bunnies' },
  { src: '/gallery/gallery6.jpeg', alt: 'Gallery image 6' },
  { src: '/gallery/gallery7.jpg', alt: 'Gallery image 7' },
  { src: '/gallery/new/disperse3.jpg', alt: 'Colorful charcuterie board with meat roses' },
  { src: '/gallery/gourmet-cart-2.jpeg', alt: 'Gourmet cart display' },
  { src: '/gallery/new/disperse4.jpg', alt: 'Bunny-shaped brie charcuterie board' },
  { src: '/cart-outdoor.png', alt: 'Outdoor cart event setup' },
  { src: '/cart-closeup.jpg', alt: 'Close-up of charcuterie cart spread' },
  { src: '/gallery/new/disperse5.jpeg', alt: 'Chocolate and charcuterie board' },
  { src: '/cart-setup.jpg', alt: 'Mobile charcuterie cart setup' },
  { src: '/event-photo.jpg', alt: 'Gourmet Grazin event' },
]

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
            >
              <div className="h-[300px] md:h-[380px] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselArrow direction="left" onClick={goLeft} />
      <CarouselArrow direction="right" onClick={goRight} />

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
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
    <div className="overflow-hidden">
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-cream">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${heroVisible ? 'visible' : ''}`}
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
      <section className="py-12 lg:py-16 bg-taupe-light">
        <div ref={carouselRef} className="max-w-[100vw] overflow-hidden">
          <div className="mb-10 max-w-7xl mx-auto px-6 lg:px-8">
            <p
              className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${carouselVisible ? 'visible' : ''}`}
            >
              Featured
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${carouselVisible ? 'visible' : ''}`}
            >
              Browse our <em className="text-gold">highlights.</em>
            </h2>
          </div>

          <div className={`fade-in-up fade-in-up-delay-2 ${carouselVisible ? 'visible' : ''}`}>
            <InfiniteMarquee galleryImages={galleryImages} />
          </div>
        </div>
      </section>

      {/* Manual Carousel with Arrows & Dots */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ManualCarousel galleryImages={galleryImages} />
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-4">
        <div className="h-px w-16 bg-gold/30" />
        <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
        <div className="h-px w-16 bg-gold/30" />
      </div>

      {/* Static Grid */}
      <section className="py-16 lg:py-24 bg-taupe-light">
        <div ref={gridRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${gridVisible ? 'visible' : ''}`}
            >
              Full Collection
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${gridVisible ? 'visible' : ''}`}
            >
              Every detail, <em className="text-gold">beautifully crafted.</em>
            </h2>
          </div>

          <div
            className={`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 fade-in-up fade-in-up-delay-2 ${gridVisible ? 'visible' : ''}`}
          >
            {galleryImages.map((img, i) => (
              <div key={i} className="break-inside-avoid overflow-hidden group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{
                    height: i % 3 === 0 ? '380px' : i % 3 === 1 ? '300px' : '340px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
