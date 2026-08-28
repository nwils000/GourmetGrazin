// Instant-estimate engine for the inquiry form.
//
// Aiyana tailors final pricing to each client, so this deliberately returns a
// RANGE and never a fixed number. The goal is to answer the three questions
// every inquiry opens with -- "what will it cost, are you free, do you deliver
// to me" -- in seconds instead of a day.
//
// EDIT THESE NUMBERS: everything Aiyana would want to tune lives in this file.

import { SERVICE_AREAS } from './serviceAreas.js'
import { MENU_BY_ID, BOARD_SIZES, boardPrice } from './menu.js'

// --- Grazing tables -------------------------------------------------------
// Per-guest rate bands. Larger events cost less per head, mirroring how the
// board ladder already prices ($10.50-14/guest at X-Large, before styling,
// delivery, setup, and breakdown).
export const GRAZING_RATES = [
  { maxGuests: 30, low: 20, high: 26 },
  { maxGuests: 60, low: 18, high: 23 },
  { maxGuests: 100, low: 16, high: 21 },
  { maxGuests: Infinity, low: 14, high: 19 },
]

export const DESSERT_TABLE_RATES = [
  { maxGuests: 50, low: 12, high: 16 },
  { maxGuests: Infinity, low: 10, high: 14 },
]

// --- Mobile cart experiences ---------------------------------------------
export const CART_PACKAGES = [
  { id: 'grazin-cart', name: "Gourmet Grazin' Cart", from: 400, blurb: 'Artisan cheeses, cured meats, seasonal fruit, gourmet crackers. Most booked.' },
  { id: 'favor-bar', name: 'Personalized Favor Bar', from: 400, blurb: 'Guests curate their own take-home creation.' },
  { id: 'sweet-savory', name: 'Sweet & Savory Social', from: 400, blurb: 'Cheeses, meats, chocolates, candied nuts.' },
  { id: 'morning-soiree', name: 'The Morning Soirée', from: 400, blurb: 'Brunch cart with quiches, pastries, yogurt parfaits.' },
  { id: 'confectionery', name: 'The Confectionery Cart', from: 400, blurb: 'Truffles, macarons, tarts.' },
  { id: 'fondue', name: 'The Chocolate Fondue Bar', from: 400, blurb: 'Interactive chocolate fondue experience.' },
  { id: 'cocoa-cider', name: 'The Cocoa & Cider Bar', from: 350, blurb: 'Hot cocoa and spiced cider. Fall and winter.' },
  { id: 'mocktail', name: 'The Mocktail Bar', from: 250, blurb: 'Non-alcoholic cocktails. A shower favorite.' },
  { id: 'lemonade', name: 'The Lemonade Atelier', from: 250, blurb: 'Fresh-pressed signature lemonade infusions.' },
]

// --- Styling add-ons ------------------------------------------------------
export const ADDONS = [
  { id: 'floral', name: 'Fresh floral accents', low: 75, high: 200, blurb: 'Live florals styled into the display.' },
  { id: 'greenery', name: 'Greenery & foliage', low: 35, high: 90, blurb: 'Eucalyptus, rosemary, seasonal greenery.' },
  { id: 'signage', name: 'Custom signage', low: 25, high: 75, blurb: 'Hand-lettered or printed event signage.' },
  { id: 'engraved', name: 'Engraved keepsake board', low: 65, high: 65, blurb: 'Laser-engraved with a name, logo, or message.' },
  { id: 'staffing', name: 'On-site attendant', low: 120, high: 240, blurb: 'A team member serving and refreshing throughout.' },
]

// --- Delivery -------------------------------------------------------------
// Matches the published policy: free within 20 miles of the Georgetown base,
// then $25-$100 by distance. `null` means "we will confirm" rather than guess.
export const DELIVERY_FEES = {
  Georgetown: 0,
  Lexington: 0,
  Frankfort: 0,
  Versailles: 0,
  Nicholasville: 25,
  Winchester: 35,
  Richmond: 45,
  Louisville: 100,
  Other: null,
}
export const FREE_DELIVERY_RADIUS_MILES = 20

export const DELIVERY_CITIES = [
  ...SERVICE_AREAS.map((a) => a.city),
  'Winchester',
  'Louisville',
  'Other',
]

// --- Booking policy -------------------------------------------------------
export const LEAD_TIME = {
  comfortableDays: 30, // "plenty of time"
  tightDays: 14, // "tight but usually workable"
  rushDays: 5, // below this we ask them to call
}

// Dates Aiyana is already booked or unavailable. ISO yyyy-mm-dd.
// Keeping this list current is what makes the form's availability check useful.
export const BLOCKED_DATES = []

export const MINIMUM_ORDER = 150

function rateFor(bands, guests) {
  return bands.find((b) => guests <= b.maxGuests) || bands[bands.length - 1]
}

function daysUntil(dateStr, today = new Date()) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr || '')
  if (!parts) return null
  // Compare local midnight to local midnight so the result is a whole number of
  // calendar days -- parsing the string as UTC would shift the answer by one.
  const target = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))
  if (Number.isNaN(target.getTime())) return null
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((target - start) / 86400000)
}

export function checkAvailability(dateStr, today = new Date()) {
  const days = daysUntil(dateStr, today)
  if (days === null) return { status: 'unknown', message: 'Pick a date and we will check it instantly.' }
  if (days < 0) return { status: 'past', message: 'That date has already passed — try another.' }
  if (BLOCKED_DATES.includes(dateStr)) {
    return { status: 'booked', message: 'We are already booked that day. Send the inquiry anyway and we will suggest the closest open date.' }
  }
  if (days < LEAD_TIME.rushDays) {
    const when = days === 0 ? 'That is today' : `That is ${days} day${days === 1 ? '' : 's'} out`
    return { status: 'rush', message: `${when}. Rush orders are sometimes possible — call (502) 735-8428 and we will tell you straight away.` }
  }
  if (days < LEAD_TIME.tightDays) {
    return { status: 'tight', message: `${days} days out is short notice but usually workable. Send it over and we will confirm today.` }
  }
  if (days < LEAD_TIME.comfortableDays) {
    return { status: 'open', message: `${days} days out — that is comfortable. This date looks open.` }
  }
  return { status: 'open', message: 'Plenty of lead time. This date looks open.' }
}

/**
 * Build a price estimate.
 *
 * @param {object} input
 * @param {number} input.guests
 * @param {string[]} input.services   menu ids and/or cart package ids
 * @param {string[]} input.addons     addon ids
 * @param {string}   input.city       delivery city
 * @param {object}   input.quantities optional { [itemId]: qty } for unit items
 * @param {object}   input.sizes      optional { [itemId]: sizeId } for boards
 */
export function estimate(input) {
  const guests = Math.max(0, Number(input.guests) || 0)
  const services = input.services || []
  const addons = input.addons || []
  const quantities = input.quantities || {}
  const sizes = input.sizes || {}

  const lines = []
  const notes = []
  let low = 0
  let high = 0

  for (const id of services) {
    const cart = CART_PACKAGES.find((c) => c.id === id)
    if (cart) {
      lines.push({ label: cart.name, low: cart.from, high: Math.round(cart.from * 1.35), detail: 'starting price' })
      low += cart.from
      high += Math.round(cart.from * 1.35)
      continue
    }

    const item = MENU_BY_ID[id]
    if (!item) continue

    if (item.pricing === 'perGuest') {
      const bands = id === 'grazing-table-dessert' ? DESSERT_TABLE_RATES : GRAZING_RATES
      const band = rateFor(bands, guests || item.minGuests)
      const count = Math.max(guests, item.minGuests || 0)
      if (guests && guests < (item.minGuests || 0)) {
        notes.push(`${item.name} has a ${item.minGuests}-guest minimum, so the estimate uses ${item.minGuests}.`)
      }
      lines.push({
        label: `${item.name} — ${count} guests`,
        low: count * band.low,
        high: count * band.high,
        detail: `$${band.low}-$${band.high} per guest`,
      })
      low += count * band.low
      high += count * band.high
    } else if (item.pricing === 'sized') {
      const sizeId = sizes[id] || 'medium'
      const price = boardPrice(item, sizeId)
      const size = BOARD_SIZES.find((s) => s.id === sizeId)
      const qty = Math.max(1, Number(quantities[id]) || 1)
      lines.push({
        label: `${item.name} — ${size ? size.label : 'Medium'}${qty > 1 ? ` ×${qty}` : ''}`,
        low: price * qty,
        high: price * qty,
        detail: size ? `serves ${size.guests}` : '',
      })
      low += price * qty
      high += price * qty
    } else if (item.pricing === 'unit') {
      const minQty = item.minQty || 1
      const suggested = item.serves === 1 && guests ? Math.max(guests, minQty) : minQty
      const qty = Math.max(minQty, Number(quantities[id]) || suggested)
      const total = qty * item.from
      lines.push({
        label: `${item.name} ×${qty}`,
        low: total,
        high: total,
        detail: `$${item.from} per ${item.unitLabel}`,
      })
      low += total
      high += total
    } else if (item.pricing === 'quote') {
      notes.push(`${item.name} is custom-quoted — we will price it with you directly.`)
    }
  }

  const premiumCount = (input.premium || []).length
  if (premiumCount && guests) {
    const total = premiumCount * guests
    lines.push({
      label: `Premium items ×${premiumCount}`,
      low: total,
      high: total,
      detail: `$1 per guest, per item`,
    })
    low += total
    high += total
  }

  for (const id of addons) {
    const addon = ADDONS.find((a) => a.id === id)
    if (!addon) continue
    lines.push({ label: addon.name, low: addon.low, high: addon.high, detail: 'add-on' })
    low += addon.low
    high += addon.high
  }

  const fee = Object.prototype.hasOwnProperty.call(DELIVERY_FEES, input.city)
    ? DELIVERY_FEES[input.city]
    : null
  if (fee !== null && (low > 0 || high > 0)) {
    lines.push({
      label: `Delivery, setup & breakdown — ${input.city}`,
      low: fee,
      high: fee,
      detail: fee === 0 ? `free, within ${FREE_DELIVERY_RADIUS_MILES} miles of us` : 'flat',
    })
    low += fee
    high += fee
  } else if (input.city && low > 0) {
    notes.push('We will confirm the travel fee for your location with your quote.')
  }

  if (low > 0 && low < MINIMUM_ORDER) {
    notes.push(`Our minimum order is $${MINIMUM_ORDER}; we will suggest the best way to reach it.`)
    low = MINIMUM_ORDER
    high = Math.max(high, MINIMUM_ORDER)
  }

  return { low, high, lines, notes, hasEstimate: lines.length > 0 }
}

export function formatRange(low, high) {
  const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US')
  if (!low && !high) return null
  return low === high ? fmt(low) : `${fmt(low)} – ${fmt(high)}`
}
