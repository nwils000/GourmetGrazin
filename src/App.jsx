import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Events from './components/Events'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

const HONEYBOOK_URL = 'https://elevatedeventrentals.hbportal.co/public/gourmet-grazin'

function App() {
  const handleInquire = () => {
    window.open(HONEYBOOK_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onInquire={handleInquire} />
      <Hero onInquire={handleInquire} />
      <Marquee />
      <About />
      <Services />
      <Gallery />
      <Events onInquire={handleInquire} />
      <HowItWorks />
      <FAQ />
      <CTA onInquire={handleInquire} />
      <Footer />
    </div>
  )
}

export default App
