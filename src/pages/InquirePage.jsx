import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import HoneyBookForm from '../components/HoneyBookForm'
import useSEO from '../hooks/useSEO'
import { REVIEW_COUNT, REVIEW_RATING } from '../data/reviews'
import { HONEYBOOK_INQUIRY_FORM_ID } from '../data/features'
import { SERVICE_AREAS } from '../data/serviceAreas'

// The live inquiry route. Runs on HoneyBook, which already handles Aiyana's
// scheduling, contracts and invoicing. The instant-quote form that replaces it
// is finished and previewable at /inquire/preview; flip INSTANT_QUOTE_LIVE in
// data/features.js when it is ready to take real customers.

export default function InquirePage() {
  useSEO({
    title: 'Book Grazing Tables & Charcuterie Catering',
    description:
      'Tell us about your event and we will come back within 24 hours with a quote. Grazing tables, charcuterie and corporate catering across Lexington and Central Kentucky. 5.0 stars from 45 reviews.',
    path: '/inquire',
  })

  return (
    <article className="bg-cream">
      <section className="pt-36 pb-12 px-6 lg:px-8" aria-label="Request a quote">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4">Get a Quote</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6">
            Tell us what you are
            <br />
            <em className="text-gold-heading">celebrating.</em>
          </h1>
          <p className="text-charcoal-light text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Grazing tables, charcuterie boards, mobile carts and corporate catering across
            Central Kentucky. Send us your date and guest count and we will come back with
            a quote within 24 hours &mdash; usually much sooner.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-gold text-gold" />
              ))}
            </span>
            <span className="text-charcoal font-serif">{REVIEW_RATING}</span>
            <span className="text-charcoal-light text-sm font-light">from {REVIEW_COUNT} Google reviews</span>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6 lg:px-8" aria-label="Inquiry form">
        <div className="max-w-3xl mx-auto">
          <HoneyBookForm formId={HONEYBOOK_INQUIRY_FORM_ID} />
          <p className="text-charcoal-light text-sm font-light text-center mt-8">
            Prefer to talk it through?{' '}
            <a href="tel:+15027358428" className="text-gold-accessible underline">
              (502) 735-8428
            </a>
            . Or browse the{' '}
            <Link to="/menu" className="text-gold-accessible underline">
              full menu and pricing
            </Link>{' '}
            first.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-8" aria-label="Where we serve">
        <div className="max-w-3xl mx-auto text-center border-t border-taupe/40 pt-12">
          <h2 className="font-serif text-2xl mb-4">
            Serving <em className="text-gold-heading">Central Kentucky.</em>
          </h2>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 list-none">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  to={`/${area.slug}`}
                  className="text-charcoal-light text-sm font-light hover:text-gold transition-colors"
                >
                  {area.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}
