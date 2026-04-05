import { Link, useLocation, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs'
import PageContainer from '../components/common/PageContainer'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { user, saveBooking } = useAuth()
  const { items, removeItem, updateQuantity, clearCart, totalItems, subtotal, savings } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectToLogin = () => {
    navigate('/login', { state: { from: location } })
  }

  const handleBookItem = (item) => {
    if (!user) {
      redirectToLogin()
      return
    }

    saveBooking({
      productId: item.productId,
      productName: item.name,
      price: item.price * item.quantity,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
    })
  }

  if (items.length === 0) {
    return (
      <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl">🛍️</div>
        <h1 className="mt-5 text-2xl font-semibold text-zinc-900">Your cart is empty</h1>
        <p className="mt-2 text-zinc-600">Find something you love and add it here.</p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Continue Shopping
        </Link>
      </PageContainer>
    )
  }

  const delivery = subtotal >= 999 ? 0 : 99

  return (
    <div className="py-10 sm:py-14">
      <PageContainer>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Shopping Cart{' '}
            <span className="text-lg font-normal text-zinc-500">({totalItems} items)</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-sm font-medium text-red-500 underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Cart items list */}
          <div className="space-y-4">
            {items.map((item) => {
              const itemTotal = item.price * item.quantity
              const lineDiscount = (item.originalPrice - item.price) * item.quantity

              return (
                <div
                  key={item.cartKey}
                  className="flex gap-4 rounded-3xl border border-zinc-200 bg-white p-4 sm:gap-6 sm:p-5"
                >
                  <Link to={`/product/${item.slug}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-24 rounded-2xl object-cover sm:h-32 sm:w-28"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{item.brand}</p>
                        <Link
                          to={`/product/${item.slug}`}
                          className="mt-0.5 font-semibold text-zinc-900 hover:underline"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs text-zinc-600">
                            Color: {item.color}
                          </span>
                          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs text-zinc-600">
                            Size: {item.size}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartKey)}
                        className="shrink-0 rounded-full p-1.5 text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-1">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-700 transition hover:bg-white hover:shadow-sm"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-700 transition hover:bg-white hover:shadow-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-zinc-900">Rs. {itemTotal.toLocaleString()}</p>
                        {lineDiscount > 0 && (
                          <p className="text-xs text-emerald-700">You save Rs. {lineDiscount.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleBookItem(item)}
                        className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
                      >
                        Book item
                      </button>
                      {!user && (
                        <button
                          onClick={redirectToLogin}
                          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
                        >
                          Login to book
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div className="h-fit rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-zinc-900">Order Summary</h2>

            <div className="mt-5 space-y-3 text-sm text-zinc-700">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount savings</span>
                  <span>− Rs. {savings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-emerald-700 font-medium' : ''}>
                  {delivery === 0 ? 'FREE' : `Rs. ${delivery}`}
                </span>
              </div>
              {delivery !== 0 && (
                <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Add Rs. {(999 - subtotal).toLocaleString()} more for free delivery
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-between border-t border-zinc-200 pt-4 font-semibold text-zinc-900">
              <span>Total</span>
              <span>Rs. {(subtotal + delivery).toLocaleString()}</span>
            </div>

            <button className="mt-5 w-full rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700">
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="mt-3 flex w-full items-center justify-center rounded-full border border-zinc-300 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default CartPage
