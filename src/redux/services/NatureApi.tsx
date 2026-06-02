import { ENDPOINT } from "../../constants"
import type { AllNatureReponse } from "../../types"
import { api } from "./api"

export const natureApi = api.injectEndpoints({
  endpoints: build => ({
    getAllNatures: build.query<AllNatureReponse, null>({
      query: () => ({
        url: ENDPOINT.NATURE,
        method: "GET",
      }),
    }),
  }),
})

export const { useGetAllNaturesQuery } = natureApi
