import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hubs, memberships, products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'

const featured = products.filter((p) => p.channel !== 'b2b').slice(0, 3)

export function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden grain">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, rgba(20,32,26,0.78) 0%, rgba(20,32,26,0.42) 45%, rgba(20,32,26,0.62) 100%), url("/hero-cape.jpg") center/cover',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 70% 40%, rgba(201,162,39,0.35), transparent 50%)',
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-extrabold tracking-tight text-mist sm:text-6xl md:text-8xl"
          >
            FYNBOS
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight text-mist md:text-3xl text-balance"
          >
            Cannabis retail & wholesale, rooted in South Africa.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-md text-base leading-relaxed text-mist/80"
          >
            Shop curated flower and oils, or order licensed B2B supply — with
            memberships that reward every visit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold text-ink transition hover:bg-gold-soft"
            >
              Shop retail
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/wholesale"
              className="inline-flex items-center gap-2 rounded-md border border-mist/35 bg-ink/25 px-5 py-3 text-sm font-semibold text-mist backdrop-blur-sm transition hover:bg-ink/40"
            >
              Open wholesale
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionHeading
          eyebrow="Two doors, one brand"
          title="Buy for yourself. Stock your shelves."
          copy="FYNBOS runs a full B2C dispensary and a verified B2B desk for licensed retailers, clinics, and processors across the country."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Link
            to="/shop"
            className="group relative overflow-hidden rounded-sm bg-leaf-deep px-6 py-10 text-mist transition"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              B2C
            </p>
            <h3 className="font-display mt-3 text-3xl font-bold">Retail shop</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist/75">
              Flower, oils, edibles, and accessories with member pricing and
              click & collect in major metros.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft transition group-hover:gap-3">
              Enter shop <ArrowRight size={16} />
            </span>
          </Link>

          <Link
            to="/wholesale"
            className="group relative overflow-hidden rounded-sm border border-ink/10 bg-mist/70 px-6 py-10 transition hover:bg-mist"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              B2B
            </p>
            <h3 className="font-display mt-3 text-3xl font-bold text-ink">
              Wholesale desk
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              Case pricing, bulk lots, and dedicated account managers for
              licensed South African businesses.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-leaf transition group-hover:gap-3">
              View wholesale <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      <section className="border-y border-ink/8 bg-mist/40 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="House favourites"
            title="Grown and finished for local palates."
            copy="A rotating selection from Western Cape greenhouses to Karoo highland rooms."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-leaf hover:underline"
            >
              Browse full menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionHeading
          eyebrow="Memberships"
          title="Stay closer to the drop."
          copy="Leaf, Protea, and Baobab tiers unlock discounts, delivery perks, and private tastings."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {memberships.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className={`rounded-sm border px-5 py-6 ${
                'featured' in plan && plan.featured
                  ? 'border-gold bg-leaf-deep text-mist'
                  : 'border-ink/10 bg-canvas/60'
              }`}
            >
              <p className="font-display text-2xl font-bold">{plan.name}</p>
              <p
                className={`mt-2 text-sm ${
                  'featured' in plan && plan.featured
                    ? 'text-mist/70'
                    : 'text-ink-soft'
                }`}
              >
                {plan.tagline}
              </p>
              <p className="mt-4 font-display text-3xl font-bold">
                R{plan.priceMonthly}
                <span className="text-base font-medium opacity-70">/mo</span>
              </p>
            </motion.div>
          ))}
        </div>
        <Link
          to="/memberships"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-leaf px-5 py-3 text-sm font-semibold text-mist hover:bg-leaf-deep"
        >
          Compare memberships <ArrowRight size={16} />
        </Link>
      </section>

      <section className="bg-leaf-deep py-16 text-mist">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Nationwide"
            title="Hubs across South Africa."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hubs.map((hub) => (
              <li key={hub.city} className="border-t border-mist/20 pt-4">
                <p className="font-display text-xl font-bold">{hub.city}</p>
                <p className="mt-1 text-sm text-mist/70">{hub.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
