// Shopping-list generator.
//
// Aiyana builds a grocery list by hand for every booked event, which is the
// single most time-consuming part of planning. This turns the same inputs the
// quote already collects -- guest count and selected items -- into a costed
// list grouped by store section.
//
// The per-guest yields below are standard catering ratios. Tune `YIELDS` and
// `packSize` to match how she actually shops.

// How much food per guest, in ounces unless noted.
export const YIELDS = {
  // Grazing table as one option among other food (most weddings, receptions).
  appetizer: {
    cheese: 3, curedMeat: 2.5, fruit: 3, veggies: 1.5, crackers: 8,
    nuts: 0.75, olives: 0.75, sweets: 1, dips: 0.75, honeyJam: 0.3,
  },
  // Grazing table as the main food (lunches, casual receptions, open houses).
  main: {
    cheese: 4.5, curedMeat: 3.5, fruit: 4, veggies: 2.5, crackers: 12,
    nuts: 1, olives: 1, sweets: 1.5, dips: 1.25, honeyJam: 0.4,
  },
}

// unit: 'oz' | 'ct' | 'bunch'.  packSize is how the item is bought.
export const INGREDIENTS = {
  cheese: { name: 'Assorted cheeses (brie, manchego, cheddar, havarti)', section: 'Deli & Cheese', unit: 'oz', packSize: 8, packLabel: '8 oz block', unitCost: 4.5 },
  curedMeat: { name: 'Cured meats (salami, prosciutto, pepperoni)', section: 'Deli & Cheese', unit: 'oz', packSize: 6, packLabel: '6 oz pack', unitCost: 5.0 },
  fruit: { name: 'Seasonal fruit & berries', section: 'Produce', unit: 'oz', packSize: 16, packLabel: '1 lb', unitCost: 4.0 },
  veggies: { name: 'Fresh vegetables (carrots, cucumber, peppers, tomatoes)', section: 'Produce', unit: 'oz', packSize: 16, packLabel: '1 lb', unitCost: 3.0 },
  crackers: { name: 'Crackers & crostini', section: 'Pantry', unit: 'ct', packSize: 40, packLabel: 'box (~40)', unitCost: 4.5 },
  nuts: { name: 'Marcona almonds, candied pecans', section: 'Pantry', unit: 'oz', packSize: 8, packLabel: '8 oz bag', unitCost: 6.0 },
  olives: { name: 'Olives & cornichons', section: 'Pantry', unit: 'oz', packSize: 10, packLabel: '10 oz jar', unitCost: 5.0 },
  sweets: { name: 'Chocolate-covered pretzels, cookies, sweets', section: 'Pantry', unit: 'oz', packSize: 10, packLabel: '10 oz bag', unitCost: 6.0 },
  dips: { name: 'Dips, spreads & mustards', section: 'Pantry', unit: 'oz', packSize: 10, packLabel: '10 oz container', unitCost: 4.5 },
  honeyJam: { name: 'Honey & fruit preserves', section: 'Pantry', unit: 'oz', packSize: 12, packLabel: '12 oz jar', unitCost: 6.0 },
  greenery: { name: 'Eucalyptus / rosemary garnish', section: 'Floral & Garnish', unit: 'bunch', packSize: 1, packLabel: 'bunch', unitCost: 6.0 },
  florals: { name: 'Fresh florals', section: 'Floral & Garnish', unit: 'bunch', packSize: 1, packLabel: 'bunch', unitCost: 12.0 },
  croissant: { name: 'Croissants', section: 'Bakery', unit: 'ct', packSize: 12, packLabel: '12 ct', unitCost: 9.0 },
  ciabatta: { name: 'Ciabatta rolls', section: 'Bakery', unit: 'ct', packSize: 8, packLabel: '8 ct', unitCost: 6.0 },
  turkey: { name: 'Sliced turkey', section: 'Deli & Cheese', unit: 'oz', packSize: 16, packLabel: '1 lb', unitCost: 11.0 },
  chickenSalad: { name: 'Chicken salad (house-made)', section: 'Deli & Cheese', unit: 'oz', packSize: 16, packLabel: '1 lb', unitCost: 9.0 },
  havarti: { name: 'Havarti slices', section: 'Deli & Cheese', unit: 'oz', packSize: 8, packLabel: '8 oz', unitCost: 5.0 },
  pesto: { name: 'Pesto', section: 'Pantry', unit: 'oz', packSize: 8, packLabel: '8 oz jar', unitCost: 6.0 },
  lettuce: { name: 'Lettuce / spring mix', section: 'Produce', unit: 'oz', packSize: 10, packLabel: '10 oz', unitCost: 4.0 },
  saladGreens: { name: 'Salad greens & dressing', section: 'Produce', unit: 'oz', packSize: 16, packLabel: '1 lb', unitCost: 5.5 },
  yogurt: { name: 'Yogurt', section: 'Dairy', unit: 'oz', packSize: 32, packLabel: '32 oz tub', unitCost: 5.0 },
  granola: { name: 'Granola', section: 'Pantry', unit: 'oz', packSize: 12, packLabel: '12 oz bag', unitCost: 5.5 },
  pastries: { name: 'Mini pastries & muffins', section: 'Bakery', unit: 'ct', packSize: 12, packLabel: '12 ct', unitCost: 10.0 },
  bagels: { name: 'Bagels & cream cheese', section: 'Bakery', unit: 'ct', packSize: 6, packLabel: '6 ct', unitCost: 6.0 },
  cups: { name: 'Clear serving cups & lids', section: 'Supplies', unit: 'ct', packSize: 50, packLabel: '50 ct', unitCost: 14.0 },
  boxes: { name: 'Kraft boxes & liners', section: 'Supplies', unit: 'ct', packSize: 25, packLabel: '25 ct', unitCost: 18.0 },
  trays: { name: 'Serving trays / disposable platters', section: 'Supplies', unit: 'ct', packSize: 10, packLabel: '10 ct', unitCost: 22.0 },
}

// Per-unit ingredient requirements for items that are not priced per guest.
const UNIT_RECIPES = {
  'classic-cup': { cheese: 1.2, curedMeat: 1, crackers: 3, sweets: 0.8, fruit: 1, cups: 1 },
  'classic-shot': { cheese: 0.8, curedMeat: 0.6, crackers: 2, sweets: 0.5, fruit: 0.6, cups: 1 },
  'sweet-tooth-cup': { sweets: 2.5, fruit: 1.2, cups: 1 },
  'yogurt-cup': { yogurt: 4, granola: 1, fruit: 1, honeyJam: 0.3, cups: 1 },
  'classic-box': { cheese: 2, curedMeat: 1.75, fruit: 1.5, sweets: 1, greenery: 0.05, boxes: 1 },
  'brunch-box': { bagels: 1, pastries: 1, yogurt: 4, fruit: 2, boxes: 1 },
  'sweet-tooth-box': { sweets: 3.5, fruit: 1.5, boxes: 1 },
  'sandwich-tray': { croissant: 6, ciabatta: 6, chickenSalad: 18, turkey: 18, havarti: 6, pesto: 3, lettuce: 4, trays: 1 },
  'half-sandwich-salad': { ciabatta: 0.5, turkey: 1.5, chickenSalad: 1.5, havarti: 0.5, lettuce: 0.4, saladGreens: 3, boxes: 1 },
  'artisan-lunch-box': { ciabatta: 0.5, croissant: 0.5, turkey: 1.75, chickenSalad: 1.75, havarti: 0.5, pesto: 0.3, lettuce: 0.5, cheese: 1, curedMeat: 0.75, crackers: 3, boxes: 1 },
  'breakfast-tray': { pastries: 6, bagels: 4, yogurt: 24, fruit: 24, granola: 4, trays: 1 },
  'charcuterie-bouquet': { cheese: 5, curedMeat: 4, fruit: 3, crackers: 6, greenery: 0.5 },
  'mom-box': { cheese: 4, curedMeat: 3, fruit: 3, sweets: 2, boxes: 1 },
}

// Boards scale off the size's guest count with slightly richer ratios than a
// grazing table, since a board is the whole offering rather than one station.
const BOARD_PROFILES = {
  'classic-board': { cheese: 1.5, curedMeat: 1.3, fruit: 1.2, crackers: 4, nuts: 0.4, olives: 0.4, dips: 0.3 },
  'veggie-board': { veggies: 4, dips: 1.2 },
  'fruit-board': { fruit: 5 },
  'brunch-board': { pastries: 0.8, cheese: 1.2, fruit: 2, honeyJam: 0.4 },
  'seasonal-board': { cheese: 1.5, curedMeat: 1.3, fruit: 1.2, crackers: 4, nuts: 0.4, sweets: 0.5 },
  'garden-bundle': { fruit: 5, veggies: 4, dips: 1.2 },
  'ultimate-bundle': { cheese: 1.5, curedMeat: 1.3, fruit: 5, veggies: 4, crackers: 4, dips: 1.2 },
}

function addTo(totals, key, amount) {
  if (!amount) return
  totals[key] = (totals[key] || 0) + amount
}

/**
 * Build a shopping list.
 *
 * @param {object} input
 * @param {number} input.guests
 * @param {string[]} input.services       selected menu ids
 * @param {'appetizer'|'main'} input.role how the grazing table is being used
 * @param {object} input.quantities       { [itemId]: qty } for unit items
 * @param {object} input.sizes            { [itemId]: sizeId } for boards
 * @param {string[]} input.addons         addon ids (floral/greenery)
 * @param {object[]} input.boardSizes     BOARD_SIZES from menu.js
 */
export function buildGroceryList(input, boardSizes) {
  const guests = Math.max(0, Number(input.guests) || 0)
  const role = input.role === 'main' ? 'main' : 'appetizer'
  const services = input.services || []
  const quantities = input.quantities || {}
  const sizes = input.sizes || {}
  const addons = input.addons || []
  const totals = {}
  const assumptions = []

  for (const id of services) {
    if (id === 'grazing-table' || id === 'grazing-table-dessert') {
      const y = YIELDS[role]
      const count = Math.max(guests, 20)
      if (id === 'grazing-table') {
        for (const [k, per] of Object.entries(y)) addTo(totals, k, per * count)
        addTo(totals, 'greenery', Math.ceil(count / 25))
        assumptions.push(`Grazing table costed for ${count} guests as the ${role === 'main' ? 'main food' : 'appetizer/grazing option'}.`)
      } else {
        addTo(totals, 'sweets', 3.5 * count)
        addTo(totals, 'fruit', 2 * count)
        addTo(totals, 'greenery', Math.ceil(count / 30))
        assumptions.push(`Dessert table costed for ${count} guests.`)
      }
      continue
    }

    if (BOARD_PROFILES[id]) {
      const sizeId = sizes[id] || 'medium'
      const size = (boardSizes || []).find((s) => s.id === sizeId)
      const serves = size ? size.serves : 8
      const qty = Math.max(1, Number(quantities[id]) || 1)
      for (const [k, per] of Object.entries(BOARD_PROFILES[id])) {
        addTo(totals, k, per * serves * qty)
      }
      assumptions.push(`${id} × ${qty} at ${size ? size.label : 'Medium'} (serves ~${serves} each).`)
      continue
    }

    if (UNIT_RECIPES[id]) {
      const qty = Math.max(1, Number(quantities[id]) || guests || 1)
      for (const [k, per] of Object.entries(UNIT_RECIPES[id])) {
        addTo(totals, k, per * qty)
      }
      assumptions.push(`${id} × ${qty}.`)
    }
  }

  if (addons.includes('floral')) addTo(totals, 'florals', Math.max(2, Math.ceil(guests / 30)))
  if (addons.includes('greenery')) addTo(totals, 'greenery', Math.max(1, Math.ceil(guests / 40)))

  const bySection = {}
  let estimatedCost = 0
  for (const [key, amount] of Object.entries(totals)) {
    const ing = INGREDIENTS[key]
    if (!ing || amount <= 0) continue
    const packs = Math.ceil(amount / ing.packSize)
    const cost = packs * ing.unitCost
    estimatedCost += cost
    const rounded = Math.round(amount * 10) / 10
    bySection[ing.section] = bySection[ing.section] || []
    bySection[ing.section].push({
      key,
      name: ing.name,
      needed: `${rounded} ${ing.unit === 'oz' && rounded >= 16 ? `oz (${(rounded / 16).toFixed(1)} lb)` : ing.unit}`,
      buy: `${packs} × ${ing.packLabel}`,
      packs,
      cost,
    })
  }

  const sections = Object.entries(bySection)
    .map(([section, items]) => ({ section, items: items.sort((a, b) => a.name.localeCompare(b.name)) }))
    .sort((a, b) => a.section.localeCompare(b.section))

  return { sections, estimatedCost: Math.round(estimatedCost), assumptions }
}
