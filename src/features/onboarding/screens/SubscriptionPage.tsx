import { Check as CheckIcon } from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy"
import { useState } from "react"
import {
  useCheckOutSessionMutation,
  useGetAllPricesQuery,
} from "../../../redux"
import type { CheckOutSessionRequest } from "../../../types"

const PERIODS = ["monthly", "trimester", "annual"]

export const SubscriptionPage = () => {
  const [checkOutSession, { isLoading }] = useCheckOutSessionMutation()
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const { data } = useGetAllPricesQuery({
    period__name: selectedPeriod,
  })
  const filteredPrices = data?.results ?? []

  const handleBuyClick = async (stripePriceId: string) => {
    const successUrl = `${window.location.origin}/onboarding/`
    const cancelUrl = `${window.location.origin}/onboarding/`

    const payload: CheckOutSessionRequest = {
      success_url: successUrl,
      cancel_url: cancelUrl,
      price_id: stripePriceId,
    }

    try {
      const response = await checkOutSession(payload).unwrap()
      window.location.href = response.stripe_session_url
    } catch (error) {
      console.error("Failed to create checkout session:", error)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.body",
      }}
    >
      <Box component="main" sx={{ flex: 1, py: 6 }}>
        <Container>
          <Typography level="h1" sx={{ textAlign: "center", mb: 2 }}>
            Choose Your Plan
          </Typography>
          <Typography level="body-md" sx={{ textAlign: "center", mb: 6 }}>
            Select the perfect subscription plan for your needs
          </Typography>

          {/* Period Toggle */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mb: 8, gap: 1.5 }}
          >
            {PERIODS.map(period => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "solid" : "outlined"}
                onClick={() => {
                  setSelectedPeriod(period)
                }}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  ...(selectedPeriod === period && {
                    bgcolor: "#25D366",
                    "&:hover": { bgcolor: "#128C7E" },
                  }),
                }}
              >
                {period}
              </Button>
            ))}
          </Box>

          <Divider sx={{ mb: 8 }} />

          {/* Pricing Cards Grid */}
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
            }}
          >
            {filteredPrices.length > 0 ? (
              filteredPrices.map(price => (
                <Grid key={price.id} xs={12} sm={6} md={4}>
                  <Card
                    variant="outlined"
                    sx={theme => ({
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      p: 4,
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
                    <Typography
                      level="title-lg"
                      sx={{
                        textTransform: "capitalize",
                        mb: 1,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      {price.plan}
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                      <Stack
                        direction="row"
                        sx={{ alignItems: "baseline", gap: 1 }}
                      >
                        <Typography
                          level="h2"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1.75rem", md: "2rem" },
                          }}
                        >
                          {price.currency}
                          {(price.amount / 100).toFixed(2)}
                        </Typography>
                        <Typography level="body-sm" color="neutral">
                          /{price.period.toLowerCase()}
                        </Typography>
                      </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Features */}
                    <Stack sx={{ gap: 2, mb: 4, flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          alignItems: "flex-start",
                        }}
                      >
                        <CheckIcon
                          sx={{
                            color: "#25D366",
                            fontSize: 20,
                            mt: 0.25,
                            flexShrink: 0,
                          }}
                        />
                        <Typography level="body-sm">
                          Full messaging features
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          alignItems: "flex-start",
                        }}
                      >
                        <CheckIcon
                          sx={{
                            color: "#25D366",
                            fontSize: 20,
                            mt: 0.25,
                            flexShrink: 0,
                          }}
                        />
                        <Typography level="body-sm">
                          Priority support
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          alignItems: "flex-start",
                        }}
                      >
                        <CheckIcon
                          sx={{
                            color: "#25D366",
                            fontSize: 20,
                            mt: 0.25,
                            flexShrink: 0,
                          }}
                        />
                        <Typography level="body-sm">
                          Advanced analytics
                        </Typography>
                      </Box>
                    </Stack>

                    <Button
                      fullWidth
                      onClick={() => {
                        void handleBuyClick(price.id)
                      }}
                      loading={isLoading}
                      sx={{
                        bgcolor: "#25D366",
                        color: "white",
                        fontWeight: 600,
                        py: 1.5,
                        "&:hover": { bgcolor: "#128C7E" },
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      Buy Now
                    </Button>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box sx={{ textAlign: "center", width: "100%", py: 4 }}>
                <Typography level="body-lg">
                  No pricing plans available for this period
                </Typography>
              </Box>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
