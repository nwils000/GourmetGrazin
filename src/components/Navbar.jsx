import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import AnnouncementBar from './AnnouncementBar'

const servicesDropdown = [
  { label: 'Grazing Tables', href: '/grazing-tables' },
  { label: 'Corporate & Lunch Catering', href: '/corporate-catering' },
  { label: 'Luxury Cart Experiences', href: '/luxury-cart-experiences' },
  { label: 'Charcuterie Classes', href: '/charcuterie-classes' },
]

// One CTA only. Everything routes to the inquiry form, which is the sales funnel.
const navLinks = [
  { label: 'Services', type: 'dropdown', items: servicesDropdown },
  { label: 'Menu', href: '/menu', type: 'route' },
  { label: 'Gallery', href: '/gallery', type: 'route' },
  { label: 'About', href: '/meet-the-owners', type: 'route' },
  { label: 'FAQ', href: '/faq', type: 'route' },
]

export default function Navbar({ onInquire }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu whenever the user navigates to a new route.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
    setMobileServicesOpen(false)
  }, [location])

  const handleAnchorClick = (e, href) => {
    if (location.pathname !== '/') {
      e.preventDefault()
      window.location.assign('/' + href)
    }
    setMobileOpen(false)
  }

  const handleDropdownEnter = () => {
    clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150)
  }

  const isActive = (href) => location.pathname === href

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main navigation"
    >
      <AnnouncementBar />
      <div className={`transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-cream/85 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Gourmet Grazin' - Home">
            <span className="font-serif text-2xl text-charcoal tracking-wide">Gourmet Grazin'</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => {
              if (link.type === 'dropdown') {
                return (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className="flex items-center gap-1 text-charcoal text-sm tracking-[0.12em] uppercase font-light hover:text-gold transition-colors duration-300"
                      aria-expanded={servicesOpen}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {servicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-cream/98 backdrop-blur-md border border-taupe/30 shadow-lg py-2">
                        {link.items.map(item => (
                          <Link
                            key={item.label}
                            to={item.href}
aria-current={isActive(item.href) ? 'page' : undefined}
                            className={`block px-5 py-3 text-sm font-light hover:text-gold hover:bg-taupe-light/50 transition-colors duration-200 ${
                              isActive(item.href) ? 'text-gold' : 'text-charcoal'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              if (link.type === 'anchor') {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-charcoal text-sm tracking-[0.12em] uppercase font-light hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                )
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`text-sm tracking-[0.12em] uppercase font-light hover:text-gold transition-colors duration-300 ${
                    isActive(link.href) ? 'text-gold' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+15027358428"
              className="text-charcoal hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
              (502) 735-8428
            </a>
            <button
              onClick={onInquire}
              className="bg-charcoal text-cream px-6 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 rounded-none"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="text-charcoal p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-cream/98 backdrop-blur-md border-t border-taupe/30 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map(link => {
              if (link.type === 'dropdown') {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full py-3 text-charcoal text-sm tracking-[0.12em] uppercase font-light"
                      aria-expanded={mobileServicesOpen}
                    >
                      {link.label}
                      <ChevronDown size={16} className={`text-gold transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 pb-2 space-y-1 border-l-2 border-gold/30 ml-2">
                        {link.items.map(item => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
aria-current={isActive(item.href) ? 'page' : undefined}
                            className={`block py-2 text-sm font-light hover:text-gold transition-colors ${
                              isActive(item.href) ? 'text-gold' : 'text-charcoal-light'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              if (link.type === 'anchor') {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                                        className="block py-3 text-charcoal text-sm tracking-[0.12em] uppercase font-light hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                )
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                                    aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block py-3 text-sm tracking-[0.12em] uppercase font-light hover:text-gold transition-colors ${
                    isActive(link.href) ? 'text-gold' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => { onInquire(); setMobileOpen(false) }}
                className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors"
              >
                Get a Quote
              </button>
              <a
                href="tel:+15027358428"
                className="w-full border border-charcoal text-charcoal text-center px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-cream transition-colors"
              >
                Call (502) 735-8428
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
