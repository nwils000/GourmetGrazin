import { Link } from 'react-router-dom'
import { useInView } from './useInView'

const services = [
  {
    number: '01',
    title: 'Mobile Charcuterie Cart',
    description: 'Our custom-built cart arrives fully stocked and served tableside by our team — an artisan spread of cheeses, cured meats, fruits, and accompaniments with a fully customizable menu. An elevated, budget-friendly centerpiece for any occasion.',
    image: '/cart-umbrella.jpg',
    imageAlt: 'Gourmet Grazin mobile charcuterie cart with umbrella at a Kentucky event',
    link: '/luxury-cart-experiences',
  },
  {
    number: '02',
    title: 'Grazing Tables',
    description: 'Stunning tablescapes overflowing with carefully curated bites. Perfect for larger gatherings where you want a dramatic, Instagram-worthy display that keeps guests mingling.',
    image: '/grazing-table.jpg',
    imageAlt: 'Stunning grazing table display with artisan cheeses, fruits, and charcuterie',
    link: '/grazing-tables',
  },
  {
    number: '03',
    title: 'Charcuterie Boards',
    description: 'From intimate dinner parties to gift-worthy arrangements, our handcrafted boards feature premium ingredients arranged with artful precision. Available in classic, sweet & savory, fruit, veggie, and fully customizable styles.',
    image: '/charcuterie-board.jpg',
    imageAlt: 'Handcrafted charcuterie board with premium cheeses, meats, and fresh fruits',
    link: '/shop#boards',
  },
  {
    number: '04',
    title: 'Charcuterie Classes',
    description: 'Learn the art of the board! Our hands-on classes are perfect for team building, girls\' night, bridal parties, or anyone who wants to master the art of a beautiful spread.',
    image: '/charcuterie-class.jpg',
    imageAlt: 'Hands-on charcuterie board-building class in progress',
    link: '/charcuterie-classes',
  },
  {
    number: '05',
    title: 'Cups, Boxes & More',
    description: 'Elegant individual charcuterie cups and curated boxes — a stunning, budget-friendly option that delivers the elevated look and feel of a full spread in a perfectly portioned package.',
    image: '/cups-boxes/cups.jpg',
    imageAlt: 'Individual charcuterie cups with artisan cheeses, crackers, and fresh fruit',
    link: '/shop#cups',
  },
]

export default function Services() {
  const [ref, isVisible] = useInView()

  return (
    <section id="services" className="py-24 lg:py-32 bg-taupe-light" aria-label="Our services">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-16 max-w-2xl">
          <p className={`text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            What We Offer
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            Every event
            <br />
            deserves a{' '}
            <em className="text-gold-heading">graze.</em>
          </h2>
          <p className={`text-charcoal-light leading-relaxed font-light max-w-md fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
            From our signature mobile cart to bespoke grazing tables,
            we craft elevated charcuterie experiences tailored to your occasion and guest count.
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Link
              to={service.link}
              key={service.number}
              className={`group fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)} ${isVisible ? 'visible' : ''}`}
            >
              <article>
                <figure className="overflow-hidden mb-4">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover img-hover"
                    loading="lazy"
                    width="400"
                    height="256"
                  />
                </figure>
                <div className="flex gap-4 items-start">
                  <span className="text-gold font-serif text-lg mt-0.5" aria-hidden="true">{service.number}</span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-charcoal-light font-light text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
