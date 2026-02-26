import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Gourmet Grazin'" className="h-20 w-20 object-contain mb-4 invert brightness-75 sepia hue-rotate-[15deg] saturate-[0.3]" />
            <p className="text-cream/60 font-light text-sm leading-relaxed max-w-xs">
              Elevated charcuterie and custom mobile carts for weddings, showers, parties,
              and more. Proudly serving Kentucky.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-cream/80">Navigation</h4>
            <div className="space-y-3">
              {['About', 'Services', 'Gallery', 'Events', 'FAQ'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-cream/60 text-sm font-light hover:text-gold transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-cream/80">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/gourmetgrazingky/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/60 text-sm font-light hover:text-gold transition-colors duration-300"
              >
                <Instagram size={16} />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578270886953"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/60 text-sm font-light hover:text-gold transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
            </div>

            <div className="mt-8">
              <p className="text-cream/40 text-xs tracking-wide">Kentucky</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Gourmet Grazin'. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs">
            Kentucky
          </p>
        </div>
      </div>
    </footer>
  )
}
