import { Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-cream mb-4 tracking-wide">Gourmet Grazin'</h3>
            <p className="text-cream/80 font-light text-sm leading-relaxed max-w-xs">
              Elevated charcuterie and custom mobile carts for weddings, showers, parties,
              and more. Proudly serving Kentucky.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-cream/80">Navigation</h4>
            <div className="space-y-3">
              <a
                href="#about"
                className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300"
              >
                About
              </a>
              <Link to="/luxury-cart-experiences" className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300">Luxury Cart Experiences</Link>
              <Link to="/grazing-tables" className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300">Grazing Tables</Link>
              <Link to="/charcuterie-classes" className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300">Charcuterie Classes</Link>
              <Link to="/shop" className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300">Shop</Link>
              <Link to="/gallery" className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300">Gallery</Link>
              <Link to="/meet-the-owners" className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300">Meet the Owners</Link>
              <Link to="/faq" className="block text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300">FAQ</Link>
            </div>
          </nav>

          {/* Social & Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-cream/80">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/gourmetgrazingky/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300"
                aria-label="Follow Gourmet Grazin' on Instagram"
              >
                <Instagram size={16} aria-hidden="true" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578270886953"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/80 text-sm font-light hover:text-gold transition-colors duration-300"
                aria-label="Follow Gourmet Grazin' on Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
            </div>

            <address className="mt-8 not-italic">
              <p className="text-cream/60 text-xs tracking-wide">Kentucky, United States</p>
            </address>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/60 text-xs">
            &copy; {new Date().getFullYear()} Gourmet Grazin'. All rights reserved.
          </p>
          <p className="text-cream/60 text-xs">
            Charcuterie Catering &middot; Kentucky
          </p>
        </div>

        {/* Centered white logo at bottom */}
        <div className="mt-12 flex justify-center">
          <img src="/logo.png" alt="Gourmet Grazin' logo" className="h-24 w-24 object-contain" width="96" height="96" loading="lazy" />
        </div>
      </div>
    </footer>
  )
}
