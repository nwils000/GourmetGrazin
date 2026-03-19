import { useEffect } from 'react'
import { useInView } from '../components/useInView'
import HoneyBookForm from '../components/HoneyBookForm'

export default function GrazingTablesPage() {
  const [heroRef, heroVisible] = useInView()
  const [formRef, formVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-cream pt-24 pb-16 lg:pb-24">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-6 fade-in-up ${heroVisible ? 'visible' : ''}`}
          >
            Grazing Tables
          </p>
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
          >
            Stunning spreads,
            <br />
            <em className="text-gold">unforgettable impact.</em>
          </h1>
          <p
            className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            Stunning tablescapes overflowing with carefully curated bites. Perfect for
            larger gatherings where you want a dramatic, Instagram-worthy display that
            keeps guests mingling.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 lg:py-32 bg-taupe-light">
        <div ref={formRef} className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${formVisible ? 'visible' : ''}`}
            >
              Book Your Table
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${formVisible ? 'visible' : ''}`}
            >
              Let's plan your
              <br />
              perfect <em className="text-gold">graze.</em>
            </h2>
          </div>
          <div
            className={`fade-in-up fade-in-up-delay-2 ${formVisible ? 'visible' : ''}`}
          >
            <HoneyBookForm formId="8" />
          </div>
        </div>
      </section>
    </main>
  )
}
