import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, Check, Loader2, Sparkles, AlertCircle } from 'lucide-react'
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

export default function InquirePage() {
  useSEO({
    title: 'Get an Instant Quote',
    description:
      'Tell us about your event and get pricing, availability, and delivery cost in seconds. Grazing tables, charcuterie and corporate lunch catering across Central Kentucky.',
    path: '/inquire',
  })

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    eventType: '', date: '', guests: '', city: 'Lexington',
    venue: '', budget: '', notes: '',
  })
  const [services, setServices] = useState([])
  const [addons, setAddons] = useState([])
  const [sizes, setSizes] = useState({})
  const [dietary, setDietary] = useState([])
  const [role, setRole] = useState('appetizer')

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
    () => estimate({ guests: form.guests, services, addons, city: form.city, sizes }),
    [form.guests, form.city, services, addons, sizes],
  )
  const availability = useMemo(() => checkAvailability(form.date), [form.date])

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
    if (!form.name || !form.email) {
      setSubmit({ status: 'error', message: 'We need a name and an email to send your quote.' })
      return
    }
    setSubmit({ status: 'sending', message: '' })
    const payload = { form, services, addons, sizes, dietary, role, quote, availability }
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
      // The inquiry is recorded, but if mail delivery is not configured yet it
      // has not actually reached Aiyana. Never imply it did.
      if (data.emailed === false) throw new Error('not delivered')
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

              <Field label="City" htmlFor="city">
                <select id="city" value={form.city} onChange={set('city')} className={inputClass}>
                  {DELIVERY_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Venue or address" hint="Optional — helps us plan load-in." htmlFor="venue">
              <input id="venue" value={form.venue} onChange={set('venue')} className={inputClass} />
            </Field>

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

            <h2 className="font-serif text-2xl mt-10 mb-6">How to reach you</h2>
            <div className="grid sm:grid-cols-2 gap-x-6">
              <Field label="Name" htmlFor="name">
                <input id="name" required value={form.name} onChange={set('name')} className={inputClass} />
              </Field>
              <Field label="Email" htmlFor="email">
                <input id="email" type="email" required value={form.email} onChange={set('email')} className={inputClass} />
              </Field>
              <Field label="Phone" htmlFor="phone">
                <input id="phone" type="tel" value={form.phone} onChange={set('phone')} className={inputClass} />
              </Field>
              <Field label="Budget in mind" hint="Optional. We work with a range." htmlFor="budget">
                <input id="budget" value={form.budget} onChange={set('budget')} placeholder="e.g. around $800" className={inputClass} />
              </Field>
            </div>

            <Field label="Anything else?" hint="Themes, colors, a request you have not seen us offer — ask." htmlFor="notes">
              <textarea id="notes" rows={4} value={form.notes} onChange={set('notes')} className={inputClass} />
            </Field>
          </div>

          {/* ---------------- Live estimate ---------------- */}
          <aside className="lg:sticky lg:top-28">
            <div className="border border-taupe/50 bg-warm-white p-7">
              <h2 className="font-serif text-xl mb-1">Your estimate</h2>
              <p className="text-charcoal-light text-xs font-light mb-5">
                Updates as you choose. Final pricing confirmed by Aiyana.
              </p>

              {quote.hasEstimate ? (
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
                </>
              ) : (
                <p className="text-charcoal-light text-sm font-light mb-5">
                  Choose a guest count and what you are thinking, and your estimate appears here.
                </p>
              )}

              {quote.notes.map((n, i) => (
                <p key={i} className="text-charcoal-light text-xs font-light mb-2 flex gap-2">
                  <AlertCircle size={13} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {n}
                </p>
              ))}

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
                disabled={submit.status === 'sending'}
                className="w-full mt-6 bg-charcoal text-cream px-6 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {submit.status === 'sending' && <Loader2 size={13} className="animate-spin" aria-hidden="true" />}
                Send My Inquiry
              </button>

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
