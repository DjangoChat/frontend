import { ENDPOINT } from "../../constants"
import type {
  AllParticipantBasicResponse,
  AllParticipantDetailResponse,
  AllParticipantRequest,
} from "../../types"
import { buildQueryString } from "../../types/Utils"
import { api } from "./api"

export const participantApi = api.injectEndpoints({
  endpoints: build => ({
    getAllParticipants: build.query<
      AllParticipantDetailResponse | AllParticipantBasicResponse,
      AllParticipantRequest
    >({
      query: (params: AllParticipantRequest) => ({
        url: `${ENDPOINT.PARTICIPANT}${buildQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["Participant"],
    }),
  }),
})

export const { useGetAllParticipantsQuery } = participantApi
