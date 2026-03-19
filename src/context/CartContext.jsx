import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import shopifyClient from '../lib/shopify'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [checkout, setCheckout] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    shopifyClient.checkout.create().then(setCheckout)
  }, [])

  const addToCart = useCallback(
    async (variantId, quantity = 1) => {
      if (!checkout) return
      const next = await shopifyClient.checkout.addLineItems(checkout.id, [
        { variantId, quantity },
      ])
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

  const lineItems = checkout?.lineItems || []
  const totalPrice = checkout?.totalPrice?.amount || '0.00'
  const itemCount = lineItems.reduce((sum, item) => sum + item.quantity, 0)
  const checkoutUrl = checkout?.webUrl || ''

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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
