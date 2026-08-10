import { useInView } from './useInView'

// Add new press / podcast / magazine features here — the grid centers itself.
const features = [
  {
    name: 'FOX 56',
    detail: 'TV Interview',
    img: '/press/fox-56',
    alt: 'FOX 56 logo — Gourmet Grazin’ featured in a FOX 56 television interview',
  },
  {
    name: 'Live From Chevy Chase',
    detail: 'Featured Guest',
    img: '/press/live-from-chevy-chase',
    alt: 'Live From Chevy Chase logo — Gourmet Grazin’ featured on Live From Chevy Chase',
  },
]

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
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            In the <em className="text-gold-heading">spotlight.</em>
          </h2>
        </header>

        {/* Logos */}
        <ul className={`flex flex-wrap items-stretch justify-center gap-6 md:gap-10 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
          {features.map((feature) => (
            <li
              key={feature.name}
              className="flex flex-col items-center bg-warm-white border border-taupe/30 px-8 py-8 w-[260px] md:w-[280px]"
            >
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
