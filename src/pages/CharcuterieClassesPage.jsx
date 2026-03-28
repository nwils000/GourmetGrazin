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

const whatWeProvide = [
  'All ingredients: assorted cheeses, cured meats, fresh fruit, nuts, crackers, and sweet treats',
  'Mini boards or platters for each participant',
  'Tools for assembly and plating tips',
  'Step-by-step guidance on design, flavor pairing, and presentation',
  'Optional take-home containers to enjoy your creations',
]

const classSizes = [
  {
    label: 'Small Group',
    participants: '6–10 participants',
    price: '$450',
    detail: 'Each participant creates their own personal board',
  },
  {
    label: 'Large Group',
    participants: '10–20 participants',
    price: '$600',
    detail: 'Stations set up so everyone can assemble a board or share a platter',
  },
]

const experienceHighlights = [
  'Learn professional tips for balancing flavors and textures',
  'Explore creative layouts for both casual and luxury entertaining',
  'Taste and enjoy your creations during the class',
  'Leave with inspiration to wow at your next gathering!',
]

const CLASS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Charcuterie Board-Building Class',
  description: 'Hands-on charcuterie board-building class in Kentucky. Learn the art of creating stunning boards with professional guidance. All ingredients and supplies included. Perfect for team building, girls\' night, bridal parties, and family events.',
  provider: {
    '@type': 'Organization',
    name: "Gourmet Grazin'",
    url: 'https://www.gourmetgrazinky.com',
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'Small Group Class (6-10 participants)',
      courseMode: 'onsite',
      duration: 'PT90M',
      offers: {
        '@type': 'Offer',
        price: '450',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'CourseInstance',
      name: 'Large Group Class (10-20 participants)',
      courseMode: 'onsite',
      duration: 'PT90M',
      offers: {
        '@type': 'Offer',
        price: '600',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
  ],
}

export default function CharcuterieClassesPage() {
  const [heroRef, heroVisible] = useInView()
  const [provideRef, provideVisible] = useInView()
  const [pricingRef, pricingVisible] = useInView()
  const [highlightsRef, highlightsVisible] = useInView()
  const [durationRef, durationVisible] = useInView()
  const [formRef, formVisible] = useInView()

  useSEO({
    title: 'Charcuterie Classes in Kentucky',
    description: 'Hands-on charcuterie board-building classes for 6-20 people. All ingredients included — perfect for team building, bridal parties & more. From $450.',
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
            the art of creating stunning boards and grazing displays. Perfect for friends,
            family, or team-building events, each class is designed to be fun, educational,
            and delicious.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* What We Provide Section */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="What's included">
        <div ref={provideRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${provideVisible ? 'visible' : ''}`}
            >
              The Experience
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${provideVisible ? 'visible' : ''}`}
            >
              What we <em className="text-gold-heading">provide.</em>
            </h2>
          </header>
          <ul className="max-w-3xl mx-auto space-y-5 list-none">
            {whatWeProvide.map((item, i) => (
              <li
                key={i}
                className={`bg-cream border border-taupe/40 p-7 md:p-8 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${provideVisible ? 'visible' : ''}`}
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

      {/* Class Size & Pricing Section */}
      <section className="py-20 lg:py-28 bg-cream" aria-label="Pricing">
        <div ref={pricingRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${pricingVisible ? 'visible' : ''}`}
            >
              Class Size & Pricing
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${pricingVisible ? 'visible' : ''}`}
            >
              Find your <em className="text-gold-heading">fit.</em>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {classSizes.map((size, i) => (
              <article
                key={size.label}
                className={`bg-taupe-light border border-taupe/40 p-8 md:p-10 text-center hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${pricingVisible ? 'visible' : ''}`}
              >
                <h3 className="font-serif text-2xl md:text-3xl mb-2">
                  {size.label}
                </h3>
                <p className="text-gold font-serif text-lg mb-2">
                  {size.participants}
                </p>
                <p className="text-gold font-serif text-3xl mb-4">
                  {size.price}
                </p>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                  {size.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Experience Highlights Section */}
      <section className="py-20 lg:py-28 bg-taupe-light" aria-label="Experience highlights">
        <div ref={highlightsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${highlightsVisible ? 'visible' : ''}`}
            >
              Experience Highlights
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${highlightsVisible ? 'visible' : ''}`}
            >
              What you'll <em className="text-gold-heading">take away.</em>
            </h2>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto list-none">
            {experienceHighlights.map((item, i) => (
              <li
                key={i}
                className={`bg-cream border border-taupe/40 p-8 md:p-10 hover:border-gold/40 transition-colors duration-500 fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${highlightsVisible ? 'visible' : ''}`}
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

      {/* Duration Section */}
      <section className="py-16 lg:py-20 bg-cream" aria-label="Class duration">
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
      <section className="py-24 lg:py-32 bg-charcoal text-cream" aria-label="Book a class">
        <div ref={formRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <p
              className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${formVisible ? 'visible' : ''}`}
            >
              Book a Class
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 text-cream fade-in-up fade-in-up-delay-1 ${formVisible ? 'visible' : ''}`}
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
