import { ENDPOINT } from "../../constants"
import type { AllPrice } from "../../types"
import { api } from "./api"

export const priceApi = api.injectEndpoints({
  endpoints: build => ({
    getAllPrices: build.query<AllPrice, null>({
      query: () => ({
        url: ENDPOINT.PRICE,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllPricesQuery } = priceApi
