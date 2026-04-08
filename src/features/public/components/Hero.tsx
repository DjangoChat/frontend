import { Box, Button, Container, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Link } from "react-router"
import heroImage from "../../../assets/images/friends.jpg"
import { ROUTES_KEYS } from "../../../constants"

export const Hero = () => {
  const { title, subtitle, startMessaging, learnMore } = useIntlayer("hero")

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Blurred overlay with gradient */}
      <Box
        sx={theme => ({
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(8px)",
          zIndex: 1,
          [theme.getColorSchemeSelector("light")]: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19, 19, 24, 0.75)",
          },
        })}
      />

      {/* Content */}
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          py: { xs: 10, md: 14 },
        }}
      >
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
            sx={theme => ({
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              [theme.getColorSchemeSelector("light")]: {
                color: "#000",
              },
              [theme.getColorSchemeSelector("dark")]: {
                color: "#fff",
              },
            })}
          >
            {title as unknown as string}
          </Typography>
          <Typography
            level="body-md"
            sx={theme => ({
              maxWidth: { xs: "100%", sm: 420 },
              lineHeight: 1.7,
              [theme.getColorSchemeSelector("light")]: {
                color: "rgba(0, 0, 0, 0.7)",
              },
              [theme.getColorSchemeSelector("dark")]: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            })}
          >
            {subtitle as unknown as string}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              gap: 1.5,
              mt: 1,
              width: { xs: "100%", sm: "auto" },
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
              sx={theme => ({
                px: 3,
                fontWeight: 600,
                borderRadius: "sm",
                [theme.getColorSchemeSelector("light")]: {
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  color: "#000",
                  "&:hover": {
                    borderColor: "rgba(0, 0, 0, 0.6)",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                },
                [theme.getColorSchemeSelector("dark")]: {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "#fff",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                },
              })}
            >
              {learnMore as unknown as string}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
