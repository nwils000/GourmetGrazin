import { useEffect } from 'react'
import FAQ from '../components/FAQ'

export default function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <FAQ />
}
