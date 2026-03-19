import { useEffect } from 'react'
import { useInView } from '../components/useInView'
import HoneyBookForm from '../components/HoneyBookForm'

export default function CharcuterieClassesPage() {
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
            Charcuterie Classes
          </p>
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 fade-in-up fade-in-up-delay-1 ${heroVisible ? 'visible' : ''}`}
          >
            Learn the art
            <br />
            <em className="text-gold">of the board.</em>
          </h1>
          <p
            className={`text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed fade-in-up fade-in-up-delay-2 ${heroVisible ? 'visible' : ''}`}
          >
            Our hands-on classes are perfect for team building, girls' night, bridal
            parties, or anyone who wants to master the art of a beautiful spread.
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
              Book a Class
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${formVisible ? 'visible' : ''}`}
            >
              Reserve your
              <br />
              <em className="text-gold">spot.</em>
            </h2>
          </div>
          <div
            className={`fade-in-up fade-in-up-delay-2 ${formVisible ? 'visible' : ''}`}
          >
            <HoneyBookForm formId="9" />
          </div>
        </div>
      </section>
    </main>
  )
}
