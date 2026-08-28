// The catalog, mirrored from the Shopify store it replaces.
//
// One source of truth for three things:
//   1. the /menu page                (what customers browse)
//   2. the quote estimator on /inquire (what an event costs)
//   3. the grocery list tool          (what to buy for a booked event)
//
// `from` prices match the published Shopify prices. `perGuest` items are
// priced per head; `unit` items are priced per board/box/cup/tray.

export const CATEGORIES = [
  { id: 'grazing', label: 'Grazing Tables', blurb: 'The centerpiece. Built and styled on site for 20-200+ guests.' },
  { id: 'lunch', label: 'Lunch & Corporate', blurb: 'Sandwich trays, boxed lunches, and easy midday catering for teams.' },
  { id: 'boards', label: 'Charcuterie Boards', blurb: 'Signature boards in four sizes, made fresh to order.' },
  { id: 'cups', label: 'Cups & Shots', blurb: 'Individually portioned, grab-and-go. Great for large headcounts.' },
  { id: 'boxes', label: 'Boxes', blurb: 'Shareable curated boxes for meetings, gifting, and brunch.' },
  { id: 'bundles', label: 'Bundles', blurb: 'Our most-booked combinations, priced below buying separately.' },
  { id: 'celebration', label: 'Celebration & Gifting', blurb: 'Bouquets, letters, numbers, and keepsake engraved boards.' },
]

export const MENU = [
  // ---------- Grazing tables (flagship) ----------
  {
    id: 'grazing-table',
    category: 'grazing',
    name: 'Grazing Table',
    blurb:
      'A styled tablescape of artisan cheeses, cured meats, seasonal fruit, nuts, olives, crackers, and gourmet sweets, with floral or greenery accents to match your event. Delivered, built, and styled on site; broken down afterward.',
    pricing: 'perGuest',
    minGuests: 20,
    tags: ['weddings', 'corporate', 'showers', 'holiday'],
  },
  {
    id: 'grazing-table-dessert',
    category: 'grazing',
    name: 'Dessert Grazing Table',
    blurb:
      'Brownie bites, cookies, chocolate-covered strawberries, macarons, and seasonal sweets, styled the same way as our savory tables.',
    pricing: 'perGuest',
    minGuests: 20,
    tags: ['weddings', 'showers', 'holiday'],
  },

  // ---------- Lunch & corporate ----------
  {
    id: 'sandwich-tray',
    category: 'lunch',
    name: 'Sandwich Tray',
    blurb:
      '12 freshly made sandwiches, arranged and ready to serve. Choose Chicken Salad Croissant (house-made chicken salad, buttery croissant, crisp lettuce) or Tuscan Turkey Ciabatta (sliced turkey, pesto, Havarti, lettuce, toasted ciabatta).',
    pricing: 'unit',
    from: 50,
    unitLabel: 'tray',
    serves: 12,
    tags: ['corporate', 'lunch', 'meetings'],
  },
  {
    id: 'half-sandwich-salad',
    category: 'lunch',
    name: 'Half Sandwich & Salad',
    blurb:
      'A half Tuscan Turkey or Chicken Salad sandwich paired with a fresh side salad and dressing. The lighter lunch option for daytime meetings and trainings.',
    pricing: 'unit',
    from: 14,
    unitLabel: 'serving',
    serves: 1,
    minQty: 10,
    tags: ['corporate', 'lunch', 'meetings'],
  },
  {
    id: 'artisan-lunch-box',
    category: 'lunch',
    name: 'Artisan Lunch Box',
    blurb:
      'A freshly made sandwich (Tuscan Turkey or Chicken Salad Croissant), a personal charcuterie boat, and your choice of crackers or chips. Individually packaged for easy handout.',
    pricing: 'unit',
    from: 18,
    unitLabel: 'box',
    serves: 1,
    minQty: 10,
    tags: ['corporate', 'lunch', 'meetings'],
  },
  {
    id: 'breakfast-tray',
    category: 'lunch',
    name: 'Breakfast & Brunch Tray',
    blurb:
      'Mini pastries, bagels and spreads, yogurt parfaits, and fresh fruit for early meetings and morning events.',
    pricing: 'unit',
    from: 55,
    unitLabel: 'tray',
    serves: 12,
    tags: ['corporate', 'brunch', 'meetings'],
  },

  // ---------- Boards ----------
  {
    id: 'classic-board',
    category: 'boards',
    name: 'The Classic Board',
    blurb:
      'Artisan cheeses, premium cured meats, seasonal fruit, nuts, olives, and house-paired accompaniments, beautifully styled.',
    pricing: 'sized',
    from: 65,
    tags: ['popular'],
  },
  {
    id: 'veggie-board',
    category: 'boards',
    name: 'The Veggie Board',
    blurb:
      'Seasonal vegetables — carrots, cucumbers, celery, broccoli, cauliflower, bell peppers, snap peas, cherry tomatoes — with 1-2 dips or spreads depending on size.',
    pricing: 'sized',
    from: 50,
    tags: ['vegetarian'],
  },
  {
    id: 'fruit-board',
    category: 'boards',
    name: 'The Fruit Board',
    blurb: 'Seasonal fruit, berries, and citrus, artfully arranged for a fresh, naturally sweet spread.',
    pricing: 'sized',
    from: 55,
    tags: ['vegetarian'],
  },
  {
    id: 'brunch-board',
    category: 'boards',
    name: 'The Brunch Board',
    blurb: 'Mini pastries, creamy cheeses, fresh berries, honey accents, and delicate brunch pairings.',
    pricing: 'sized',
    from: 55,
    tags: ['brunch'],
  },
  {
    id: 'seasonal-board',
    category: 'boards',
    name: 'Seasonal & Themed Boards',
    blurb:
      'Game Day, Birthday & Anniversary, Thanksgiving, Christmas, Halloween, Easter, and Custom Message boards — same signature quality, styled for the occasion.',
    pricing: 'sized',
    from: 65,
    tags: ['seasonal'],
  },

  // ---------- Cups ----------
  {
    id: 'classic-cup',
    category: 'cups',
    name: 'The Classic Cup',
    blurb: 'Cheddar, pepperoni, salami, crostini crackers, chocolate-covered pretzels, and fresh fruit.',
    pricing: 'unit',
    from: 8,
    unitLabel: 'cup',
    serves: 1,
    minQty: 15,
    tags: ['corporate', 'large-events'],
  },
  {
    id: 'classic-shot',
    category: 'cups',
    name: 'The Classic Shot',
    blurb: 'A smaller version of the Classic Cup. The most cost-effective way to serve a large crowd.',
    pricing: 'unit',
    from: 5,
    unitLabel: 'shot',
    serves: 1,
    minQty: 15,
    tags: ['corporate', 'large-events', 'budget'],
  },
  {
    id: 'sweet-tooth-cup',
    category: 'cups',
    name: 'The Sweet Tooth Cup',
    blurb: 'Mini cookies, brownie bites, Rice Krispy treats, chocolate-covered strawberries, and berries.',
    pricing: 'unit',
    from: 8,
    unitLabel: 'cup',
    serves: 1,
    minQty: 15,
    tags: ['dessert'],
  },
  {
    id: 'yogurt-cup',
    category: 'cups',
    name: 'Yogurt Cups',
    blurb: 'Yogurt, granola, berries, and a drizzle of honey.',
    pricing: 'unit',
    from: 2,
    unitLabel: 'cup',
    serves: 1,
    minQty: 15,
    tags: ['brunch', 'budget'],
  },

  // ---------- Boxes ----------
  {
    id: 'classic-box',
    category: 'boxes',
    name: 'The Classic Box',
    blurb:
      'Cured salami, pepperoni, brie, manchego, berries, and chocolate-covered pretzels with rosemary accents.',
    pricing: 'unit',
    from: 10,
    unitLabel: 'box',
    serves: 1,
    minQty: 6,
    tags: ['corporate'],
  },
  {
    id: 'brunch-box',
    category: 'boxes',
    name: 'The Brunch Box',
    blurb: 'Bagels, mini muffins, yogurt, fruit, and spreads for morning events.',
    pricing: 'unit',
    from: 10,
    unitLabel: 'box',
    serves: 1,
    minQty: 6,
    tags: ['corporate', 'brunch'],
  },
  {
    id: 'sweet-tooth-box',
    category: 'boxes',
    name: 'The Sweet Tooth Box',
    blurb: 'Cookies, brownies, chocolate-covered treats, and fruit.',
    pricing: 'unit',
    from: 10,
    unitLabel: 'box',
    serves: 1,
    minQty: 6,
    tags: ['dessert'],
  },

  // ---------- Bundles ----------
  {
    id: 'garden-bundle',
    category: 'bundles',
    name: 'Garden Bundle',
    blurb: 'One fruit board and one veggie board in matching sizes. Saves $5-$20 versus buying separately.',
    pricing: 'sized',
    from: 95,
    tags: ['vegetarian', 'value'],
  },
  {
    id: 'ultimate-bundle',
    category: 'bundles',
    name: 'The Ultimate Bundle',
    blurb:
      'Fruit, Veggie, and Charcuterie boards in matching sizes. Saves $30-$90 versus buying separately.',
    pricing: 'sized',
    from: 225,
    tags: ['popular', 'value'],
  },

  // ---------- Celebration & gifting ----------
  {
    id: 'charcuterie-bouquet',
    category: 'celebration',
    name: 'Charcuterie Bouquet',
    blurb:
      'Premium cheeses, cured meats, fresh fruit, and savory accompaniments styled to resemble a floral bouquet. Ready to gift or serve.',
    pricing: 'unit',
    from: 65,
    unitLabel: 'bouquet',
    serves: 4,
    tags: ['gifting', 'corporate'],
  },
  {
    id: 'charcuterie-letters',
    category: 'celebration',
    name: 'Charcuterie Letters & Numbers',
    blurb:
      'Letter or number bases filled with premium cheeses, cured meats, fruit, and accompaniments. A statement centerpiece for milestones and corporate anniversaries.',
    pricing: 'quote',
    tags: ['gifting', 'corporate', 'milestone'],
  },
  {
    id: 'mom-box',
    category: 'celebration',
    name: 'Mom Charcuterie Box',
    blurb:
      'A curated gift box of premium cheeses, artisan meats, fresh fruit, and sweet treats for new moms and Mother’s Day.',
    pricing: 'unit',
    from: 75,
    unitLabel: 'box',
    serves: 2,
    tags: ['gifting'],
  },
  {
    id: 'engraved-board',
    category: 'celebration',
    name: 'Laser-Engraved Board',
    blurb:
      'A high-quality wooden board custom engraved with a name, logo, monogram, or message. Popular for corporate gifting and branded events.',
    pricing: 'unit',
    from: 65,
    unitLabel: 'board',
    serves: 0,
    tags: ['gifting', 'corporate'],
  },
]

// Board sizes shared by every `pricing: 'sized'` item. Multipliers are applied
// to the item's `from` price, matching the published Classic Board ladder
// ($65 / $120 / $175 / $210).
export const BOARD_SIZES = [
  { id: 'small', label: 'Small', guests: '2-5', serves: 4, multiplier: 1 },
  { id: 'medium', label: 'Medium', guests: '5-10', serves: 8, multiplier: 1.85 },
  { id: 'large', label: 'Large', guests: '10-15', serves: 13, multiplier: 2.7 },
  { id: 'xlarge', label: 'X-Large', guests: '15-20+', serves: 18, multiplier: 3.25 },
]

export function boardPrice(item, sizeId) {
  const size = BOARD_SIZES.find((s) => s.id === sizeId)
  if (!size || !item.from) return null
  return Math.round((item.from * size.multiplier) / 5) * 5
}

export const MENU_BY_ID = Object.fromEntries(MENU.map((m) => [m.id, m]))

export function menuByCategory(categoryId) {
  return MENU.filter((m) => m.category === categoryId)
}
