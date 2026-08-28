import { useState, useMemo } from 'react'
import { Printer } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { MENU, MENU_BY_ID, BOARD_SIZES } from '../data/menu'
import { buildGroceryList } from '../data/groceries'
import { estimate, formatRange, ADDONS } from '../data/quote'

// Internal planning tool. Not linked from the site and excluded from search --
// it turns a booked event into a costed shopping list.

const GROUPS = [
  { label: 'Grazing tables', ids: ['grazing-table', 'grazing-table-dessert'] },
  { label: 'Lunch & corporate', ids: ['sandwich-tray', 'half-sandwich-salad', 'artisan-lunch-box', 'breakfast-tray'] },
  { label: 'Boards', ids: ['classic-board', 'veggie-board', 'fruit-board', 'brunch-board', 'seasonal-board', 'garden-bundle', 'ultimate-bundle'] },
  { label: 'Cups & boxes', ids: ['classic-cup', 'classic-shot', 'sweet-tooth-cup', 'yogurt-cup', 'classic-box', 'brunch-box', 'sweet-tooth-box'] },
  { label: 'Celebration', ids: ['charcuterie-bouquet', 'mom-box'] },
]

const inputClass =
  'w-full bg-warm-white border border-taupe/50 px-3 py-2 text-charcoal text-sm font-light focus:border-gold focus:outline-none'

export default function GroceryListPage() {
  useSEO({
    title: 'Shopping List Builder',
    description: 'Internal planning tool.',
    path: '/tools/grocery-list',
    noindex: true,
  })

  const [guests, setGuests] = useState('40')
  const [role, setRole] = useState('appetizer')
  const [services, setServices] = useState(['grazing-table'])
  const [quantities, setQuantities] = useState({})
  const [sizes, setSizes] = useState({})
  const [addons, setAddons] = useState([])
  const [eventName, setEventName] = useState('')

  const toggle = (id) =>
    setServices((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const list = useMemo(
    () => buildGroceryList({ guests, services, role, quantities, sizes, addons }, BOARD_SIZES),
    [guests, services, role, quantities, sizes, addons],
  )
  const quote = useMemo(
    () => estimate({ guests, services, addons, city: 'Lexington', sizes, quantities }),
    [guests, services, addons, sizes, quantities],
  )

  const revenue = quote.low
  const margin = revenue ? Math.round(((revenue - list.estimatedCost) / revenue) * 100) : null

  return (
    <article className="bg-cream min-h-screen pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 print:mb-4">
          <p className="text-gold-accessible text-xs tracking-[0.3em] uppercase mb-3 print:hidden">
            Internal Tool
          </p>
          <h1 className="font-serif text-3xl md:text-4xl mb-2">Shopping List Builder</h1>
          <p className="text-charcoal-light font-light text-sm print:hidden">
            Pick what is booked and this builds the list, the quantities to buy, and
            the food cost against the quote.
          </p>
        </header>

        <div className="grid lg:grid-cols-[340px_1fr] gap-10 items-start">
          {/* Controls */}
          <div className="print:hidden">
            <div className="bg-warm-white border border-taupe/50 p-6">
              <label htmlFor="event" className="block text-charcoal text-sm mb-2">Event name</label>
              <input id="event" value={eventName} onChange={(e) => setEventName(e.target.value)} className={`${inputClass} mb-5`} placeholder="Smith wedding, 5/16" />

              <label htmlFor="guests" className="block text-charcoal text-sm mb-2">Guests</label>
              <input id="guests" type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} className={`${inputClass} mb-5`} />

              <fieldset className="mb-5">
                <legend className="text-charcoal text-sm mb-2">Grazing table is…</legend>
                <div className="flex gap-2">
                  {[['appetizer', 'Appetizer'], ['main', 'The meal']].map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setRole(v)}
                      aria-pressed={role === v}
                      className={`flex-1 border px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                        role === v ? 'border-gold bg-gold/10 text-charcoal' : 'border-taupe/50 text-charcoal-light hover:border-gold/50'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </fieldset>

              {GROUPS.map((g) => (
                <fieldset key={g.label} className="mb-5">
                  <legend className="text-gold-accessible text-[10px] tracking-[0.25em] uppercase mb-2">
                    {g.label}
                  </legend>
                  <div className="space-y-1.5">
                    {g.ids.map((id) => {
                      const item = MENU_BY_ID[id]
                      if (!item) return null
                      const on = services.includes(id)
                      return (
                        <div key={id}>
                          <label className="flex items-center gap-2 text-sm font-light text-charcoal-light cursor-pointer">
                            <input type="checkbox" checked={on} onChange={() => toggle(id)} className="accent-gold" />
                            {item.name}
                          </label>
                          {on && item.pricing === 'unit' && (
                            <input
                              type="number" min="1" aria-label={`${item.name} quantity`}
                              value={quantities[id] ?? ''}
                              placeholder={`qty (min ${item.minQty || 1})`}
                              onChange={(e) => setQuantities((q) => ({ ...q, [id]: e.target.value }))}
                              className={`${inputClass} mt-1 ml-6 w-[calc(100%-1.5rem)]`}
                            />
                          )}
                          {on && item.pricing === 'sized' && (
                            <div className="ml-6 mt-1 flex gap-2">
                              <select
                                aria-label={`${item.name} size`}
                                value={sizes[id] || 'medium'}
                                onChange={(e) => setSizes((s) => ({ ...s, [id]: e.target.value }))}
                                className={inputClass}
                              >
                                {BOARD_SIZES.map((s) => (
                                  <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                              </select>
                              <input
                                type="number" min="1" aria-label={`${item.name} count`}
                                value={quantities[id] ?? ''} placeholder="×"
                                onChange={(e) => setQuantities((q) => ({ ...q, [id]: e.target.value }))}
                                className={`${inputClass} w-16`}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </fieldset>
              ))}

              <fieldset className="mb-2">
                <legend className="text-gold-accessible text-[10px] tracking-[0.25em] uppercase mb-2">Styling</legend>
                {ADDONS.filter((a) => ['floral', 'greenery'].includes(a.id)).map((a) => (
                  <label key={a.id} className="flex items-center gap-2 text-sm font-light text-charcoal-light cursor-pointer mb-1.5">
                    <input
                      type="checkbox"
                      checked={addons.includes(a.id)}
                      onChange={() => setAddons((p) => (p.includes(a.id) ? p.filter((x) => x !== a.id) : [...p, a.id]))}
                      className="accent-gold"
                    />
                    {a.name}
                  </label>
                ))}
              </fieldset>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="bg-warm-white border border-taupe/50 p-7">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-serif text-2xl">{eventName || 'Shopping list'}</h2>
                  <p className="text-charcoal-light text-xs font-light mt-1">
                    {guests || 0} guests · {services.length} item{services.length === 1 ? '' : 's'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="print:hidden border border-charcoal/30 text-charcoal px-4 py-2 text-xs tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <Printer size={13} aria-hidden="true" /> Print
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8 pb-6 border-b border-taupe/40">
                <div>
                  <p className="text-gold-accessible text-[10px] tracking-[0.2em] uppercase mb-1">Food cost</p>
                  <p className="font-serif text-2xl">${list.estimatedCost}</p>
                </div>
                <div>
                  <p className="text-gold-accessible text-[10px] tracking-[0.2em] uppercase mb-1">Quote</p>
                  <p className="font-serif text-2xl">{formatRange(quote.low, quote.high) || '—'}</p>
                </div>
                <div>
                  <p className="text-gold-accessible text-[10px] tracking-[0.2em] uppercase mb-1">Gross margin</p>
                  <p className="font-serif text-2xl">{margin === null ? '—' : `${margin}%`}</p>
                </div>
              </div>

              {list.sections.length === 0 && (
                <p className="text-charcoal-light font-light text-sm">
                  Choose what is booked on the left and the list appears here.
                </p>
              )}

              {list.sections.map((s) => (
                <section key={s.section} className="mb-7">
                  <h3 className="text-gold-accessible text-[11px] tracking-[0.25em] uppercase mb-3">
                    {s.section}
                  </h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-charcoal-light/70 text-[11px] uppercase tracking-wider">
                        <th className="font-normal pb-2">Item</th>
                        <th className="font-normal pb-2">Need</th>
                        <th className="font-normal pb-2">Buy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.items.map((i) => (
                        <tr key={i.key} className="border-t border-taupe/30">
                          <td className="py-2 pr-3 text-charcoal font-light">{i.name}</td>
                          <td className="py-2 pr-3 text-charcoal-light font-light whitespace-nowrap">{i.needed}</td>
                          <td className="py-2 text-charcoal font-light whitespace-nowrap">{i.buy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ))}

              {list.assumptions.length > 0 && (
                <div className="border-t border-taupe/40 pt-4 mt-2">
                  <p className="text-gold-accessible text-[10px] tracking-[0.2em] uppercase mb-2">Assumptions</p>
                  <ul className="list-none space-y-1">
                    {list.assumptions.map((a, i) => (
                      <li key={i} className="text-charcoal-light text-xs font-light">{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
