import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/joy"
import { useLiveQuery } from "dexie-react-hooks"
import { useMemo } from "react"
import { useIntlayer } from "react-intlayer"
import { PARTICIPANT_TYPE, REPRESENTATIONS } from "../../../constants"
import { db } from "../../../db"
import { useDebounce } from "../../../hooks/useDebounce"
import { useAppDispatch, useAppSelector } from "../../../redux"
import { useGetAllParticipantsQuery } from "../../../redux/services/ParticipantApi"
import {
  setOffset,
  setSearchQuery,
  setSelectedNature,
  setSelectedType,
} from "../../../redux/slices/AgentSlice"
import type { ParticipantDetailed } from "../../../types/Participant"

export const Agent = () => {
  const content = useIntlayer("agent") as any

  const dispatch = useAppDispatch()

  const { searchQuery, selectedNature, selectedType, limit, offset } =
    useAppSelector(state => state.agentPage)

  // Use debounce hook for search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const queryParams = {
    limit,
    offset,
    ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
    ...(selectedNature && { agent__natures__name: selectedNature }),
    ...(selectedType && { agent__agent_type: selectedType }),
    ...{ participant_type: PARTICIPANT_TYPE.AGENT },
    ...{ representation: REPRESENTATIONS.DETAILED },
  }

  const {
    data: agentsResponse,
    isLoading: agentsLoading,
    error: agentsError,
  } = useGetAllParticipantsQuery(queryParams)

  // Load participants from IndexedDB
  const participantsFromDB = useLiveQuery(() => db.participants.toArray())

  const handleChatClick = (agentId: string) => {
    console.log("Chat clicked for agent:", agentId)
  }

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * limit
    dispatch(setOffset(newOffset))
  }

  // Merge API data (ParticipantDetailed) with IndexedDB data (ParticipantBasic)
  const agents = useMemo(() => {
    if (!agentsResponse?.results || !participantsFromDB) return []

    const detailedParticipants = agentsResponse.results as ParticipantDetailed[]

    return detailedParticipants
      .map(participant => {
        // Find matching participant from IndexedDB
        const basicInfo = participantsFromDB.find(p => p.id === participant.id)

        // Skip if no details or basic info
        if (!participant.details || !basicInfo) return null

        // Combine agent details with basic participant info
        const fullName =
          `${basicInfo.first_name || ""} ${basicInfo.last_name || ""}`.trim()

        return {
          id: participant.id,
          name: fullName || basicInfo.nickname || "Unknown Agent",
          avatar: basicInfo.avatar as unknown as string | undefined,
          agent_type: participant.details.agent_type,
          natures: participant.details.natures,
          has_permission: participant.details.has_permission,
        }
      })
      .filter((agent): agent is NonNullable<typeof agent> => agent !== null)
  }, [agentsResponse, participantsFromDB])

  const totalCount = agentsResponse?.count ?? 0
  const totalPages = Math.ceil(totalCount / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        width: "100%",
      }}
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          px: 2,
        }}
      >
        {/* Header */}
        <Stack sx={{ alignItems: "center", mb: 2, gap: 0.5 }}>
          <Typography
            component="h1"
            level="h1"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {content.title}
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              textAlign: "center",
              maxWidth: 400,
              color: "text.secondary",
              lineHeight: 1.4,
              fontSize: "0.9rem",
            }}
          >
            {content.description}
          </Typography>
        </Stack>

        {/* Search and Filters */}
        <Stack
          sx={{
            mb: 2,
            gap: 1.5,
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "flex-end" },
          }}
        >
          {/* Search Input */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "auto" } }}>
            <Typography level="body-sm" sx={{ mb: 1, fontWeight: 600 }}>
              {content.searchPlaceholder}
            </Typography>
            <Input
              placeholder={content.searchPlaceholder as string}
              value={searchQuery || ""}
              onChange={e => dispatch(setSearchQuery(e.target.value))}
              sx={{ width: "100%" }}
            />
          </Box>

          {/* Reset Filters Button */}
          {(searchQuery.length > 0 ||
            selectedNature !== "" ||
            selectedType !== "") && (
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(setSearchQuery(""))
                dispatch(setSelectedNature(""))
                dispatch(setSelectedType(""))
              }}
              sx={{ whiteSpace: "nowrap" }}
            >
              Clear Filters
            </Button>
          )}
        </Stack>

        {/* Loading State */}
        {agentsLoading && (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography level="h2">{content.loading}</Typography>
          </Box>
        )}

        {/* Error State */}
        {agentsError && (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography level="h2" color="danger">
              {content.error}
            </Typography>
          </Box>
        )}

        {/* Agents Grid */}
        {!agentsLoading && !agentsError && (
          <>
            {agents.length > 0 ? (
              <>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "flex-start",
                    mb: 2,
                  }}
                >
                  {agents.map(agent => (
                    <Grid key={agent.id} xs={12} sm={6} md={4}>
                      <Card
                        variant="outlined"
                        sx={theme => ({
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          p: 2,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          border: "1px solid",
                          borderColor: "divider",
                          "&:hover": {
                            boxShadow: "lg",
                            transform: "translateY(-8px)",
                            [theme.getColorSchemeSelector("light")]: {
                              borderColor: "#25D366",
                            },
                            [theme.getColorSchemeSelector("dark")]: {
                              borderColor: "#25D366",
                            },
                          },
                        })}
                      >
                        {/* Agent Avatar */}
                        {agent.avatar && (
                          <Box
                            component="img"
                            src={agent.avatar}
                            alt={agent.name}
                            sx={{
                              width: "100%",
                              height: 120,
                              objectFit: "cover",
                              borderRadius: "sm",
                              mb: 1,
                            }}
                          />
                        )}

                        {/* Agent Name */}
                        <Typography
                          level="h3"
                          sx={{
                            mb: 1,
                            fontWeight: 700,
                            fontSize: "1rem",
                          }}
                        >
                          {agent.name}
                        </Typography>

                        {/* Agent Type and Natures */}
                        <Stack sx={{ mb: 1, gap: 0.25 }}>
                          <Typography
                            level="body-xs"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.75rem",
                            }}
                          >
                            <strong>Type:</strong> {agent.agent_type}
                          </Typography>
                          {agent.natures.length > 0 && (
                            <Typography
                              level="body-xs"
                              sx={{
                                color: "text.secondary",
                                fontSize: "0.75rem",
                              }}
                            >
                              <strong>Natures:</strong>{" "}
                              {agent.natures.join(", ")}
                            </Typography>
                          )}
                        </Stack>

                        {/* Chat Button */}
                        <Button
                          onClick={() => {
                            handleChatClick(agent.id)
                          }}
                          disabled={!agent.has_permission}
                          sx={{
                            mt: "auto",
                            backgroundColor: agent.has_permission
                              ? "#25D366"
                              : undefined,
                            "&:hover": agent.has_permission
                              ? { backgroundColor: "#128C7E" }
                              : undefined,
                          }}
                        >
                          {agent.has_permission
                            ? content.chatButton
                            : content.noAccess}
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.5,
                      mt: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      disabled={currentPage === 1}
                      onClick={() => {
                        handlePageChange(currentPage - 1)
                      }}
                      variant="outlined"
                      sx={{
                        borderColor: "divider",
                        color: "inherit",
                        "&:hover": {
                          borderColor: "#25D366",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      page => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "solid" : "outlined"}
                          onClick={() => {
                            handlePageChange(page)
                          }}
                          sx={
                            page === currentPage
                              ? {
                                  backgroundColor: "#25D366",
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "#128C7E",
                                  },
                                }
                              : {
                                  borderColor: "divider",
                                  color: "inherit",
                                  "&:hover": {
                                    borderColor: "#25D366",
                                    backgroundColor: "transparent",
                                  },
                                }
                          }
                        >
                          {page}
                        </Button>
                      ),
                    )}
                    <Button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        handlePageChange(currentPage + 1)
                      }}
                      variant="outlined"
                      sx={{
                        borderColor: "divider",
                        color: "inherit",
                        "&:hover": {
                          borderColor: "#25D366",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ py: 12, textAlign: "center" }}>
                <Typography level="h2" color="warning">
                  {content.noResults}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}
