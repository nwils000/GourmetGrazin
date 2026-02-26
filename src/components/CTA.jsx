import { useInView } from './useInView'

export default function CTA({ onInquire }) {
  const [ref, isVisible] = useInView()

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
              Ready to Graze?
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
              Let's make your
              <br />
              next event <em className="text-gold">unforgettable.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed font-light mb-8 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
              We book a limited number of events each month to ensure every client receives our
              full creative attention. If you're ready for an elevated charcuterie experience,
              let's talk.
            </p>
            <button
              onClick={onInquire}
              className={`bg-charcoal text-cream px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}
            >
              Inquire Now
            </button>
          </div>

          {/* Image */}
          <div className={`overflow-hidden fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            <img
              src="/charcuterie-board.png"
              alt="Beautiful charcuterie board by Gourmet Grazin'"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
