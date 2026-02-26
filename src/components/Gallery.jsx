import { useInView } from './useInView'

const images = [
  { src: '/event-photo.jpg', alt: 'Gourmet Grazin event setup', span: 'lg:col-span-2 lg:row-span-2' },
  { src: '/charcuterie-board.png', alt: 'Artisan charcuterie board with meats, cheeses, and fruits', span: '' },
  { src: '/cart-closeup.jpg', alt: 'Close-up of charcuterie cart spread', span: '' },
  { src: '/cart-outdoor.png', alt: 'Outdoor event setup with mobile cart', span: '' },
  { src: '/cart-setup.jpg', alt: 'Mobile charcuterie cart panoramic view', span: 'lg:col-span-2' },
]

export default function Gallery() {
  const [ref, isVisible] = useInView()

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            Portfolio
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            A taste of our <em className="text-gold">work.</em>
          </h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
          {images.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden ${img.span} ${
                i === 0 ? 'h-[400px] lg:h-full' :
                i === 4 ? 'h-[220px]' :
                'h-[300px]'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover img-hover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
