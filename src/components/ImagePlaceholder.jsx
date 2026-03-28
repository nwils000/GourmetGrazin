export default function ImagePlaceholder({ className = 'h-48' }) {
  return (
    <div className={`bg-charcoal flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="h-px w-12 bg-gold/40" />
        <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
        <div className="h-px w-12 bg-gold/40" />
      </div>
      <p className="font-serif text-cream/70 text-lg tracking-wide italic">Gourmet Grazin'</p>
      <p className="text-cream/45 text-[10px] tracking-[0.25em] uppercase">Image unavailable</p>
      <div className="flex items-center gap-2">
        <div className="h-px w-12 bg-gold/40" />
        <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
        <div className="h-px w-12 bg-gold/40" />
      </div>
    </div>
  )
}
