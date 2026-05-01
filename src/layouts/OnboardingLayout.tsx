import { Box, Container, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Outlet } from "react-router"
import { TopBar } from "./TopBar"

export const OnboardingLayout = () => {
  const { copyright } = useIntlayer("signin")

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.body",
      }}
    >
      {/* Header */}
      <TopBar />

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, width: "100%" }}>
        <Container
          maxWidth="md"
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Stack
            sx={{
              gap: 3,
              minHeight: "calc(100vh - 200px)",
            }}
          >
            <Outlet />
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, mt: "auto" }}>
        <Typography level="body-xs" sx={{ textAlign: "center" }}>
          {copyright as string} {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  )
}
