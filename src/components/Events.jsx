import { useInView } from './useInView'

const eventTypes = [
  'Wedding Reception',
  'Cocktail Hour',
  'Baby Shower',
  'Bridal Shower',
  'Corporate Event',
  'Open House',
  'Birthday Party',
  'Anniversary',
  'Graduation',
  'Holiday Party',
  'Family Reunion',
  'Retail Event',
]

export default function Events({ onInquire }) {
  const [ref, isVisible] = useInView()

  return (
    <section id="events" className="py-24 lg:py-32 bg-charcoal text-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
              Perfect For Your Event
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-8 text-cream fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
              Whatever the occasion,
              <br />
              we bring the <em className="text-gold">graze.</em>
            </h2>
            <div className={`grid grid-cols-2 gap-3 mb-10 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
              {eventTypes.map(event => (
                <p key={event} className="text-cream/70 text-sm font-light tracking-wide">
                  {event}
                </p>
              ))}
            </div>
            <button
              onClick={onInquire}
              className={`border border-cream text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-cream transition-all duration-300 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}
            >
              Book Your Event
            </button>
          </div>

          {/* Right - Image */}
          <div className={`overflow-hidden fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            <img
              src="/cart-setup.jpg"
              alt="Gourmet Grazin' cart at an elegant event"
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
