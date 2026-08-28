import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import TwoPaths from './components/TwoPaths'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import AsSeenOn from './components/AsSeenOn'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import useSEO from './hooks/useSEO'
import { SERVICE_AREAS } from './data/serviceAreas'
import { INSTANT_QUOTE_LIVE } from './data/features'

// Lazy-loaded route chunks, only downloaded when visited
const FAQPage = lazy(() => import('./pages/FAQPage'))
const LuxuryCartPage = lazy(() => import('./pages/LuxuryCartPage'))
const MeetOwnersPage = lazy(() => import('./pages/MeetOwnersPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const GrazingTablesPage = lazy(() => import('./pages/GrazingTablesPage'))
const CharcuterieClassesPage = lazy(() => import('./pages/CharcuterieClassesPage'))
const CorporateCateringPage = lazy(() => import('./pages/CorporateCateringPage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const InquirePage = lazy(() => import('./pages/InquirePage'))
const InstantQuotePage = lazy(() => import('./pages/InstantQuotePage'))
const GroceryListPage = lazy(() => import('./pages/GroceryListPage'))
const ServiceAreaPage = lazy(() => import('./pages/ServiceAreaPage'))

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
    description:
      "Grazing tables, charcuterie & corporate lunch catering in Lexington KY. Instant pricing and availability. 5.0 stars from 45 Google reviews. Book today!",
    path: '/',
  })

  return (
    <>
      <Hero onInquire={onInquire} />
      <Marquee />
      <TwoPaths onInquire={onInquire} />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <AsSeenOn />
      <HowItWorks />
      <CTA onInquire={onInquire} />
    </>
  )
}

function App() {
  const navigate = useNavigate()

  // Every call to action funnels into the one inquiry form.
  const handleInquire = () => navigate('/inquire')

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:text-cream focus:px-6 focus:py-3 focus:text-sm"
      >
        Skip to main content
      </a>
      <div className="min-h-screen bg-cream">
        <ScrollToTop />
        <Navbar onInquire={handleInquire} />
        <main id="main-content" role="main">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage onInquire={handleInquire} />} />
              {/* HoneyBook today; flip INSTANT_QUOTE_LIVE to swap in the new form */}
              <Route path="/inquire" element={INSTANT_QUOTE_LIVE ? <InstantQuotePage /> : <InquirePage />} />
              <Route path="/inquire/preview" element={<InstantQuotePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/grazing-tables" element={<GrazingTablesPage />} />
              <Route path="/corporate-catering" element={<CorporateCateringPage />} />
              <Route path="/luxury-cart-experiences" element={<LuxuryCartPage />} />
              <Route path="/charcuterie-classes" element={<CharcuterieClassesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/meet-the-owners" element={<MeetOwnersPage />} />
              <Route path="/faq" element={<FAQPage />} />
              {/* City landing pages for local search */}
              {SERVICE_AREAS.map((area) => (
                <Route
                  key={area.slug}
                  path={`/${area.slug}`}
                  element={<ServiceAreaPage slug={area.slug} />}
                />
              ))}
              {/* Internal tool, excluded from search */}
              <Route path="/tools/grocery-list" element={<GroceryListPage />} />
              {/* Retired Shopify routes */}
              <Route path="/shop" element={<Navigate to="/menu" replace />} />
              <Route path="/snack-boards" element={<Navigate to="/menu#boards" replace />} />
              <Route path="/cups-boxes" element={<Navigate to="/menu#cups" replace />} />
              <Route path="/personalizations" element={<Navigate to="/menu#celebration" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
