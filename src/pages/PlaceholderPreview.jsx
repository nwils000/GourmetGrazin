export default function PlaceholderPreview() {
  return (
    <div className="pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-serif text-4xl mb-2 text-center">Placeholder Image Options</h1>
        <p className="text-charcoal-light text-center mb-16 font-light">Pick your favorite — shown at the size they'd appear on product cards</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Option 1: Minimal elegant */}
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 text-center">Option 1 — Minimal</p>
            <div className="w-full h-48 bg-taupe-light border border-taupe/30 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border border-gold/40 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/60">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p className="text-charcoal-light/50 text-xs tracking-[0.15em] uppercase">No image available</p>
            </div>
          </div>

          {/* Option 2: Brand-forward with logo mark */}
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 text-center">Option 2 — Brand</p>
            <div className="w-full h-48 bg-charcoal flex flex-col items-center justify-center gap-4">
              <p className="font-serif text-2xl text-cream/20 tracking-wide">GG</p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gold/30" />
                <p className="text-cream/40 text-[10px] tracking-[0.2em] uppercase">Photo coming soon</p>
                <div className="h-px w-8 bg-gold/30" />
              </div>
            </div>
          </div>

          {/* Option 3: Gold accent pattern */}
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 text-center">Option 3 — Pattern</p>
            <div className="w-full h-48 bg-taupe-light border border-taupe/30 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/25" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/25" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/25" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/25" />
              <div className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
              <p className="font-serif text-charcoal-light/40 text-sm italic">Image coming soon</p>
              <div className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
            </div>
          </div>

          {/* Option 4: Soft gradient with icon */}
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 text-center">Option 4 — Soft</p>
            <div className="w-full h-48 bg-gradient-to-br from-taupe-light to-taupe/40 flex flex-col items-center justify-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold/40">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
                <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
              </svg>
              <p className="text-charcoal-light/40 text-xs tracking-[0.15em] uppercase">No photo yet</p>
            </div>
          </div>

          {/* Option 5: Sophisticated dark */}
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 text-center">Option 5 — Dark Elegant</p>
            <div className="w-full h-48 bg-charcoal/90 flex flex-col items-center justify-center gap-4 border border-gold/10">
              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-gold/30" />
                <div className="h-1.5 w-1.5 rotate-45 bg-gold/50" />
                <div className="h-px w-12 bg-gold/30" />
              </div>
              <p className="font-serif text-cream/30 text-lg tracking-wide italic">Gourmet Grazin'</p>
              <p className="text-cream/20 text-[10px] tracking-[0.25em] uppercase">Image unavailable</p>
              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-gold/30" />
                <div className="h-1.5 w-1.5 rotate-45 bg-gold/50" />
                <div className="h-px w-12 bg-gold/30" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
