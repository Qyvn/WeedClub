import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { memberships } from '../data/products'

export type MembershipId = (typeof memberships)[number]['id'] | null

type MembershipContextValue = {
  activeId: MembershipId
  billing: 'monthly' | 'yearly'
  setBilling: (b: 'monthly' | 'yearly') => void
  join: (id: NonNullable<MembershipId>) => void
  cancel: () => void
  activePlan: (typeof memberships)[number] | null
  discountRate: number
}

const CartMembership = createContext<MembershipContextValue | null>(null)

const discountMap: Record<string, number> = {
  leaf: 0.05,
  protea: 0.12,
  baobab: 0.18,
}

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<MembershipId>(null)
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const value = useMemo<MembershipContextValue>(() => {
    const activePlan =
      memberships.find((plan) => plan.id === activeId) ?? null
    return {
      activeId,
      billing,
      setBilling,
      join: (id) => setActiveId(id),
      cancel: () => setActiveId(null),
      activePlan,
      discountRate: activeId ? discountMap[activeId] ?? 0 : 0,
    }
  }, [activeId, billing])

  return (
    <CartMembership.Provider value={value}>{children}</CartMembership.Provider>
  )
}

export function useMembership() {
  const ctx = useContext(CartMembership)
  if (!ctx) throw new Error('useMembership must be used within MembershipProvider')
  return ctx
}
