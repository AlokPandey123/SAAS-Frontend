import { createContext, useContext, useReducer } from 'react'

// ─── helpers ────────────────────────────────────────────────────────────────

const load = () => {
  try {
    const raw = localStorage.getItem('solara_cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const save = (items) => {
  localStorage.setItem('solara_cart', JSON.stringify(items))
}

// ─── reducer ────────────────────────────────────────────────────────────────

const cartReducer = (state, action) => {
  let next

  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((i) => i.cartKey === action.item.cartKey)
      if (existing) {
        next = state.map((i) =>
          i.cartKey === action.item.cartKey
            ? { ...i, quantity: i.quantity + action.item.quantity }
            : i
        )
      } else {
        next = [...state, action.item]
      }
      break
    }

    case 'REMOVE_ITEM': {
      next = state.filter((i) => i.cartKey !== action.cartKey)
      break
    }

    case 'UPDATE_QUANTITY': {
      if (action.quantity < 1) {
        next = state.filter((i) => i.cartKey !== action.cartKey)
      } else {
        next = state.map((i) =>
          i.cartKey === action.cartKey ? { ...i, quantity: action.quantity } : i
        )
      }
      break
    }

    case 'CLEAR_CART': {
      next = []
      break
    }

    default:
      return state
  }

  save(next)
  return next
}

// ─── context ────────────────────────────────────────────────────────────────

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, [], load)

  const addItem = (product, color, size, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        cartKey: `${product.id}__${color}__${size}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: product.price,
        originalPrice: product.originalPrice,
        color,
        size,
        quantity,
      },
    })
  }

  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', cartKey })

  const updateQuantity = (cartKey, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', cartKey, quantity })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const originalTotal = items.reduce((sum, i) => sum + i.originalPrice * i.quantity, 0)
  const savings = originalTotal - subtotal

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, savings }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
