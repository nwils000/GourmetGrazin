// Shared helpers for the inquiry endpoints.

export const MODEL = 'claude-opus-5'

export function readJson(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body)
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (c) => {
      raw += c
      if (raw.length > 100_000) reject(new Error('payload too large'))
    })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

export const OWNER_EMAIL = process.env.OWNER_EMAIL || 'gourmetgrazinky@gmail.com'
export const FROM_EMAIL = process.env.FROM_EMAIL || 'Gourmet Grazin <onboarding@resend.dev>'

/**
 * Send mail through Resend. Returns false (never throws) when RESEND_API_KEY is
 * unset, so a missing key degrades to "inquiry still recorded" instead of a 500.
 */
export async function sendEmail({ to, subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return false
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ---------------------------------------------------------------------------
// Abuse guards
//
// /api/inquiry-assist spends real money per call and /api/inquiry sends mail,
// so both need to be expensive to abuse and cheap to use honestly.

const HONEYPOT_FIELDS = ['website_url', 'company_fax']

/**
 * True when a submission looks automated.
 *
 * Two independent signals: hidden fields a human never sees (and so never
 * fills), and how long the form was on screen -- bots post instantly.
 */
export function looksAutomated(payload = {}) {
  for (const field of HONEYPOT_FIELDS) {
    if (typeof payload[field] === 'string' && payload[field].trim() !== '') {
      return 'honeypot'
    }
  }
  const elapsed = Number(payload.elapsedMs)
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 2500) {
    return 'too-fast'
  }
  return null
}

/** Reject calls that did not come from our own pages. */
export function isSameOrigin(req) {
  const allowed = [
    'https://www.gourmetgrazinky.com',
    'https://gourmetgrazinky.com',
  ]
  if (process.env.VERCEL_URL) allowed.push(`https://${process.env.VERCEL_URL}`)
  if (process.env.NODE_ENV !== 'production') return true

  const origin = req.headers.origin
  if (origin) return allowed.includes(origin)
  const referer = req.headers.referer
  if (referer) return allowed.some((a) => referer.startsWith(a))
  // No Origin and no Referer is a scripted client, not a browser form post.
  return false
}

export function clientKey(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown'
}

// Per-instance counters. Vercel recycles instances, so this is a speed bump
// rather than a guarantee -- enough to stop a loop hammering the endpoint,
// not a substitute for a shared store if abuse ever becomes real.
const buckets = new Map()

export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now()
  const entry = buckets.get(key)
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k)
    }
    return { ok: true, remaining: limit - 1, retryAfter: 0 }
  }
  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count += 1
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 }
}
