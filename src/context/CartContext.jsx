import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import shopifyClient from '../lib/shopify'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [checkout, setCheckout] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [localItems, setLocalItems] = useState([])

  useEffect(() => {
    shopifyClient.checkout.create().then(setCheckout)
  }, [])

  // ── Shopify cart functions (unchanged) ──

  const addToCart = useCallback(
    async (variantId, quantity = 1, customAttributes = []) => {
      if (!checkout) return
      const lineItem = { variantId, quantity }
      if (customAttributes.length > 0) {
        lineItem.customAttributes = customAttributes
      }
      const next = await shopifyClient.checkout.addLineItems(checkout.id, [lineItem])
      setCheckout(next)
      setCartOpen(true)
    },
    [checkout]
  )

  const updateQuantity = useCallback(
    async (lineItemId, quantity) => {
      if (!checkout) return
      const next = await shopifyClient.checkout.updateLineItems(checkout.id, [
        { id: lineItemId, quantity },
      ])
      setCheckout(next)
    },
    [checkout]
  )

  const removeFromCart = useCallback(
    async (lineItemId) => {
      if (!checkout) return
      const next = await shopifyClient.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])
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
      // Generate a unique internal key so we can target it for updates/removal
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
        // Shopify
        addToCart,
        updateQuantity,
        removeFromCart,
        lineItems,
        totalPrice,
        itemCount,
        checkoutUrl,
        // Local items
        localItems,
        addLocalItem,
        updateLocalQuantity,
        removeLocalItem,
        localTotal,
        // Combined
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
