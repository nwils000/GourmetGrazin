import { useInView } from './useInView'

const services = [
  {
    number: '01',
    title: 'Mobile Charcuterie Cart',
    description: 'Our signature custom-built cart arrives at your venue fully stocked with an artisan spread of cheeses, cured meats, fruits, crackers, and accompaniments. A show-stopping centerpiece for any event.',
  },
  {
    number: '02',
    title: 'Grazing Tables',
    description: 'Stunning tablescapes overflowing with carefully curated bites. Perfect for larger gatherings where you want a dramatic, Instagram-worthy display that keeps guests mingling.',
  },
  {
    number: '03',
    title: 'Charcuterie Boards',
    description: 'From intimate dinner parties to gift-worthy arrangements, our handcrafted boards feature premium ingredients arranged with artful precision. Available in multiple sizes.',
  },
  {
    number: '04',
    title: 'Charcuterie Classes',
    description: 'Learn the art of the board! Our hands-on classes are perfect for team building, girls\' night, bridal parties, or anyone who wants to master the art of a beautiful spread.',
  },
]

export default function Services() {
  const [ref, isVisible] = useInView()

  return (
    <section id="services" className="py-24 lg:py-32 bg-taupe-light">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Heading */}
          <div>
            <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
              What We Offer
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
              Every event
              <br />
              deserves a{' '}
              <em className="text-gold">graze.</em>
            </h2>
            <p className={`text-charcoal-light leading-relaxed font-light max-w-md fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
              From our signature mobile cart to bespoke grazing tables,
              we craft elevated charcuterie experiences tailored to your occasion and guest count.
            </p>
          </div>

          {/* Right - Service List */}
          <div className="space-y-0">
            {services.map((service, i) => (
              <div
                key={service.number}
                className={`border-t border-charcoal/15 py-8 group cursor-default fade-in-up fade-in-up-delay-${i + 1} ${isVisible ? 'visible' : ''}`}
              >
                <div className="flex gap-6">
                  <span className="text-gold font-serif text-lg">{service.number}</span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-charcoal-light font-light text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-charcoal/15" />
          </div>
        </div>
      </div>
    </section>
  )
}
