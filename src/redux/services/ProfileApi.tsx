import type { UUID } from "crypto"
import { ENDPOINT } from "../../constants"
import type {
  AllProfileRequest,
  AllProfileResponse,
  ProfileRequest,
  ProfileResponse,
} from "../../types"
import { api } from "./api"

export const profileApi = api.injectEndpoints({
  endpoints: build => ({
    getAllProfile: build.query<AllProfileResponse, AllProfileRequest>({
      query: () => ({
        url: ENDPOINT.PROFILE,
        method: "GET",
      }),
    }),

    getProfile: build.query<ProfileResponse, UUID>({
      query: id => ({
        url: `${ENDPOINT.PROFILE}/${id}`,
        method: "GET",
      }),
    }),

    addProfile: build.mutation<ProfileResponse, ProfileRequest>({
      query: data => ({
        url: ENDPOINT.PROFILE,
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: build.mutation<ProfileResponse, ProfileRequest>({
      query: data => ({
        url: `${ENDPOINT.PROFILE}/${String(data.id)}`,
        method: "PUT",
        body: data,
      }),
    }),

    patchProfile: build.mutation<ProfileResponse, ProfileRequest>({
      query: data => ({
        url: `${ENDPOINT.PROFILE}/${String(data.id)}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetAllProfileQuery,
  useGetProfileQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
  usePatchProfileMutation,
} = profileApi
