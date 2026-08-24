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
        url: `${ENDPOINT.STRIPE}create_session/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
})

export const { useCheckOutSessionMutation } = stripeApi
