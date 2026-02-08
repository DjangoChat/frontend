import { Box, Button, Container, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Link } from "react-router"
import { ROUTES_KEYS } from "../../../constants"

export const Hero = () => {
  const { title, subtitle, startMessaging, learnMore } = useIntlayer("hero")

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="sm">
        <Stack
          sx={{
            gap: 3,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            component="h1"
            level="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title as unknown as string}
          </Typography>
          <Typography
            level="body-md"
            sx={{
              maxWidth: 420,
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            {subtitle as unknown as string}
          </Typography>
          <Stack
            direction="row"
            sx={{
              gap: 1.5,
              mt: 1,
            }}
          >
            <Button
              component={Link}
              to={ROUTES_KEYS.REGISTER}
              size="md"
              sx={{
                bgcolor: "#25D366",
                "&:hover": { bgcolor: "#128C7E" },
                px: 3,
                fontWeight: 600,
                borderRadius: "sm",
              }}
            >
              {startMessaging as unknown as string}
            </Button>
            <Button
              size="md"
              variant="outlined"
              color="neutral"
              sx={{
                px: 3,
                fontWeight: 600,
                borderRadius: "sm",
              }}
            >
              {learnMore as unknown as string}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
