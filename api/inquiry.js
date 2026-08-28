// Receives an inquiry, emails Aiyana a complete brief, and sends the customer
// an instant confirmation with their estimate.
//
// The brief includes the generated shopping list, so the two jobs that used to
// happen by hand after every booking -- pricing it and writing the grocery
// list -- are already done by the time she opens the email.

import { MENU_BY_ID, BOARD_SIZES } from '../src/data/menu.js'
import { CART_PACKAGES, ADDONS, formatRange } from '../src/data/quote.js'
import { buildGroceryList } from '../src/data/groceries.js'
import { readJson, sendEmail, OWNER_EMAIL, esc, looksAutomated, isSameOrigin, clientKey, rateLimit } from './_shared.js'

function serviceName(id) {
  return MENU_BY_ID[id]?.name || CART_PACKAGES.find((c) => c.id === id)?.name || id
}
function addonName(id) {
  return ADDONS.find((a) => a.id === id)?.name || id
}

// Deep link into the shopping-list tool with this event already loaded, so
// planning it later never means re-entering what the inquiry already said.
function groceryLink(form, services, addons, payload) {
  const q = new URLSearchParams()
  const name = [form.name, form.eventType, form.date].filter(Boolean).join(' — ')
  if (name) q.set('event', name)
  if (form.guests) q.set('g', String(form.guests))
  if (payload.role === 'main') q.set('role', 'main')
  if (services.length) q.set('s', services.join(','))
  if (addons.length) q.set('a', addons.join(','))
  const pairs = (obj) =>
    Object.entries(obj || {}).filter(([, v]) => v !== '' && v != null).map(([k, v]) => `${k}:${v}`).join(',')
  const sz = pairs(payload.sizes)
  if (sz) q.set('sz', sz)
  const qty = pairs(payload.quantities)
  if (qty) q.set('q', qty)
  return `https://www.gourmetgrazinky.com/tools/grocery-list?${q.toString()}`
}

function row(label, value) {
  if (!value) return ''
  return `<tr><td style="padding:6px 14px 6px 0;color:#7a7168;font-size:13px;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:6px 0;color:#2c2c2c;font-size:14px">${esc(value)}</td></tr>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  let payload
  try {
    payload = await readJson(req)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  // Look successful to a bot so it stops trying, but send nothing.
  if (looksAutomated(payload)) {
    return res.status(200).json({ ok: true, emailed: true })
  }

  const limit = rateLimit('inquiry:' + clientKey(req), { limit: 8, windowMs: 60 * 60 * 1000 })
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter))
    return res.status(429).json({ error: 'Too many inquiries from here. Call (502) 735-8428 and we will sort it out.' })
  }

  const form = payload.form || {}
  if (!form.name || !form.email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  const services = Array.isArray(payload.services) ? payload.services : []
  const addons = Array.isArray(payload.addons) ? payload.addons : []
  const dietary = Array.isArray(payload.dietary) ? payload.dietary : []
  const quote = payload.quote || { low: 0, high: 0, lines: [] }
  const range = formatRange(quote.low, quote.high)

  let groceries = { sections: [], estimatedCost: 0, assumptions: [] }
  try {
    groceries = buildGroceryList(
      {
        guests: form.guests,
        services,
        role: payload.role,
        sizes: payload.sizes,
        quantities: payload.quantities,
        addons,
      },
      BOARD_SIZES,
    )
  } catch {
    // A shopping list is a bonus; never let it block the inquiry.
  }

  // The assist sets unusualRequest when it runs, but plenty of people type
  // straight into the notes. These phrases are how an off-menu or
  // budget-constrained request actually reads when someone writes it by hand.
  const ASKS_FOR_SOMETHING_ELSE =
    /budget|cheap|afford|discount|custom|special request|can you do|could you do|do you (also )?(do|offer|make)|is it possible|instead of|not on the (menu|list)|allerg/i
  const flagged =
    Boolean(payload.unusualRequest) ||
    ASKS_FOR_SOMETHING_ELSE.test(form.notes || '') ||
    ASKS_FOR_SOMETHING_ELSE.test(form.budget || '')

  const ownerHtml = `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#2c2c2c">
      ${flagged ? '<p style="background:#fdf3e3;border-left:3px solid #c4a265;padding:12px 16px;font-size:14px;margin:0 0 20px"><strong>Needs your eyes.</strong> This inquiry mentions a custom request or a budget constraint.</p>' : ''}
      <h1 style="font-size:22px;margin:0 0 4px">New inquiry — ${esc(form.eventType || 'Event')}</h1>
      <p style="color:#7a7168;font-size:14px;margin:0 0 22px">${esc(form.name)} · ${esc(form.date || 'no date given')} · ${esc(form.guests || '?')} guests</p>

      <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
        ${row('Name', form.name)}
        ${row('Email', form.email)}
        ${row('Phone', form.phone)}
        ${row('Event', form.eventType)}
        ${row('Date', form.date)}
        ${row('Guests', form.guests)}
        ${row('City', form.city)}
        ${row('Venue', form.venue)}
        ${row('Time', form.time)}
        ${row('Budget', form.budget)}
        ${row('Best contact', form.contactMethod)}
        ${row('Heard about us', form.referral)}
        ${row('Services', services.map(serviceName).join(', '))}
        ${row('Add-ons', addons.map(addonName).join(', '))}
        ${row('Dietary', dietary.join(', '))}
        ${row('Table role', payload.role === 'main' ? 'Main food' : 'Appetizer / grazing')}
        ${row('Premium items', (payload.premium || []).join(', '))}
        ${row('Agreed to terms', payload.agreedToTerms ? 'Yes' : 'NO — follow up')}
      </table>

      ${Object.keys(payload.cart || {}).length ? `
        <h2 style="font-size:15px;margin:0 0 6px">Cart selections</h2>
        <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
          ${Object.entries(payload.cart).filter(([, v]) => (v || []).length).map(([k, v]) => row(k, (v || []).join(', '))).join('')}
        </table>` : ''}

      ${form.notes ? `<h2 style="font-size:15px;margin:0 0 6px">Their notes</h2><p style="font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0 0 24px">${esc(form.notes)}</p>` : ''}

      <h2 style="font-size:15px;margin:0 0 8px">Estimate shown to them</h2>
      <p style="font-size:20px;color:#a8863f;margin:0 0 8px">${esc(range || 'none')}</p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
        ${(quote.lines || []).map((l) => `<tr><td style="padding:4px 14px 4px 0;font-size:13px;color:#7a7168">${esc(l.label)}</td><td style="padding:4px 0;font-size:13px;text-align:right">${esc(formatRange(l.low, l.high))}</td></tr>`).join('')}
      </table>

      ${groceries.sections.length ? `
        <h2 style="font-size:15px;margin:0 0 4px">Shopping list</h2>
        <p style="color:#7a7168;font-size:12px;margin:0 0 10px">Auto-generated. Estimated food cost <strong>$${groceries.estimatedCost}</strong> against a ${esc(range || 'n/a')} quote.</p>
        <p style="margin:0 0 16px"><a href="${esc(groceryLink(form, services, addons, payload))}" style="display:inline-block;background:#2c2c2c;color:#faf8f5;text-decoration:none;padding:9px 16px;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Open this list to edit &amp; print</a></p>
        ${groceries.sections.map((s) => `
          <p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#a8863f;margin:16px 0 6px">${esc(s.section)}</p>
          <table style="border-collapse:collapse;width:100%">
            ${s.items.map((i) => `<tr><td style="padding:3px 14px 3px 0;font-size:13px">${esc(i.name)}</td><td style="padding:3px 0;font-size:13px;color:#7a7168;white-space:nowrap">${esc(i.buy)}</td></tr>`).join('')}
          </table>`).join('')}
      ` : ''}

      <p style="margin-top:28px;font-size:13px;color:#7a7168">
        Reply straight to this email to reach ${esc(form.name)}.
      </p>
    </div>`

  const customerHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2c2c">
      <h1 style="font-size:22px;margin:0 0 16px">Thank you, ${esc(form.name.split(' ')[0])}!</h1>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        We have your inquiry for ${esc(form.eventType || 'your event')}${form.date ? ` on ${esc(form.date)}` : ''}${form.guests ? ` for ${esc(form.guests)} guests` : ''}.
        Aiyana will come back to you within 24 hours with a firm quote.
      </p>
      ${range ? `
        <p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#a8863f;margin:0 0 6px">Your estimate</p>
        <p style="font-size:24px;margin:0 0 6px">${esc(range)}</p>
        <p style="font-size:12px;color:#7a7168;margin:0 0 24px">An estimate, not a final quote — we tailor every event.</p>` : ''}
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        Something you forgot to mention? Just reply to this email, or call
        <a href="tel:+15027358428" style="color:#a8863f">(502) 735-8428</a>.
      </p>
      <p style="font-size:13px;color:#7a7168;border-top:1px solid #e6e0d8;padding-top:16px">
        Gourmet Grazin' · Grazing tables, charcuterie &amp; corporate catering across Central Kentucky<br>
        5.0 stars from 45 Google reviews
      </p>
    </div>`

  // Zapier catch hook: one flat payload Aiyana can map to a HoneyBook project,
  // a spreadsheet row, or anything else, without touching this code again.
  // HoneyBook's Zapier action maps field by field, so give it the shapes it
  // expects: names split, a ready-made project title, and one readable block
  // that can be dropped straight into the project notes.
  const nameParts = String(form.name || '').trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ')
  const projectName = [form.name, form.eventType, form.date].filter(Boolean).join(' — ')
  const summaryBlock = [
    `${form.eventType || 'Event'}${form.date ? ` on ${form.date}` : ''}${form.guests ? ` for ${form.guests} guests` : ''}`,
    form.city ? `Location: ${form.city}${form.venue ? ` — ${form.venue}` : ''}` : '',
    services.length ? `Wants: ${services.map(serviceName).join(', ')}` : '',
    addons.length ? `Add-ons: ${addons.map(addonName).join(', ')}` : '',
    dietary.length ? `Dietary: ${dietary.join(', ')}` : '',
    (payload.premium || []).length ? `Premium items: ${payload.premium.join(', ')}` : '',
    range ? `Estimate shown: ${range}` : '',
    form.budget ? `Their budget: ${form.budget}` : '',
    form.contactMethod ? `Prefers contact by: ${form.contactMethod}` : '',
    form.referral ? `Heard about us via: ${form.referral}` : '',
    flagged ? 'NEEDS ATTENTION: custom request or budget concern.' : '',
    form.notes ? `\nTheir notes:\n${form.notes}` : '',
  ].filter(Boolean).join('\n')

  const zapUrl = process.env.ZAPIER_WEBHOOK_URL
  let zapped = false
  if (zapUrl) {
    try {
      const zapRes = await fetch(zapUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          first_name: firstName,
          last_name: lastName,
          project_name: projectName,
          inquiry_summary: summaryBlock,
          email: form.email,
          phone: form.phone,
          event_type: form.eventType,
          event_date: form.date,
          guests: form.guests,
          city: form.city,
          venue: form.venue,
          budget: form.budget,
          preferred_contact: form.contactMethod,
          heard_about_us: form.referral,
          event_time: form.time,
          agreed_to_terms: Boolean(payload.agreedToTerms),
          cart_selections: Object.entries(payload.cart || {})
            .map(([k, v]) => `${k}: ${(v || []).join(', ')}`)
            .filter((line) => !line.endsWith(': '))
            .join(' | '),
          premium_items: (payload.premium || []).join(', '),
          services: services.map(serviceName).join(', '),
          addons: addons.map(addonName).join(', '),
          dietary: dietary.join(', '),
          notes: form.notes,
          estimate_low: quote.low,
          estimate_high: quote.high,
          estimate_range: range || '',
          needs_attention: flagged,
          grocery_cost_estimate: groceries.estimatedCost,
          shopping_list_url: groceryLink(form, services, addons, payload),
          submitted_at: new Date().toISOString(),
        }),
      })
      zapped = zapRes.ok
    } catch {
      // A Zapier outage must never lose the inquiry; the email still goes.
    }
  }

  const subject = `${flagged ? '[Needs you] ' : ''}Inquiry — ${form.eventType || 'Event'} · ${form.guests || '?'} guests · ${form.date || 'no date'}`

  const [ownerSent] = await Promise.all([
    sendEmail({ to: OWNER_EMAIL, subject, html: ownerHtml, replyTo: form.email }),
    sendEmail({ to: form.email, subject: "We've got your inquiry — Gourmet Grazin'", html: customerHtml }),
  ])

  // Log the payload so nothing is lost even if mail is not wired up yet.
  if (!ownerSent) {
    console.log('INQUIRY (email not configured):', JSON.stringify({ form, services, addons, dietary, range }))
  }

  return res.status(200).json({ ok: true, emailed: ownerSent, zapped })
}
