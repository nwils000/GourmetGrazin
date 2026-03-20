import { Routes, Route } from 'react-router-dom'
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
import { CartProvider } from './context/CartContext'

const HONEYBOOK_URL = 'https://elevatedeventrentals.hbportal.co/public/gourmet-grazin'

function HomePage({ onInquire }) {
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
  const handleInquire = () => {
    window.open(HONEYBOOK_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream">
        <Navbar onInquire={handleInquire} />
        <Cart />
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
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
