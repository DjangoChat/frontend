import type { UUID } from "crypto"

export type OnboardingProfileRequest = {
  nickname: string
  first_name: string
  last_name: string
  gender: string
  custom_gender?: string
  birth_date: string | Date
  avatar?: File
}

export type OnboardingProfileResponse = {
  id_profile: UUID
  id_participant: UUID
}
