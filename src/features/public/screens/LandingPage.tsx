import { Box } from "@mui/joy"
import { TopBar } from "../../../layouts"
import { CallToAction, Features, Hero } from "../components"

export const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.body",
      }}
    >
      <TopBar />
      <Hero />
      <Features />
      <CallToAction />
    </Box>
  )
}
