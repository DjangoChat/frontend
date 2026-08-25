import { useEffect } from "react"
import { REPRESENTATIONS } from "../constants"
import { db } from "../db"
import { useGetAllParticipantsQuery } from "../redux"
import type { ParticipantBasic } from "../types"

export const useLoadParticipants = () => {
  const { data, isLoading, isError } = useGetAllParticipantsQuery({
    representation: REPRESENTATIONS.BRIEF,
  })

  useEffect(() => {
    if (data && !isError) {
      const participants = data.results as ParticipantBasic[]
      if (participants.length > 0) {
        db.participants.bulkPut(participants).catch((error: unknown) => {
          console.error("Failed to store participants in DB:", error)
        })
      }
    }
  }, [data, isLoading, isError])

  return {
    isLoading,
    isError,
  }
}
