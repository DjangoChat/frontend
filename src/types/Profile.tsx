import type { UUID } from "crypto"
import type { Pagination, PaginationWrapper, Search } from "./Utils"

export type ProfileBasic = {
  id: UUID
  nickname: string
  first_name: string
  last_name: string
  gender: string
  custom_gender?: string
  birth_date: Date
  avatar?: File
}

export type ProfileResponse = ProfileBasic

export type ProfileRequest = Partial<ProfileBasic>

export type AllProfileResponse = PaginationWrapper<ProfileBasic>

export type AllProfileRequest = Partial<Pagination> & Partial<Search>
