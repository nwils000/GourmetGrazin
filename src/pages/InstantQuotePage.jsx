import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, Check, Loader2, Sparkles, AlertCircle, Lock } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { MENU, MENU_BY_ID, BOARD_SIZES } from '../data/menu'
import {
  estimate,
  formatRange,
  checkAvailability,
  CART_PACKAGES,
  ADDONS,
  DELIVERY_CITIES,
} from '../data/quote'
import { REVIEW_COUNT, REVIEW_RATING } from '../data/reviews'
import { CART_BUILDER, PREMIUM_ITEMS, CONTACT_METHODS, REFERRAL_SOURCES, TERMS } from '../data/cartMenu'

const EVENT_TYPES = [
  'Wedding or reception',
  'Corporate or office event',
  'Baby shower',
  'Bridal shower',
  'Birthday or anniversary',
  'Graduation',
  'Holiday party',
  'Open house',
  'Charcuterie class',
  'Something else',
]

// The choices that drive the estimate, grouped the way people actually think.
const SERVICE_GROUPS = [
  {
    label: 'Grazing tables',
    hint: 'Our most-booked service',
    ids: ['grazing-table', 'grazing-table-dessert'],
  },
  {
    label: 'Lunch & corporate',
    hint: 'Trays, boxes, and easy midday catering',
    ids: ['sandwich-tray', 'half-sandwich-salad', 'artisan-lunch-box', 'breakfast-tray'],
  },
  {
    label: 'Boards',
    hint: 'Pick a size on the right',
    ids: ['classic-board', 'veggie-board', 'fruit-board', 'brunch-board', 'seasonal-board'],
  },
  {
    label: 'Individually portioned',
    hint: 'Best for big headcounts and open houses',
    ids: ['classic-cup', 'classic-shot', 'sweet-tooth-cup', 'yogurt-cup', 'classic-box', 'brunch-box'],
  },
]

const DIETARY = ['Vegetarian', 'Gluten-free', 'Nut-free', 'Dairy-free', 'Pork-free', 'No alcohol']

function Field({ label, hint, children, htmlFor }) {
  return (
    <div className="mb-7">
      <label htmlFor={htmlFor} className="block text-charcoal text-sm tracking-wide mb-2">
        {label}
      </label>
      {hint && <p className="text-charcoal-light text-xs font-light mb-3">{hint}</p>}
      {children}
    </div>
  )
}

const inputClass =
  'w-full bg-warm-white border border-taupe/50 px-4 py-3 text-charcoal text-sm font-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition-colors'

function Chip({ active, onClick, children, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-left border px-4 py-3 text-sm font-light transition-colors duration-300 ${
        active
          ? 'border-gold bg-gold/10 text-charcoal'
          : 'border-taupe/50 bg-warm-white text-charcoal-light hover:border-gold/50'
      }`}
    >
      <span className="flex items-start gap-2">
        <span
          aria-hidden="true"
          className={`mt-0.5 w-4 h-4 flex-shrink-0 border flex items-center justify-center ${
            active ? 'border-gold bg-gold text-cream' : 'border-taupe'
          }`}
        >
          {active && <Check size={11} strokeWidth={3} />}
        </span>
        <span>
          {children}
          {sub && <span className="block text-charcoal-light text-xs mt-0.5">{sub}</span>}
        </span>
      </span>
    </button>
  )
}

export default function InstantQuotePage() {
  useSEO({
    title: 'Instant Quote (Preview)',
    description:
      'Preview of the instant quote form: pricing, availability and delivery cost in seconds.',
    path: '/inquire/preview',
    noindex: true,
  })

  const [form, setForm] = useState({
    name: '', email: '', phone: '', contactMethod: 'Any', referral: '',
    eventType: '', date: '', time: '', guests: '', city: 'Lexington',
    venue: '', budget: '', notes: '',
  })
  // Build-your-cart picks, keyed by group id.
  const [cart, setCart] = useState({})
  const [premium, setPremium] = useState([])
  const [agreed, setAgreed] = useState(false)
  const [services, setServices] = useState([])
  const [addons, setAddons] = useState([])
  const [sizes, setSizes] = useState({})
  const [dietary, setDietary] = useState([])
  const [role, setRole] = useState('appetizer')

  // The estimate is the thing people want, so it is what earns the contact
  // details. They build the quote first, then unlock the number -- by which
  // point they have invested enough effort that the ask converts well.
  const [unlocked, setUnlocked] = useState(false)

  const [aiText, setAiText] = useState('')
  const [aiState, setAiState] = useState({ status: 'idle', message: '' })
  const [submit, setSubmit] = useState({ status: 'idle', message: '' })
  const resultRef = useRef(null)

  // Anti-abuse. The trap fields are invisible to people and left empty; bots
  // fill every input they find. `mountedAt` catches scripted posts, which
  // arrive far faster than anyone can actually type.
  const mountedAt = useRef(Date.now())
  const [trap, setTrap] = useState({ website_url: '', company_fax: '' })
  const guardFields = () => ({ ...trap, elapsedMs: Date.now() - mountedAt.current })

  // null until we know; the assist box stays hidden unless it can really work.
  const [assistEnabled, setAssistEnabled] = useState(null)
  useEffect(() => {
    let alive = true
    fetch('/api/inquiry-assist')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setAssistEnabled(Boolean(d && d.enabled)))
      .catch(() => alive && setAssistEnabled(false))
    return () => { alive = false }
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggle = (list, setList) => (id) =>
    setList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const quote = useMemo(
    () => estimate({ guests: form.guests, services, addons, city: form.city, sizes, premium }),
    [form.guests, form.city, services, addons, sizes, premium],
  )
  // Instant answer from the local rules, then confirmed against the real
  // calendar when one is connected. The local result always shows first so the
  // field never feels laggy.
  const localAvailability = useMemo(() => checkAvailability(form.date), [form.date])
  const [liveAvailability, setLiveAvailability] = useState(null)
  const availability = liveAvailability || localAvailability

  const [calendarConnected, setCalendarConnected] = useState(false)
  useEffect(() => {
    let alive = true
    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setCalendarConnected(Boolean(d && d.calendarConnected)))
      .catch(() => {})
    return () => { alive = false }
  }, [])

  useEffect(() => {
    setLiveAvailability(null)
    if (!calendarConnected || !/^\d{4}-\d{2}-\d{2}$/.test(form.date)) return
    let alive = true
    const t = setTimeout(() => {
      fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: form.date }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => alive && d && d.message && setLiveAvailability(d))
        .catch(() => {})
    }, 400)
    return () => { alive = false; clearTimeout(t) }
  }, [form.date, calendarConnected])

  useEffect(() => {
    if (submit.status === 'sent' && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [submit.status])

  // Let people describe the event in their own words, then fill the form for them.
  async function runAssist() {
    if (!aiText.trim()) return
    setAiState({ status: 'loading', message: '' })
    try {
      const res = await fetch('/api/inquiry-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiText, ...guardFields() }),
      })
      if (res.status === 429 || res.status === 413) {
        const info = await res.json().catch(() => null)
        setAiState({ status: 'error', message: (info && info.error) || 'Try again shortly.' })
        return
      }
      if (!res.ok) throw new Error(`assist unavailable (${res.status})`)
      const data = await res.json().catch(() => null)
      if (!data) throw new Error('unexpected response')
      if (data.fields) {
        setForm((f) => ({
          ...f,
          eventType: data.fields.eventType || f.eventType,
          date: data.fields.date || f.date,
          guests: data.fields.guests || f.guests,
          city: data.fields.city || f.city,
          notes: data.fields.notes ? `${f.notes ? f.notes + '\n' : ''}${data.fields.notes}` : f.notes,
        }))
      }
      if (Array.isArray(data.services) && data.services.length) setServices(data.services)
      if (Array.isArray(data.addons) && data.addons.length) setAddons(data.addons)
      if (Array.isArray(data.dietary) && data.dietary.length) setDietary(data.dietary)
      setAiState({
        status: 'done',
        message: data.summary || "Filled in what we could — check it over and adjust anything.",
      })
    } catch {
      setAiState({
        status: 'error',
        message: "Couldn't read that automatically — no problem, just fill in the fields below.",
      })
    }
  }

  function mailtoFallback(payload) {
    const body = [
      `Name: ${payload.form.name}`,
      `Email: ${payload.form.email}`,
      `Phone: ${payload.form.phone}`,
      `Event: ${payload.form.eventType}`,
      `Date: ${payload.form.date}`,
      `Guests: ${payload.form.guests}`,
      `City: ${payload.form.city}`,
      `Venue: ${payload.form.venue}`,
      `Services: ${payload.services.map((id) => MENU_BY_ID[id]?.name || CART_PACKAGES.find((c) => c.id === id)?.name || id).join(', ')}`,
      `Add-ons: ${payload.addons.join(', ')}`,
      `Dietary: ${payload.dietary.join(', ')}`,
      `Budget: ${payload.form.budget}`,
      `Estimate: ${formatRange(payload.quote.low, payload.quote.high) || 'n/a'}`,
      '',
      payload.form.notes,
    ].join('\n')
    return `mailto:hello@gourmetgrazinky.com?subject=${encodeURIComponent(
      `Event inquiry — ${payload.form.eventType || 'Event'} ${payload.form.date || ''}`,
    )}&body=${encodeURIComponent(body)}`
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) {
      setSubmit({ status: 'error', message: 'We need your name, email and phone to send your quote.' })
      return
    }
    if (!agreed) {
      setSubmit({ status: 'error', message: 'Please read and agree to the terms before we book you in.' })
      return
    }
    // Reveal immediately. The lead is already captured below, so a slow or
    // failed send never costs them the number they came for.
    setUnlocked(true)
    setSubmit({ status: 'sending', message: '' })
    const payload = { form, services, addons, sizes, dietary, role, quote, availability, cart, premium, agreedToTerms: agreed }
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, ...guardFields() }),
      })
      if (!res.ok) throw new Error(String(res.status))
      // A 200 alone is not proof: if the function is missing, the SPA fallback
      // would return HTML. Require the JSON contract before claiming success.
      const data = await res.json().catch(() => null)
      if (!data || data.ok !== true) throw new Error('unexpected response')
      // Only claim it reached her if something actually carried it -- email or
      // the Zapier hook. Otherwise fall back rather than imply delivery.
      if (data.emailed === false && data.zapped !== true) throw new Error('not delivered')
      setSubmit({
        status: 'sent',
        message: "Got it. Aiyana will come back to you within 24 hours — usually much sooner.",
      })
    } catch {
      // Inquiries are the whole business, so never drop one: hand it to their mail client.
      setSubmit({
        status: 'fallback',
        message: 'Almost there — click below to send your inquiry from your email app.',
        href: mailtoFallback(payload),
      })
    }
  }

  const selectedBoards = services.filter((id) => MENU_BY_ID[id]?.pricing === 'sized')
  const showRole = services.includes('grazing-table')

  return (
    <article className="bg-cream">
      {/* Hero */}
      <section className="pt-36 pb-10 px-6 lg:px-8" aria-label="Request a quote">
        <div className="max-w-6xl mx-auto text-center">
          <p className="inline-block border border-gold/60 bg-gold/10 text-gold-accessible text-[11px] tracking-[0.2em] uppercase px-4 py-2 mb-6">
            Preview &middot; not yet live for customers
          </p>
          <p className="text-gold-accessible text-xs tracking-[0.3em] uppercase mb-4">Get a Quote</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6">
            Pricing and availability,
            <br />
            <em className="text-gold-heading">before you hit send.</em>
          </h1>
          <p className="text-charcoal-light text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Fill this in and you will see your estimate, your delivery cost, and whether
            your date is open — right on this page. We follow up with a firm quote within
            24 hours.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-gold text-gold" />
              ))}
            </span>
            <span className="text-charcoal font-serif">{REVIEW_RATING}</span>
            <span className="text-charcoal-light text-sm font-light">from {REVIEW_COUNT} Google reviews</span>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
          {/* ---------------- Form ---------------- */}
          <div>
            {/* Hidden from people, irresistible to bots. Not display:none, which
                some bots skip; positioned off-screen instead. */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
            >
              <label htmlFor="website_url">Website</label>
              <input
                id="website_url" name="website_url" type="text" tabIndex={-1} autoComplete="off"
                value={trap.website_url}
                onChange={(e) => setTrap((t) => ({ ...t, website_url: e.target.value }))}
              />
              <label htmlFor="company_fax">Fax</label>
              <input
                id="company_fax" name="company_fax" type="text" tabIndex={-1} autoComplete="off"
                value={trap.company_fax}
                onChange={(e) => setTrap((t) => ({ ...t, company_fax: e.target.value }))}
              />
            </div>

            {/* AI assist — only rendered once the server confirms it is on */}
            {assistEnabled && (
            <div className="border border-gold/40 bg-warm-white p-6 mb-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold" aria-hidden="true" />
                <h2 className="font-serif text-lg">Describe it in your own words</h2>
              </div>
              <p className="text-charcoal-light text-xs font-light mb-4">
                Optional. Type what you are planning and we will fill the form in for you.
              </p>
              <textarea
                id="ai-text"
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                rows={3}
                placeholder="e.g. Baby shower for about 40 people in Georgetown on May 16th, want a grazing table with florals, one guest is gluten free"
                className={inputClass}
              />
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={runAssist}
                  disabled={aiState.status === 'loading' || !aiText.trim()}
                  className="bg-charcoal text-cream px-5 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {aiState.status === 'loading' && <Loader2 size={13} className="animate-spin" aria-hidden="true" />}
                  Fill it in for me
                </button>
                {aiState.message && (
                  <p
                    className={`text-xs font-light ${aiState.status === 'error' ? 'text-charcoal-light' : 'text-gold-accessible'}`}
                    role="status"
                  >
                    {aiState.message}
                  </p>
                )}
              </div>
            </div>
            )}

            <h2 className="font-serif text-2xl mb-6">Your event</h2>

            <div className="grid sm:grid-cols-2 gap-x-6">
              <Field label="Event type" htmlFor="eventType">
                <select id="eventType" value={form.eventType} onChange={set('eventType')} className={inputClass}>
                  <option value="">Select one</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Event date" htmlFor="date">
                <input id="date" type="date" value={form.date} onChange={set('date')} className={inputClass} />
              </Field>

              <Field label="Guest count" htmlFor="guests">
                <input
                  id="guests" type="number" min="1" inputMode="numeric"
                  value={form.guests} onChange={set('guests')}
                  placeholder="40" className={inputClass}
                />
              </Field>

              <Field label="Preferred start time" hint="Optional — helps us plan the day." htmlFor="time">
                <input id="time" type="time" value={form.time} onChange={set('time')} className={inputClass} />
              </Field>

              <Field label="City" htmlFor="city">
                <select id="city" value={form.city} onChange={set('city')} className={inputClass}>
                  {DELIVERY_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Event address" hint="Where we are setting up. Helps us plan load-in and confirm delivery." htmlFor="venue">
              <input id="venue" value={form.venue} onChange={set('venue')} className={inputClass} />
            </Field>

            <div className="grid sm:grid-cols-2 gap-x-6">
              <Field label="Best way to reach you" htmlFor="contactMethod">
                <select id="contactMethod" value={form.contactMethod} onChange={set('contactMethod')} className={inputClass}>
                  {CONTACT_METHODS.map((m) => (<option key={m} value={m}>{m}</option>))}
                </select>
              </Field>
              <Field label="How did you hear about us?" htmlFor="referral">
                <select id="referral" value={form.referral} onChange={set('referral')} className={inputClass}>
                  <option value="">Select one</option>
                  {REFERRAL_SOURCES.map((r) => (<option key={r} value={r}>{r}</option>))}
                </select>
              </Field>
            </div>

            <h2 className="font-serif text-2xl mt-10 mb-6">What are you thinking?</h2>
            <p className="text-charcoal-light text-sm font-light mb-6 -mt-4">
              Pick anything that sounds right. Not sure? Choose nothing and tell us in the notes.
            </p>

            {SERVICE_GROUPS.map((group) => (
              <fieldset key={group.label} className="mb-8">
                <legend className="text-gold-accessible text-xs tracking-[0.25em] uppercase mb-1">
                  {group.label}
                </legend>
                <p className="text-charcoal-light text-xs font-light mb-3">{group.hint}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {group.ids.map((id) => {
                    const item = MENU_BY_ID[id]
                    if (!item) return null
                    return (
                      <Chip
                        key={id}
                        active={services.includes(id)}
                        onClick={() => toggle(services, setServices)(id)}
                        sub={item.from ? `from $${item.from}${item.unitLabel ? ' / ' + item.unitLabel : ''}` : 'per guest'}
                      >
                        {item.name}
                      </Chip>
                    )
                  })}
                </div>
              </fieldset>
            ))}

            <fieldset className="mb-8">
              <legend className="text-gold-accessible text-xs tracking-[0.25em] uppercase mb-1">
                Mobile cart experiences
              </legend>
              <p className="text-charcoal-light text-xs font-light mb-3">Served tableside by our team.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {CART_PACKAGES.map((c) => (
                  <Chip
                    key={c.id}
                    active={services.includes(c.id)}
                    onClick={() => toggle(services, setServices)(c.id)}
                    sub={`from $${c.from}`}
                  >
                    {c.name}
                  </Chip>
                ))}
              </div>
            </fieldset>

            {selectedBoards.length > 0 && (
              <fieldset className="mb-8">
                <legend className="text-gold-accessible text-xs tracking-[0.25em] uppercase mb-3">
                  Board sizes
                </legend>
                {selectedBoards.map((id) => (
                  <div key={id} className="mb-4">
                    <label htmlFor={`size-${id}`} className="block text-charcoal text-sm mb-2">
                      {MENU_BY_ID[id].name}
                    </label>
                    <select
                      id={`size-${id}`}
                      value={sizes[id] || 'medium'}
                      onChange={(e) => setSizes((s) => ({ ...s, [id]: e.target.value }))}
                      className={inputClass}
                    >
                      {BOARD_SIZES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label} — serves {s.guests}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </fieldset>
            )}

            {showRole && (
              <fieldset className="mb-8">
                <legend className="text-gold-accessible text-xs tracking-[0.25em] uppercase mb-3">
                  Is the grazing table the main food?
                </legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Chip active={role === 'appetizer'} onClick={() => setRole('appetizer')} sub="Alongside other food">
                    Appetizer / grazing
                  </Chip>
                  <Chip active={role === 'main'} onClick={() => setRole('main')} sub="Guests eat their fill here">
                    It is the meal
                  </Chip>
                </div>
              </fieldset>
            )}

            <fieldset className="mb-8">
              <legend className="text-gold-accessible text-xs tracking-[0.25em] uppercase mb-3">
                Styling add-ons
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {ADDONS.map((a) => (
                  <Chip
                    key={a.id}
                    active={addons.includes(a.id)}
                    onClick={() => toggle(addons, setAddons)(a.id)}
                    sub={a.blurb}
                  >
                    {a.name}
                  </Chip>
                ))}
              </div>
            </fieldset>

            {services.some((id) => CART_PACKAGES.some((c) => c.id === id)) && (
              <div className="border border-gold/40 bg-warm-white p-6 mb-8">
                <h3 className="font-serif text-lg mb-1">Build your cart</h3>
                <p className="text-charcoal-light text-xs font-light mb-5">
                  Pick what you would like on it. Not sure? Leave it and we will suggest a mix.
                </p>
                {CART_BUILDER.map((group) => {
                  const chosen = cart[group.id] || []
                  const full = chosen.length >= group.choose
                  return (
                    <fieldset key={group.id} className="mb-5">
                      <legend className="text-charcoal text-sm mb-1">
                        {group.label}{' '}
                        <span className="text-charcoal-light text-xs">
                          (choose {group.choose}{chosen.length ? ` — ${chosen.length} selected` : ''})
                        </span>
                      </legend>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {group.options.map((opt) => {
                          const on = chosen.includes(opt)
                          const disabled = !on && full
                          return (
                            <button
                              key={opt}
                              type="button"
                              aria-pressed={on}
                              disabled={disabled}
                              onClick={() =>
                                // Derive from the live state, not the render
                                // closure: two quick clicks would otherwise both
                                // read the same stale array and lose one.
                                setCart((c) => {
                                  const cur = c[group.id] || []
                                  const isOn = cur.includes(opt)
                                  if (!isOn && cur.length >= group.choose) return c
                                  return {
                                    ...c,
                                    [group.id]: isOn ? cur.filter((x) => x !== opt) : [...cur, opt],
                                  }
                                })
                              }
                              className={`border px-3 py-1.5 text-xs font-light transition-colors ${
                                on
                                  ? 'border-gold bg-gold/10 text-charcoal'
                                  : disabled
                                    ? 'border-taupe/30 text-charcoal-light/40 cursor-not-allowed'
                                    : 'border-taupe/50 text-charcoal-light hover:border-gold/50'
                              }`}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>
                  )
                })}
                <fieldset>
                  <legend className="text-charcoal text-sm mb-1">
                    Premium items{' '}
                    <span className="text-charcoal-light text-xs">(+$1 per guest, per item)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {PREMIUM_ITEMS.options.map((opt) => {
                      const on = premium.includes(opt)
                      return (
                        <button
                          key={opt}
                          type="button"
                          aria-pressed={on}
                          onClick={() =>
                            setPremium((pv) =>
                              pv.includes(opt) ? pv.filter((x) => x !== opt) : [...pv, opt],
                            )
                          }
                          className={`border px-3 py-1.5 text-xs font-light transition-colors ${
                            on ? 'border-gold bg-gold/10 text-charcoal' : 'border-taupe/50 text-charcoal-light hover:border-gold/50'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              </div>
            )}

            <fieldset className="mb-8">
              <legend className="text-gold-accessible text-xs tracking-[0.25em] uppercase mb-3">
                Dietary needs
              </legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {DIETARY.map((d) => (
                  <Chip key={d} active={dietary.includes(d)} onClick={() => toggle(dietary, setDietary)(d)}>
                    {d}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <Field label="Budget in mind" hint="Optional. We work with a range." htmlFor="budget">
              <input id="budget" value={form.budget} onChange={set('budget')} placeholder="e.g. around $800" className={inputClass} />
            </Field>

            <details className="border border-taupe/50 bg-warm-white mb-8 px-5">
              <summary className="cursor-pointer py-4 text-charcoal text-sm">
                Booking terms &mdash; please read before you book
              </summary>
              <ul className="list-none pb-5 space-y-2">
                {TERMS.map((t, i) => (
                  <li key={i} className="text-charcoal-light text-xs font-light flex gap-2">
                    <span className="text-gold flex-shrink-0" aria-hidden="true">&#10047;</span>
                    {t}
                  </li>
                ))}
              </ul>
            </details>

            <label className="flex items-start gap-3 mb-8 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-gold"
              />
              <span className="text-charcoal-light text-sm font-light">
                I have read and agree to the booking terms above.
              </span>
            </label>

            <Field label="Anything else?" hint="Themes, colors, a request you have not seen us offer — ask." htmlFor="notes">
              <textarea id="notes" rows={4} value={form.notes} onChange={set('notes')} className={inputClass} />
            </Field>
          </div>

          {/* ---------------- Live estimate ---------------- */}
          <aside className="lg:sticky lg:top-28">
            <div className="border border-taupe/50 bg-warm-white p-7">
              <h2 className="font-serif text-xl mb-1">Your estimate</h2>
              <p className="text-charcoal-light text-xs font-light mb-5">
                {unlocked
                  ? 'Updates as you choose. Final pricing confirmed by Aiyana.'
                  : 'Built from what you have chosen. Tell us where to send it.'}
              </p>

              {!quote.hasEstimate && (
                <p className="text-charcoal-light text-sm font-light mb-5">
                  Choose a guest count and what you are thinking, and your estimate
                  appears here.
                </p>
              )}

              {quote.hasEstimate && !unlocked && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock size={14} className="text-gold" aria-hidden="true" />
                    <p className="text-charcoal text-sm">Your estimate is ready</p>
                  </div>
                  <p className="font-serif text-3xl text-gold-heading select-none blur-[7px]" aria-hidden="true">
                    $0,000 – $0,000
                  </p>
                  <p className="text-charcoal-light text-xs font-light mt-3">
                    {quote.lines.length} item{quote.lines.length === 1 ? '' : 's'}, delivery to{' '}
                    {form.city || 'your city'} included.
                  </p>
                </div>
              )}

              {quote.hasEstimate && unlocked && (
                <>
                  <p className="font-serif text-3xl text-gold-heading mb-5">
                    {formatRange(quote.low, quote.high)}
                  </p>
                  <ul className="space-y-2.5 mb-5 list-none">
                    {quote.lines.map((line, i) => (
                      <li key={i} className="flex justify-between gap-3 text-xs">
                        <span className="text-charcoal-light font-light">
                          {line.label}
                          {line.detail && (
                            <span className="block text-charcoal-light/70">{line.detail}</span>
                          )}
                        </span>
                        <span className="text-charcoal whitespace-nowrap">
                          {formatRange(line.low, line.high)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {quote.notes.map((n, i) => (
                    <p key={i} className="text-charcoal-light text-xs font-light mb-2 flex gap-2">
                      <AlertCircle size={13} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {n}
                    </p>
                  ))}
                </>
              )}

              {!unlocked && (
                <div className="border-t border-taupe/40 pt-5 space-y-3">
                  <div>
                    <label htmlFor="name" className="block text-charcoal text-sm mb-1.5">Name</label>
                    <input id="name" required value={form.name} onChange={set('name')} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-charcoal text-sm mb-1.5">Email</label>
                    <input id="email" type="email" required value={form.email} onChange={set('email')} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-charcoal text-sm mb-1.5">Phone</label>
                    <input id="phone" type="tel" required value={form.phone} onChange={set('phone')} className={inputClass} />
                  </div>
                </div>
              )}

              <div className="border-t border-taupe/40 mt-5 pt-5">
                <p className="text-gold-accessible text-[10px] tracking-[0.25em] uppercase mb-2">
                  Your date
                </p>
                <p className="text-charcoal-light text-xs font-light" role="status">
                  {availability.message}
                </p>
              </div>

              <button
                type="submit"
                disabled={submit.status === 'sending' || !quote.hasEstimate}
                className="w-full mt-6 bg-charcoal text-cream px-6 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {submit.status === 'sending' && <Loader2 size={13} className="animate-spin" aria-hidden="true" />}
                {unlocked ? 'Send Updated Details' : 'Show My Estimate'}
              </button>

              {!unlocked && (
                <p className="text-charcoal-light text-[11px] font-light mt-3 text-center">
                  No obligation. We will send your quote and follow up within 24 hours.
                </p>
              )}

              {unlocked && (
                <Link
                  to="/inquire"
                  className="block w-full mt-3 border border-charcoal/30 text-charcoal text-center px-6 py-4 text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors"
                >
                  Ready? Book Your Date &rarr;
                </Link>
              )}

              <div ref={resultRef}>
                {submit.status === 'sent' && (
                  <p className="mt-4 text-sm font-light text-charcoal border border-gold/50 bg-gold/10 p-4" role="status">
                    {submit.message}
                  </p>
                )}
                {submit.status === 'fallback' && (
                  <p className="mt-4 text-sm font-light text-charcoal border border-gold/50 bg-gold/10 p-4">
                    {submit.message}{' '}
                    <a href={submit.href} className="underline text-gold-accessible">
                      Open your email app
                    </a>
                    , or call{' '}
                    <a href="tel:+15027358428" className="underline text-gold-accessible">
                      (502) 735-8428
                    </a>
                    .
                  </p>
                )}
                {submit.status === 'error' && (
                  <p className="mt-4 text-sm font-light text-charcoal" role="alert">
                    {submit.message}
                  </p>
                )}
              </div>

              <p className="text-charcoal-light text-[11px] font-light mt-5 leading-relaxed">
                Prefer to talk it through?{' '}
                <a href="tel:+15027358428" className="text-gold-accessible underline">
                  (502) 735-8428
                </a>
                . Or browse the{' '}
                <Link to="/menu" className="text-gold-accessible underline">
                  full menu
                </Link>{' '}
                first.
              </p>
            </div>
          </aside>
        </div>
      </form>
    </article>
  )
}
