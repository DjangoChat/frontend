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
import { useNavigate } from "react-router"
import { ROUTES_KEYS } from "../../../constants"
import { useGetAllPricesQuery } from "../../../redux"

const PERIODS = ["MONTHLY", "TRIMESTER", "ANNUAL"]

export const Pricing = () => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState("MONTHLY")
  const { data, isLoading, error } = useGetAllPricesQuery({
    period__name: selectedPeriod,
  })
  const filteredPrices = data?.results ?? []

  if (isLoading) {
    return (
      <Box sx={{ py: 12, textAlign: "center" }}>
        <Typography level="h2">Loading pricing plans...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 12, textAlign: "center" }}>
        <Typography level="h2" color="danger">
          Failed to load pricing plans
        </Typography>
      </Box>
    )
  }

  const handleGetStarted = () => {
    void navigate(ROUTES_KEYS.LOGIN)
  }

  return (
    <Box
      component="section"
      sx={theme => ({
        py: { xs: 8, md: 12 },
        [theme.getColorSchemeSelector("light")]: {
          bgcolor: "#f9fafb",
        },
        [theme.getColorSchemeSelector("dark")]: {
          bgcolor: "background.surface",
        },
      })}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack sx={{ alignItems: "center", mb: 8, gap: 2 }}>
          <Typography
            component="h2"
            level="h1"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Transparent Pricing Plans
          </Typography>
          <Typography
            level="body-md"
            sx={{
              textAlign: "center",
              maxWidth: 500,
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            Choose the perfect plan for your messaging needs. Upgrade anytime.
          </Typography>
        </Stack>

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
              {period.toLowerCase()}
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

                  {/* Features placeholder */}
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
                      <Typography level="body-sm">Priority support</Typography>
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
                    onClick={handleGetStarted}
                    sx={{
                      bgcolor: "#25D366",
                      color: "white",
                      fontWeight: 600,
                      py: 1.5,
                      "&:hover": { bgcolor: "#128C7E" },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Get Started
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ textAlign: "center", width: "100%", py: 4 }}>
              <Typography level="body-lg" color="neutral">
                No pricing plans available for this period
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  )
}
