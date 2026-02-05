import { Box, Button, Container, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"

export const CallToAction = () => {
  const { title, description, signUpNow } = useIntlayer("cta")

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        color: "white",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography
            level="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
            }}
          >
            {title as unknown as string}
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: 0.95,
              maxWidth: "600px",
            }}
          >
            {description as unknown as string}
          </Typography>
          <Button
            size="lg"
            variant="solid"
            sx={{
              bgcolor: "white",
              color: "#25D366",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            {signUpNow as unknown as string}
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
