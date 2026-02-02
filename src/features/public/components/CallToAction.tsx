import { Box, Button, Container, Stack, Typography } from "@mui/joy"

export const CallToAction = () => {
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
            Ready to Start Chatting?
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: 0.95,
              maxWidth: "600px",
            }}
          >
            Join millions of users worldwide and experience secure, fast
            messaging. Create your account now and start connecting!
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
            Sign Up Now
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
