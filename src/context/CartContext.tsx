import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'

export type CartLine = {
  product: Product
  qty: number
  mode: 'retail' | 'wholesale'
}

type CartContextValue = {
  lines: CartLine[]
  addItem: (product: Product, mode: 'retail' | 'wholesale', qty?: number) => void
  updateQty: (id: string, mode: 'retail' | 'wholesale', qty: number) => void
  removeItem: (id: string, mode: 'retail' | 'wholesale') => void
  clear: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

function unitPrice(product: Product, mode: 'retail' | 'wholesale') {
  if (mode === 'wholesale') return product.wholesaleZar ?? product.priceZar
  return product.priceZar
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])

  const value = useMemo<CartContextValue>(() => {
    const addItem = (
      product: Product,
      mode: 'retail' | 'wholesale',
      qty = 1,
    ) => {
      setLines((prev) => {
        const existing = prev.find(
          (line) => line.product.id === product.id && line.mode === mode,
        )
        if (existing) {
          return prev.map((line) =>
            line.product.id === product.id && line.mode === mode
              ? { ...line, qty: line.qty + qty }
              : line,
          )
        }
        return [...prev, { product, qty, mode }]
      })
    }

    const updateQty = (
      id: string,
      mode: 'retail' | 'wholesale',
      qty: number,
    ) => {
      setLines((prev) =>
        prev
          .map((line) =>
            line.product.id === id && line.mode === mode
              ? { ...line, qty }
              : line,
          )
          .filter((line) => line.qty > 0),
      )
    }

    const removeItem = (id: string, mode: 'retail' | 'wholesale') => {
      setLines((prev) =>
        prev.filter(
          (line) => !(line.product.id === id && line.mode === mode),
        ),
      )
    }

    const clear = () => setLines([])

    const itemCount = lines.reduce((sum, line) => sum + line.qty, 0)
    const subtotal = lines.reduce(
      (sum, line) => sum + unitPrice(line.product, line.mode) * line.qty,
      0,
    )

    return {
      lines,
      addItem,
      updateQty,
      removeItem,
      clear,
      itemCount,
      subtotal,
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function formatZar(amount: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount)
}
