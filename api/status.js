// A plain-language view of what is switched on.
//
// There are more environment variables than anyone should have to hold in
// their head, and most are optional. Load /api/status to see what is running,
// what is missing, and whether that missing thing actually matters.
//
// Reports only whether a value is set -- never the value itself.

const set = (name) => Boolean(process.env[name])

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  res.setHeader('Cache-Control', 'no-store')

  const aiKey = set('OPENAI_API_KEY') ? 'OPENAI_API_KEY' : set('ANTHROPIC_API_KEY') ? 'ANTHROPIC_API_KEY' : null
  const leadsGoSomewhere = set('ZAPIER_WEBHOOK_URL') || set('RESEND_API_KEY')

  return res.status(200).json({
    readyToTakeLeads: leadsGoSomewhere,
    needed: {
      'Smart form filling': {
        on: Boolean(aiKey),
        using: aiKey,
        needs: 'OPENAI_API_KEY',
        note: aiKey
          ? 'Working. Customers can describe their event and the form fills itself in.'
          : 'Off. The box stays hidden, and the form works normally without it.',
      },
      'Where leads go': {
        on: set('ZAPIER_WEBHOOK_URL'),
        needs: 'ZAPIER_WEBHOOK_URL',
        note: set('ZAPIER_WEBHOOK_URL')
          ? 'Every submission fires into Zapier, which can raise the HoneyBook project.'
          : 'Off. Submissions are logged but reach nobody — set this before going live.',
      },
    },
    optional: {
      'Shopping list from HoneyBook bookings': {
        on: set('HONEYBOOK_WEBHOOK_SECRET') && set('RESEND_API_KEY'),
        needs: 'HONEYBOOK_WEBHOOK_SECRET, RESEND_API_KEY',
        note: 'Lets the HoneyBook form stay exactly as it is. HoneyBook fires a Zap on each new booking, this builds the costed shopping list and emails it over.',
      },
      'Email straight from the site': {
        on: set('RESEND_API_KEY'),
        needs: 'RESEND_API_KEY, FROM_EMAIL, OWNER_EMAIL',
        note: 'Not needed if Zapier or HoneyBook is already sending the notification. This is only for emailing from the site directly, with the shopping list attached.',
      },
      'Live date availability': {
        on: set('GOOGLE_CALENDAR_ID') && set('GOOGLE_SERVICE_ACCOUNT_JSON'),
        needs: 'GOOGLE_CALENDAR_ID, GOOGLE_SERVICE_ACCOUNT_JSON',
        note: 'Not needed while HoneyBook handles the calendar. Without it the form answers from lead time and the blocked-dates list instead.',
      },
    },
  })
}
