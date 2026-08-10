import { useState } from 'react'
import { Play } from 'lucide-react'
import { useInView } from './useInView'

// The FOX 56 "Live from Chevy Chase" segment.
const VIDEO_ID = 'rwli1wftDW4'
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`

// Add new press / podcast / magazine features here. The row centers itself.
// `url` is optional; a feature without one renders as a plain (unlinked) card.
const features = [
  {
    name: 'FOX 56',
    detail: 'Television Interview',
    img: '/press/fox-56',
    alt: 'FOX 56 logo: Gourmet Grazin’ featured in a FOX 56 television interview',
    url: VIDEO_URL,
  },
  {
    name: 'Live From Chevy Chase',
    detail: 'FOX 56 Lifestyle Show',
    img: '/press/live-from-chevy-chase',
    alt: 'Live From Chevy Chase logo: Gourmet Grazin’ featured on Live From Chevy Chase',
    url: VIDEO_URL,
  },
]

// Click-to-play facade: the YouTube player (700KB+ of third-party script) is only
// loaded once someone actually asks for it, so the homepage stays fast.
function SegmentPlayer() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative w-full aspect-video bg-charcoal overflow-hidden">
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="Gourmet Grazin' featured on FOX 56's Live From Chevy Chase"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label="Play the Gourmet Grazin’ segment from FOX 56’s Live From Chevy Chase"
        >
          <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute inset-0 bg-charcoal/25 group-hover:bg-charcoal/40 transition-colors duration-300" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream/95 group-hover:bg-cream transition-all duration-300 group-hover:scale-105">
              <Play
                size={26}
                className="fill-charcoal text-charcoal ml-1"
                aria-hidden="true"
              />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

function FeatureCard({ feature }) {
  const inner = (
    <>
      <picture>
        <source srcSet={`${feature.img}.webp`} type="image/webp" />
        <img
          src={`${feature.img}.jpg`}
          alt={feature.alt}
          className="w-28 h-28 md:w-32 md:h-32 object-contain"
          width="258"
          height="258"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <p className="text-charcoal text-sm font-medium tracking-wide mt-6 text-center">
        {feature.name}
      </p>
      <p className="text-gold-accessible text-xs tracking-[0.15em] uppercase mt-1 text-center">
        {feature.detail}
      </p>
    </>
  )

  const className =
    'flex flex-col items-center bg-warm-white border border-taupe/30 px-8 py-8 w-[260px] md:w-[280px]'

  return (
    <li className="flex">
      {feature.url ? (
        <a
          href={feature.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} hover:border-gold transition-colors duration-300`}
        >
          {inner}
        </a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </li>
  )
}

export default function AsSeenOn() {
  const [ref, isVisible] = useInView()

  return (
    <section id="as-seen-on" className="py-24 lg:py-32 bg-cream" aria-label="Press and media features">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-14">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            As Seen On
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            Featured on <em className="text-gold-heading">FOX 56.</em>
          </h2>
          <p className={`text-charcoal-light leading-relaxed font-light max-w-xl mx-auto fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            We joined <em>Live From Chevy Chase</em>, the FOX 56 lifestyle show in Lexington,
            to talk elevated charcuterie, grazing tables, and the cart that started it all.
          </p>
        </header>

        {/* Segment */}
        <div className={`max-w-3xl mx-auto mb-14 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
          <SegmentPlayer />
        </div>

        {/* Logos */}
        <ul className={`flex flex-wrap items-stretch justify-center gap-6 md:gap-10 fade-in-up fade-in-up-delay-4 ${isVisible ? 'visible' : ''}`}>
          {features.map((feature) => (
            <FeatureCard key={feature.name} feature={feature} />
          ))}
        </ul>
      </div>
    </section>
  )
}
