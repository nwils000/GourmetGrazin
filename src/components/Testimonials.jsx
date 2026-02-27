import { useInView } from './useInView'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Madisyn Wankier Arnett',
    event: 'Baby Shower',
    text: "I couldn't recommend Gourmet Grazin' more. They are a perfect Pinterest find for any party. They catered my Baby Shower and it was so easy to make the menu accessible for my strict diet during my pregnancy. The staff was so helpful, cheerful, and added to the vibes of the party.",
  },
  {
    name: 'Paty Vance',
    event: 'Private Event',
    text: 'I highly recommend this charcuterie cart business! My personal experience was absolutely wonderful from start to finish. The service was friendly, professional, and very attentive to every detail. The presentation was beautiful, elegant, and truly impressive\u2014it added a special touch to the event.',
  },
  {
    name: 'Heather Norden Toy',
    event: 'Private Event',
    text: "Gourmet Grazin' exceeded all expectations. The cart itself was beautifully styled, the selection was outstanding, and the attention to detail really showed. It was the perfect balance of elegant and fun, and our guests kept coming back for more. Would absolutely book again.",
  },
  {
    name: 'Sophie Risher',
    event: 'Multiple Events',
    text: "Using Gourmet Grazin' is such a cool experience! I've got to be at several events they were catering and the service is just amazing! They are so personable and professional in everything they do. Whether it's the setting up or the service itself, they always deliver! 10/10 would recommend!",
  },
  {
    name: 'Kensey Denninghoff Hill',
    event: 'Baby Shower',
    text: "Gourmet Grazin' was AMAZING! The team created a sweet and salty menu and it was the perfect balance for the baby shower\u2014everything was fresh, delicious, and beautifully displayed. The cart itself was stunning and added such a special touch to our event. The setup & service was so seamless and professional!",
  },
  {
    name: 'Lindsey Barber',
    event: 'Wedding Reception',
    text: "I had Gourmet Grazin' at my wedding reception and it was perfect! I got to pick everything on it, it was exactly what I envisioned. The owners were so kind and made everything stress free. They took care of everything, so many guests were complimenting it. I will be hiring again for my next event!!",
  },
  {
    name: 'Christa Stocker Campbell',
    event: 'Open House',
    text: "Gourmet Grazin' catered our open house for our brand-new childcare center and was absolutely incredible! The menu was thoughtfully personalized to fit our needs and very affordable. It was such a fun and unique experience\u2014many of our guests are still talking about it. We can't wait to have them back!",
  },
  {
    name: 'Julie Ann McGuire',
    event: 'Special Event',
    text: 'This Charcuterie cart was AMAZING!!! The set up was gorgeous and the variety of options for the food was outstanding and delicious!! Everyone was raving about it!!! I would highly recommend for any event!',
  },
  {
    name: 'Jennifer Christensen Squire',
    event: 'Baby Shower',
    text: "Gourmet Grazin' was at a baby shower I attended and it was great! I loved the ability to customize the food. Everything was super clean and the staff were a lot of fun!",
  },
  {
    name: 'Cheri Norden Risher',
    event: 'Baby Shower',
    text: "Gourmet Grazin' was fabulous! We used them for our niece's baby shower and everyone loved it! Lots of guests were asking for their information. Such a fun concept!",
  },
  {
    name: 'Grace Glenaman',
    event: 'Corporate Event',
    text: "We had a school event for our childcare center and everyone's bellies definitely thanked Gourmet Grazin' by the end of the night. Plenty of food and snacks to hit any and every sweet or salty tooth! Staff was very accommodating and never missed a beat for our event!",
  },
  {
    name: 'Elevated Event Rentals',
    event: 'Event Partner',
    text: "We love collaborating with Gourmet Grazin' for various events!",
  },
]

const row1 = testimonials.slice(0, 6)
const row2 = testimonials.slice(6, 12)

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card flex-shrink-0 w-[350px] md:w-[400px] bg-warm-white border border-taupe/30 p-8 mx-3">
      <Quote size={24} className="text-gold/30 mb-4 rotate-180" />
      <Stars />
      <p className="font-serif text-sm leading-relaxed text-charcoal/85 mb-6 italic">
        "{testimonial.text}"
      </p>
      <div className="border-t border-taupe/30 pt-4">
        <p className="text-charcoal text-sm font-medium tracking-wide">
          {testimonial.name}
        </p>
        <p className="text-gold text-xs tracking-[0.15em] uppercase mt-1">
          {testimonial.event}
        </p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [ref, isVisible] = useInView()

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-taupe-light overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <p className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 fade-in-up ${isVisible ? 'visible' : ''}`}>
            What Our Clients Say
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl leading-[1.1] mb-6 fade-in-up fade-in-up-delay-1 ${isVisible ? 'visible' : ''}`}>
            Loved by hosts <em className="text-gold">everywhere.</em>
          </h2>
        </div>

        {/* Google Rating Badge */}
        <div className={`flex items-center justify-center gap-3 mb-16 fade-in-up fade-in-up-delay-2 ${isVisible ? 'visible' : ''}`}>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-gold text-gold" />
            ))}
          </div>
          <span className="text-charcoal font-serif text-lg">5.0</span>
          <span className="text-charcoal-light text-sm font-light">on Google</span>
        </div>
      </div>

      {/* Scrolling Rows */}
      <div className={`space-y-6 fade-in-up fade-in-up-delay-3 ${isVisible ? 'visible' : ''}`}>
        {/* Row 1 - scrolls left */}
        <div className="testimonial-scroll-mask">
          <div className="testimonial-scroll-left">
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls right */}
        <div className="testimonial-scroll-mask">
          <div className="testimonial-scroll-right">
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
