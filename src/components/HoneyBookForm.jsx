import { useEffect, useRef } from 'react'

const HONEYBOOK_PID = '66c0f6a761b7b300253dfa6d'
const HONEYBOOK_SCRIPT_URL =
  'https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js'

export default function HoneyBookForm({ formId }) {
  const containerRef = useRef(null)

  useEffect(() => {
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
  }, [formId])

  return (
    <div ref={containerRef}>
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
