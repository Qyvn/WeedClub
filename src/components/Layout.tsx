import { Link, NavLink, Outlet } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'

const nav = [
  { to: '/shop', label: 'Shop' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/memberships', label: 'Memberships' },
]

export function Layout() {
  const { itemCount } = useCart()
  const { activePlan } = useMembership()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-leaf focus:text-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-ink/8 bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
            STONED
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-leaf' : 'text-ink-soft hover:text-leaf'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {activePlan && (
              <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:inline">
                {activePlan.name} member
              </span>
            )}
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-md bg-leaf-deep px-3 py-2 text-sm font-semibold text-mist transition hover:bg-leaf"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="inline-flex rounded-md border border-ink/15 p-2 text-ink md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="border-t border-ink/8 px-4 py-3 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-2">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-mist text-leaf' : 'text-ink-soft'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-ink/10 bg-leaf-deep text-mist">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
          <div>
            <p className="font-display text-3xl font-bold tracking-tight">STONED</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist/75">
              Licensed cannabis retail and wholesale across South Africa.
              Adult use only. Know your local regulations before purchase.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm text-mist/80">
              <li>
                <Link to="/shop" className="hover:text-white">
                  Retail shop
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="hover:text-white">
                  B2B wholesale
                </Link>
              </li>
              <li>
                <Link to="/memberships" className="hover:text-white">
                  Memberships
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Compliance
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist/75">
              18+ only. Identity verification at collection or delivery.
              Wholesale requires a valid business registration and licence
              documentation where applicable.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-mist/55 md:px-6">
          © {new Date().getFullYear()} Stoned (Pty) Ltd · South Africa
        </div>
      </footer>
    </div>
  )
}
