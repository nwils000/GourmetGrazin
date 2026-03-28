import { useInView } from '../components/useInView'
import useSEO from '../hooks/useSEO'

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: "About Gourmet Grazin' - Meet the Owners",
  description: "Meet the husband-and-wife team behind Gourmet Grazin', Kentucky's premier charcuterie catering service.",
  url: 'https://www.gourmetgrazinky.com/meet-the-owners',
  mainEntity: {
    '@type': 'Organization',
    name: "Gourmet Grazin'",
    description: "A husband-and-wife team creating elevated charcuterie experiences across Kentucky for weddings, corporate events, and celebrations.",
    url: 'https://www.gourmetgrazinky.com',
    foundingLocation: { '@type': 'State', name: 'Kentucky' },
    knowsAbout: ['Charcuterie', 'Event Catering', 'Food Styling', 'Mobile Cart Service'],
  },
}

export default function MeetOwnersPage() {
  useSEO({
    title: 'Meet the Owners',
    description: "The husband-and-wife team behind Kentucky's premier charcuterie catering. Our story of creativity, family & elevated event experiences.",
    path: '/meet-the-owners',
    jsonLd: ABOUT_SCHEMA,
  })

  const [heroRef, heroVisible] = useInView()
  const [photoRef, photoVisible] = useInView()
  const [bioRef, bioVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  return (
    <article className="pt-24">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-cream" aria-label="Meet the owners">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}>
            Our Story
          </p>
          <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}>
            Meet the <em className="text-gold">Owners</em>
          </h1>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-16 lg:py-24 bg-taupe-light" aria-label="Owner photo">
        <div ref={photoRef} className="max-w-4xl mx-auto px-6 lg:px-8">
          <figure className={`overflow-hidden shadow-2xl fade-in-up ${photoVisible ? 'visible' : ''}`}>
            <img
              src="/owners/meettheowners.jpeg"
              alt="The husband-and-wife team behind Gourmet Grazin' charcuterie catering in Kentucky"
              className="w-full object-cover"
              width="800"
              height="600"
              fetchpriority="high"
            />
          </figure>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 lg:py-32 bg-cream" aria-label="Our story">
        <div ref={bioRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className={`text-charcoal-light text-lg leading-relaxed font-light mb-8 fade-in-up ${bioVisible ? 'visible' : ''}`}>
            We're a husband-and-wife team with a deep love for gathering people around beautiful
            spaces and even better food. What started as hosting friends and styling charcuterie
            boards for family celebrations quickly turned into a passion-driven business — and the
            beginning of something much bigger.
          </p>

          <p className={`text-charcoal-light text-lg leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-1 ${bioVisible ? 'visible' : ''}`}>
            Gourmet Grazin' became our way of blending creativity, hospitality, and intentional
            design into meaningful experiences. I handle all the design and food preparation,
            curating every detail to make each board, box, or cart experience beautiful and
            delicious. My husband brings the muscle behind the scenes, helping with setup,
            logistics, and making sure every event runs smoothly. Together, we turn vision into
            reality.
          </p>

          <p className={`text-charcoal-light text-lg leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-2 ${bioVisible ? 'visible' : ''}`}>
            Every board we create is inspired by the joy we feel when bringing people together —
            whether it's for a wedding, a milestone birthday, or an intimate celebration.
          </p>

          <p className={`text-charcoal-light text-lg leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-3 ${bioVisible ? 'visible' : ''}`}>
            At the heart of it all is our growing family. We have two little ones under two who are
            our greatest joy and our biggest motivation. Our two-year-old son is a sweet, loving boy,
            full of personality and warmth. Our daughter, now five months old, is our miracle girl —
            a bright, happy light after spending her first 86 days in the NICU and bravely undergoing
            three surgeries. Her strength has shaped our perspective on gratitude, resilience, and the
            beauty of life's moments.
          </p>

          <p className={`text-charcoal-light text-lg leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-4 ${bioVisible ? 'visible' : ''}`}>
            Entrepreneurship has always been woven into our story. My husband works as a real estate
            agent, and I'm a full-time mom who has always loved creating, hosting, and building
            ventures rooted in passion. Together, we're growing this business with a long-term dream
            in mind: one day owning our own wedding venue — a space where love stories unfold and
            unforgettable celebrations come to life.
          </p>

          <p className={`text-charcoal-light text-lg leading-relaxed font-light fade-in-up fade-in-up-delay-4 ${bioVisible ? 'visible' : ''}`}>
            Until then, we're pouring our hearts into every grazing table, cart experience, and
            detail — grateful for the opportunity to be part of your most special moments.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-taupe-light" aria-label="Get in touch">
        <div ref={ctaRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up ${ctaVisible ? 'visible' : ''}`}>
            Let's create something <em className="text-gold">beautiful.</em>
          </h2>
          <p className={`text-charcoal-light leading-relaxed font-light max-w-lg mx-auto mb-10 fade-in-up fade-in-up-delay-1 ${ctaVisible ? 'visible' : ''}`}>
            We'd love to be part of your next celebration. Reach out and let's bring your vision to life.
          </p>
          <a
            href="/luxury-cart-experiences#book-cart"
            className={`inline-block bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 fade-in-up fade-in-up-delay-2 ${ctaVisible ? 'visible' : ''}`}
          >
            Inquire Now
          </a>
        </div>
      </section>
    </article>
  )
}
