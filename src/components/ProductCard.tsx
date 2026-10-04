import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import { formatZar, useCart } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'

type Props = {
  product: Product
  mode?: 'retail' | 'wholesale'
}

export function ProductCard({ product, mode = 'retail' }: Props) {
  const { addItem } = useCart()
  const { discountRate } = useMembership()

  const base =
    mode === 'wholesale'
      ? (product.wholesaleZar ?? product.priceZar)
      : product.priceZar
  const price =
    mode === 'retail' && discountRate > 0
      ? Math.round(base * (1 - discountRate))
      : base

  if (mode === 'retail' && product.channel === 'b2b') return null
  if (mode === 'wholesale' && !product.wholesaleZar) return null

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border-b border-ink/10 pb-6"
    >
      <Link to={`/product/${product.id}?mode=${mode}`} className="block">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-sm"
          style={{
            background: `linear-gradient(145deg, ${product.hue} 0%, #1b2e22 70%)`,
          }}
        >
          <div className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 20%, rgba(230,201,106,0.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(242,245,240,0.12), transparent 45%)',
            }}
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span className="font-display text-2xl font-bold text-mist">
              {product.name}
            </span>
            <span className="text-xs uppercase tracking-[0.14em] text-gold-soft">
              {product.origin}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-ink-soft">{product.strain}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-sage">
              {product.category} · THC {product.thc}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold text-ink">
              {formatZar(price)}
            </p>
            <p className="text-xs text-sage">/ {product.unit}</p>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            addItem(
              product,
              mode,
              mode === 'wholesale' ? product.minOrder ?? 1 : 1,
            )
          }
          className="rounded-md bg-leaf px-3 py-2 text-sm font-semibold text-mist transition hover:bg-leaf-deep"
        >
          {mode === 'wholesale' ? 'Add wholesale' : 'Add to cart'}
        </button>
        {mode === 'wholesale' && product.minOrder && (
          <span className="text-xs text-sage">Min {product.minOrder}</span>
        )}
        {mode === 'retail' && discountRate > 0 && (
          <span className="text-xs font-medium text-gold">
            Member price
          </span>
        )}
      </div>
    </motion.article>
  )
}
