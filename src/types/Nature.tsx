import type { UUID } from "crypto"

export type NatureBasic = {
  id: UUID
  name: string
}

export type AllNatureReponse = NatureBasic[]
