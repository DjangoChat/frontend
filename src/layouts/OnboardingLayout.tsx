import { Box, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Outlet } from "react-router"
import { OnboardingHeader } from "./OnboardingHeader"

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
      {/* Centered Content Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          maxWidth: "md",
          mx: "auto",
          width: "100%",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Header */}
        <OnboardingHeader />

        {/* Main Content */}
        <Box component="main" sx={{ flex: 1, width: "100%", overflow: "auto" }}>
          <Box
            sx={{
              py: { xs: 4, md: 6 },
              height: "100%",
            }}
          >
            <Stack
              sx={{
                gap: 3,
                height: "100%",
              }}
            >
              <Outlet />
            </Stack>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
          }}
        >
          <Typography level="body-xs" sx={{ textAlign: "center" }}>
            {copyright as string} {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
