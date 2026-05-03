import type { UUID } from "crypto"

export type BasicPrice = {
  id: UUID
  plan: string
  period: string
  currency: string
  amount: number
  stripe_price_id: string
}

export type PriceResponse = BasicPrice
export type PriceRequest = Partial<BasicPrice>

export type AllPrice = BasicPrice[]
