// Inbound from HoneyBook, by way of Zapier.
//
// When the HoneyBook form stays in place, the automation has to run in the
// other direction: HoneyBook takes the booking, then tells us about it, and we
// do the part it cannot -- work out what to buy.
//
// HoneyBook fires a Zapier trigger on a new inquiry or a booked project. Point
// that Zap at this endpoint and Aiyana gets the shopping list, costed, without
// filling anything in twice.
//
// The payload shape is whatever her Zap happens to send, so rather than
// guessing at field names we flatten it and read it the same way we read a
// customer's own description.

import { extractFromText, assistConfigured } from './inquiry-assist.js'
import { MENU_BY_ID, BOARD_SIZES } from '../src/data/menu.js'
import { CART_PACKAGES, formatRange, estimate } from '../src/data/quote.js'
import { buildGroceryList } from '../src/data/groceries.js'
import { readJson, sendEmail, OWNER_EMAIL, esc } from './_shared.js'

const serviceName = (id) =>
  MENU_BY_ID[id]?.name || CART_PACKAGES.find((c) => c.id === id)?.name || id

/** Turn an arbitrary nested payload into readable lines. */
function flatten(value, prefix = '', out = [], depth = 0) {
  if (depth > 4 || out.length > 120) return out
  if (value == null) return out
  if (Array.isArray(value)) {
    value.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out, depth + 1))
    return out
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out, depth + 1)
    }
    return out
  }
  const text = String(value).trim()
  if (text && text.length < 400) out.push(`${prefix}: ${text}`)
  return out
}

function groceryLink(fields, services) {
  const q = new URLSearchParams()
  if (fields.eventName) q.set('event', fields.eventName)
  if (fields.guests) q.set('g', String(fields.guests))
  if (services.length) q.set('s', services.join(','))
  return `https://www.gourmetgrazinky.com/tools/grocery-list?${q.toString()}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Zapier cannot do same-origin, so this endpoint is protected by a shared
  // secret instead. Without one configured it stays closed rather than open.
  const secret = process.env.HONEYBOOK_WEBHOOK_SECRET
  const provided = req.query?.token || req.headers['x-webhook-token']
  if (!secret || provided !== secret) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  let body
  try {
    body = await readJson(req)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const lines = flatten(body)
  if (!lines.length) return res.status(400).json({ error: 'Nothing in the payload' })

  // Prefer explicit fields when the Zap maps them; fall back to reading the
  // whole payload when it does not.
  const direct = {
    guests: /^\d{1,5}$/.test(String(body.guests || '')) ? String(body.guests) : '',
    eventName: body.project_name || body.event_name || body.name || '',
  }

  let fields = { ...direct, date: body.event_date || '', city: body.city || '' }
  let services = []

  if (assistConfigured()) {
    try {
      const read = await extractFromText(lines.join('\n').slice(0, 2000))
      if (read) {
        fields = {
          eventName: direct.eventName || read.fields.eventType || '',
          guests: direct.guests || read.fields.guests || '',
          date: fields.date || read.fields.date || '',
          city: fields.city || read.fields.city || '',
        }
        services = read.services
      }
    } catch {
      // Reading it is a bonus; a failure must not lose the notification.
    }
  }

  if (!services.length) services = ['grazing-table']

  const guests = Number(fields.guests) || 0
  const list = buildGroceryList({ guests, services, role: 'appetizer' }, BOARD_SIZES)
  const quote = estimate({ guests, services, addons: [], city: fields.city || 'Other' })
  const range = formatRange(quote.low, quote.high)
  const link = groceryLink(fields, services)

  const html = `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#2c2c2c">
      <h1 style="font-size:20px;margin:0 0 4px">Shopping list ready</h1>
      <p style="color:#7a7168;font-size:14px;margin:0 0 20px">
        ${esc(fields.eventName || 'New HoneyBook booking')}${fields.date ? ` &middot; ${esc(fields.date)}` : ''}${guests ? ` &middot; ${guests} guests` : ''}
      </p>
      <p style="font-size:14px;margin:0 0 18px">
        Based on ${esc(services.map(serviceName).join(', '))}. Estimated food cost
        <strong>$${list.estimatedCost}</strong>${range ? ` against roughly ${esc(range)}` : ''}.
      </p>
      <p style="margin:0 0 24px">
        <a href="${esc(link)}" style="display:inline-block;background:#2c2c2c;color:#faf8f5;text-decoration:none;padding:10px 18px;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Open, adjust &amp; print</a>
      </p>
      ${list.sections.map((s) => `
        <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#a8863f;margin:16px 0 6px">${esc(s.section)}</p>
        <table style="border-collapse:collapse;width:100%">
          ${s.items.map((i) => `<tr><td style="padding:3px 14px 3px 0;font-size:13px">${esc(i.name)}</td><td style="padding:3px 0;font-size:13px;color:#7a7168;white-space:nowrap">${esc(i.buy)}</td></tr>`).join('')}
        </table>`).join('')}
      <p style="margin-top:26px;font-size:12px;color:#7a7168">
        Generated from the HoneyBook booking. Guest count and menu are a starting point &mdash; open the list to adjust before you shop.
      </p>
    </div>`

  const sent = await sendEmail({
    to: OWNER_EMAIL,
    subject: `Shopping list — ${fields.eventName || 'new booking'}${guests ? ` (${guests} guests)` : ''}`,
    html,
  })

  return res.status(200).json({
    ok: true,
    emailed: sent,
    guests,
    services,
    estimatedFoodCost: list.estimatedCost,
    shoppingListUrl: link,
  })
}
