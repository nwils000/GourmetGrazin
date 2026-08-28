// The build-your-cart selections, taken verbatim from the HoneyBook booking
// form this replaces. Guests choose within each group; `choose` is the number
// the form asks for.
//
// These selections do two jobs: they tell Aiyana exactly what to buy, and they
// let the shopping list name real products instead of generic categories.

export const CART_BUILDER = [
  {
    id: 'meats',
    label: 'Meats',
    choose: 2,
    options: ['Salami', 'Summer Sausage', 'Pepperoni'],
  },
  {
    id: 'cheeses',
    label: 'Cheeses',
    choose: 3,
    options: ['Sharp Cheddar', 'Mild Cheddar', 'Colby Jack', 'Pepper Jack'],
  },
  {
    id: 'crackers',
    label: 'Crackers',
    choose: 2,
    options: ['Multi-grain', 'Ritz', 'Club', 'Pita Chips', 'Dots Pretzels', 'Baguette Slices'],
  },
  {
    id: 'produce',
    label: 'Fruits & Veggies',
    choose: 2,
    options: [
      'Cherry Tomatoes', 'Mini Dill Pickles', 'Grapes', 'Strawberries', 'Raspberries',
      'Blueberries', 'Blackberries', 'Carrots', 'Cucumbers',
    ],
  },
  {
    id: 'nutsOlives',
    label: 'Nuts & Olives',
    choose: 1,
    options: ['Almonds', 'Walnuts', 'Black Olives', 'Green Olives'],
  },
  {
    id: 'sweets',
    label: 'Sweets',
    choose: 1,
    options: ['Dried Mangos', 'Dried Apricots', 'Chocolate Covered Almonds', 'Chocolate Covered Raisins'],
  },
  {
    id: 'dips',
    label: 'Dips',
    choose: 1,
    options: ['Honey', 'Jam'],
  },
]

// Charged per guest, per item selected.
export const PREMIUM_ITEMS = {
  perGuestPerItem: 1,
  options: [
    'Prosciutto',
    'Dark Chocolate Sea Salt Caramels',
    'Chocolate Covered Pretzels',
    'Milk Chocolate Sea Salt Caramels',
  ],
}

export const CONTACT_METHODS = ['Phone Call', 'Text Message', 'Email', 'FB Messenger', 'Insta DM', 'Any']

export const REFERRAL_SOURCES = [
  'Google search', 'Facebook', 'Instagram', 'TikTok', 'A friend or past client',
  'Saw us at an event', 'FOX 56 / Live From Chevy Chase', 'Other',
]

// Verbatim from the booking form, so what people agree to does not quietly change.
export const TERMS = [
  'A non-refundable deposit is required to secure your event date. Your booking is not confirmed until the deposit is received.',
  'Full payment is due 3 days before the event.',
  'Cancellations made within 24 hours of the event are non-refundable.',
  'Rescheduling is allowed within 3 days (72 hours) notice, subject to availability.',
  'Our mobile cart includes free delivery within 20 miles of our location. Additional delivery fees will apply.',
  'We require a flat, accessible area for setup and protection from weather.',
  'We are not an allergen-free vendor. Boards may contain dairy, nuts, gluten, and meat.',
  'You are responsible for informing guests of allergens and providing a safe, accessible setup location.',
  'Any damage caused by guests to our cart or equipment is the responsibility of the client.',
  'We may take and use photos of the setup for marketing unless requested otherwise in writing.',
]

export function premiumUpcharge(selected, guests) {
  const count = (selected || []).filter((v) => PREMIUM_ITEMS.options.includes(v)).length
  return count * PREMIUM_ITEMS.perGuestPerItem * (Number(guests) || 0)
}
