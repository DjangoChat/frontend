import { ENDPOINT } from "../../constants"
import type { AllPriceRequest, AllPriceResponse } from "../../types"
import { buildQueryString } from "../../types/Utils"
import { api } from "./api"

export const priceApi = api.injectEndpoints({
  endpoints: build => ({
    getAllPrices: build.query<AllPriceResponse, AllPriceRequest>({
      query: (params: AllPriceRequest) => ({
        url: `${ENDPOINT.PRICE}${buildQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllPricesQuery } = priceApi
