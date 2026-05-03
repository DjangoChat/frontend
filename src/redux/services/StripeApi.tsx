import { ENDPOINT } from "../../constants"
import type {
  CheckOutSessionRequest,
  CheckOutSessionResponse,
} from "../../types"
import { api } from "./api"

export const stripeApi = api.injectEndpoints({
  endpoints: build => ({
    checkOutSession: build.mutation<
      CheckOutSessionResponse,
      CheckOutSessionRequest
    >({
      query: data => ({
        url: `${ENDPOINT.STRIPE}/check-out-session`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useCheckOutSessionMutation } = stripeApi
