import type { UUID } from "crypto"

export type Price = {
  id: UUID
  plan: string
  period: string
  currency: string
  amount: number
  stripe_price_id: string
}

export type AllPrice = Price[]
