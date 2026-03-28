import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const servicesDropdown = [
  { label: 'Luxury Cart Experiences', href: '/luxury-cart-experiences' },
  { label: 'Grazing Tables', href: '/grazing-tables' },
  { label: 'Snack Boards', href: '/snack-boards' },
  { label: 'Cups & Boxes', href: '/cups-boxes' },
  { label: 'Charcuterie Classes', href: '/charcuterie-classes' },
  { label: 'Personalizations', href: '/personalizations' },
]

const navLinks = [
  { label: 'About', href: '#about', type: 'anchor' },
  { label: 'Services', type: 'dropdown', items: servicesDropdown },
  { label: 'Gallery', href: '/gallery', type: 'route' },
  { label: 'Meet the Owners', href: '/meet-the-owners', type: 'route' },
  { label: 'FAQ', href: '/faq', type: 'route' },
  { label: 'Shop', href: '/shop', type: 'route' },
]

export default function Navbar({ onInquire }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)
  const location = useLocation()
  const { setCartOpen, cartItemCount: itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
  }, [location])

  const handleAnchorClick = (e, href) => {
    if (location.pathname !== '/') {
      e.preventDefault()
      window.location.href = '/' + href
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
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
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {servicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-cream/98 backdrop-blur-md border border-taupe/30 shadow-lg py-2" role="menu">
                        {link.items.map(item => (
                          <Link
                            key={item.label}
                            to={item.href}
                            role="menuitem"
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

          {/* CTA + Cart */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onInquire}
              className="bg-charcoal text-cream px-6 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 rounded-none"
            >
              Inquire
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-charcoal hover:text-gold transition-colors duration-300 p-2"
              aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
            >
              <ShoppingBag size={20} aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-cream text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-sans leading-none" aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu + Cart */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-charcoal hover:text-gold transition-colors p-2"
              aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
            >
              <ShoppingBag size={20} aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-cream text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-sans leading-none" aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </button>
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-cream/98 backdrop-blur-md border-t border-taupe/30 max-h-[calc(100vh-5rem)] overflow-y-auto" role="menu">
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
                            role="menuitem"
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
                    role="menuitem"
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
                  role="menuitem"
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block py-3 text-sm tracking-[0.12em] uppercase font-light hover:text-gold transition-colors ${
                    isActive(link.href) ? 'text-gold' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <button
              onClick={() => { onInquire(); setMobileOpen(false) }}
              className="w-full bg-charcoal text-cream px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors mt-4"
            >
              Inquire
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
