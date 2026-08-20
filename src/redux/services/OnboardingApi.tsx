import { ENDPOINT } from "../../constants"
import type {
  OnboardingProfileRequest,
  OnboardingProfileResponse,
} from "../../types"
import { api } from "./api"

export const onboardingApi = api.injectEndpoints({
  endpoints: build => ({
    createProfileParticipant: build.mutation<
      OnboardingProfileResponse,
      OnboardingProfileRequest
    >({
      query: data => ({
        url: `${ENDPOINT.ONBOARDING}create_profile_participant/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateProfileParticipantMutation } = onboardingApi
