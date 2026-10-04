import { useState, type FormEvent } from 'react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'

export function WholesalePage() {
  const [submitted, setSubmitted] = useState(false)
  const wholesale = products.filter((p) => p.wholesaleZar)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="B2B wholesale"
        title="Stock your shelves with Cape-grown supply."
        copy="Case pricing and bulk lots for licensed retailers, wellness clinics, and processors. Account approval typically within two business days."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-sm border border-ink/10 bg-mist/50 p-6 md:p-8">
          <h3 className="font-display text-2xl font-bold text-ink">
            Apply for a trade account
          </h3>
          <p className="mt-2 text-sm text-ink-soft">
            Tell us about your business. We’ll verify documents and open
            wholesale pricing on your cart.
          </p>

          {submitted ? (
            <p className="mt-8 rounded-md bg-leaf/10 px-4 py-3 text-sm font-medium text-leaf">
              Application received. A Stoned trade specialist will contact you
              on the details provided.
            </p>
          ) : (
            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Business name</span>
                <input
                  required
                  name="business"
                  className="rounded-md border border-ink/15 bg-canvas px-3 py-2 outline-none ring-leaf focus:ring-2"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Company registration (CIPC)</span>
                <input
                  required
                  name="cipc"
                  placeholder="e.g. 2024/123456/07"
                  className="rounded-md border border-ink/15 bg-canvas px-3 py-2 outline-none ring-leaf focus:ring-2"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm">
                  <span className="font-medium">Contact email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-md border border-ink/15 bg-canvas px-3 py-2 outline-none ring-leaf focus:ring-2"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="font-medium">Phone / WhatsApp</span>
                  <input
                    required
                    name="phone"
                    className="rounded-md border border-ink/15 bg-canvas px-3 py-2 outline-none ring-leaf focus:ring-2"
                  />
                </label>
              </div>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Primary province</span>
                <select
                  required
                  name="province"
                  className="rounded-md border border-ink/15 bg-canvas px-3 py-2 outline-none ring-leaf focus:ring-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select province
                  </option>
                  {[
                    'Western Cape',
                    'Gauteng',
                    'KwaZulu-Natal',
                    'Eastern Cape',
                    'Free State',
                    'Limpopo',
                    'Mpumalanga',
                    'North West',
                    'Northern Cape',
                  ].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="mt-2 rounded-md bg-leaf-deep px-4 py-3 text-sm font-semibold text-mist hover:bg-leaf"
              >
                Submit trade application
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="border-b border-ink/10 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Trade terms
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              <li>Net-30 on approved accounts over R15,000 monthly.</li>
              <li>Minimum order values apply per SKU.</li>
              <li>Cold-chain delivery to Gauteng, Cape Town, and Durban.</li>
              <li>Baobab members receive an extra 5% wholesale discount.</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Need volume?
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Email{' '}
              <a className="font-semibold text-leaf underline" href="mailto:trade@stoned.co.za">
                trade@stoned.co.za
              </a>{' '}
              for custom cultivation contracts and white-label packaging.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          eyebrow="Wholesale catalogue"
          title="Live case pricing."
          copy="Add wholesale lines to your cart with minimum quantities pre-filled."
        />
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {wholesale.map((product) => (
            <ProductCard key={product.id} product={product} mode="wholesale" />
          ))}
        </div>
      </div>
    </div>
  )
}
