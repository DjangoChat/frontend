import { Box, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { TopBar } from "../../../layouts"
import { CallToAction, Features, Hero } from "../components"

export const LandingPage = () => {
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
      <TopBar />
      <Box component="main" sx={{ flex: 1 }}>
        <Hero />
        <Features />
        <CallToAction />
      </Box>
      <Box component="footer" sx={{ py: 3 }}>
        <Typography level="body-xs" sx={{ textAlign: "center" }}>
          {copyright as string} {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  )
}
