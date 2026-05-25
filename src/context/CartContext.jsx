import { useState, useCallback, useRef } from 'react'
import { getShopifyClient } from '../lib/shopify'
import { CartContext } from './cartContextValue'

export function CartProvider({ children }) {
  const [checkout, setCheckout] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [localItems, setLocalItems] = useState([])
  const checkoutInitRef = useRef(null)

  const ensureCheckout = useCallback(async () => {
    if (checkout) return checkout
    if (!checkoutInitRef.current) {
      checkoutInitRef.current = getShopifyClient().then((c) => c.checkout.create())
    }
    const created = await checkoutInitRef.current
    setCheckout(created)
    return created
  }, [checkout])

  const addToCart = useCallback(
    async (variantId, quantity = 1, customAttributes = []) => {
      const current = await ensureCheckout()
      const client = await getShopifyClient()
      const lineItem = { variantId, quantity }
      if (customAttributes.length > 0) {
        lineItem.customAttributes = customAttributes
      }
      const next = await client.checkout.addLineItems(current.id, [lineItem])
      setCheckout(next)
      setCartOpen(true)
    },
    [ensureCheckout]
  )

  const updateQuantity = useCallback(
    async (lineItemId, quantity) => {
      if (!checkout) return
      const client = await getShopifyClient()
      const next = await client.checkout.updateLineItems(checkout.id, [
        { id: lineItemId, quantity },
      ])
      setCheckout(next)
    },
    [checkout]
  )

  const removeFromCart = useCallback(
    async (lineItemId) => {
      if (!checkout) return
      const client = await getShopifyClient()
      const next = await client.checkout.removeLineItems(checkout.id, [lineItemId])
      setCheckout(next)
    },
    [checkout]
  )

  // ── Local (non-Shopify) cart functions ──

  const addLocalItem = useCallback((item) => {
    setLocalItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === item.id &&
          i.size === item.size &&
          i.customization === item.customization
      )
      if (existing) {
        return prev.map((i) =>
          i === existing
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        )
      }
      return [...prev, { ...item, _key: `${item.id}-${Date.now()}` }]
    })
    setCartOpen(true)
  }, [])

  const updateLocalQuantity = useCallback((itemKey, quantity) => {
    setLocalItems((prev) =>
      prev.map((i) => (i._key === itemKey ? { ...i, quantity } : i))
    )
  }, [])

  const removeLocalItem = useCallback((itemKey) => {
    setLocalItems((prev) => prev.filter((i) => i._key !== itemKey))
  }, [])

  // ── Derived values ──

  const lineItems = checkout?.lineItems || []
  const totalPrice = checkout?.totalPrice?.amount || '0.00'
  const itemCount = lineItems.reduce((sum, item) => sum + item.quantity, 0)
  const checkoutUrl = checkout?.webUrl || ''

  const localTotal = localItems.reduce((sum, item) => {
    const ribbonCost = item.ribbon ? (typeof item.ribbon === 'number' ? item.ribbon : 5) : 0
    return sum + (item.price + ribbonCost) * item.quantity
  }, 0)

  const localItemCount = localItems.reduce((sum, item) => sum + item.quantity, 0)

  const cartTotal = parseFloat(totalPrice) + localTotal
  const cartItemCount = itemCount + localItemCount

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        lineItems,
        totalPrice,
        itemCount,
        checkoutUrl,
        localItems,
        addLocalItem,
        updateLocalQuantity,
        removeLocalItem,
        localTotal,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
