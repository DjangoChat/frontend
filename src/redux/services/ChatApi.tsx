import { ENDPOINT } from "../../constants"
import type { AllChatDetailResponse, AllChatRequest } from "../../types"
import { buildQueryString } from "../../types"
import { api } from "./api"

export const chatApi = api.injectEndpoints({
  endpoints: build => ({
    getAllChats: build.query<AllChatDetailResponse, AllChatRequest>({
      query: (params: AllChatRequest) => ({
        url: `${ENDPOINT.CHAT}${buildQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
})
