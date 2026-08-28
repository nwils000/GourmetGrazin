// Real date availability, checked against Aiyana's Google Calendar.
//
// Scheduling itself stays in HoneyBook, which already handles her bookings,
// contracts and invoices; duplicating that would be a step backwards. What the
// calendar adds is honesty: without it the form can only say "this date looks
// open" from a hand-kept list, which goes stale. With it, the answer is real.
//
// Falls back to the BLOCKED_DATES list whenever the calendar is not connected,
// so the endpoint is always safe to call.

import crypto from 'node:crypto'
import { checkAvailability } from '../src/data/quote.js'
import { readJson, isSameOrigin, clientKey, rateLimit } from './_shared.js'

const CAL_ID = () => process.env.GOOGLE_CALENDAR_ID
const CREDS = () => process.env.GOOGLE_SERVICE_ACCOUNT_JSON
export const calendarConfigured = () => Boolean(CAL_ID() && CREDS())

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

// Access tokens last an hour; minting one per request would be wasteful.
let tokenCache = { token: null, expiresAt: 0 }

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000)
  if (tokenCache.token && now < tokenCache.expiresAt - 60) return tokenCache.token

  const creds = JSON.parse(CREDS())
  const claim = {
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify(claim))}`
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).end()
    .sign(creds.private_key.replace(/\\n/g, '\n'))
  const assertion = `${unsigned}.${b64url(signature)}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  if (!res.ok) throw new Error(`token exchange failed (${res.status})`)
  const data = await res.json()
  tokenCache = { token: data.access_token, expiresAt: now + (data.expires_in || 3600) }
  return tokenCache.token
}

/** True when anything at all is on the calendar that day. */
async function isDayBusy(dateISO) {
  const token = await getAccessToken()
  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timeMin: `${dateISO}T00:00:00-04:00`,
      timeMax: `${dateISO}T23:59:59-04:00`,
      timeZone: 'America/New_York',
      items: [{ id: CAL_ID() }],
    }),
  })
  if (!res.ok) throw new Error(`freeBusy failed (${res.status})`)
  const data = await res.json()
  const cal = data.calendars?.[CAL_ID()]
  if (!cal || cal.errors?.length) throw new Error('calendar not readable')
  return (cal.busy || []).length > 0
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=300')
    return res.status(200).json({ calendarConnected: calendarConfigured() })
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!isSameOrigin(req)) return res.status(403).json({ error: 'Forbidden' })

  let body
  try {
    body = await readJson(req)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const date = String(body.date || '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Need a date as YYYY-MM-DD' })
  }

  const limit = rateLimit('avail:' + clientKey(req), { limit: 40, windowMs: 10 * 60 * 1000 })
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter))
    return res.status(429).json({ error: 'Too many checks — try again shortly.' })
  }

  // Lead time and the manual block list are always applied.
  const local = checkAvailability(date)
  if (!calendarConfigured() || local.status === 'past') {
    return res.status(200).json({ ...local, source: 'list' })
  }

  try {
    const busy = await isDayBusy(date)
    if (busy) {
      return res.status(200).json({
        status: 'booked',
        message: 'We already have something on that day. Send the inquiry anyway and we will suggest the closest open date.',
        source: 'calendar',
      })
    }
    // The calendar is clear, so keep whatever the lead-time check concluded.
    return res.status(200).json({ ...local, source: 'calendar' })
  } catch {
    // A calendar problem must never block an inquiry; fall back quietly.
    return res.status(200).json({ ...local, source: 'list' })
  }
}
