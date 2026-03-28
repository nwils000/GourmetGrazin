import { Routes, Route, useNavigate } from 'react-router-dom'
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
import FAQPage from './pages/FAQPage'
import LuxuryCartPage from './pages/LuxuryCartPage'
import SnackBoardsPage from './pages/SnackBoardsPage'
import CupsBoxesPage from './pages/CupsBoxesPage'
import PersonalizationsPage from './pages/PersonalizationsPage'
import MeetOwnersPage from './pages/MeetOwnersPage'
import GalleryPage from './pages/GalleryPage'
import GrazingTablesPage from './pages/GrazingTablesPage'
import CharcuterieClassesPage from './pages/CharcuterieClassesPage'
import ShopPage from './pages/ShopPage'
import PlaceholderPreview from './pages/PlaceholderPreview'
import { CartProvider } from './context/CartContext'
import useSEO from './hooks/useSEO'

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
          <Routes>
            <Route path="/" element={<HomePage onInquire={handleInquire} />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/luxury-cart-experiences" element={<LuxuryCartPage />} />
            <Route path="/snack-boards" element={<SnackBoardsPage />} />
            <Route path="/cups-boxes" element={<CupsBoxesPage />} />
            <Route path="/personalizations" element={<PersonalizationsPage />} />
            <Route path="/meet-the-owners" element={<MeetOwnersPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/grazing-tables" element={<GrazingTablesPage />} />
            <Route path="/charcuterie-classes" element={<CharcuterieClassesPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/placeholder-preview" element={<PlaceholderPreview />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
