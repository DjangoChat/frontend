import { ENDPOINT } from "../../constants"
import type { AllAgentRequeset, AllAgentResponse } from "../../types"
import { buildQueryString } from "../../types/Utils"
import { api } from "./api"

export const agentApi = api.injectEndpoints({
  endpoints: build => ({
    getAllAgents: build.query<AllAgentResponse, AllAgentRequeset>({
      query: (params: AllAgentRequeset) => ({
        url: `${ENDPOINT.AGENT}${buildQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
})

export const { useGetAllAgentsQuery } = agentApi
