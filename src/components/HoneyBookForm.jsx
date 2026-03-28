import { useEffect, useRef, useState } from 'react'

const HONEYBOOK_PID = '66c0f6a761b7b300253dfa6d'
const HONEYBOOK_SCRIPT_URL =
  'https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js'

export default function HoneyBookForm({ formId }) {
  const containerRef = useRef(null)
  const [isBot, setIsBot] = useState(false)

  useEffect(() => {
    if (isBot) return

    window._HB_ = window._HB_ || {}
    window._HB_.pid = HONEYBOOK_PID

    // Remove any existing script so it re-scans for new placement divs
    const existing = document.querySelector(`script[src="${HONEYBOOK_SCRIPT_URL}"]`)
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = HONEYBOOK_SCRIPT_URL
    document.head.appendChild(script)

    return () => {
      // Clean up on unmount so next mount gets a fresh scan
      const s = document.querySelector(`script[src="${HONEYBOOK_SCRIPT_URL}"]`)
      if (s) s.remove()
    }
  }, [formId, isBot])

  // If bot detected, show a fake success message
  if (isBot) {
    return (
      <div className="text-center py-12">
        <p className="font-serif text-2xl mb-2">Thank you!</p>
        <p className="text-charcoal-light font-light">
          Your inquiry has been submitted. We'll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <div ref={containerRef}>
      {/* Honeypot field — visually hidden, bots will fill it */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          opacity: 0,
          height: 0,
          overflow: 'hidden',
          tabIndex: -1,
        }}
      >
        <label htmlFor={`website-url-${formId}`}>Website</label>
        <input
          type="text"
          id={`website-url-${formId}`}
          name="website_url"
          autoComplete="off"
          tabIndex={-1}
          onChange={(e) => {
            if (e.target.value) setIsBot(true)
          }}
        />
        <label htmlFor={`company-fax-${formId}`}>Fax</label>
        <input
          type="text"
          id={`company-fax-${formId}`}
          name="company_fax"
          autoComplete="off"
          tabIndex={-1}
          onChange={(e) => {
            if (e.target.value) setIsBot(true)
          }}
        />
      </div>

      <div className={`hb-p-${HONEYBOOK_PID}-${formId}`} />
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.honeybook.com/p.png?pid=${HONEYBOOK_PID}`}
        alt=""
      />
    </div>
  )
}
