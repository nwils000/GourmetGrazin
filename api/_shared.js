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
