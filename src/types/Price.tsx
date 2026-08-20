import type { UUID } from "crypto"
import type { PaginationWrapper } from "./Utils"

export type PriceParameters = {
  period__name: string
}

export type BasicPrice = {
  id: UUID
  plan: string
  period: string
  currency: string
  amount: number
}

export type PriceResponse = BasicPrice
export type PriceRequest = Partial<BasicPrice>

export type AllPriceResponse = PaginationWrapper<BasicPrice>
export type AllPriceRequest = Partial<PriceParameters>
