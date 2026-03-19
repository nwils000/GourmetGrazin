import { useEffect } from 'react'

const HONEYBOOK_PID = '66c0f6a761b7b300253dfa6d'
const HONEYBOOK_SCRIPT_URL =
  'https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js'

export default function HoneyBookForm({ formId }) {
  useEffect(() => {
    // Set the HoneyBook PID
    window._HB_ = window._HB_ || {}
    window._HB_.pid = HONEYBOOK_PID

    // Only load the script once
    if (!document.querySelector(`script[src="${HONEYBOOK_SCRIPT_URL}"]`)) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = HONEYBOOK_SCRIPT_URL
      document.head.appendChild(script)
    }
  }, [])

  return (
    <>
      <div className={`hb-p-${HONEYBOOK_PID}-${formId}`} />
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.honeybook.com/p.png?pid=${HONEYBOOK_PID}`}
        alt=""
      />
    </>
  )
}
