// Turns a free-text description of an event into filled-in form fields.
//
// People describe what they want far more readily than they work through a
// form, and every field we can pre-fill is one less reason to abandon the
// inquiry. Claude reads the description and maps it onto the real menu ids.

import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { MENU } from '../src/data/menu.js'
import { CART_PACKAGES, ADDONS, DELIVERY_CITIES } from '../src/data/quote.js'
import { readJson, MODEL, looksAutomated, isSameOrigin, clientKey, rateLimit } from './_shared.js'

const SERVICE_IDS = [...MENU.map((m) => m.id), ...CART_PACKAGES.map((c) => c.id)]
const ADDON_IDS = ADDONS.map((a) => a.id)
const DIETARY = ['Vegetarian', 'Gluten-free', 'Nut-free', 'Dairy-free', 'Pork-free', 'No alcohol']

const Extraction = z.object({
  eventType: z.string().describe('One of: Wedding or reception, Corporate or office event, Baby shower, Bridal shower, Birthday or anniversary, Graduation, Holiday party, Open house, Charcuterie class, Something else. Empty string if not stated.'),
  date: z.string().describe('Event date as YYYY-MM-DD, or empty string if not stated. Never guess a year that was not implied.'),
  guests: z.string().describe('Guest count as digits only, or empty string if not stated.'),
  city: z.string().describe(`One of: ${DELIVERY_CITIES.join(', ')}. Use "Other" if a city is named that is not on the list, empty string if none is named.`),
  services: z.array(z.string()).describe(`Menu item ids the person is asking for. Only these ids are valid: ${SERVICE_IDS.join(', ')}`),
  addons: z.array(z.string()).describe(`Styling add-ons requested. Only these ids are valid: ${ADDON_IDS.join(', ')}`),
  dietary: z.array(z.string()).describe(`Dietary needs mentioned. Only these values are valid: ${DIETARY.join(', ')}`),
  notes: z.string().describe('Anything else worth passing along: themes, colors, timing, venue, budget. Empty string if nothing.'),
  unusualRequest: z.boolean().describe('True if they asked for something outside the standard menu (a dish we do not list, an unusual format) or raised a budget constraint. This flags the inquiry for the owner personally.'),
  summary: z.string().describe('One friendly sentence, addressed to the customer, saying what was filled in. If unusualRequest is true, reassure them that the owner will look at it personally.'),
})

const SYSTEM = `You read a short description of a catering event for Gourmet Grazin', a charcuterie and grazing-table caterer in Central Kentucky, and map it onto their inquiry form.

Rules:
- Only ever use ids from the allowed lists. Never invent an id.
- Leave a field as an empty string or empty array when the description does not say. Do not guess.
- Grazing tables are the flagship: if someone describes a spread, a table, or a display for a crowd, that is "grazing-table".
- Corporate lunches map to "artisan-lunch-box", "sandwich-tray", or "half-sandwich-salad".
- Set unusualRequest to true for anything off-menu (a specific dish we do not list) or any mention of a tight budget.
- The summary speaks to the customer, warmly and briefly.`

const CONFIGURED = () => Boolean(process.env.ANTHROPIC_API_KEY)

export default async function handler(req, res) {
  // The page asks whether assist is switched on, so it can hide the feature
  // rather than show a button that cannot work. No key, no LLM call, no cost.
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=300')
    return res.status(200).json({ enabled: CONFIGURED() })
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!CONFIGURED()) {
    return res.status(503).json({ error: 'Assist is not configured' })
  }
  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  let body
  try {
    body = await readJson(req)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  // Silently no-op for bots: they get a plausible reply and no model call.
  if (looksAutomated(body)) {
    return res.status(200).json({ fields: {}, services: [], addons: [], dietary: [], summary: '' })
  }

  const limit = rateLimit('assist:' + clientKey(req), { limit: 6, windowMs: 10 * 60 * 1000 })
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter))
    return res.status(429).json({ error: 'That is a lot of tries — give it a minute, or just fill the form in.' })
  }

  const { text } = body
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Nothing to read' })
  }
  if (text.length > 2000) {
    return res.status(413).json({ error: 'That is longer than we can read — trim it down a little.' })
  }

  try {
    const client = new Anthropic()
    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 4000,
      system: SYSTEM,
      // Straightforward extraction; low effort keeps it fast and cheap.
      output_config: { effort: 'low', format: zodOutputFormat(Extraction) },
      messages: [{ role: 'user', content: text.slice(0, 2000) }],
    })

    const out = response.parsed_output
    if (!out) return res.status(502).json({ error: 'Could not read that' })

    // Never trust ids straight through - drop anything not on the menu.
    const services = (out.services || []).filter((id) => SERVICE_IDS.includes(id))
    const addons = (out.addons || []).filter((id) => ADDON_IDS.includes(id))
    const dietary = (out.dietary || []).filter((d) => DIETARY.includes(d))
    const city = DELIVERY_CITIES.includes(out.city) ? out.city : ''

    return res.status(200).json({
      fields: {
        eventType: out.eventType || '',
        date: /^\d{4}-\d{2}-\d{2}$/.test(out.date || '') ? out.date : '',
        guests: /^\d+$/.test(out.guests || '') ? out.guests : '',
        city,
        notes: out.notes || '',
      },
      services,
      addons,
      dietary,
      unusualRequest: Boolean(out.unusualRequest),
      summary: out.summary || '',
    })
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'Busy right now, try again in a moment' })
    }
    if (err instanceof Anthropic.APIError) {
      return res.status(502).json({ error: 'Assist unavailable' })
    }
    return res.status(500).json({ error: 'Assist failed' })
  }
}
