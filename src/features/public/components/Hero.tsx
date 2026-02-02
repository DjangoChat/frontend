import { Box, Button, Container, Stack, Typography } from "@mui/joy"

export const Hero = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        py: { xs: 8, md: 12 },
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography
            level="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 800,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Connect Instantly, Chat Securely
          </Typography>
          <Typography
            level="h4"
            sx={{
              maxWidth: "700px",
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              fontWeight: 400,
              opacity: 0.95,
            }}
          >
            Experience seamless messaging with end-to-end encryption. Share
            moments, stay connected, and communicate with everyone you care
            about.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              size="lg"
              variant="solid"
              sx={{
                bgcolor: "white",
                color: "#25D366",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Start Messaging
            </Button>
            <Button
              size="lg"
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
