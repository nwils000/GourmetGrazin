import { useInView } from '../components/useInView'
import HoneyBookForm from '../components/HoneyBookForm'
import useSEO from '../hooks/useSEO'

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4" aria-hidden="true">
      <div className="h-px w-16 bg-gold/30" />
      <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold/50" />
      <div className="h-px w-16 bg-gold/30" />
    </div>
  )
}

const pricingTiers = [
  {
    label: '2–4 Guests',
    price: '$75',
    unit: 'per guest',
    detail: 'Intimate experience — ideal for date nights or small gatherings',
  },
  {
    label: '5–8 Guests',
    price: '$65',
    unit: 'per guest',
    detail: 'Girls’ nights, small celebrations, cozy group experience',
  },
  {
    label: '9–14 Guests',
    price: '$58',
    unit: 'per guest',
    detail: 'Most popular for parties and social workshops',
    featured: true,
  },
  {
    label: '15–20 Guests',
    price: '$52',
    unit: 'per guest',
    detail: 'Best value per guest for larger gatherings and events',
  },
]

const whatsIncluded = [
  'All ingredients and supplies',
  'Premium cheeses and accompaniments',
  'Step-by-step styling instruction',
  'Individual take-home charcuterie boards',
  'Setup and cleanup',
]

const optionalEnhancements = [
  {
    title: 'Curated Mocktail Bar',
    detail: 'A bespoke mocktail experience to pair with your boards — perfect for showers, birthdays, and dry events.',
  },
  {
    title: 'Premium Acacia Wood Boards',
    detail: 'Upgrade to gorgeous acacia wood boards for each guest to style on and take home as a keepsake.',
  },
  {
    title: 'Custom Laser-Engraved Boards',
    detail: 'Personalized acacia boards engraved with logos, names, or special messages — ideal for bridal parties, gifts, and branded events.',
  },
]

const classPhotos = [
  { jpg: '/class/owner-cheese.jpg', webp: '/class/owner-cheese.webp', alt: 'Gourmet Grazin’ instructor demonstrating a premium cheese during a charcuterie workshop' },
  { jpg: '/class/guests-styling.jpg', webp: '/class/guests-styling.webp', alt: 'Workshop guests styling their personal charcuterie boards with fresh kiwi and rosemary' },
  { jpg: '/class/guests-assembling.jpg', webp: '/class/guests-assembling.webp', alt: 'Attendees assembling individual charcuterie plates with salami roses and seasonal fruit' },
  { jpg: '/class/owner-cutting.jpg', webp: '/class/owner-cutting.webp', alt: 'Gourmet Grazin’ instructor cutting cheese during a hands-on charcuterie class' },
  { jpg: '/class/group-photo.jpg', webp: '/class/group-photo.webp', alt: 'Happy charcuterie workshop guests holding the boards they styled' },
  { jpg: '/class/place-setting.jpg', webp: '/class/place-setting.webp', alt: 'Individual workshop place setting with palm-leaf board and pre-portioned ingredients' },
  { jpg: '/class/table-setup.jpg', webp: '/class/table-setup.webp', alt: 'Long table set with individual charcuterie stations ready for a Gourmet Grazin’ workshop' },
]

const CLASS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Charcuterie Class & Workshop',
  description: 'Hands-on charcuterie workshop in Kentucky. Learn to style your own board with premium ingredients, step-by-step instruction, and take-home charcuterie boards. From $52 per guest depending on group size.',
  provider: {
    '@type': 'Organization',
    name: "Gourmet Grazin'",
    url: 'https://www.gourmetgrazinky.com',
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'Intimate Workshop (2-4 guests)',
      courseMode: 'onsite',
      duration: 'PT90M',
      offers: { '@type': 'Offer', price: '75', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'CourseInstance',
      name: 'Small Group Workshop (5-8 guests)',
      courseMode: 'onsite',
      duration: 'PT90M',
      offers: { '@type': 'Offer', price: '65', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'CourseInstance',
      name: 'Signature Workshop (9-14 guests)',
      courseMode: 'onsite',
      duration: 'PT90M',
      offers: { '@type': 'Offer', price: '58', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'CourseInstance',
      name: 'Group Workshop (15-20 guests)',
      courseMode: 'onsite',
      duration: 'PT90M',
      offers: { '@type': 'Offer', price: '52', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    },
  ],
}

export default function CharcuterieClassesPage() {
  const [heroRef, heroVisible] = useInView()
  const [galleryRef, galleryVisible] = useInView()
  const [pricingRef, pricingVisible] = useInView()
  const [includedRef, includedVisible] = useInView()
  const [enhancementsRef, enhancementsVisible] = useInView()
  const [durationRef, durationVisible] = useInView()
  const [formRef, formVisible] = useInView()

  useSEO({
    title: 'Charcuterie Classes & Workshops in Kentucky',
    description: 'Hands-on charcuterie workshops for 2-20 guests in Kentucky. Premium ingredients, step-by-step styling, and take-home boards. From $52 per guest based on group size.',
    path: '/charcuterie-classes',
    jsonLd: CLASS_SCHEMA,
  })

  return (
    <article>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-cream pt-24 pb-16 lg:pb-24" aria-label="Charcuterie Classes overview">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}
          >
            Charcuterie Classes
          </p>
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
          >
            Learn the art
            <br />
            <em className="text-gold-heading">of the board.</em>
          </h1>
          <p
            className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            Join us for a hands-on, interactive charcuterie experience where we teach you
            the art of styling stunning boards with premium ingredients. Perfect for date
            nights, girls&rsquo; nights, bridal parties, and team-building events.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Photo Gallery Section */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="Workshop photos">
        <div ref={galleryRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${galleryVisible ? 'visible' : ''}`}
            >
              The Workshop
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${galleryVisible ? 'visible' : ''}`}
            >
              See it in <em className="text-gold-heading">action.</em>
            </h2>
          </header>
          <div
            className={`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 fade-in-up fade-in-up-delay-2 ${galleryVisible ? 'visible' : ''}`}
          >
            {classPhotos.map((photo, i) => (
              <figure key={photo.jpg} className="break-inside-avoid overflow-hidden group">
                <picture>
                  <source srcSet={photo.webp} type="image/webp" />
                  <img
                    src={photo.jpg}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ height: i % 3 === 0 ? '380px' : i % 3 === 1 ? '300px' : '340px' }}
                  />
                </picture>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Workshop Pricing Section */}
      <section className="py-20 lg:py-28 bg-cream" aria-label="Workshop pricing">
        <div ref={pricingRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${pricingVisible ? 'visible' : ''}`}
            >
              Workshop Pricing
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5 fade-in-up fade-in-up-delay-1 ${pricingVisible ? 'visible' : ''}`}
            >
              Priced for <em className="text-gold-heading">your group.</em>
            </h2>
            <p
              className={`text-charcoal-light font-light text-sm md:text-base leading-relaxed fade-in-up fade-in-up-delay-2 ${pricingVisible ? 'visible' : ''}`}
            >
              Pricing is based on group size to ensure the best experience, ingredient
              quality, and level of instruction for your event.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <article
                key={tier.label}
                className={`relative bg-taupe-light border p-8 text-center hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${pricingVisible ? 'visible' : ''} ${tier.featured ? 'border-gold/60' : 'border-taupe/40'}`}
              >
                {tier.featured && (
                  <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-cream text-[0.65rem] tracking-[0.25em] uppercase px-3 py-1">
                    Most Popular
                  </p>
                )}
                <h3 className="font-serif text-xl md:text-2xl mb-3">
                  {tier.label}
                </h3>
                <p className="text-gold font-serif text-4xl leading-none">
                  {tier.price}
                </p>
                <p className="text-charcoal-light text-xs tracking-[0.2em] uppercase mt-2 mb-5">
                  {tier.unit}
                </p>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {tier.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What's Included Section */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="What's included">
        <div ref={includedRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${includedVisible ? 'visible' : ''}`}
            >
              What&rsquo;s Included
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${includedVisible ? 'visible' : ''}`}
            >
              Everything you <em className="text-gold-heading">need.</em>
            </h2>
          </header>
          <ul className="max-w-3xl mx-auto space-y-5 list-none">
            {whatsIncluded.map((item, i) => (
              <li
                key={item}
                className={`bg-cream border border-taupe/40 p-7 md:p-8 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${includedVisible ? 'visible' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-gold text-lg mt-0.5" aria-hidden="true">&#10047;</span>
                  <p className="text-charcoal-light font-light text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider />

      {/* Optional Enhancements Section */}
      <section className="py-20 lg:py-28 bg-cream" aria-label="Optional enhancements">
        <div ref={enhancementsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${enhancementsVisible ? 'visible' : ''}`}
            >
              Optional Enhancements
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${enhancementsVisible ? 'visible' : ''}`}
            >
              Make it <em className="text-gold-heading">unforgettable.</em>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {optionalEnhancements.map((item, i) => (
              <article
                key={item.title}
                className={`bg-taupe-light border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${enhancementsVisible ? 'visible' : ''}`}
              >
                <span className="text-gold text-lg" aria-hidden="true">&#10047;</span>
                <h3 className="font-serif text-xl md:text-2xl mt-3 mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Duration Section */}
      <section className="py-16 lg:py-20 bg-taupe-light" aria-label="Class duration">
        <div ref={durationRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div
            className={`fade-in-up ${durationVisible ? 'visible' : ''}`}
          >
            <p className="text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4">
              Duration
            </p>
            <p className="font-serif text-2xl md:text-3xl leading-relaxed">
              <time dateTime="PT90M">~90 minutes</time>
            </p>
            <p className="text-charcoal-light font-light text-sm mt-3">
              Includes setup, instruction, and tasting
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Form Section */}
      <section className="py-20 lg:py-24 bg-cream" aria-label="Book a workshop">
        <div ref={formRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${formVisible ? 'visible' : ''}`}
            >
              Book a Workshop
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${formVisible ? 'visible' : ''}`}
            >
              Reserve your
              <br />
              <em className="text-gold-heading">spot.</em>
            </h2>
          </header>
          <div
            className={`fade-in-up fade-in-up-delay-2 ${formVisible ? 'visible' : ''}`}
          >
            <HoneyBookForm formId="9" />
          </div>
        </div>
      </section>
    </article>
  )
}
