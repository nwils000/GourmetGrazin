import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'
import useSEO from './hooks/useSEO'

// Lazy-loaded route chunks — only downloaded when visited
const FAQPage = lazy(() => import('./pages/FAQPage'))
const LuxuryCartPage = lazy(() => import('./pages/LuxuryCartPage'))
const MeetOwnersPage = lazy(() => import('./pages/MeetOwnersPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const GrazingTablesPage = lazy(() => import('./pages/GrazingTablesPage'))
const CharcuterieClassesPage = lazy(() => import('./pages/CharcuterieClassesPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    </div>
  )
}

function HomePage({ onInquire }) {
  useSEO({
    title: null,
    description: "Kentucky's premier charcuterie catering — mobile carts, grazing tables, boards & classes for weddings, corporate events and parties. Book today!",
    path: '/',
  })

  return (
    <>
      <Hero onInquire={onInquire} />
      <Marquee />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <HowItWorks />
      <CTA onInquire={onInquire} />
    </>
  )
}

function App() {
  const navigate = useNavigate()

  const handleInquire = () => {
    navigate('/luxury-cart-experiences#book-cart')
    setTimeout(() => {
      document.getElementById('book-cart')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <CartProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:text-cream focus:px-6 focus:py-3 focus:text-sm"
      >
        Skip to main content
      </a>
      <div className="min-h-screen bg-cream">
        <ScrollToTop />
        <Navbar onInquire={handleInquire} />
        <Cart />
        <main id="main-content" role="main">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage onInquire={handleInquire} />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/luxury-cart-experiences" element={<LuxuryCartPage />} />
              <Route path="/meet-the-owners" element={<MeetOwnersPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/grazing-tables" element={<GrazingTablesPage />} />
              <Route path="/charcuterie-classes" element={<CharcuterieClassesPage />} />
              <Route path="/shop" element={<ShopPage />} />
              {/* Redirects from old product pages to unified shop */}
              <Route path="/snack-boards" element={<Navigate to="/shop#boards" replace />} />
              <Route path="/cups-boxes" element={<Navigate to="/shop#cups" replace />} />
              <Route path="/personalizations" element={<Navigate to="/shop#personalizations" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
