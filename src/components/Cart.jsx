import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const {
    cartOpen,
    setCartOpen,
    // Shopify
    updateQuantity,
    removeFromCart,
    lineItems,
    totalPrice,
    checkoutUrl,
    // Local
    localItems,
    updateLocalQuantity,
    removeLocalItem,
    localTotal,
    // Combined
    cartTotal,
    cartItemCount,
  } = useCart()

  const hasShopifyItems = lineItems.length > 0
  const hasLocalItems = localItems.length > 0
  const hasAnyItems = hasShopifyItems || hasLocalItems

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[60]"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-taupe/40">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-gold" />
            <h2 className="font-serif text-xl">Your Cart</h2>
            {cartItemCount > 0 && (
              <span className="bg-gold text-cream text-[10px] tracking-wider uppercase px-2 py-0.5 font-sans">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="text-charcoal-light hover:text-charcoal transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col h-[calc(100%-73px)]">
          {!hasAnyItems ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <ShoppingBag size={48} className="text-taupe mb-4" />
              <p className="font-serif text-xl mb-2">Your cart is empty</p>
              <p className="text-charcoal-light text-sm font-light">
                Browse our shop to add handcrafted charcuterie to your order.
              </p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {/* Shopify line items */}
                {lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-taupe-light/50 border border-taupe/30"
                  >
                    {item.variant?.image?.src && (
                      <img
                        src={item.variant.image.src}
                        alt={item.title}
                        className="w-20 h-20 object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm mb-1 truncate">
                        {item.title}
                      </h3>
                      {item.variant?.title !== 'Default Title' && (
                        <p className="text-charcoal-light text-xs mb-2">
                          {item.variant.title}
                        </p>
                      )}
                      <p className="text-gold text-sm font-serif">
                        ${parseFloat(item.variant?.price?.amount || 0).toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            item.quantity <= 1
                              ? removeFromCart(item.id)
                              : updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center border border-taupe/50 hover:border-gold text-charcoal-light hover:text-gold transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center border border-taupe/50 hover:border-gold text-charcoal-light hover:text-gold transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-charcoal-light/50 hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Local items */}
                {localItems.map((item) => {
                  const ribbonCost = item.ribbon
                    ? typeof item.ribbon === 'number'
                      ? item.ribbon
                      : 5
                    : 0
                  const linePrice = item.price + ribbonCost

                  return (
                    <div
                      key={item._key}
                      className="flex gap-4 p-4 bg-taupe-light/50 border border-taupe/30"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm mb-1 truncate">
                          {item.title}
                        </h3>
                        {item.size && (
                          <p className="text-charcoal-light text-xs mb-1">
                            Size: {item.size}
                          </p>
                        )}
                        {item.customization && (
                          <p className="text-charcoal-light text-xs mb-1 italic">
                            {item.customization}
                          </p>
                        )}
                        {item.ribbon && (
                          <p className="text-charcoal-light text-xs mb-1 flex items-center gap-1">
                            <span className="text-gold">+</span> Ribbon add-on
                            <span className="text-gold ml-1">
                              (+${ribbonCost.toFixed(2)})
                            </span>
                          </p>
                        )}
                        <p className="text-gold text-sm font-serif">
                          ${linePrice.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() =>
                              item.quantity <= 1
                                ? removeLocalItem(item._key)
                                : updateLocalQuantity(
                                    item._key,
                                    item.quantity - 1
                                  )
                            }
                            className="w-7 h-7 flex items-center justify-center border border-taupe/50 hover:border-gold text-charcoal-light hover:text-gold transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateLocalQuantity(item._key, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center border border-taupe/50 hover:border-gold text-charcoal-light hover:text-gold transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeLocalItem(item._key)}
                            className="ml-auto text-charcoal-light/50 hover:text-red-400 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-taupe/40">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm tracking-wider uppercase text-charcoal-light">
                    Subtotal
                  </span>
                  <span className="font-serif text-xl text-gold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-charcoal-light/60 text-xs mb-4 font-light">
                  Shipping & taxes calculated at checkout.
                </p>

                {/* Checkout buttons */}
                {hasShopifyItems && !hasLocalItems && (
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-charcoal text-cream text-center px-6 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
                  >
                    Checkout
                  </a>
                )}

                {hasLocalItems && !hasShopifyItems && (
                  <a
                    href="https://gourmetgrazin.hbportal.co/public/gourmet-grazin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-charcoal text-cream text-center px-6 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
                  >
                    Complete Inquiry
                  </a>
                )}

                {hasShopifyItems && hasLocalItems && (
                  <div className="space-y-3">
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-charcoal text-cream text-center px-6 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
                    >
                      Checkout Shop Items &mdash; ${parseFloat(totalPrice).toFixed(2)}
                    </a>
                    <a
                      href="https://gourmetgrazin.hbportal.co/public/gourmet-grazin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gold text-cream text-center px-6 py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal transition-colors duration-300"
                    >
                      Complete Inquiry &mdash; ${localTotal.toFixed(2)}
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
