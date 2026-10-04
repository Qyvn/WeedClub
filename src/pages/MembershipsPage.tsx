import { Check } from 'lucide-react'
import { memberships } from '../data/products'
import { SectionHeading } from '../components/SectionHeading'
import { formatZar } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'

export function MembershipsPage() {
  const { activeId, billing, setBilling, join, cancel, activePlan } =
    useMembership()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="Memberships"
        title="Belong to the dispensary."
        copy="Unlock member pricing on retail, faster delivery, and private events — from first-timer Leaf to concierge Baobab."
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-ink/15 bg-mist p-1">
          {(['monthly', 'yearly'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBilling(option)}
              className={`rounded-md px-4 py-2 text-sm font-semibold capitalize transition ${
                billing === option
                  ? 'bg-leaf text-mist'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {billing === 'yearly' && (
          <span className="text-sm font-medium text-gold">
            Save two months on yearly billing
          </span>
        )}
      </div>

      {activePlan && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm">
          <p>
            You’re on the <strong>{activePlan.name}</strong> plan (
            {billing}). Member pricing is active in the shop.
          </p>
          <button
            type="button"
            onClick={cancel}
            className="font-semibold text-leaf underline"
          >
            Cancel membership
          </button>
        </div>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {memberships.map((plan) => {
          const featured = 'featured' in plan && plan.featured
          const price =
            billing === 'monthly' ? plan.priceMonthly : plan.priceYearly
          const isActive = activeId === plan.id

          return (
            <article
              key={plan.id}
              className={`flex flex-col rounded-sm border p-6 ${
                featured
                  ? 'border-gold bg-leaf-deep text-mist shadow-[var(--shadow-lift)]'
                  : 'border-ink/10 bg-canvas/70'
              }`}
            >
              {featured && (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Most popular
                </p>
              )}
              <h3 className="font-display mt-2 text-3xl font-bold">{plan.name}</h3>
              <p
                className={`mt-2 text-sm ${
                  featured ? 'text-mist/70' : 'text-ink-soft'
                }`}
              >
                {plan.tagline}
              </p>
              <p className="mt-5 font-display text-4xl font-bold">
                {formatZar(price)}
                <span className="text-base font-medium opacity-70">
                  /{billing === 'monthly' ? 'mo' : 'yr'}
                </span>
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        featured ? 'text-gold' : 'text-leaf'
                      }`}
                    />
                    <span className={featured ? 'text-mist/85' : 'text-ink-soft'}>
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => join(plan.id)}
                disabled={isActive}
                className={`mt-8 rounded-md px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'cursor-default bg-stone text-ink-soft'
                    : featured
                      ? 'bg-gold text-ink hover:bg-gold-soft'
                      : 'bg-leaf text-mist hover:bg-leaf-deep'
                }`}
              >
                {isActive ? 'Current plan' : `Join ${plan.name}`}
              </button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
