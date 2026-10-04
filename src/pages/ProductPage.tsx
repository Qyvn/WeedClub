import { Link, useParams, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { formatZar, useCart } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'

export function ProductPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const modeParam = params.get('mode')
  const mode = modeParam === 'wholesale' ? 'wholesale' : 'retail'
  const product = products.find((p) => p.id === id)
  const { addItem } = useCart()
  const { discountRate } = useMembership()

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <p className="text-ink-soft">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-leaf underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const base =
    mode === 'wholesale'
      ? (product.wholesaleZar ?? product.priceZar)
      : product.priceZar
  const price =
    mode === 'retail' && discountRate > 0
      ? Math.round(base * (1 - discountRate))
      : base

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
      <div
        className="relative min-h-[320px] overflow-hidden rounded-sm md:min-h-[480px]"
        style={{
          background: `linear-gradient(155deg, ${product.hue} 0%, #14201a 75%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(230,201,106,0.28), transparent 42%), radial-gradient(circle at 75% 70%, rgba(242,245,240,0.1), transparent 40%)',
          }}
        />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-soft">
            {product.origin}
          </p>
          <h1 className="font-display mt-2 text-4xl font-extrabold text-mist md:text-5xl">
            {product.name}
          </h1>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          {mode === 'wholesale' ? 'Wholesale' : 'Retail'} · {product.category}
        </p>
        <p className="mt-3 text-lg text-ink-soft">{product.strain}</p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-ink/10 py-5 text-sm">
          <div>
            <dt className="text-sage">THC</dt>
            <dd className="mt-1 font-semibold">{product.thc}</dd>
          </div>
          <div>
            <dt className="text-sage">CBD</dt>
            <dd className="mt-1 font-semibold">{product.cbd}</dd>
          </div>
          <div>
            <dt className="text-sage">Unit</dt>
            <dd className="mt-1 font-semibold">{product.unit}</dd>
          </div>
          <div>
            <dt className="text-sage">Channel</dt>
            <dd className="mt-1 font-semibold uppercase">{product.channel}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-end gap-4">
          <div>
            <p className="font-display text-4xl font-bold">{formatZar(price)}</p>
            {mode === 'retail' && discountRate > 0 && (
              <p className="text-sm text-gold">
                Member save {Math.round(discountRate * 100)}% · was{' '}
                {formatZar(base)}
              </p>
            )}
            {mode === 'wholesale' && product.minOrder && (
              <p className="text-sm text-sage">
                Minimum order {product.minOrder} units
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              addItem(
                product,
                mode,
                mode === 'wholesale' ? product.minOrder ?? 1 : 1,
              )
            }
            className="rounded-md bg-leaf px-5 py-3 text-sm font-semibold text-mist hover:bg-leaf-deep"
          >
            Add to cart
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-mist px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={mode === 'wholesale' ? '/wholesale' : '/shop'}
          className="mt-10 inline-block text-sm font-semibold text-leaf hover:underline"
        >
          ← Back to {mode === 'wholesale' ? 'wholesale' : 'shop'}
        </Link>
      </div>
    </div>
  )
}
