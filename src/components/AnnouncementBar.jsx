import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  return (
    <div className="bg-charcoal h-9 flex items-center justify-center overflow-hidden" role="region" aria-label="Site announcement">
      <Link
        to="/shop"
        className="group flex items-center gap-3 px-4 text-cream/90 hover:text-gold transition-colors duration-300 whitespace-nowrap"
      >
        <span className="text-gold text-[10px]" aria-hidden="true">&#x2726;</span>
        <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light">
          <span className="hidden sm:inline">Order Charcuterie Online &middot; </span>Shop The Collection
        </span>
        <span className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  )
}
