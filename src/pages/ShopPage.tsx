import { useMemo, useState } from 'react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'

const categories = ['All', 'Flower', 'Oils', 'Edibles', 'Accessories'] as const

export function ShopPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    return products.filter((p) => {
      if (p.channel === 'b2b') return false
      if (category !== 'All' && p.category !== category) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.strain.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="B2C dispensary"
        title="Shop Stoned retail."
        copy="Adult-use cannabis products with transparent lab details, member pricing, and delivery to major South African metros."
      />

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                category === cat
                  ? 'bg-leaf text-mist'
                  : 'bg-mist text-ink-soft hover:bg-stone'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="block w-full md:max-w-xs">
          <span className="sr-only">Search products</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search strains, regions…"
            className="w-full rounded-md border border-ink/15 bg-canvas px-3 py-2 text-sm outline-none ring-leaf focus:ring-2"
          />
        </label>
      </div>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} mode="retail" />
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-12 text-ink-soft">No products match that filter.</p>
      )}
    </div>
  )
}
