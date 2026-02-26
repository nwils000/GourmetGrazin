import { useState } from 'react'
import { X } from 'lucide-react'

const eventTypes = [
  'Wedding Reception',
  'Cocktail Hour',
  'Baby/Bridal Shower',
  'Corporate Event',
  'Birthday Party',
  'Anniversary',
  'Graduation',
  'Holiday Party',
  'Other',
]

const serviceTypes = [
  'Mobile Charcuterie Cart',
  'Grazing Table',
  'Charcuterie Boards',
  'Charcuterie Class',
  'Not Sure — Help Me Decide!',
]

export default function InquiryForm({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    serviceType: '',
    guestCount: '',
    venue: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Build mailto or use a form service
    const subject = encodeURIComponent(`New Inquiry from ${formData.name} — ${formData.eventType}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Event Date: ${formData.eventDate}\n` +
      `Event Type: ${formData.eventType}\n` +
      `Service: ${formData.serviceType}\n` +
      `Guest Count: ${formData.guestCount}\n` +
      `Venue/Location: ${formData.venue}\n\n` +
      `Message:\n${formData.message}`
    )
    window.location.href = `mailto:YOUR_EMAIL@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8 md:p-12">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-charcoal hover:text-gold transition-colors"
          >
            <X size={24} />
          </button>

          {submitted ? (
            <div className="text-center py-12">
              <h3 className="font-serif text-3xl mb-4">Thank you!</h3>
              <p className="text-charcoal-light font-light">
                Your inquiry has been sent. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="mt-8 bg-charcoal text-cream px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Inquire</p>
              <h3 className="font-serif text-3xl md:text-4xl mb-2">
                Let's plan your <em className="text-gold">graze.</em>
              </h3>
              <p className="text-charcoal-light font-light mb-8 text-sm">
                Fill out the form below and we'll reach out within 24 hours to discuss your event.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Service Interested In *
                    </label>
                    <select
                      name="serviceType"
                      required
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select service</option>
                      {serviceTypes.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Estimated Guest Count
                    </label>
                    <input
                      type="text"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                      placeholder="e.g., 75-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors"
                      placeholder="Venue name or city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
                    Tell Us More
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-charcoal/30 py-2 text-charcoal focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Any details about your vision, theme, dietary needs, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-charcoal text-cream py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 mt-4"
                >
                  Send Inquiry
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
