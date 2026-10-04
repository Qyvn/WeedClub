import { Link } from 'react-router-dom'
import { formatZar, useCart } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'
import { SectionHeading } from '../components/SectionHeading'

export function CartPage() {
  const { lines, updateQty, removeItem, subtotal, clear, itemCount } = useCart()
  const { discountRate, activePlan } = useMembership()

  const retailSubtotal = lines
    .filter((l) => l.mode === 'retail')
    .reduce((sum, l) => sum + l.product.priceZar * l.qty, 0)
  const wholesaleSubtotal = lines
    .filter((l) => l.mode === 'wholesale')
    .reduce(
      (sum, l) => sum + (l.product.wholesaleZar ?? 0) * l.qty,
      0,
    )
  const memberSavings = Math.round(retailSubtotal * discountRate)
  const baobabWholesaleExtra =
    activePlan?.id === 'baobab' ? Math.round(wholesaleSubtotal * 0.05) : 0
  const total = subtotal - memberSavings - baobabWholesaleExtra

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="Cart"
        title="Your order."
        copy="Retail and wholesale lines can share one checkout. Membership discounts apply to retail automatically."
      />

      {itemCount === 0 ? (
        <div className="mt-12 rounded-sm border border-ink/10 bg-mist/40 px-6 py-10">
          <p className="text-ink-soft">Your cart is empty.</p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/shop"
              className="rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-mist"
            >
              Shop retail
            </Link>
            <Link
              to="/wholesale"
              className="rounded-md border border-ink/15 px-4 py-2 text-sm font-semibold"
            >
              Browse wholesale
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="space-y-5">
            {lines.map((line) => {
              const unit =
                line.mode === 'wholesale'
                  ? (line.product.wholesaleZar ?? 0)
                  : line.product.priceZar
              return (
                <li
                  key={`${line.product.id}-${line.mode}`}
                  className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-display text-xl font-bold">
                      {line.product.name}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-sage">
                      {line.mode} · {line.product.unit}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {formatZar(unit)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-ink-soft">
                      Qty
                      <input
                        type="number"
                        min={1}
                        value={line.qty}
                        onChange={(e) =>
                          updateQty(
                            line.product.id,
                            line.mode,
                            Number(e.target.value),
                          )
                        }
                        className="ml-2 w-20 rounded-md border border-ink/15 bg-canvas px-2 py-1"
                      />
                    </label>
                    <p className="min-w-20 text-right font-semibold">
                      {formatZar(unit * line.qty)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(line.product.id, line.mode)}
                      className="text-sm text-clay underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <aside className="h-fit rounded-sm border border-ink/10 bg-mist/50 p-6">
            <h3 className="font-display text-2xl font-bold">Summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatZar(subtotal)}</dd>
              </div>
              {memberSavings > 0 && (
                <div className="flex justify-between text-leaf">
                  <dt>{activePlan?.name} member discount</dt>
                  <dd>-{formatZar(memberSavings)}</dd>
                </div>
              )}
              {baobabWholesaleExtra > 0 && (
                <div className="flex justify-between text-leaf">
                  <dt>Baobab wholesale perk</dt>
                  <dd>-{formatZar(baobabWholesaleExtra)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatZar(total)}</dd>
              </div>
            </dl>

            {!activePlan && (
              <p className="mt-4 text-xs text-ink-soft">
                <Link to="/memberships" className="font-semibold text-leaf underline">
                  Join a membership
                </Link>{' '}
                to unlock retail savings before checkout.
              </p>
            )}

            <button
              type="button"
              className="mt-6 w-full rounded-md bg-leaf-deep px-4 py-3 text-sm font-semibold text-mist hover:bg-leaf"
              onClick={() => {
                alert(
                  'Demo checkout complete. In production this would route to PayFast / Peach Payments.',
                )
                clear()
              }}
            >
              Checkout · {formatZar(total)}
            </button>
            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-sm text-ink-soft underline"
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}
