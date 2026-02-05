import { Box, Button, Container, Grid, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"

export const Hero = () => {
  const { title, subtitle, startMessaging, learnMore } = useIntlayer("hero")

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        py: { xs: 8, md: 12 },
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid xs={12} md={6}>
            <Stack spacing={4} textAlign={{ xs: "center", md: "left" }}>
              <Typography
                level="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                {title as unknown as string}
              </Typography>
              <Typography
                level="h4"
                sx={{
                  maxWidth: "500px",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  fontWeight: 400,
                  opacity: 0.95,
                }}
              >
                {subtitle as unknown as string}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
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
                  {startMessaging as unknown as string}
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
                  {learnMore as unknown as string}
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=500&fit=crop"
                alt="Messaging illustration"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "lg",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
