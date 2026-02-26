export default function Marquee() {
  const items = [
    'Mobile Charcuterie Cart',
    'Grazing Tables',
    'Charcuterie Boards',
    'Charcuterie Classes',
    'Weddings',
    'Corporate Events',
    'Bridal Showers',
    'Private Parties',
  ]

  return (
    <div className="bg-charcoal py-4 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-cream/90 text-xs tracking-[0.2em] uppercase mx-8 flex items-center gap-8">
            {item}
            <span className="text-gold">&#x2022;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
